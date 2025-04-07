#!/usr/bin/env node

import * as childProcess from "child_process";
import * as fs from "fs";
import * as help from "./help";
import Parser from "./parser";

const puts = (error: Error | null, stdout: string, stderr: string) => {
  process.stdout.write(stdout);
  process.stdout.write(stderr);
  if (error) {
    console.error(`Error Executing: ${error}`);
  }
};

// Read MakeFile
const contents = fs.readFileSync("Makefile", "utf8");

// Parse it
const parser = Parser(contents);

// Output help
if (process.argv[2] === "help") {
  if (process.argv.length > 3) {
    help.outputTargetLong(Array.from(parser), process.argv[3]);
  } else {
    help.outputAllShort(Array.from(parser));
  }
}

// Make pass through
const args = process.argv.slice(2);
const cmd = `make ${args.join(" ")}`;
childProcess.exec(cmd, puts);
