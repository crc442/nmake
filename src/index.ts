#!/usr/bin/env node

import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as help from './help';
import Parser from './parser';
import logger from './utils/logger';

interface ProcessOutput {
  error: Error | null;
  stdout: string;
  stderr: string;
}

const handleProcessOutput = ({ error, stdout, stderr }: ProcessOutput): void => {
  if (stdout) {
    process.stdout.write(stdout);
    logger.info('Process output', { stdout });
  }
  if (stderr) {
    process.stderr.write(stderr);
    logger.warn('Process error output', { stderr });
  }
  if (error) {
    logger.error('Process execution error', { error });
    process.exit(1);
  }
};

const readMakefile = (): string => {
  try {
    const makefilePath = path.join(process.cwd(), 'Makefile');
    logger.info('Reading Makefile', { path: makefilePath });
    return fs.readFileSync(makefilePath, 'utf8');
  } catch (error) {
    logger.error('Failed to read Makefile', { error });
    throw new Error('Makefile not found in current directory');
  }
};

const main = async (): Promise<void> => {
  try {
    // Read and parse Makefile
    const contents = readMakefile();
    const parser = Parser(contents);

    // Handle help command
    if (process.argv[2] === 'help') {
      if (process.argv.length > 3) {
        help.outputTargetLong(Array.from(parser), process.argv[3]);
      } else {
        help.outputAllShort(Array.from(parser));
      }
      return;
    }

    // Execute make command
    const args = process.argv.slice(2);
    const cmd = `make ${args.join(' ')}`;
    logger.info('Executing make command', { command: cmd });

    childProcess.exec(cmd, (error, stdout, stderr) => {
      handleProcessOutput({ error, stdout, stderr });
    });
  } catch (error) {
    logger.error('Fatal error', { error });
    process.exit(1);
  }
};

main().catch((error) => {
  logger.error('Unhandled error', { error });
  process.exit(1);
}); 