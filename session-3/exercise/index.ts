import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as tls from "@pulumi/tls";
import { /* FIXME */ } from "netmask";

const config = new pulumi.Config();

export = async() => {

    const cidrBlock = config.require("cidrBlock");
    const subnetMask = config.require("netmask");
    const publicSubnetsCount = config.requireNumber("publicSubnetCount");
    const username = config.require("username");

    const virtualNetworkCidr = new /* FIXME */;
    let subnetCidr = new /* FIXME */;

    const privateKey = new tls.PrivateKey("private-key", {
        /* FIXME */
    });


    const network = new gcp.compute.Network("custom-network", {
        autoCreateSubnetworks: false,
    });

    const publicSubnets = [];

    for (let x = 0; x < publicSubnetsCount; x++) {

        const publicSubnet = new gcp.compute.Subnetwork(
            /* FIXME */
        );

        // add the new public subnet instance to the array of public subnets
        publicSubnets.push(publicSubnet);

        // iterate to the next available subnet
        subnetCidr = subnetCidr.next();
    }

    // Create a firewall rule to allow SSH and HTTP access to public subnets
    const publicFirewall = new gcp.compute.Firewall("firewall-rules",
        /* FIXME */
    );

    const publicInstance = new gcp.compute.Instance("public-vm-instance", {
        machineType: "f1-micro",
        bootDisk: {
            initializeParams: {
                image: "debian-cloud/debian-12",
            },
        },
        networkInterfaces: [
            /* FIXME */
        ],
        metadata: {
            /* FIXME */
        },
    }, { parent: /* FIXME */});

    return {
        username: username,
        sshPrivateKey: /* FIXME */,
        instanceIp: publicInstance.networkInterfaces[0].apply(
            /* FIXME */
        ),
    };
}