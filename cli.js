#!/usr/bin/env node

import chalk from "chalk";
import { getFile } from "./index.js";
import { validateURLs } from "./httpValidation.js";

const path = process.argv;

async function processText(filePath) {
  const result = await getFile(filePath[2]);

  console.log(chalk.yellow('Checked links: '), await validateURLs(result));
}

processText(path);