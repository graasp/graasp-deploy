
export const GRAASP_ROOT_DOMAIN = "graasp.org";

export enum Environment {
    DEV,
    STAGING,
    PRODUCTION
}

export enum AllowedRegion {
    Francfort = "eu-central-1",
    Zurich = "eu-central-2"
}
  
export type EnvironmentConfig = {
    env: Environment,
    subdomain?: string,
    region: AllowedRegion
}