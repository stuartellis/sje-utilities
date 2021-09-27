'use strict';

function pipeline(data) {
  const fields = ['name', 'folder', 'url', 'revision'];
  let obj = {};

  obj.adoId = data.id;

  fields.forEach(field => {
    obj[field] = data[field];
  });

  obj['configPath'] = data.configuration.path;
  obj['repositoryId'] = data.configuration.repository.id;
  obj['configType'] = data.configuration.type;

  return obj;
}

function repo(data) {
  const fields = ['name', 'description', 'url', 'isDisabled'];
  let obj = {};

  obj.adoId = data.id;

  fields.forEach(field => {
    obj[field] = data[field];
  });

  return obj;
}

module.exports = { pipeline, repo };
