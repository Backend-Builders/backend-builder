import * as fs from 'fs';
import { confirm, input, select } from '@inquirer/prompts';

import boilerplates from './boilerplates/index.js';
import licenses from './licenses/index.js';

async function runCLI() {
  const answers = {
    details: {},
    type: '',
  };

  // Prompt for project name
  const nameValidation = (string) => {
    const re = /^[a-zA-Z0-9._-]+$/;
    const contents = fs.readdirSync('./');

    if (!re.test(string)) {
      return 'You must provide a valid name.';
    }

    if (contents.includes(string)) {
      return 'A folder with this name already exists.';
    }

    return true;
  };

  answers.details.name = await input({
    message: 'Enter the project name:',
    default: 'my-new-project',
    validate: nameValidation,
  });

  // Prompt for more details of the project
  const detailsConfirmation = await confirm({
    message: 'Do you want to provide more details?',
    default: false,
  });

  if (detailsConfirmation) {
    let dataConfirmation = false;
    let moreDetails = {};

    while (!dataConfirmation) {
      moreDetails = {
        version: await input({ message: 'version:', default: '1.0.0' }),
        description: await input({ message: 'description:' }),
        keywords: await input({ message: 'keywords:' }),
        author: await input({ message: 'author:' }),
        license: await select({ message: 'Choose a license:', choices: licenses }),
      };

      moreDetails.keywords = moreDetails.keywords.split(', ');
      console.log(`\n${JSON.stringify(moreDetails, null, 2)}\n`);
      dataConfirmation = await confirm({ message: 'Is this information correct?' });
    }

    answers.details = { ...answers.details, ...moreDetails };
  }

  // Prompt for project type
  answers.type = await select({
    message: 'Select the project type:',
    choices: boilerplates,
  });

  return answers;
}

export { runCLI };
