import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as tls from "@pulumi/tls";

const config = new pulumi.Config();

export = async() => {

    const stackRef = new pulumi.StackReference(`${pulumi.getOrganization()}/pulumi-session-4/${pulumi.getStack()}`)

    const username = config.require("username");

    const privateKey = new tls.PrivateKey("private-key", {
        algorithm: "ED25519",
    });

    const network = await gcp.compute.getNetwork({
        name: await stackRef.getOutputValue("networkName")
    });

    const publicSubnet = await gcp.compute.getSubnetwork({
        name: await stackRef.getOutputValue("publicSubnetworkName")
    });

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
        username: username,
        sshPrivateKey: privateKey.privateKeyOpenssh,
        instanceIp: publicInstance.networkInterfaces[0].apply(nic => {
            /**
             * There might be a more efficient way to expose the public IP address.
             */
            if (nic && nic.accessConfigs && nic.accessConfigs.length > 0) {
                return nic.accessConfigs[0].natIp;
            }
            return undefined;
        }),
    };
}