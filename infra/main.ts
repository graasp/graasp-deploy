import { Construct } from "constructs";
import { App, S3Backend, TerraformStack, TerraformVariable } from "cdktf";
import { AwsProvider, AwsProviderAssumeRole } from "@cdktf/provider-aws/lib/provider";
import { Vpc } from "./.gen/modules/vpc";
import { Cluster, createContainerDefinitions } from "./constructs/cluster";
import { LoadBalancer } from "./constructs/load_balancer";
import { PostgresDB } from "./constructs/postgres";
import { GraaspS3Bucket } from "./constructs/bucket";
import { makeCloudfront } from "./constructs/cloudfront";
import { AllowedRegion, Environment, EnvironmentConfig, GRAASP_ROOT_DOMAIN } from "./utils";
import { DataAwsAcmCertificate } from "@cdktf/provider-aws/lib/data-aws-acm-certificate";
import { DataAwsEcrRepository } from "@cdktf/provider-aws/lib/data-aws-ecr-repository";
import { securityGroupOnlyAllowAnotherSecurityGroup } from "./constructs/security_group";
import { GraaspRedis } from "./constructs/redis";

const DEFAULT_REGION = AllowedRegion.Francfort
const CERTIFICATE_REGION = "us-east-1";

const SHARED_TAGS = {
  "terraform-managed": "true"
}

const ROLE_BY_ENV: Record<Environment, AwsProviderAssumeRole[]> = {
  [Environment.DEV]: [{roleArn: "arn:aws:iam::299720865162:role/terraform", sessionName: "test-assume-role"}],
  [Environment.STAGING]: [],
  [Environment.PRODUCTION]: [],
}

class GraaspStack extends TerraformStack {
  constructor(scope: Construct, id: string, environment: EnvironmentConfig) {
    super(scope, id);

    const BACKEND_PORT = 3111;
    const LIBRARY_PORT = 3005;
    const ETHERPAD_PORT = 9001;
    const MEILISEARCH_PORT = 7700;
    
    

    new AwsProvider(this, "AWS", {
      region: environment.region,
      assumeRole: ROLE_BY_ENV[environment.env],
      defaultTags: [{tags: SHARED_TAGS}]
    })

    new S3Backend(this, {
      bucket: "graasp-terraform-state",
      key: id,
      region: AllowedRegion.Zurich,
      encrypt: true,
      skipRegionValidation: true // Zurich region is invalid with current version https://github.com/hashicorp/terraform-provider-aws/issues/28072
    });

    const certificateProvider = new AwsProvider(this, "AWS_US_EAST", {
      region: CERTIFICATE_REGION,
      assumeRole: ROLE_BY_ENV[environment.env],
      defaultTags: [{tags: SHARED_TAGS}],
      alias: "us_east"
    })

    const vpc = new Vpc(this, "vpc", {
      name: id,
      cidr: "172.32.0.0/16",
      
      // Use 3 availability zones in our region
      azs: ["a", "b", "c"].map((i) => `${environment.region}${i}`),
      publicSubnets: ["172.32.1.0/24", "172.32.2.0/24", "172.32.3.0/24"],
    });

    if (!vpc.azs || vpc.azs.length < 3) {
      throw new Error("Must define at least 3 availibility zones in the VPC");
    }

    // TODO: gatekeeper
    // const ec2Instance = new Instance(this, "test-iac", {
    //   tags: {"Name": "test-iac"},
    //   ami: "ami-089b5384aac360007",
    //   instanceType: "t2.nano",
    // });

    // new TerraformOutput(this, "public_ip", {
    //   value: ec2Instance.publicIp,
    // });

    // Certificate used for accessing apps - Must be an existing valid certificate
    const sslCertificateCloudfront = new DataAwsAcmCertificate(this, `${id}-acm-cert`, {
      domain: environment.subdomain ? `${environment.subdomain}.${GRAASP_ROOT_DOMAIN}` : `${GRAASP_ROOT_DOMAIN}`,
      mostRecent: true,
      types: ["AMAZON_ISSUED"],
      provider: certificateProvider // ACM certificate must be in US region
    })

    // Certificate needs to be in the same region than the load balancer, so we can't use the same than Cloudfront
    const sslCertificate = new DataAwsAcmCertificate(this, `${id}-acm-cert-lb`, {
      domain: environment.subdomain ? `${environment.subdomain}.${GRAASP_ROOT_DOMAIN}` : `${GRAASP_ROOT_DOMAIN}`,
      mostRecent: true,
      types: ["AMAZON_ISSUED"],
    })
    // -------------------------For future if certificate become terraform managed (don't forget to add certificate valication) ------------------
    // const sslCertificate = new AcmCertificate(this, `${id}-acm-cert`, {
    //   domainName: `${environment.subdomain}.${GRAASP_ROOT_DOMAIN}`,
    //   validationMethod: "DNS",
    //   subjectAlternativeNames: [environment.subdomain ? `*.${environment.subdomain}.${GRAASP_ROOT_DOMAIN}` : `*.${GRAASP_ROOT_DOMAIN}`],
    //   keyAlgorithm: "RSA_2048",
    //   provider: certificateProvider // ACM certificate must be in US region
    // })
    // -------------------------------------------------------------------------------------------------------------------------------------------

    const cluster = new Cluster(this, id, vpc);
    const loadBalancer = new LoadBalancer(
      this,
      id,
      vpc,
      sslCertificate
    );
    const backendSecurityGroup = securityGroupOnlyAllowAnotherSecurityGroup(this, `${id}-backend`, vpc.vpcIdOutput, loadBalancer.securityGroup.id, BACKEND_PORT);
    const librarySecurityGroup = securityGroupOnlyAllowAnotherSecurityGroup(this, `${id}-library`, vpc.vpcIdOutput, loadBalancer.securityGroup.id, LIBRARY_PORT);
    const etherpadSecurityGroup = securityGroupOnlyAllowAnotherSecurityGroup(this, `${id}-etherpad`, vpc.vpcIdOutput, loadBalancer.securityGroup.id, ETHERPAD_PORT);

    const meilisearchSecurityGroup = securityGroupOnlyAllowAnotherSecurityGroup(this, `${id}-meilisearch`, vpc.vpcIdOutput, backendSecurityGroup.id, MEILISEARCH_PORT);

    const dbPassword = new TerraformVariable(this, "GRAASP_DB_PASSWORD", {
      nullable: false,
      type: "string",
      description: "Admin password for the graasp database",
      sensitive: true,
    });

    new PostgresDB(
      this,
      id,
      "graasp",
      dbPassword,
      vpc,
      backendSecurityGroup,
      {
        availabilityZone: vpc.azs?.[0]
      }
    );

    const etherpadDbPassword = new TerraformVariable(this, "ETHERPAD_DB_PASSWORD", {
      nullable: false,
      type: "string",
      description: "Admin password for the etherpad database",
      sensitive: true,
    });

    const etherpadDb = new PostgresDB(
      this,
      `${id}-etherpad`,
      "graasp_etherpad",
      etherpadDbPassword.value,
      vpc,
      backendSecurityGroup,
      {
        availabilityZone: vpc.azs?.[2]
      }
    );
    
    // We do not let Terraform manage ECR repository yet. Also allows destroying the stack without destroying the repos.
    new DataAwsEcrRepository(this, `${id}-ecr`, {
      name: "graasp",
    });
    new DataAwsEcrRepository(this, `${id}-etherpad-ecr`, {
      name: "graasp/etherpad",
    });
    new DataAwsEcrRepository(this, `${id}-explore-ecr`, {
      name: "graasp/explore",
    });

    // Task for the backend
    // This is a dummy task that will be replaced by the CI/CD during deployment
    // Deployment is not managed by Terraform here.
    const graaspDummyBackendDefinition = createContainerDefinitions("graasp", "busybox", "1.36", [], {}, environment, ["/bin/sh", "-c" ,"while true; do sleep 30; done"]);
    
    // Definitions for third party services changes less often and are managed by Terraform.
    const etherpadDefinition = createContainerDefinitions("etherpad", "299720865162.dkr.ecr.eu-central-1.amazonaws.com/graasp/etherpad", "latest", [{
      hostPort: ETHERPAD_PORT,
      containerPort: ETHERPAD_PORT
    }], {
      "DB_HOST": etherpadDb.instance.dbInstanceEndpointOutput,
      "DB_NAME": "graasp_etherpad",
      "DB_PASS": etherpadDb.instance.password,
      "DB_PORT": "5432",
      "DB_TYPE": "postgres",
      "DB_USER": "graasp_etherpad",
      "EDIT_ONLY": "true",
      "PORT": ETHERPAD_PORT.toString()
    }, environment);

    const meilisearchMasterKey = new TerraformVariable(this, "MEILISEARCH_MASTER_KEY", {
      nullable: false,
      type: "string",
      description: "Meilisearch master key",
      sensitive: true,
    });
    const meilisearchDefinition = createContainerDefinitions("meilisearch", "getmeili/meilisearch", "v1.2", [{
      hostPort: MEILISEARCH_PORT,
      containerPort: MEILISEARCH_PORT
    }], {
      "MEILI_ENV": "production",
      "MEILI_MASTER_KEY": meilisearchMasterKey.value,
      "MEILI_NO_ANALYTICS": "true"
    }, environment);

    // backend
    cluster.addService("graasp",
      { containerDefinitions: graaspDummyBackendDefinition },
      backendSecurityGroup,
      undefined,
      { predefinedMetricSpecification: { predefinedMetricType: "ECSServiceAverageCPUUtilization" }, targetValue: 70, scaleInCooldown: 30, scaleOutCooldown: 300},
      { loadBalancer: loadBalancer, priority: 1, host: environment.subdomain ? `api.${environment.subdomain}.${GRAASP_ROOT_DOMAIN}` : `api.${GRAASP_ROOT_DOMAIN}`, port: BACKEND_PORT }
    );
    
    cluster.addService("graasp-library",
      { containerDefinitions: graaspDummyBackendDefinition },
      librarySecurityGroup,
      undefined,
      { predefinedMetricSpecification: { predefinedMetricType: "ECSServiceAverageMemoryUtilization" }, targetValue: 80, scaleInCooldown: 10, scaleOutCooldown: 300},
      { loadBalancer: loadBalancer, priority: 2, host: environment.subdomain ? `library.${environment.subdomain}.${GRAASP_ROOT_DOMAIN}` : `library.${GRAASP_ROOT_DOMAIN}`, port: LIBRARY_PORT }
    );

    cluster.addService("etherpad",
      { containerDefinitions: etherpadDefinition, cpu: "256", memory: "512" },
      etherpadSecurityGroup,
      undefined,
      undefined,
      { loadBalancer: loadBalancer, priority: 3, host: environment.subdomain ? `etherpad.${environment.subdomain}.${GRAASP_ROOT_DOMAIN}` : `etherpad.${GRAASP_ROOT_DOMAIN}`, port: ETHERPAD_PORT }
    );

    cluster.addService("meilisearch",
      { containerDefinitions: meilisearchDefinition, cpu: "256", memory: "512" }, // TODO: container def
      meilisearchSecurityGroup,
      {name: "graasp-meilisearch", port: MEILISEARCH_PORT}
    );
    
    // S3 buckets
    // Are all websites still used?
    const websites = [
      "account",
      "admin",
      "analyzer",
      "apps",
      "assets",
      "auth",
      "builder",
      "maintenance",
      "pdfviewer",
      "player",
      "h5p"
    ]

    for (const website of websites) {
      const bucket = new GraaspS3Bucket(this, `${id}-${website}`, true, environment);
      if (!bucket.websiteConfiguration) {
        throw new Error("Website bucket should have a website configuration");
      }
      makeCloudfront(this, `${id}-${website}`, website, bucket.bucket.bucketRegionalDomainName, sslCertificateCloudfront)
    }
    // File item storage is private
    new GraaspS3Bucket(this, `${id}-file-items`, false, environment);

    // Redis cluster
    new GraaspRedis(this, id, vpc, backendSecurityGroup);
  }
}

const app = new App();

// Each stack has its own state stored in a pre created S3 Bucket
new GraaspStack(app, "graasp-dev", {
  env: Environment.DEV,
  subdomain: "dev",
  region: DEFAULT_REGION
});

app.synth();