#!/usr/bin/env node
import { confirm, input, select } from '@inquirer/prompts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';

import boilerplates from './boilerplates/index.js';
import licenses from './licenses/index.js';

// CLI interactions
const projectName = await input({
  message: 'Enter the project name:',
  default: 'my-new-project',
});

const moreDetails = await confirm({
  message: 'Do you want to provide more details?',
  default: false,
});

let projectDetails = {};

if (moreDetails) {
  let confirmation = false;

  do {
    projectDetails = {
      version: await input({ message: 'version:', default: '1.0.0' }),
      description: await input({ message: 'description:' }),
      keywords: await input({ message: 'keywords:' }),
      author: await input({ message: 'author:' }),
      license: await select({ message: 'Choose a license:', choices: licenses }),
    };

    projectDetails.keywords = projectDetails.keywords.split(', ');
    console.log(`\n${JSON.stringify(projectDetails, null, 2)}\n`);
    confirmation = await confirm({ message: 'Is this information correct?' });
  } while (!confirmation);
}

const projectType = await select({
  message: 'Select the project type:',
  choices: boilerplates,
});

// Set project directory paths
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

if (moreDetails) {
  dataObj = { ...dataObj, ...projectDetails };
  const licensePath = `${__dirname}/licenses/${projectDetails.license}`;
  fs.cpSync(licensePath, projectPath, { recursive: true });
}

fs.writeFileSync(`${projectPath}/package.json`, `${JSON.stringify(dataObj, null, 2)}\n`);

console.log(`Project ${projectName} successfully created!`);
