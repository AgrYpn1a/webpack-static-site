const fs = require('fs');
const path = require('path');

module.exports = (root, args) => {
  const { 0: pageName } = args;
  const filePath = path.join(root, '/config/pages.json');

  if (!pageName) {
    throw new Error(`Invalid argument --name, got ${pageName}`);
  }

  // Add page to pages
  const rawData = fs.readFileSync(filePath);
  let pagesConfig = JSON.parse(rawData);

  if (pagesConfig.includes(pageName)) {
    pagesConfig = pagesConfig.filter((page) => page != pageName);
    fs.writeFileSync(filePath, JSON.stringify(pagesConfig));
  }

  /** Dump to files */

  // Remove all content from page folder
  fs.rmdirSync(path.join(root, `/src/pages/${pageName}`), { recursive: true });

  // Write to entries
  const entriesPath = path.join(root, '/config/entries.json');
  const entries = JSON.parse(fs.readFileSync(entriesPath));
  delete entries[pageName];

  fs.writeFileSync(entriesPath, JSON.stringify(entries));
};
