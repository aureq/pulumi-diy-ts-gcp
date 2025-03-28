# Pulumi training using TypeScript (3rd session)

Answers to the 3rd training session

## Answers

1. `pulumi stack init pulumi-session-3/dev` and `pulumi stack select pulumi-session-3/dev`
2. See [index.ts](index.ts)
3. See [index.ts](index.ts)
4. See [index.ts](index.ts)
5. Use the `netmask` and `@types/netmask` libraries
6. Commands used to set the different configurations
    - `pulumi config set cidrBlock 10.42.0.0/16`
    - `pulumi config set netmask 255.255.240.0`
    - `pulumi config set username aureq`
    - `pulumi config set publicSubnetCount 2`
7. Commands used to set the GCP provider
    - `pulumi config set gcp:zone australia-southeast1-a`
    - `pulumi config set gcp:region australia-southeast1`
