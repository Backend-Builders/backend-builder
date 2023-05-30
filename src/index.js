#!/usr/bin/env node
import input from '@inquirer/input';
import select from '@inquirer/select';
import { exec } from 'child_process';
import * as fs from 'fs';
import { createInterface } from 'readline';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import choices from './choices.js';
import { loading } from './utils/index.js';

// CLI interactions
const projectName = await input({ message: 'Enter the project name:' });

const projectType = await select({
  message: 'Select the project type:',
  choices,
});

// Starts installation process
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

// Sets project directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const boilerplatePath = `${__dirname}/boilerplates/${projectType}`;
const projectPath = `./${projectName}`;

// Copies the boilerplate structure, including subdirectories and files
fs.cpSync(boilerplatePath, projectPath, { recursive: true });

// Install the dependencies and finish the process
const navigateCommand = `cd ${projectName}`;
const installCommand = 'npm i';

exec(`${navigateCommand} && ${installCommand}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Command error: ${stderr}`);
    return;
  }

  clearInterval(loadingInterval);
  stream.output.write(`\rProject \x1b[33m${projectName}\x1b[0m successfully created!`);
  stream.close();
});

// FOR TESTING PURPOSES
// setTimeout(() => {
//   clearInterval(loadingInterval);
//   stream.output.write('\rProject \x1b[33mnode-tests\x1b[0m successfully created!');
//   stream.close();
// }, 3000);
