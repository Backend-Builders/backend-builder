#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import * as fs from 'fs';
import { createInterface } from 'readline';

import { runCLI } from './cli.js';
import { loading } from './utils/index.js';

// CLI interactions
const { projectName, projectDetails, projectType } = await runCLI();

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

// Copy boilerplate structure, including subdirectories and files
fs.cpSync(boilerplatePath, projectPath, { recursive: true });

// Change project details in the package.json and copy license file
const data = fs.readFileSync(`${projectPath}/package.json`, { encoding: 'utf8' });
let dataObj = JSON.parse(data);
dataObj.name = projectName;

if (Object.keys(projectDetails).length !== 0) {
  dataObj = { ...dataObj, ...projectDetails };
  const licensePath = `${__dirname}/licenses/${projectDetails.license}`;
  fs.cpSync(licensePath, projectPath, { recursive: true });
}

fs.writeFileSync(`${projectPath}/package.json`, `${JSON.stringify(dataObj, null, 2)}\n`);

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
