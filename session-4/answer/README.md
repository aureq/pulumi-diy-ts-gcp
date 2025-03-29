# Pulumi training using TypeScript (4th session)

Answers to the 4th training session

## Answers

1. n/a

### The `network` project

2. n/a
3. See [network.ts](./network/components/gcp/network.ts)
   - You used `pulumi.log.warn()` to generate a warning message
   - You used `throw new pulumi.RunError("")` to raise an exception
4. See [index.ts](./network/index.ts)
   - The network `name` or the network `selfLink` is a stack output
   - The public subnet `name` or `id` is a stack output

### The `webserver` project

5. n/a
6. See [index.ts](./webserver/index.ts)
   - You used a stack reference `new pulumi.StackReference("...")`
   - You used `pulumi.getOrganization()` and `pulumi.getStack()` to more easily link your stacks
   - You have a top level async/await Pulumi program
   - You used `await stackRef.getOutputValue("...")` to retrieve a naked stack output value

7. See [index.ts](./webserver/index.ts)
   - You've retrieved a compute network and a subnetwork using the stack references
   - You used `gcp.compute.getNetwork()`
   - You used `gcp.compute.getSubnetwork()`
8. See [index.ts](./webserver/index.ts)
9. See [index.ts](./webserver/index.ts)

### Bonus/Challenges

10. See [network.ts](./network/components/gcp/network.ts)
11. See [network.ts](./network/components/gcp/network.ts)
12. See [network.ts](./network/components/gcp/network.ts)
13. See [network.ts](./network/components/gcp/network.ts)
14. See [network.ts](./network/components/gcp/network.ts)
