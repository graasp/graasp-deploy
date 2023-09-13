import { Lb } from "@cdktf/provider-aws/lib/lb";
import { LbListener } from "@cdktf/provider-aws/lib/lb-listener";
import { Construct } from "constructs";
import { Vpc } from "../.gen/modules/vpc";
import { SecurityGroup } from "@cdktf/provider-aws/lib/security-group";
import { VpcSecurityGroupIngressRule } from "@cdktf/provider-aws/lib/vpc-security-group-ingress-rule";
import { Fn } from "cdktf";
import { DataAwsAcmCertificate } from "@cdktf/provider-aws/lib/data-aws-acm-certificate";
import { allowAllEgressRule } from "./security_group";

export class LoadBalancer extends Construct {
    lb: Lb;
    lbl: LbListener;
    vpc: Vpc;
    securityGroup: SecurityGroup;
  
    constructor(scope: Construct, name: string, vpc: Vpc, certificate: DataAwsAcmCertificate) {
      super(scope, `${name}-load-balancer`);
      this.vpc = vpc;

      // Setup Security Group
  
      // Changing the security group config must be avoided as it will recreate it and almost everything depends on it
      // see https://registry.terraform.io/providers/hashicorp/aws/5.16.1/docs/resources/security_group#recreating-a-security-group
      this.securityGroup = new SecurityGroup(
        scope,
        `${name}-lb-security-group`,
        {
          name: `${name}-load-balancer`,
          vpcId: vpc.vpcIdOutput,
          lifecycle: {
            createBeforeDestroy: true // see https://registry.terraform.io/providers/hashicorp/aws/5.16.1/docs/resources/security_group#recreating-a-security-group
          }
        },
      );
  
      // Do not use the `ingress` and `egress` directly on the SecurityGroup for limitations reasons
      // See note on https://registry.terraform.io/providers/hashicorp/aws/5.16.1/docs/resources/security_group#protocol
      new VpcSecurityGroupIngressRule(this, `allow-http`, {
        cidrIpv4: "0.0.0.0/0",
        fromPort: 80,
        ipProtocol: "tcp",
        securityGroupId: this.securityGroup.id,
        toPort: 80,
      })
      new VpcSecurityGroupIngressRule(this, `allow-http-ipv6`, {
        cidrIpv6: "::/0",
        fromPort: 80,
        ipProtocol: "tcp",
        securityGroupId: this.securityGroup.id,
        toPort: 80,
      })
      new VpcSecurityGroupIngressRule(this, `allow-https`, {
        cidrIpv4: "0.0.0.0/0",
        fromPort: 443,
        ipProtocol: "tcp",
        securityGroupId: this.securityGroup.id,
        toPort: 443,
      })
      new VpcSecurityGroupIngressRule(this, `allow-https-ipv6`, {
        cidrIpv6: "::/0",
        fromPort: 443,
        ipProtocol: "tcp",
        securityGroupId: this.securityGroup.id,
        toPort: 443,
      })
      allowAllEgressRule(this, name, this.securityGroup.id);
  
      // Setup Load balancer
  
      this.lb = new Lb(this, `lb`, {
        name,
        internal: false,
        loadBalancerType: "application",
        securityGroups: [this.securityGroup.id],
        subnets: Fn.tolist(vpc.publicSubnetsOutput),
        enableCrossZoneLoadBalancing: true,
      });
  
      new LbListener(this, `lb-listener-http-redirect`, {
        loadBalancerArn: this.lb.arn,
        port: 80,
        protocol: "HTTP",
        defaultAction: [
          {
            redirect: {
  
              port: "443",
              protocol: "HTTPS",
              statusCode: "HTTP_301",
            },
            type: "redirect",
          },
        ],
      });
  
      this.lbl = new LbListener(this, `lb-listener-https`, {
        loadBalancerArn: this.lb.arn,
        port: 443,
        protocol: "HTTPS",
        defaultAction: [
          {
            fixedResponse: {
              contentType: "text/plain",
              statusCode: "503",
            },
            type: "fixed-response",
          },
        ],
        sslPolicy: "ELBSecurityPolicy-2016-08",
        certificateArn: certificate.arn
      });
    }
  }