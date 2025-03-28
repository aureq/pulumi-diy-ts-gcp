# Pulumi training using TypeScript (3rd session)

Exercises to learn how to use Pulumi (3rd session)

## Introduction

In this session, you will learn how to create a fully functional Network and a virtual machine. You'll also learn how to use 3rd party library to perform tasks more efficiently and more reliably. You'll have another opportunity to use string concatenation on `Output<T>`.

## Content

1. Switch to the `exercise` folder:
   - logout from the previous exercise (`pulumi logout`) and connect the Pulumi CLI (`pulumi login gs://USERNAME-pulumi-diy-state-storage/session-3`)
   - create a new stack named `pulumi-session-3/dev`
   - install the node modules (`pulumi install`)
2. Create the following resources, and make sure they are all nested under the correct `parent`.
   - A Virtual Network (10.42.0.0/16)
   - 2 public subnetworks (/20)
   - The necessary firewall rules to access port 22 and 80.
3. Create a virtual machine
   - Use a small virtual machine to limit/reduce cost
   - Using the most recent Debian 12
   - Generate a SSH key
   - Ensure you can SSH into the instance as a user-defined user name
4. Create stack outputs for:
   - The VM host name or IP address
   - The private element of the SSH key as a secret
   - A user-defined user name to access the VM

## Bonus/Challenges

5. Use a 3rd party library to compute each subnet CIDR / address space
6. Ensure the project can easily be configured (ie, no hardcoded values where possible)
7. do not hardcode region and zone in the code and leverage the provider internal configuration

## Resources

- Pulumi [examples](https://github.com/pulumi/examples)

## Answers

You will find all the answers [here](answer/).