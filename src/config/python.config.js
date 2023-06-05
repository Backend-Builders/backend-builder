import * as fs from 'fs';

export default {
  runTreatments: (projectPath, projectDetails) => {
    // Change project details in setup.py file
    let data = fs.readFileSync(`${projectPath}/setup.py`, { encoding: 'utf-8' });
    const lines = data.split('\n');

    for (let key in projectDetails) {
      const index = lines.findIndex((line) => line.includes(`${key}=`));
      let newValue = '';

      if (key === 'keywords') {
        newValue = `'${projectDetails.keywords.join(', ')}'`;
      } else {
        newValue = `'${projectDetails[key]}'`;
      }

      lines[index] = lines[index].replace(/'(.*?)'/g, newValue);
    }

    data = lines.join('\n');
    fs.writeFileSync(`${projectPath}/setup.py`, data);
  },
  execCommands: [
    'python3 -m venv venv',
    '. venv/bin/activate',
    'python3 setup.py install',
  ],
  startCommands: ['. venv/bin/activate', 'python3 run.py'],
};
