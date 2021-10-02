'use strict';

const fs = require('fs').promises;

async function createRequiredDirs(requiredDirs) {
  for (const dirPath of requiredDirs) {
    try {
      await fs.mkdir(dirPath);
      console.log(`Created: ${dirPath}`);
    } catch (err) {
      if (err.code === 'EEXIST') {
        console.log(`Skipping directory creation: ${dirPath}`);
      } else {
        console.error(err.toString());
        throw err;
      }
    }
  }    
}

module.exports = { createRequiredDirs }; 
