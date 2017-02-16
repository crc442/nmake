#!/usr/bin/env node

const fs = require('fs')
const exec = require('child_process').exec
const sys = require('util')

const Parser = require('./parser')
const help = require('./help')

function puts(error, stdout, stderr) { 
	process.stdout.write(stdout)
	process.stdout.write(stderr)
	if(error !== null) {
		console.log("Error Executing" + error)
	}
}

// Read MakeFile
const contents = fs.readFileSync('Makefile', 'utf8')

// Parse it
const parser = Parser(contents);

//output target help
if(process.argv.length > 3 && process.argv[2] === "help") {
	parsed = [...parser]
	help.outputTargetLong(parsed, process.argv[3])
	return
}

// output all help
if(process.argv.length > 2 && process.argv[2] === "help") {
	parsed = [...parser]
	help.outputAllShort(parsed);
	return
}

// make pass through
const args = process.argv.slice(2)
const cmd = 'make ' + args.join(" ")
exec(cmd, puts)