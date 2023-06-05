import * as fs from 'fs';

export default {
  runTreatments: (projectPath, projectDetails) => {
    // Change project details in package.json file
    const data = fs.readFileSync(`${projectPath}/package.json`, { encoding: 'utf8' });
    let dataObj = JSON.parse(data);
    dataObj = { ...dataObj, ...projectDetails };
    fs.writeFileSync(
      `${projectPath}/package.json`,
      `${JSON.stringify(dataObj, null, 2)}\n`
    );
  },
  commandList: ['npm install'],
};
