import * as fs from 'fs';

export default {
  runTreatments: (path, details) => {
    // Change project details in package.json file
    const data = fs.readFileSync(`${path}/package.json`, { encoding: 'utf8' });
    const dataObj = { ...JSON.parse(data), ...details };
    fs.writeFileSync(`${path}/package.json`, `${JSON.stringify(dataObj, null, 2)}\n`);
  },
  commandList: {
    exec: ['npm install'],
    start: ['npm run dev'],
  },
};
