import chalk from 'chalk';
import fs from 'fs';

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const resultsArr = [];
  let temp;

  while((temp = regex.exec(text)) !== null) {
    resultsArr.push({
      [temp[1]]: temp[2]
    })
  }

  return resultsArr.length === 0 ? 'No links found' : resultsArr;
}

function treatError(err) {
  throw new Error(chalk.red(err.code, ': No file in path'));
}

async function getFile(filePath) {
  const encoding = 'utf-8';

  try {
    const text = await fs.promises.readFile(filePath, encoding);
    return extractLinks(text);
  } catch(err) {
    treatError(err);
  }
}

export { getFile };