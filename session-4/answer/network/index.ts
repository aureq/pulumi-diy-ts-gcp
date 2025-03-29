import * as pulumi from "@pulumi/pulumi";
import * as acmeNetwork from "./components/gcp/network";

const config = new pulumi.Config();

export = async() => {

    const cidrBlock = config.require("cidrBlock");
    const subnetMask = config.require("netmask");
    const publicSubnetsCount = config.requireNumber("publicSubnetCount");

    const network = new acmeNetwork.AcmeNetwork("core-network", {
        cidrBlock: cidrBlock,
        publicSubnetCount: publicSubnetsCount,
        subnetMask: subnetMask,
        resourcePrefix: "core-network",
        // administrativeIPs: ["0.0.0.0/0"],    // setting this to `0.0.0.0/0` will raise an exception
        // administrativePorts: ["22"],         // commenting this line will generate a warning.
    });


    return {
        networkName: network.network.name,
        publicSubnetworkName: network.publicSubnets[0].name,
    }
}