# Pulumi training using TypeScript (2nd session)

Exercises to learn how to use Pulumi (2nd session)

## Introduction

The series of tasks below will help you learn how to use Pulumi configuration and secrets. You will also learn how to do basic operations such as string concatenation on `Output<T>`.

## Content

1. Switch to the `exercise` folder:
   - logout from the previous exercise (`pulumi logout`) and connect the Pulumi CLI (`pulumi login gs://USERNAME-pulumi-diy-state-storage/session-2`)
   - create a new stack named `pulumi-session-2/dev`
   - install the node modules (`pulumi install`)
2. Create a new configuration entry named `ownerName`.
3. Create a new configuration entry named `subscriptionId`.
4. Create a new secret entry named `apiKey`.
5. Generate a new password using the [Random](https://www.pulumi.com/registry/packages/random/) provider.
   - At least 20 charaters long
   - Must contain special characters
6. Generate a random pet name using the [Random](https://www.pulumi.com/registry/packages/random/) provider.
7. Concatenate the `ownerName` stack config value with the random pet name (format: `owner-pet`) using `pulumi.interpolate` And display the result on the console.
8. Use `pulumi.all()` to create a welcome message "`Hello dear <ownerName>, this is your pet <petName> 🐸.`"
9. Create stack outputs for:

   - the random password generated in 5
   - the stack pet name from step 6
   - the concatenated owner name and pet name from step 7
   - the `apiKey` set in step 4 as `apiKey`
   - the plain text value of `apiKey` set in step 4 as `insecureApiKey`
   - the welcome message

10. In a single one command, display the `pet` name in a sentence of your choice.

### Resources

- Pulumi [examples](https://github.com/pulumi/examples)
- Pulumi [AI](https://www.pulumi.com/ai)

## Answers

You will find all the answers [here](answer/).
