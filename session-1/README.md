# Pulumi training using TypeScript (1st session)

Exercises to learn how to use Pulumi (1st session)

## Introduction

The series of tasks below will help you learn the basics of the Pulumi CLI and some useful commands.

## Requirements

This exercise assumes you have:
    - The `gcloud` CLI [installed](https://cloud.google.com/sdk/docs/install).
    - The `pulumi` CLI [installed](https://www.pulumi.com/docs/iac/download-install/).
    - NodeJS installed and it's the latest stable version.
    - The `jq` CLI installed (optional).

## Content

1. Connect and verify you have access to your Google Cloud account.
    1. List your credentialed accounts.

        `gcloud auth list`

    2. Obtain access credentials for your user account via a web-based authorization flow.

        `gcloud auth login --activate`

    3. Set your active/default GCP project

        `gcloud config set project gcp-project-name`

    4. Obtain a list of compute regions to validate you have access to your Google Cloud environment.

        `gcloud compute regions list` Obtain a list of compute regions.

2. Prepare the Pulumi state storage
    1. Create a new GCS bucket for the purpose of storing your Pulumi state files.

        `gcloud storage buckets create gs://USERNAME-pulumi-diy-state-storage --location australia-southeast1`

    2. Completely logout/disconnect your Pulumi CLI from previous state backends.

        `pulumi logout` and `mv ~/.pulumi/credentials.json ~/.pulumi/credentials.json.training-orig` to ensure you've logged out completely

    3. Connect your Pulumi CLI with GCS bucket

        `pulumi login gs://USERNAME-pulumi-diy-state-storage/session-1`

    4. Check your Pulumi CLI is using the correct backend URL.

        `pulumi whoami -v`

3. Create and deploy your first Pulumi project

    1. Create a new directory named `exercise` and change directory into it.

        `mkdir exercise && cd exercise`

    2. Create a new Pulumi project using `gcp-typescript` as the project-s base.

        `pulumi new`

    3. Set the bucket location to `ASIA` in the source code.

    4. Deploy your first Pulumi stack

        `pulumi up`

    5. Verify the bucket has been created using either the Google Cloud console or the `gcloud` CLI

        `gcloud storage buckets list --filter=name=USERNAME-pulumi-diy-state-storage --format=json | jq .`

    6. Destroy your Pulumi stack so resources no longer persist.

        `pulumi destroy`

## Bonus/Challenges

Here is a list of additional questions for your to answer.

- List some of the most useful `pulumi` commands you've noticed so far.
- Enable shell completion in your user profile.
- Update your code as to use top-level `await`/`async`.
