import fetch from 'node-fetch'

function handleErrors(err) {
  throw new Error(err.message);
}

async function checkStatus(urlsArr) {
  try {
    const statusArr = await Promise.all(urlsArr.map(async url => {
      const res = await fetch(url);
      return `${res.status} - ${res.statusText}`
    }))
  
    return statusArr;
  } catch(err) {
    handleErrors(err);
  }
}

function generateURLsArr(linksListArr) {
  return linksListArr.map(linkObject => Object.values(linkObject).join())
}

async function validateURLs(linksListArr) {
  const links = generateURLsArr(linksListArr);
  const statusLinks = await checkStatus(links);

  const results = linksListArr.map((obj, index) => ({
    ...obj,
    status: statusLinks[index]
  }))

  return results;
}

export { validateURLs };