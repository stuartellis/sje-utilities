'use strict';

const fs = require('fs').promises;
const path = require('path');

const { JSONPath } = require('jsonpath-plus');

const fastq = require('fastq');

const { client: adoClient, mapping: adoMapper, pat: adoPat } = require('./src/lib/ado');
const { timestamp: timestampFmt, url: urlFmt } = require('./src/lib/formats');

require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main(dataType) {

  // Get config

  const configJson = await fs.readFile('config.json');
  const config = JSON.parse(configJson);

  const itemIdentifier = config.ado.queries[dataType].identifier;
  const itemIndexUrlTmpl = config.ado.queries[dataType].index;
  const itemDetailUrlTmpl = config.ado.queries[dataType].item;

  // Get PAT
  // FIXME: Handle case where env var is missing

  const userToken = process.env['AZURE_DEVOPS_EXT_PAT'];
  const adoKey = adoPat.encode(userToken);

  // Create base directory
  // FIXME: Handle directory creation error

  const dt = new Date();
  const timestamp = timestampFmt.asString(dt);
  const baseDirPath = ['.', 'data', timestamp].join(path.sep);
  await fs.mkdir(baseDirPath, { recursive: true });
  console.log(`Directory: ${baseDirPath}`);

  const itemsDirPath = [baseDirPath, dataType].join(path.sep);
  try {
    await fs.mkdir(itemsDirPath);
  } catch(err) {
    if (err.code === 'EEXIST') {
      console.log(`Skipping directory creation: ${itemsDirPath}`);
    } else {
      throw err;
    }
  }
  
  // Create ADO client

  const adoConnector = adoClient.create(adoKey);
  const { organization, project } = config.ado;

  // Fetch index

  const indexQueryUrl = urlFmt.fromTemplate(itemIndexUrlTmpl,
    { organization, project }
  );
 
  // FIXME: Handle HTTP error
  const resp = await adoConnector.get(indexQueryUrl.toString());
  const itemNames = JSONPath('$.value[*].name', resp.data);

  const indexFilePath = [baseDirPath, `${dataType}-index.json`].join(path.sep);
  // FIXME: Handle file creation errors
  const indexFile = await fs.writeFile(indexFilePath, JSON.stringify(resp.data));

  const dataImportQueue = fastq.promise(importDataItem, 1);

  // FIXME: Add logger to task
  itemNames.forEach(itemId => {

    const urlQueryObj = {organization: organization, project: project};
    urlQueryObj[itemIdentifier] = itemId;
    const queryUrl = urlFmt.fromTemplate(itemDetailUrlTmpl, urlQueryObj);
    const filePath = [itemsDirPath, `${itemId}.json`].join(path.sep);
    console.log(`Item: ${itemId}`);

    const task = {
      client: adoConnector,
      dataType: dataType,
      filePath: filePath,
      queryUrl: queryUrl
    };
    dataImportQueue.push(task);
  });
}

async function importDataItem(task) {
  // FIXME: Handle HTTP error
  const resp = await task.client.get(task.queryUrl.toString());
  console.log(task.queryUrl);

  // FIXME: Handle file creation errors
  const writer = await fs.writeFile(task.filePath, JSON.stringify(resp.data));
  console.log(task.filePath);
  const dataObj = adoMapper[task.dataType](resp.data);
  await prisma[task.dataType].create({data: dataObj});
}

main('repo').finally(async () => {
  await prisma.$disconnect();
});
