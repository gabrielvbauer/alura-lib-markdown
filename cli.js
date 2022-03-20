#!/usr/bin/env node

import chalk from "chalk";
import { getFile } from "./index.js";
import { validateURLs } from "./httpValidation.js";

const path = process.argv;

async function processText(filePath) {
  const result = await getFile(filePath[2]);

  if (path[3] === 'validate') {
    console.log(chalk.yellow('Valid links: '), await validateURLs(result));
  } else {
    console.log(chalk.yellow('Links list: '), result);
  }
}

processText(path);