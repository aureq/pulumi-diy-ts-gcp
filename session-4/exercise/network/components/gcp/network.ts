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
     * FIXME
     */
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
            /**
             * FIXME
             * - set a default value
             * - raise a warning
             */

        }

        /**
         * We check for all the values in case we're able to open our administrative firewall to the internet.
         */
        args.administrativeIPs.forEach((ip) => {
            /**
             * FIXME: raise an exception if about to open the firewall to the entire internet.
             */
        });

        /**
         * If no value is given, then we provide a hardcoded default AND we raise a warning.
         */
        if (!args.administrativePorts || args.administrativePorts.length < 1) {
            args.administrativePorts = [];
            /**
             * FIXME
             * - set a default value
             * - raise a warning
             */
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
        /**
         * FIXME
         */
    }

    /**
     * Create an array of compute Subnetwork based on a user-defined count.
     *
     * @returns An array of compute Subnetwork
     */
    private createSubnetworks(): gcp.compute.Subnetwork[] {
        /**
         * FIXME
         */
    }

    /**
     * Create a compute firewall used for administrative accesses.
     *
     * @returns Return an instance of a compute firewall
     */
    private createFirewall(): gcp.compute.Firewall {
        /**
         * FIXME
         */
    }
}
