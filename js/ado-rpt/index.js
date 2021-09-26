'use strict';

const fs = require('fs').promises;
const path = require('path');

const { JSONPath } = require('jsonpath-plus');

const URI = require('urijs');
const URITemplate = require('urijs/src/URITemplate');

const fastq = require('fastq');

const { client: adoClient, pat: adoPat } = require('./src/ado');
const { timestamp: timestampFmt } = require('./src/formats');

async function main() {

  // Get config
  const configJson = await fs.readFile('config.json');
  const config = JSON.parse(configJson);

  // Get PAT
  const userToken = process.env['AZURE_DEVOPS_EXT_PAT'];
  const adoKey = adoPat.encode(userToken);

  // Create base directory
  const dt = new Date();
  const timestamp = timestampFmt.asString(dt);
  const baseDirPath = ['.', 'data', timestamp].join(path.sep);
  await fs.mkdir(baseDirPath, { recursive: true });
  console.log(`Directory: ${baseDirPath}`);

  // Create ADO client
  const client = adoClient.create(adoKey);

  const reposQueryUrl = adoUrl(config.ado.queries.repos.index,
    config.ado.organization,
    config.ado.project
  );
 
  const resp = await get(client, reposQueryUrl.toString());
  const repoNames = JSONPath('$.value[*].name', resp.data);
  console.log(repoNames);

  const reposDirPath = [baseDirPath, 'repos'].join(path.sep);
  try {
    await fs.mkdir(reposDirPath);
  } catch(err) {
    if (err.code === 'EEXIST') {
      console.log(`Skipping directory creation: ${reposDirPath}`);
    } else {
      throw err;
    }
  }
  
  const reposIndexFilePath = [reposDirPath, 'repos.json'].join(path.sep);
  const reposIndexFile = await fs.writeFile(reposIndexFilePath, JSON.stringify(resp.data));
}

function adoUrl(urlTemplate, organization, project) {
  return URI.expand(urlTemplate, {organization, project});
}

async function get(client, url) {
  return client.get(url);
}

async function getRepoData(repoName) {
  console.log(repoName);
}

main();






