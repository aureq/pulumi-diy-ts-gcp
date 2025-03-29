import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Netmask } from "netmask";

// Define an interface for the component arguments
export interface AcmeNetworkArgs {
    /**
     * The prefix for each resource name. This helps ensure the resource name is unique.
     */
    resourcePrefix: string;
    /**
     * The GCP project in which resources will be created.
     */
    projectName?: string;
    /**
     * The range of IP addresses to use for the entire network
     */
    cidrBlock: string;
    /**
     * The subnet mask to divide an IP address into network and host portions.
     */
    subnetMask: string;
    /**
     * The number of public subnets to allocate
     */
    publicSubnetCount: number;
    /**
     * An array of adminstrative ports
     */
    administrativePorts?: string[];
    /**
     * An array of high privileged IP addresses or IP ranges to access the administrative ports
     */
    administrativeIPs?: string[];

}

/**
 * Component Resource used to create a basic compute network.
 */
export class AcmeNetwork extends pulumi.ComponentResource {

    public readonly args: AcmeNetworkArgs;
    public readonly name: string;

    public readonly network: gcp.compute.Network;
    public readonly publicSubnets: gcp.compute.Subnetwork[];
    public readonly firewall: gcp.compute.Firewall;

    /**
     * Constructure of the component reosurce.
     *
     * @param name Name of the component resource
     * @param args Arguments necessary to instantiate the component resource
     * @param opts ComponentResource options
     */
    constructor(name: string, args: AcmeNetworkArgs, opts?: pulumi.ComponentResourceOptions) {
        super("acmecorp:index:AcmeNetwork", name, {}, opts);

        /**
         * If no value is given, then we provide a hardcoded default AND we raise a warning.
         */
        if (!args.administrativeIPs || args.administrativeIPs.length < 1) {
            args.administrativeIPs = [];
            args.administrativeIPs.push("58.96.76.93/32"); // either hardcode or retrieve a value from https://checkip.amazonaws.com/
            pulumi.log.warn("No 'AcmeNetworkArgs.administrativeIPs' provided. Using the default value. Consider updating your code.")
        }

        /**
         * We check for all the values in case we're able to open our administrative firewall to the internet.
         */
        args.administrativeIPs.forEach((ip) => {
            if (ip.startsWith("0.0.0.0")) {
                throw new pulumi.RunError("Do NOT use any IPs ('0.0.0.0/0') for the adminstrative firewall rule. Deployment/Preview stopped.");
            }
        });

        /**
         * If no value is given, then we provide a hardcoded default AND we raise a warning.
         */
        if (!args.administrativePorts || args.administrativePorts.length < 1) {
            args.administrativePorts = [];
            args.administrativePorts.push("22");
            pulumi.log.warn("No 'AcmeNetworkArgs.administrativePorts' provided. Using the default value. Consider updating your code.")
        }

        this.name = name;
        this.args = args;

        this.network = this.createNetwork();
        this.publicSubnets = this.createSubnetworks();
        this.firewall = this.createFirewall();

        // Optional: Register the outputs of the component
        this.registerOutputs({});
    }

    /**
     * Create a new compute network.
     *
     * @returns Return a compute network.
     */
    private createNetwork(): gcp.compute.Network {
        return new gcp.compute.Network(`${this.args.resourcePrefix}-network`, {
            autoCreateSubnetworks: false,
            project: this.args.projectName,
        });
    }

    /**
     * Create an array of compute Subnetwork based on a user-defined count.
     *
     * @returns An array of compute Subnetwork
     */
    private createSubnetworks(): gcp.compute.Subnetwork[] {
        const subnets: gcp.compute.Subnetwork[] = [];

        const virtualNetworkCidr = new Netmask(this.args.cidrBlock);
        let subnetCidr = new Netmask(`${virtualNetworkCidr.base}/${this.args.subnetMask}`);

        for (let x = 0; x < this.args.publicSubnetCount; x++) {

            const publicSubnet = new gcp.compute.Subnetwork(`${this.args.resourcePrefix}-subnetwork-${x}`, {
                network: this.network.id,
                ipCidrRange: `${subnetCidr.base}/${subnetCidr.bitmask}`,
                project: this.args.projectName,
            }, { parent: this.network });

            // add the new public subnet instance to the array of public subnets
            subnets.push(publicSubnet);

            // iterate to the next available subnet
            subnetCidr = subnetCidr.next();
        }
        return subnets;
    }

    /**
     * Create a compute firewall used for administrative accesses.
     *
     * @returns Return an instance of a compute firewall
     */
    private createFirewall(): gcp.compute.Firewall {
        return new gcp.compute.Firewall(`${this.args.resourcePrefix}-firewall`, {
            network: this.network.id,
            allows: [{
                protocol: "tcp",
                ports: this.args.administrativePorts,
            }],
            sourceRanges: this.args.administrativeIPs,
            project: this.args.projectName,
        }, { parent: this.network });
    }
}
