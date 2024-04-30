import { readPackageSync } from 'read-pkg';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

function readPackageScripts() {
  const packageJson = readPackageSync();

  if (!packageJson.scripts) {
    console.log("No packages to read");
    return;
  };

  return Object.keys(packageJson.scripts);
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'script',
      message: 'Select a script to run:',
      choices: readPackageScripts(),
    },
  ])
  .then((answers) => {
    const scriptName = answers.script;
    console.log(`Running script: ${scriptName}`);
    const command = `npm run ${scriptName}`;
    execSync(command, { stdio: 'inherit' });
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });