import { Construct } from "constructs";
import { Vpc } from "../.gen/modules/vpc";
import { SecurityGroup } from "@cdktf/provider-aws/lib/security-group";
import { Rds, RdsConfig } from "../.gen/modules/rds";
import { TerraformVariable, Token } from "cdktf";
import { securityGroupOnlyAllowAnotherSecurityGroup } from "./security_group";

export class PostgresDB extends Construct {
    public instance: Rds;
  
    constructor(
      scope: Construct,
      name: string,
      dbName: string,
      dbPassword: TerraformVariable,
      vpc: Vpc,
      allowedSecurityGroup: SecurityGroup,
      configOverride?: Partial<RdsConfig>
    ) {
      super(scope, `${name}-postgres`);
  
      const dbPort = 5432;
      
      const dbSecurityGroup = securityGroupOnlyAllowAnotherSecurityGroup(this, `${name}-db`, vpc.vpcIdOutput, allowedSecurityGroup.id, dbPort);
      
      const defaultConfig: RdsConfig = {
        identifier: `${name}`,
  
        engine: "postgres",
        engineVersion: "15.2",
        instanceClass: "db.t3.micro",
        multiAz: false,
        availabilityZone: vpc.azs?.[0],
        storageType: "gp2",
        allocatedStorage: 20,
        maxAllocatedStorage: 1000,
        publiclyAccessible: false,
        
        createDbOptionGroup: false,
        createDbSubnetGroup: true,
        subnetIds: Token.asList(vpc.publicSubnetsOutput),
        createDbParameterGroup: true,
        autoMinorVersionUpgrade: true,
        enabledCloudwatchLogsExports: undefined, // None
        deletionProtection: true,
        applyImmediately: true,
  
        parameterGroupName: "graasp-postgres15",
        family: "postgres15",
        parameters: [{
          name: "rds.force_ssl",
          value: "0"
        }],
        
        dbName: dbName,
        port: String(dbPort),
        username: 'graasp',
        password: dbPassword.value,
        manageMasterUserPassword: false,
  
        maintenanceWindow: "Sat:00:08-Sat:00:38",
        backupWindow: "21:30-22:00",
        backupRetentionPeriod: 1, // day
        copyTagsToSnapshot: true,
  
        performanceInsightsEnabled: true,
        // performanceInsightsKmsKeyId: "" // Looks like it's working manually providing it
        performanceInsightsRetentionPeriod: 7, // days
        createMonitoringRole: true,
        monitoringInterval: 60, // seconds
        monitoringRoleName: `${name}-rds-monitoring-role`,
        vpcSecurityGroupIds: [dbSecurityGroup.id],
      }
  
      // Doc: https://registry.terraform.io/modules/terraform-aws-modules/rds/aws/latest#inputs
      this.instance = new Rds(this, "db", {
        ...defaultConfig,
        ...configOverride
      });
    }
  }