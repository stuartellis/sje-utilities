'use strict';

const fs = require('fs').promises;
const path = require('path');

const { JSONPath } = require('jsonpath-plus');

const fastq = require('fastq');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { client: adoClient, pat: adoPat } = require('./src/lib/ado');
const { timestamp: timestampFmt, url: urlFmt } = require('./src/lib/formats');

async function main() {

  // Get config

  const configJson = await fs.readFile('config.json');
  const config = JSON.parse(configJson);

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
  
  // Create ADO client

  const adoConnector = adoClient.create(adoKey);
  const { organization, project } = config.ado;
  const reposIndexUrlTmpl = config.ado.queries.repos.index;
  const reposItemUrlTmpl = config.ado.queries.repos.item;

  // Fetch index

  const reposQueryUrl = urlFmt.fromTemplate(reposIndexUrlTmpl,
    { organization, project }
  );
 
  // FIXME: Handle HTTP error
  const resp = await adoConnector.get(reposQueryUrl.toString());
  const repoNames = JSONPath('$.value[*].name', resp.data);

  const reposIndexFilePath = [baseDirPath, 'repos-index.json'].join(path.sep);
  // FIXME: Handle file creation errors
  const reposIndexFile = await fs.writeFile(reposIndexFilePath, JSON.stringify(resp.data));

  // Queue fetch of data
  
  const repoDataQueue = fastq.promise(getRepoData, 1);

  // FIXME: Add logger to task
  repoNames.forEach(repositoryId => {
    const task = {
      client: adoConnector,
      dirPath: reposDirPath,
      organization: organization, 
      project: project, 
      repositoryId: repositoryId,
      urlTemplate: reposItemUrlTmpl
    };
    repoDataQueue.push(task);
  });
}

async function getRepoData(task) {
  const queryUrl = urlFmt.fromTemplate(task.urlTemplate, {organization: task.organization, project: task.project, repositoryId: task.repositoryId});
  console.log(`Repository: ${task.repositoryId}`);

  // FIXME: Handle HTTP error
  const resp = await task.client.get(queryUrl.toString());

  // FIXME: Handle file creation errors
  const filePath = [task.dirPath, `${task.repositoryId}.json`].join(path.sep);
  const writer = await fs.writeFile(filePath, JSON.stringify(resp.data));

  // Data load

}

main().finally(async () => {
  await prisma.$disconnect();
});
