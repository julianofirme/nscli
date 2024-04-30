#!/usr/bin/env node

import { readPackageSync } from 'read-pkg';
import fs from 'fs';
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

    return { scripts: Object.keys(packageJson.scripts), packageManager: detectPackageManager() };
  } catch (error) {
    console.error("Error occurred while reading package.json:", error);
    process.exit(1);
  }
}

function detectPackageManager() {
  if (fs.existsSync('yarn.lock')) {
    return 'yarn';
  } else if (fs.existsSync('pnpm-lock.yaml')) {
    return 'pnpm';
  } else if (fs.existsSync('rush.json')) {
    return 'rush';
  } else {
    return 'npm';
  }
}

function handleScriptExecution(scriptName: string, packageManager: string) {
  console.log(`Running script: ${scriptName}`);
  const command = `${packageManager} run ${scriptName}`;
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
  const { scripts, packageManager } = readPackageScripts();

  if (scripts.length === 0) {
    console.log("No scripts found in package.json. Exiting...");
    process.exit(1);
  }

  process.stdin.on("keypress", (ch, key) => {
    if (key && key.name === "escape") {
      handleExit();
    }
  });

  process.on('SIGINT', () => {
    console.log('\n\nScript interrupted by user. Exiting...');
    process.exit(0);
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
      handleScriptExecution(scriptName, packageManager);
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
}

main();
