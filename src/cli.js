import * as fs from 'fs';
import { confirm, input, select } from '@inquirer/prompts';

import boilerplates from './boilerplates/index.js';
import licenses from './licenses/index.js';

async function runCLI() {
  let projectName = '';
  let isTaken = false;
  let projectDetails = {};

  do {
    projectName = await input({
      message: 'Enter the project name:',
      default: 'my-new-project',
    });

    const contents = fs.readdirSync('./');
    isTaken = contents.includes(projectName);

    if (isTaken) {
      console.log('A folder with that name already exists.');
    }
  } while (isTaken);

  const detailsConfirmation = await confirm({
    message: 'Do you want to provide more details?',
    default: false,
  });

  if (detailsConfirmation) {
    let dataConfirmation = false;

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
      dataConfirmation = await confirm({ message: 'Is this information correct?' });
    } while (!dataConfirmation);
  }

  const projectType = await select({
    message: 'Select the project type:',
    choices: boilerplates,
  });

  return { projectName, projectDetails, projectType };
}

export { runCLI };
