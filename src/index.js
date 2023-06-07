#!/usr/bin/env node

import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';

import { runCLI } from './cli.js';
import { changeColor, createStream, startLoading } from './helpers.js';
import config from './config/index.js';

// CLI interactions to define project details, type and configuration
const { details, type } = await runCLI();
const { name, license } = details;
const { runTreatments, commandList } = config[type];

// Start installation process
const stream = createStream();
stream.pause(); // Prevent user input
stream.output.write('\x1B[?25l'); // Hide the cursor
stream.output.write('Copying files and installing dependencies...\n');
const loadingInterval = startLoading(stream, 'monkey', 250);

// Set project directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const boilerplatePath = `${__dirname}/boilerplates/${type}`;
const projectPath = `./${name}`;

// Copy boilerplate structure, including subdirectories and files
fs.cpSync(boilerplatePath, projectPath, { recursive: true });

// Perform treatments depending on the type of project
runTreatments(projectPath, details);

// Copy license file
if (Object.keys(details).includes('license')) {
  const licensePath = `${__dirname}/licenses/${license}`;
  fs.cpSync(licensePath, projectPath, { recursive: true });
}

// Install the dependencies and finish the process
const execCommands = commandList.exec.join(' && ');

exec(execCommands, { cwd: `./${projectPath}` }, (error, _stdout, stderr) => {
  clearInterval(loadingInterval);

  if (error) {
    stream.output.write(`Error: ${error.message}\n`);
  } else {
    if (stderr) {
      stream.output.write(`${stderr}\n`);
    }

    const startCommands = commandList.start.join('\n  ');
    stream.output.write(`Project ${changeColor(name, 'yellow')} successfully created!\n`);
    stream.output.write('You can start by typing:\n');
    stream.output.write(changeColor(`\n  cd ${name}\n  ${startCommands}\n`, 'gray'));
    stream.output.write('\nHappy coding!\n');
  }

  stream.output.write('\x1B[?25h'); // Display the cursor
  stream.close();
});

// FOR TESTING PURPOSES
// setTimeout(() => {
//   clearInterval(loadingInterval);
//   stream.output.write(`Project ${changeColor(name, 'yellow')} successfully created!\n`);
//   stream.output.write('\x1B[?25h'); // Display the cursor
//   stream.close();
// }, 3000);
