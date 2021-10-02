'use strict';

const fs = require('fs').promises;
const path = require('path');

const { client: adoClient, pat: adoPat } = require('./src/lib/ado');
const { timestamp: timestampFmt, url: urlFmt } = require('./src/lib/formats');
const { dirTasks, importTasks } = require('./src/tasks/io');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();

const { JSONPath } = require('jsonpath-plus');
const fastq = require('fastq');

main('pipeline').finally(async () => {
  await prisma.$disconnect();
});

async function main(dataType) {
  // Get config
  const configJson = await fs.readFile('mappings.json');
  const config = JSON.parse(configJson);

  const itemIdentifier = config.ado.queries[dataType].identifier;
  const itemIndexUrlTmpl = config.ado.queries[dataType].index;
  const itemDetailUrlTmpl = config.ado.queries[dataType].item;

  // Get PAT
  const userToken = process.env['AZURE_DEVOPS_EXT_PAT'];
  const adoKey = adoPat.encode(userToken);

  const dt = new Date();
  const timestamp = timestampFmt.asString(dt);

  const baseDirPath = ['.', 'data'].join(path.sep);
  const taskDirPath = [baseDirPath, timestamp].join(path.sep);
  const itemsDirPath = [taskDirPath, dataType].join(path.sep);
  const requiredDirs = [baseDirPath, taskDirPath, itemsDirPath];
  
  dirTasks.createRequiredDirs(requiredDirs);

  // Create ADO client

  const adoConnector = adoClient.create(adoKey);
  const organization = process.env['AZURE_DEVOPS_ORGANIZATION']; 
  const project = process.env['AZURE_DEVOPS_PROJECT'];

  // Fetch index

  const indexQueryUrl = urlFmt.fromTemplate(itemIndexUrlTmpl,
    { organization, project }
  );

  // FIXME: Handle HTTP error
  const resp = await adoConnector.get(indexQueryUrl.toString());
  const itemIds = JSONPath('$.value[*].id', resp.data);

  const indexFilePath = [baseDirPath, `${dataType}-index.json`].join(path.sep);
  // FIXME: Handle file creation errors
  const indexFile = await fs.writeFile(indexFilePath, JSON.stringify(resp.data));

  const dataImportQueue = fastq.promise(importTasks.dataItem, 1);

  // FIXME: Add logger to task
  itemIds.forEach(itemId => {

    const urlQueryObj = {organization: organization, project: project};
    urlQueryObj[itemIdentifier] = itemId;
    const queryUrl = urlFmt.fromTemplate(itemDetailUrlTmpl, urlQueryObj);
    const filePath = [itemsDirPath, `${itemId}.json`].join(path.sep);
    console.log(`Item: ${itemId}`);

    const task = {
      client: adoConnector,
      dataType: dataType,
      filePath: filePath,
      prisma: prisma,
      queryUrl: queryUrl
    };
    dataImportQueue.push(task);
  });

}
