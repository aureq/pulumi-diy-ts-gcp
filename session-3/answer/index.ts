import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as tls from "@pulumi/tls";
import { Netmask } from "netmask";

const config = new pulumi.Config();

export = async() => {

    const cidrBlock = config.require("cidrBlock");
    const subnetMask = config.require("netmask");
    const publicSubnetsCount = config.requireNumber("publicSubnetCount");
    const username = config.require("username");

    const virtualNetworkCidr = new Netmask(cidrBlock);
    let subnetCidr = new Netmask(`${virtualNetworkCidr.base}/${subnetMask}`);

    const privateKey = new tls.PrivateKey("private-key", {
        algorithm: "ED25519",
    });


    const network = new gcp.compute.Network("custom-network", {
        autoCreateSubnetworks: false,
    });

    const publicSubnets = [];

    for (let x = 0; x < publicSubnetsCount; x++) {
        const publicSubnet = new gcp.compute.Subnetwork(`public-subnet-${x}`, {
            network: network.id,
            ipCidrRange: `${subnetCidr.base}/${subnetCidr.bitmask}`,
        }, { parent: network });

        // add the new public subnet instance to the array of public subnets
        publicSubnets.push(publicSubnet);

        // iterate to the next available subnet
        subnetCidr = subnetCidr.next();
    }

    // Create a firewall rule to allow SSH and HTTP access to public subnets
    const publicFirewall = new gcp.compute.Firewall("firewall-rules", {
        network: network.id,
        allows: [{
            protocol: "tcp",
            ports: ["22", "80"],
        }],
        sourceRanges: ["0.0.0.0/0"], // Allow access from anywhere
        targetTags: ["public"],
    }, { parent: network });

    const publicInstance = new gcp.compute.Instance("public-vm-instance", {
        machineType: "f1-micro",
        bootDisk: {
            initializeParams: {
                image: "debian-cloud/debian-12",
            },
        },
        networkInterfaces: [{
                network: network.id,
                subnetwork: publicSubnets[0].id,
                accessConfigs:[{
                    networkTier: "STANDARD",
                }]
        }],
        metadata: {
            // Metadata to allow SSH access
            "ssh-keys": pulumi.interpolate`${username}:${privateKey.publicKeyOpenssh}`,
        },
        tags: ["public"],
    }, { parent: publicSubnets[0]});

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