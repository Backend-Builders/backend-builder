import input from '@inquirer/input';
import select from '@inquirer/select';

import choices from './choices.js';

const projectName = await input({ message: 'Enter the project name:' });

const projectType = await select({
  message: 'Select the project type:',
  choices,
});

console.log(projectName, projectType);
