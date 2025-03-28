import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

export = async () => {

    // Create a GCP resource (Storage Bucket)
    const bucket = new gcp.storage.Bucket("aureq-test-bucket-in-au", {
        location: "ASIA"
    });

    // Export the URL of the bucket
    return {
        bucketName: bucket.url
    };
}
