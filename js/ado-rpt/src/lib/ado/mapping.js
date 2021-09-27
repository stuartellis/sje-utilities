'use strict';

function repo(data) {
  console.log(data);
  const _fields = ['name', 'description', 'url', 'isDisabled'];
  let obj = {};

  obj.adoId = data.id;

  _fields.forEach(field => {
    obj[field] = data[field];
  });

  return obj;
}


module.exports = { repo };