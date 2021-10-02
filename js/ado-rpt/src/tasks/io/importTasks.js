'use strict';

const fs = require('fs').promises;

const { mapping: adoMapper } = require('../../lib/ado');

async function dataItem(task) {
  // FIXME: Handle HTTP error
  const resp = await task.client.get(task.queryUrl.toString());
  console.log(task.queryUrl);
  
  // FIXME: Handle file creation errors
  const writer = await fs.writeFile(task.filePath, JSON.stringify(resp.data));
  console.log(task.filePath);
  const dataObj = adoMapper[task.dataType](resp.data);
  await task.prisma[task.dataType].create({data: dataObj});
}

module.exports = { dataItem };
