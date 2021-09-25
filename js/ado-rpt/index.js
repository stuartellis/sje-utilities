'use strict';

const fs = require('fs').promises;
const path = require('path');
const URI = require('urijs');
const URITemplate = require('urijs/src/URITemplate');

const { client: adoClient, pat: adoPat, response: adoResponse } = require('./src/ado');
const { timestamp } = require('./src/formats');

async function main() {

  // Get config
  const configJson = await fs.readFile('config.json');
  const config = JSON.parse(configJson);

  // Get PAT
  const userToken = process.env['AZURE_DEVOPS_EXT_PAT'];
  const adoKey = adoPat.encode(userToken);

  // Define timestamp
  const dt = new Date();
  const timeStamp = timestamp.asString(dt);
  const exportsPath = ['.', 'data', timeStamp].join(path.sep);

  // Create directory
  const exportsBaseDir = await fs.mkdir(exportsPath, { recursive: true });

  // Create ADO client
  const client = adoClient.create(adoKey);

  // Download repo data
  const reposQueryUrl = URI.expand(config.ado.queries.repos.list, {
    organization: config.ado.organization,
    project: config.ado.project
  });
  const reposDataPath = [exportsPath, 'repos'].join(path.sep);
  
  // Error if directory already exists
  const reposDataDir = await fs.mkdir(reposDataPath);
  
  const resp = await client.get(reposQueryUrl.toString());
  const reposFilePath = [reposDataPath, 'repos.json'].join(path.sep);
  const reposFile = await fs.writeFile(reposFilePath, JSON.stringify(resp.data));
  //console.log(adoResponse.parse(resp.data));
}

main();






