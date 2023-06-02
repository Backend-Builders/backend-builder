import * as fs from 'fs';

export default {
  runTreatments: (projectName, projectDetails) => {
    const data = fs.readFileSync(`${projectName}/package.json`, { encoding: 'utf8' });
    let dataObj = JSON.parse(data);
    dataObj.name = projectName;

    if (Object.keys(projectDetails).length !== 0) {
      dataObj = { ...dataObj, ...projectDetails };
    }

    fs.writeFileSync(
      `${projectName}/package.json`,
      `${JSON.stringify(dataObj, null, 2)}\n`
    );
  },
  commandList: ['npm install'],
};
