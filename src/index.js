#!/usr/bin/env node
import input from '@inquirer/input';
import select from '@inquirer/select';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';

import choices from './choices.js';

// CLI interactions
const projectName = await input({ message: 'Enter the project name:' });

const projectType = await select({
  message: 'Select the project type:',
  choices,
});

// Set project directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const boilerplatePath = `${__dirname}/boilerplates/${projectType}`;
const projectPath = `./${projectName}`;

// Copy boilerplate structure, including subdirectories and files
fs.cpSync(boilerplatePath, projectPath, { recursive: true });

// Change project name in the package.json file
const data = fs.readFileSync(`./${projectPath}/package.json`, { encoding: 'utf8' });
const newDataObj = JSON.parse(data);
newDataObj.name = projectName;
fs.writeFileSync(`./${projectPath}/package.json`, JSON.stringify(newDataObj, null, 2));

console.log(`Project ${projectName} successfully created!`);
