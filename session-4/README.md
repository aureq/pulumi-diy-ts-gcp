# Pulumi training using TypeScript (4th session)

Exercises to learn how to use Pulumi (4th session)

## Introduction

This exercise starts where we finished the previous session with a compute network and a VM, but dives deeper on Pulumi reusability patterns at scale.

You'll learn how to create your own Component Resource and use stack references along the way.

For a better learning experience, you way want to start with your own code from the previous training session.

## Content

1. Switch to the `exercise` folder:
   - logout from the previous exercise (`pulumi logout`) and connect the Pulumi CLI (`pulumi login gs://USERNAME-pulumi-diy-state-storage/session-4`)
   - create 2 folders named `network` and `webserver`

### The `network` project

2. Move into `network`
   - create a new stack named `pulumi-session-4/dev`.
   - install the required dependencies (`pulumi install`)
3. Deploy a fully functional virtual network as a component resource.
   - Ensure the component resource is easily portable and reusable.
   - Use the `pulumi` runtime to generate a warning on the console.
   - Using the `pulumi` runtime to raise an exception, cleanly interrupt the `preview`/`update` if the administrative firewall is open to the internet.
4. Determine the necessary stack outputs for the `webserver` project to use.

### The `webserver` project

5. Move into `webserver`
   - create a new stack named `pulumi-session-4b/dev`.
   - install the required dependencies (`pulumi install`)
6. Use [stack references](https://www.pulumi.com/tutorials/building-with-pulumi/stack-references/) to retrieve the stack outputs from the `network` project.
7. Use the `get*()` functions to retrieve already deployed resources
8. Deploy a VM you can SSH into in the previously created subnet
   - Use stack references
   - ensure you can SSH into each VM
9. Create stack outputs for:
   - the VMs hostname or IP address
   - the username
   - the SSH private key

### Bonus/Challenges

10. Your component resource doesn't rely on `pulumi.Config()` and use an interface instead for its arguments.
11. Your resources are correctly nested under the relevant `parent`s.
12. Resources belonging to the component resources use a name prefix.
13. Your arguments interface is fully documented.
14. Your arguments interface uses optional arguments.

## Final steps

Upon completion of this workshop, run the command `pulumi destroy` (`webserver` and then `network`) to reclaim previously created resources.

### Resources

- Pulumi [examples](https://github.com/pulumi/examples)
- Pulumi [AI](https://www.pulumi.com/ai)

### Answers

You will find all the answers [here](answer/).
