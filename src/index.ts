import { readPackageSync } from 'read-pkg';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

function readPackageScripts() {
  try {
    const packageJson = readPackageSync();

    if (!packageJson) {
      console.log("No package.json found");
      process.exit(1);
    };

    if (!packageJson.scripts) {
      console.log("No scripts to read");
      process.exit(1);
    };

    return Object.keys(packageJson.scripts);
  } catch (error) {
    console.error("Error occurred while reading package.json:", error);
    process.exit(1);
  }
}

function handleScriptExecution(scriptName: string) {
  console.log(`Running script: ${scriptName}`);
  const command = `npm run ${scriptName}`;
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error occurred while running script ${scriptName}:`, error);
  }
}

function handleExit() {
  console.log("\n\nEsc key pressed. Exiting...");
  process.exit(0);
}

function main() {
  const scripts = readPackageScripts();

  if (scripts.length === 0) {
    console.log("No scripts found in package.json. Exiting...");
    process.exit(1);
  }

  process.stdin.on("keypress", (ch, key) => {
    if (key && key.name === "escape") {
      handleExit();
    }
  });

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'script',
        message: 'Select a script to run:',
        choices: scripts,
      },
    ])
    .then((answers) => {
      const scriptName = answers.script;
      handleScriptExecution(scriptName);
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
}

main();