import { Construct } from "constructs";
import { EcsCluster } from "@cdktf/provider-aws/lib/ecs-cluster";
import { EcsTaskDefinition } from "@cdktf/provider-aws/lib/ecs-task-definition";
import { EcsService } from "@cdktf/provider-aws/lib/ecs-service";
import { Fn } from "cdktf";
import { Vpc } from "../.gen/modules/vpc";
import { SecurityGroup } from "@cdktf/provider-aws/lib/security-group";
import { AppautoscalingTarget } from "@cdktf/provider-aws/lib/appautoscaling-target";
import { AppautoscalingPolicy, AppautoscalingPolicyTargetTrackingScalingPolicyConfiguration } from "@cdktf/provider-aws/lib/appautoscaling-policy";
import { LbTargetGroup } from "@cdktf/provider-aws/lib/lb-target-group";
import { LoadBalancer } from "./load_balancer";
import { LbListenerRule } from "@cdktf/provider-aws/lib/lb-listener-rule";
import { ServiceDiscoveryHttpNamespace } from "@cdktf/provider-aws/lib/service-discovery-http-namespace";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { EnvironmentConfig } from "../utils";
import { CloudwatchLogGroup } from "@cdktf/provider-aws/lib/cloudwatch-log-group";


type TaskDefinitionConfiguration = {
  containerDefinitions: string,
  cpu?: string,
  memory?: string,
}



export class Cluster extends Construct {
    cluster: EcsCluster;
    vpc: Vpc;
    namespace: ServiceDiscoveryHttpNamespace
    executionRole: IamRole;

    constructor(scope: Construct, name: string, vpc: Vpc) {
        super(scope, name);
        this.cluster = new EcsCluster(scope, `cluster`, {
        name,
        });
        this.vpc = vpc

        this.namespace = new ServiceDiscoveryHttpNamespace(this, "namespace", {
          description: "Namespace for internal communication between services",
          name: "graasp",
        });

        this.executionRole = new IamRole(this, `ecs-execution-role`, {
          name: `${name}-ecs-execution-role`,
          inlinePolicy: [
            {
              name: "allow-ecr-pull",
              policy: JSON.stringify({
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Allow",
                    Action: [
                      "ecr:GetAuthorizationToken",
                      "ecr:BatchCheckLayerAvailability",
                      "ecr:GetDownloadUrlForLayer",
                      "ecr:BatchGetImage",
                      "logs:CreateLogStream",
                      "logs:PutLogEvents",
                    ],
                    Resource: "*",
                  },
                ],
              }),
            },
          ],
          // this role shall only be used by an ECS task
          assumeRolePolicy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Action: "sts:AssumeRole",
                Effect: "Allow",
                Sid: "",
                Principal: {
                  Service: "ecs-tasks.amazonaws.com",
                },
              },
            ],
          }),
        });
    }

    public addService(name: string, taskDefinitionConfig: TaskDefinitionConfiguration, serviceSecurityGroup: SecurityGroup, internalNamespaceExpose?: {name: string, port: number}, appautoscalingConfig?: AppautoscalingPolicyTargetTrackingScalingPolicyConfiguration, loadBalancerConfig?: {loadBalancer: LoadBalancer, priority: number, port: number, host: string}) {
      new CloudwatchLogGroup(this, `${name}-loggroup`, {
        name: `/ecs/${name}`,
        retentionInDays: 30,
      });

      const task = new EcsTaskDefinition(this, name, {
        family: name, // name used to group the definitions versions

        cpu: taskDefinitionConfig.cpu ?? "1024",
        memory: taskDefinitionConfig.memory ?? "3072",
        requiresCompatibilities: ["FARGATE"],
        networkMode: "awsvpc",
        executionRoleArn: this.executionRole.arn,
        containerDefinitions: taskDefinitionConfig.containerDefinitions,
        

        // lifecycle: {
        //     ignoreChanges: "all"
        // }
      });

      // If exposed on load balancer
      if (loadBalancerConfig) {
        const targetGroup = new LbTargetGroup(this, `${name}-target-group`, {
          dependsOn: [loadBalancerConfig.loadBalancer.lbl],
          name: `${name}`,
          port: loadBalancerConfig.port,
          protocol: "HTTP",
          targetType: "ip",
          vpcId: this.vpc.vpcIdOutput,
          healthCheck: {
            enabled: true,
            path: "/status",
            healthyThreshold: 5,
            unhealthyThreshold: 2,
            timeout: 5,
            interval: 30,
          }
        });
    
        // Makes the listener forward requests from subpath to the target group
        new LbListenerRule(this, `${name}-rule`, {
          listenerArn: loadBalancerConfig.loadBalancer.lbl.arn,
          priority: loadBalancerConfig.priority,  
          action: [
            {
              type: "forward",
              targetGroupArn: targetGroup.arn,
            },
          ],
    
          condition: [
            {
              hostHeader: {
                values: [loadBalancerConfig.host],
              },
            },
          ],
        });
      }
      

      // add service inside cluster

      const service = new EcsService(this, `${name}-service`, {
        name,
        launchType: "FARGATE",
        cluster: this.cluster.id,
        desiredCount: 1,
        deploymentMinimumHealthyPercent: 100,
        deploymentMaximumPercent: 200,
        taskDefinition: task.arn,
        networkConfiguration: {
          subnets: Fn.tolist(this.vpc.publicSubnetsOutput),
          assignPublicIp: true,
          securityGroups: [serviceSecurityGroup.id],
        },
        // loadBalancer: [
        //   {
        //     containerPort: 80,
        //     containerName: name,
        //     targetGroupArn: targetGroup.arn,
        //   },
        // ],
        serviceConnectConfiguration: {
          enabled: true,
          namespace: this.namespace.arn,
          service: internalNamespaceExpose ? [{portName: `${name}-${internalNamespaceExpose.port}-tcp`, clientAlias: { dnsName: internalNamespaceExpose.name, port: internalNamespaceExpose.port }, discoveryName: internalNamespaceExpose.name}] : undefined
        },
      });

      if (appautoscalingConfig) {
        const scalingTarget = new AppautoscalingTarget(this, `${name}-service-autoscaling-target`, {
          minCapacity: 1, maxCapacity: 8, resourceId: `service/${this.cluster.name}/${service.name}`, scalableDimension: "ecs:service:DesiredCount", serviceNamespace: "ecs"});
        new AppautoscalingPolicy(this, `${name}-service-autoscaling-policy`, {
          name: service.name, policyType: "TargetTrackingScaling", resourceId: scalingTarget.resourceId, scalableDimension: scalingTarget.scalableDimension, serviceNamespace: scalingTarget.serviceNamespace,
          targetTrackingScalingPolicyConfiguration: appautoscalingConfig
        });
      }
      
      return task;
    }
}

export function createContainerDefinitions(name: string, dockerImage: string, dockerTag: string, portMappings:  {
    containerPort: number,
    hostPort: number,
  }[], env: Record<string, string | undefined>, deployEnv: EnvironmentConfig, command?: string[]): string {
    return JSON.stringify([
        {
          name,
          image: `${dockerImage}:${dockerTag}`,
          environment: Object.entries(env).map(([name, value]) => ({
            name,
            value,
          })),
          portMappings: portMappings.map(m => (
            {
              ...m,
              name: `${name}-${m.hostPort}-tcp`
            })
          ),
          command: command,
          logConfiguration: {
            logDriver: "awslogs",
            options: {
              "awslogs-group": `/ecs/${name}`,
              "awslogs-region": deployEnv.region,
              "awslogs-stream-prefix": "ecs",
            },
          },
        }]);
  }