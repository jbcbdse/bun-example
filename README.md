# Bun example

This is a test of [Bun](https://bun.sh/).

Bun seeks to replace a few tools in the stack:

* Node - it replaces the Node runtime with one based on Webkit
* npm - its package manager is faster than npm
* jest - it has the basics of a test runner, assertion tool, and mock tool, close to on par with Jest

My goal with this example was to answer:

* Is development easier?
* Is development faster?
* Does it run faster

I'll write a blog post about this, but these are my general conclusions:

* The package manager is much faster, but the binary lock file is hard to diff
* The test runner is faster than jest, but very clunky to configure
* Typings in the IDE are strange and don't always work. I didn't put much effort into this.
* Runtime is roughly the same as node. I'm not sure if this is true at scale.
* The benchmarks they advertise on their homepage are comparisons of software like `Bun.serve` vs Node's `http.createServer` - not a comparison of the general Javascript runtimes.
* For some reason, it runs Typescript faster than compiled JS files.

I didn't spend a lot of time on this or cleaning it up. This is a single-day time-boxed effort.

## Usage

Run this in a dev container. If you don't know how to do that in local VSCode, the easiest way will be to run this in GitHub CodeSpaces. You will be dropped into a dev container that already has `bun` installed. Node 20 is also installed if you want to run some of the same commands with `node` and compare.

Install dependencies

```
bun install
```

Start the app:

```
bun run start
```

See how long the encrypter takes to generate 100,000 values:

```
curl localhost:3000/crypt/100000
```

Test running that same route hundreds of times in a row or concurrently (while the app is running):

```
bun run test:e2e
```
