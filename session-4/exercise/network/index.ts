import * as pulumi from "@pulumi/pulumi";
import * as acmeNetwork from "./components/gcp/network";

const config = new pulumi.Config();

export = async() => {

    const cidrBlock = config.require("cidrBlock");
    const subnetMask = config.require("netmask");
    const publicSubnetsCount = config.requireNumber("publicSubnetCount");

    const network = new acmeNetwork.AcmeNetwork("core-network", {
        /**
         * FIXME: provide a set of key/value pairs to configure your component resource.
         * Some may be mandatory, others may be optional.
         */
    });


    return {
        /**
         * FIXME: Expose the relevant resource information so you can
         * later retrieve them as part of the `.get*()` functions.
         * See `gcp.compute.getNetwork()` for more information https://www.pulumi.com/registry/packages/gcp/api-docs/compute/getnetwork/
         */
    }
}