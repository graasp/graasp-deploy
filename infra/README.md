# Why infrastructure as code?

* **Documentation**: Most of the AWS resources are defined in code, hence we know what exists without exploring the whole AWS console.
* **Consistency**: The setup is similar between the different environment, reducing configuration drift.
* **Batch changes**: Want to move the whole infrastructure to a new region? Terraform will recreate all the resources with the same config, preventing us from forgetting an option somewhere in the console. We only need to migrate the stateful data (Database, S3...). Want to change the config generally used for S3 buckets? Change it in one place, all buckets are updated.

# Pre-requisites to run terraform

* a `terraform` user has been created with only the permission to assume roles (sts:AssumeRole)
* a `terraform` role with administrator permissions is created in each subaccount managed by the organization (dev, staging, prod). These roles trust the terraform user to impersonate them.
* A S3 bucket in production to store the Terraform state with ideally:
    * Bucket versionning enabled
    * Encryption at rest enabled
    * Access only allowed to the `terraform` user:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "[Your Terraform user ARN]"
            },
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::graasp-terraform-state"
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "[Your Terraform user ARN]"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::graasp-terraform-state/*"
        }
    ]
}
```
* ECR repositories must exist in the environment: `graasp`, `graasp/explore`, `graasp/etherpad`
* A valid ACM certificate for the domain of the environment (`dev.graasp.org`...), one in the region of the deployment and one in `us-east-1` (for Cloudfront)
* Currently, Route53 records (for accessings apps and for certificates) must be managed manually.
    * When the cloudfront certificate is created for the first time, you must go to the certificate page in the console and use the "Create certificate in Route53" button.
    * TODO: To manage route53 with Terraform, create a hosted zone in each env, then create one NS record in the prod account for the corresponding env. This will allow the env to manage the records for its own domain.

# Run

```
cdktf synth
cdktf diff
cdtf deploy
```

# Migrate existing data

For moving production data when recreating the production environment in Zurich.

* Create the new environment
* Down the production to prevent data changes
* Copy the file item bucket content to the new one (`aws s3 sync s3://old-name s3://new-name`)
* Copy RDS content to the new database (can we restore snapshot to another RDS in a new region?)
* Update Route53 records to points to the new Cloudfronts and load balancer.
* Update the CI/CD secrets for deployments to point to new S3 buckets, ECS cluster/service...
* Check that everything is working correctly
* Delete the old infrastructure

## What to update in CI

Once the infrastructure is created, we need to update the deployment pipeline to point to the new resources (new ECS cluster, new S3 buckets, cloudfronts...). This should only be done once, just to match the new name of the resources.

* Take one of the stack (production for example) and identify all the repositories, deployment are dispatched to these repositories, so their secrets must be update for the deployment to work.
* Update the access keys in the secrets for the repo, if deployment must be done by a new AWS user.

# Architecture

Some of the resources have been wrapped in custom `Construct` type to simplify usage (ECS cluster, Postgres...) and use sane defaults adapted to Graasp. For other ressources, we directly use the terraform provided construct. This can be improved if better abstractions are needed. Indeed, the current architecture was created by mapping the manually created AWS infrastructure to code, to perform the migration, but it can be perfected now that Terraform manages the infrastructure.

Some example of the possible improvements:

* Manage the zones and DNS records directly with Terraform
* During the migration to IAC, it was discovered that we are only using public subnets in our VPC. This means everything in graasp is addressable from the Internet. This is mitagated by security groups, which only allows traffic from authorized clients. But it might be a good idea to use private subnets, it means however still having public subnets for the application load balancer and routing from public to private subnets.
* Use more strong types: a lot of resources can currently take arbitrary strings for configuration. See `AllowedRegion` for an example of improving a configuration type.
* Terraform do not manage the deployments, it makes the infrastructure available for the CI/CD to act. Make the CI/CD more generic (instead of one workflow per env), then create a pipeline to deploy a generic dev environment (infra followed by deploy), to have ephemereal dev environments.
* Separating "static" resources in different stacks. For example, by putting ECR repo in a different stack for each env, we could destroy everything else, while keeping image history.

# Troubleshoot

## Importing an existing ressource

If something has been created manually on AWS, you can import it into the terraform state (if most of the config matches), so that you don't have to recreate it.

For example for importing an existing ECR repository:

```bash
cdktf diff # synth and look at plan
cat cdktf.out/stacks/[your stack]/cdk.tf.json jq '.resource.aws_ecr_repository'
# Find the "terraform id" of the resource you want to import to
# Here it would be something like "aws_ecr_repository.graasp-iac-development-ecr"
terraform import aws_ecr_repository.graasp-iac-development-ecr graasp # Import to terraform id from target id (here graasp ecr repo, but can often be an AWS ARN)
cdktf diff # your plan should stop trying to create the resource.
```