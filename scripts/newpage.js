const fs = require('fs');
const path = require('path');
const createHTML = require('create-html');

module.exports = (root, args) => {
  const { 0: pageName } = args;
  const pagesPath = path.join(root, 'config/pages.json');

  if (!pageName) {
    throw new Error(`Invalid argument --name, got ${pageName}`);
  }

  // Add page to pages
  const rawData = fs.readFileSync(pagesPath);
  const pagesConfig = JSON.parse(rawData);

  pagesConfig.push(pageName);

  // Create page & page entry
  const html = createHTML({
    title: pageName,
    script: `${pageName}`.js,
    lang: 'en',
    head:
      '<meta charset="UTF-8" />' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no" />',
    body: `<h1 id=${pageName}>${pageName}</h1>\n`,
  });

  // Save html to disk
  fs.mkdirSync(path.join(root, `/src/pages/${pageName}`), { recursive: true });

  // Create scss
  const scss = `#${pageName} { color: red; }`;
  fs.mkdirSync(path.join(root, `/src/pages/${pageName}/styles`), {
    recursive: true,
  });

  // Crete entry point
  const js = `import './${pageName}.html'\nimport './styles/${pageName}.scss'`;

  /** Dump to files */

  // Write pages config
  fs.writeFileSync(pagesPath, JSON.stringify(pagesConfig));

  // Write new html page
  fs.writeFileSync(
    path.join(root, `/src/pages/${pageName}/${pageName}.html`),
    html
  );

  // Write new scss file
  fs.writeFileSync(
    path.join(root, `/src/pages/${pageName}/styles/${pageName}.scss`),
    scss
  );

  // Write new js file
  fs.writeFileSync(
    path.join(root, `/src/pages/${pageName}/${pageName}.js`),
    js
  );

  // Write to entries
  const entriesPath = path.join(root, '/config/entries.json');
  const entries = JSON.parse(fs.readFileSync(entriesPath));
  entries[pageName] = `/src/pages/${pageName}/${pageName}.js`;

  fs.writeFileSync(entriesPath, JSON.stringify(entries));
};
