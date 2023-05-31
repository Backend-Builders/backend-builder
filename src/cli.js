import * as fs from 'fs';
import { confirm, input, select } from '@inquirer/prompts';

import boilerplates from './boilerplates/index.js';
import licenses from './licenses/index.js';

async function runCLI() {
  // Prompt for project name
  const nameValidation = (str) => {
    const re = /^[a-zA-Z0-9._-]+$/;
    const contents = fs.readdirSync('./');

    if (!re.test(str)) {
      return 'You must provide a valid name.';
    }

    if (contents.includes(str)) {
      return 'A folder with this name already exists.';
    }

    return true;
  };

  const name = await input({
    message: 'Enter the project name:',
    default: 'my-new-project',
    validate: nameValidation,
  });

  // Prompt for project details
  let details = {};

  const detailsConfirmation = await confirm({
    message: 'Do you want to provide more details?',
    default: false,
  });

  if (detailsConfirmation) {
    let dataConfirmation = false;

    while (!dataConfirmation) {
      details = {
        version: await input({ message: 'version:', default: '1.0.0' }),
        description: await input({ message: 'description:' }),
        keywords: await input({ message: 'keywords:' }),
        author: await input({ message: 'author:' }),
        license: await select({ message: 'Choose a license:', choices: licenses }),
      };

      details.keywords = details.keywords.split(', ');
      console.log(`\n${JSON.stringify(details, null, 2)}\n`);
      dataConfirmation = await confirm({ message: 'Is this information correct?' });
    }
  }

  // Prompt for project type
  const type = await select({
    message: 'Select the project type:',
    choices: boilerplates,
  });

  return [name, details, type];
}

export { runCLI };
