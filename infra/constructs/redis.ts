import { ElasticacheCluster } from "@cdktf/provider-aws/lib/elasticache-cluster";
import { ElasticacheSubnetGroup } from "@cdktf/provider-aws/lib/elasticache-subnet-group";
import { Construct } from "constructs";
import { securityGroupOnlyAllowAnotherSecurityGroup } from "./security_group";
import { Vpc } from "../.gen/modules/vpc";
import { SecurityGroup } from "@cdktf/provider-aws/lib/security-group";
import { Token } from "cdktf";

export class GraaspRedis extends Construct {
    public instance: ElasticacheCluster;
  
    constructor(
      scope: Construct,
      id: string,
      vpc: Vpc,
      allowedSecurityGroup: SecurityGroup,
    ) {
      super(scope, `${id}-redis`);
  
      const redisSecurityGroup = securityGroupOnlyAllowAnotherSecurityGroup(this, `${id}-redis`, vpc.vpcIdOutput, allowedSecurityGroup.id, 6379);

    const redisSubnetGroup = new ElasticacheSubnetGroup(this, `${id}-redis-subnet-group`, {
      name: id,
      subnetIds: Token.asList(vpc.publicSubnetsOutput),
    })

    this.instance = new ElasticacheCluster(this, `${id}-redis`, {
      clusterId: `${id}-redis`,
      engine: "redis",
      engineVersion: "6.0",
      nodeType: "cache.t2.micro",
      numCacheNodes: 1,
      parameterGroupName: "default.redis6.x",
      port: 6379,
      subnetGroupName: redisSubnetGroup.name,
      securityGroupIds: [redisSecurityGroup.id]
    })

    // Default already exist?

    // new ElasticacheUser(this, `${id}-redis-user`, {
    //   accessString: "on ~* +@all",
    //   engine: "REDIS",
    //   authenticationMode: {
    //     type: "no-password-required"
    //   },
    //   userId: "default",
    //   userName: "default",
    // });
    }
  }