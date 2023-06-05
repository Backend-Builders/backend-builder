#!/usr/bin/env node

import * as fs from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';

import { runCLI } from './cli.js';
import { loading } from './utils/index.js';
import config from './config/index.js';

// CLI interactions
const { projectDetails, projectType } = await runCLI();

// Start installation process
const stream = createInterface({
  input: process.stdin,
  output: process.stdout,
});

stream.on('close', () => {
  stream.output.write('\n');
  process.exit(0);
});

stream.output.write('Copying files and installing dependencies...\n');
const loadingInterval = loading(stream, 'monkey', 250);

// Set project directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const boilerplatePath = `${__dirname}/boilerplates/${projectType}`;
const projectPath = `./${projectDetails.name}`;

// Copy boilerplate structure, including subdirectories and files
fs.cpSync(boilerplatePath, projectPath, { recursive: true });

// Perform treatments depending on the type of project
config[projectType].runTreatments(projectPath, projectDetails);

// Copy license file
if (Object.keys(projectDetails).includes('license')) {
  const licensePath = `${__dirname}/licenses/${projectDetails.license}`;
  fs.cpSync(licensePath, projectPath, { recursive: true });
}

// Install the dependencies and finish the process
const execCommands = config[projectType].execCommands.join(' && ');

exec(execCommands, { cwd: `./${projectPath}` }, (error, stdout, stderr) => {
  clearInterval(loadingInterval);

  if (error) {
    stream.output.write(`\rError: ${error.message}`);
  } else {
    if (stderr) {
      stream.output.write(`\r${stderr}\n`);
    }

    const startCommands = config[projectType].startCommands.join('\n  ');

    stream.output.write(
      `\rProject \x1b[33m${projectDetails.name}\x1b[0m successfully created!\n`
    );

    stream.output.write('You can start by typing:\n\n');
    stream.output.write('\x1b[90m');
    stream.output.write(`  cd ${projectDetails.name}\n  ${startCommands}\n\n`);
    stream.output.write('\x1b[0m');
    stream.output.write('Happy coding!\n');
  }

  stream.close();
});

// FOR TESTING PURPOSES
// setTimeout(() => {
//   clearInterval(loadingInterval);
//   stream.output.write('\rProject \x1b[33mnode-tests\x1b[0m successfully created!');
//   stream.close();
// }, 3000);
