const fs = require('fs');
const path = require('path');
const { 0: scriptName, ...scriptArgs } = process.argv.slice(2);

const scripts = {
  newpage: './scripts/newpage.js',
  delpage: './scripts/delpage.js',
};

/** Runs the script */
require(scripts[scriptName])(__dirname, Object.values(scriptArgs));
