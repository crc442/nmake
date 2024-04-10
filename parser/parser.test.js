const test = require("node:test");
const assert = require("node:assert");
const Parser = require("./");

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
`;

test("Parser", () => {
  const expected = [
    { comment: "Run all tests.\ndouble tests", target: "test" },
    { comment: "Install the program.", target: "install" },
    { comment: "Build release.", target: "build" },
  ];

  const parser = Parser(testString);
  let result = [];
  for (const nodes of parser) {
    result.push(nodes);
  }

  assert.deepStrictEqual(expected, result);
});
