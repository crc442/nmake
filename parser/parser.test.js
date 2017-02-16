const Parser = require('./')

const testString = `
# Run all tests.
# double tests
test:
	@echo "Run tests echo."
.PHONY: test

# Install the program.
install:
	@echo "install echo."
.PHONY: install

# Build release.
build:
	@echo "Run build echo."
.PHONY: build
`

// test
let parser = Parser(testString);
for(let nodes of parser) {
	console.log(nodes);
}