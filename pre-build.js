const path = require('path');
const fs = require('fs');
const appVersion = require('./package.json').version;
const appDeps = JSON.stringify(require('./package.json').dependencies);

const versionFilePath = path.join(__dirname + '/src/environments/version.ts');

const src = `export const version = '${appVersion}';\nexport const buildTime = '${new Date()}';\nexport const deps = ${appDeps};`;

// ensure version module pulls value from package.json
fs.writeFileSync(versionFilePath, src, (err) => {
  if (err) {
    console.log(err);
  }
});
