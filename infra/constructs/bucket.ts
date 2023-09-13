import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { S3BucketCorsConfiguration } from "@cdktf/provider-aws/lib/s3-bucket-cors-configuration";
import { S3BucketPolicy } from "@cdktf/provider-aws/lib/s3-bucket-policy";
import { S3BucketPublicAccessBlock } from "@cdktf/provider-aws/lib/s3-bucket-public-access-block";
import { S3BucketWebsiteConfiguration } from "@cdktf/provider-aws/lib/s3-bucket-website-configuration";
import { Construct } from "constructs";
import { EnvironmentConfig, GRAASP_ROOT_DOMAIN } from "../utils";
import { DataAwsIamPolicyDocument } from "@cdktf/provider-aws/lib/data-aws-iam-policy-document";
import { Token } from "cdktf";

export class GraaspS3Bucket extends Construct {
    bucket: S3Bucket;
    websiteConfiguration?: S3BucketWebsiteConfiguration

    constructor(scope: Construct, name: string, website: boolean, environment: EnvironmentConfig) {
        super(scope, name);

        this.bucket = new S3Bucket(this, `bucket`, {
            bucket: `${name}`,
        })

        if (website) {
            this.websiteConfiguration = new S3BucketWebsiteConfiguration(this, `s3-website-configuration`, {
                bucket: this.bucket.id,
                indexDocument: {
                    suffix: "index.html"
                },
                errorDocument: {
                    key: "error.html"
                }
            })

            // Allow public access
            new S3BucketPublicAccessBlock(
              this,
              `s3-block-public-access`,
              {
                blockPublicAcls: false,
                blockPublicPolicy: false,
                bucket: this.bucket.id,
                ignorePublicAcls: false,
                restrictPublicBuckets: false,
              }
            );

            const allowPublicAccess = new DataAwsIamPolicyDocument(
              this,
              "allow_public_access",
              {
                version: "2012-10-17",
                statement: [
                  {
                    sid: "PublicReadForGetBucketObjects",
                    effect: "Allow",
                    actions: ["s3:GetObject"],
                    principals: [
                      {
                        identifiers: ["*"],
                        type: "*",
                      },
                    ],
                    resources: [`${this.bucket.arn}/*`],
                  },
                ],
              }
            );

            new S3BucketPolicy(this, `s3-policy`, {
              bucket: this.bucket.id,
              policy: Token.asString(allowPublicAccess.json)
            }); 
        }

        if (!website) {
            new S3BucketPublicAccessBlock(
                this,
                `s3-block-public-access`,
                {
                  blockPublicAcls: true,
                  blockPublicPolicy: true,
                  bucket: this.bucket.id,
                  ignorePublicAcls: true,
                  restrictPublicBuckets: true,
                }
              );

            // This has been copied from existing configuration, is it relevant?
            new S3BucketCorsConfiguration(
                this,
                `s3-cors-config`,
                {
                  bucket: this.bucket.id,
                  corsRule: [
                    {
                      allowedHeaders: ["*"],
                      allowedMethods: ["GET"],
                      allowedOrigins: [environment.subdomain ? `https://assets.${environment.subdomain}.${GRAASP_ROOT_DOMAIN}` : `https://assets.${GRAASP_ROOT_DOMAIN}`],
                      exposeHeaders: [],
                    },
                    {
                      allowedHeaders: ["*"],
                      allowedMethods: ["HEAD", "PUT", "GET", "DELETE"],
                      allowedOrigins: ["null"],
                      exposeHeaders: [],
                    },
                    {
                        allowedHeaders: ["*"],
                        allowedMethods: ["HEAD", "GET"],
                        allowedOrigins: ["*"],
                        exposeHeaders: [],
                    },
                  ],
                }
            );
        }
    }
}