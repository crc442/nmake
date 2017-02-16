## About

Nmake is a small program which wraps `make` to provide additional functionality, such as user-friendly help output, remote includes,
and eventually more. It otherwise acts as a pass-through to standard make.
Inspired by [Mmake](https://github.com/tj/mmake)

## Installation

Install globally

```
npm i -g nmake
```

Next add the following alias to your profile:

```
alias make=nmake
```

## Features

### Help output

Make's primary function is not to serve as a "task runner", however it's often used for that scenario due to its ubiquitous nature, and if you're already using it, why not! Make is however lacking a built-in mechanism for displaying help information.

Here's an example Makefile:

```Makefile
# Start the dev server.
#
# Note that the API server must
# also be running.
start:
	@gopherjs -m -v serve --http :3000 github.com/tj/docs/client
.PHONY: start

# Start the API server.
api:
	@go run server/cmd/api/api.go
.PHONY: api

# Display dependency graph.
deps:
	@godepgraph github.com/tj/docs/client | dot -Tsvg | browser
.PHONY: deps

# Display size of dependencies.
size:
	@gopherjs build client/*.go -m -o /tmp/out.js
	@du -h /tmp/out.js
	@gopher-count /tmp/out.js | sort -nr
.PHONY: size

```

Mmake provides a `help` command to display all target comments in short form:

```
$ alias make=mmake
$ make help

  start      Start the dev server.
  api        Start the API server.
  deps       Display dependency graph.
  size       Display size of dependencies.

```

The `help <target>` command is also supported to display long form:

```
$ make help start

  Start the dev server.

  Note that the API server must
  also be running.

```

The default behaviour of Make is of course preserved:

```
$ make
serving at http://localhost:3000 and on port 3000 of any available addresses

$ make size
...
```

### Remote includes (WIP)


## Registry

If you're looking to find or share makefiles check out the [Wiki](https://github.com/tj/mmake/wiki/Registry), and feel free to add a category if it is missing.

## Links

- [mmake](https://github.com/tj/mmake) Nmake
- [Announcement](https://medium.com/@tjholowaychuk/modern-make-b55d53cf80d9#.q1u1knrf5) blog post

## Badges

![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/status-stable-green.svg)

---

> [imcrc.me](http://wolfofsiliconvalley.com) &nbsp;&middot;&nbsp;
> GitHub [@crc442](https://github.com/crc442) &nbsp;&middot;&nbsp;