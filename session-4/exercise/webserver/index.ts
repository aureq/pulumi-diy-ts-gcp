import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as tls from "@pulumi/tls";

const config = new pulumi.Config();

export = async() => {

    const stackRef = new pulumi.StackReference(/* FIXME */)

    const username = config.require("username");

    const privateKey = new tls.PrivateKey("private-key", {
        algorithm: "ED25519",
    });

    const network = /** FIXME */;

    const publicSubnet = /** FIXME */;

    const publicInstance = new gcp.compute.Instance("public-vm-instance", {
        machineType: "f1-micro",
        bootDisk: {
            initializeParams: {
                image: "debian-cloud/debian-12",
            },
        },
        networkInterfaces: [{
                network: network.id,
                subnetwork: publicSubnet.id,
                accessConfigs:[{
                    networkTier: "STANDARD",
                }]
        }],
        metadata: {
            // Metadata to allow SSH access
            "ssh-keys": pulumi.interpolate`${username}:${privateKey.publicKeyOpenssh}`,
        },
        tags: ["public"],
    });

    return {
        /**
         * FIXME
         * - username
         * - ip address or hostname
         * - private ssh key as secret value
         */
    };
}