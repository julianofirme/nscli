import { readPackageSync } from 'read-pkg';
import inquirer from 'inquirer';

function readPackageScripts() {
  const packageJson = readPackageSync();

  if (!packageJson.scripts) return;

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
    // Run selected script
    const scriptName = answers.script;
    console.log(`Running script: ${scriptName}`);
    const command = `npm run ${scriptName}`;
    require('child_process').execSync(command, { stdio: 'inherit' });
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });