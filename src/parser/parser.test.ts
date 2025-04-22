import assert from 'node:assert';
import { describe, it } from 'node:test';
import Parser from './index';

describe('Parser', () => {
  it('should parse a Makefile with comments and targets', () => {
    const makefile = `# This is a test target
test:
  @echo "Hello, World!"

# This is a build target
build:
  @echo "Building..."`;
    const parser = Parser(makefile);
    const targets = Array.from(parser);

    assert.strictEqual(targets.length, 2);
    assert.deepStrictEqual(targets[0], {
      comment: 'This is a test target',
      target: 'test',
    });
    assert.deepStrictEqual(targets[1], {
      comment: 'This is a build target',
      target: 'build',
    });
  });

  it('should handle Makefile without comments', () => {
    const makefile = `test:
  @echo "Hello, World!"

build:
  @echo "Building..."`;
    const parser = Parser(makefile);
    const targets = Array.from(parser);

    assert.strictEqual(targets.length, 0);
  });
});
