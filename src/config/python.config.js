import * as fs from 'fs';

export default {
  runTreatments: (path, details) => {
    // Change project details in setup.py file
    const data = fs.readFileSync(`${path}/setup.py`, { encoding: 'utf-8' });
    const lines = data.split('\n');

    for (let key in details) {
      const index = lines.findIndex((line) => line.includes(`${key}=`));
      let newValue = '';

      if (key === 'keywords') {
        newValue = `'${details.keywords.join(', ')}'`;
      } else {
        newValue = `'${details[key]}'`;
      }

      lines[index] = lines[index].replace(/'(.*?)'/g, newValue);
    }

    fs.writeFileSync(`${path}/setup.py`, lines.join('\n'));
  },
  commandList: {
    exec: ['python3 -m venv venv', '. venv/bin/activate', 'python3 setup.py install'],
    start: ['. venv/bin/activate', 'python3 run.py'],
  },
};
