#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';

import { runCLI } from './cli.js';

// CLI interactions
const { projectName, projectDetails, projectType } = await runCLI();

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

if (Object.keys(projectDetails).length !== 0) {
  dataObj = { ...dataObj, ...projectDetails };
  const licensePath = `${__dirname}/licenses/${projectDetails.license}`;
  fs.cpSync(licensePath, projectPath, { recursive: true });
}

fs.writeFileSync(`${projectPath}/package.json`, `${JSON.stringify(dataObj, null, 2)}\n`);

console.log(`Project ${projectName} successfully created!`);
