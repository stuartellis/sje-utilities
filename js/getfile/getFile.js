#!/usr/bin/env node

'use strict';

const { constants: fsConstants, createWriteStream } = require('fs');
const fs = require('fs').promises;
const https = require('https');
const path = require('path');

/**
 * Adds an element to the end of a file path.
 * @param {string} currentPath - Existing path
 * @param {string} newElement - New element
 * @return {string}
*/
function appendPath(currentPath, newElement) {
   let pathArray = (currentPath.split(path.sep))
   pathArray.push(newElement);
   return pathArray.join(path.sep);
}

/**
* @param {string} source - Source URL
* @param {string} target - File to download to
* @param {Object} logger - Logger
**/
function downloadFile(source, target, logger) {
  const writer = createWriteStream(target);

  const req = https.request(source, res => {
    logger.log(`HTTP ${res.statusCode} for ${source}`);
  
    res.on('data', d => {
        writer.write(d);
    });
  });
  
  req.on('error', error => {
    logger.error(error);
  });
  
  req.end();
}

/**
 * Ensures that directory exists.
 * @param {string} fullPath - Full path for directory
 * @param {Object} logger - Logger
 * @return {Promise}
*/
async function ensureDirectory(fullPath, logger) {
    const dirResult = await fs.mkdir(fullPath, { recursive: true });
  
    if (dirResult) {
      logger.info(`Created directory ${dirResult}`);
    } else {
      logger.warn(`Directory ${fullPath} already exists`);
    }
  
    return fullPath; 
  }

/**
 * Check whether file exists.
 * @param {string} fullPath - Full path for file
 * @param {Object} logger - Logger
 * @return {Promise}
*/
async function fileExists(fullPath, logger) {
  try {
    await fs.access(fullPath, fsConstants.R_OK);
   } catch (err) {
      if (err.code === 'ENOENT') {
        logger.warn(`${fullPath} already exists`);
      } else {
      throw err;
    }
  }
}

/**
 * Main function
**/
async function main() {
  const logger = console;
  try {
    if (process.argv && process.argv.length !== 5) {
      throw new Error(`Please specify a source URL, target directory and filename, e.g. ${path.basename(__filename)} https://example.com/myfile mydir myfile`);
    }

    const sourceUrl = process.argv[2];
    const requiredDir = process.argv[3];
    const requiredFile = process.argv[4];

    const requiredDirPath = appendPath(process.cwd(), requiredDir);
    const requiredFilePath = appendPath(requiredDirPath, requiredFile);

  await fileExists(requiredFilePath, logger);
  await ensureDirectory(requiredDirPath, logger);
  downloadFile(sourceUrl, requiredFilePath, logger);

  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}


main();
