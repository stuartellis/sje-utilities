#!/usr/bin/env node

//
// CloudFormation template generator
//
// By design, this uses synchronous calls. 
//
// Example: echo '{"first": "AAA", "second": "BBB"}' | node ./index.js /dev/stdin template.yml > cfn-template.yml
//

const fs = require('fs');
const Handlebars = require('./handlebars');

function buildContext(data) {
  let context = {};
  context.description = 'Generated template';
  context.items = [];
  for (const [key, value] of Object.entries(data)) {
    context.items.push({key: key.toLowerCase(), value: value});
  }
  return context;
}

function capitalize(str) {
  return str.replace(/^\w/, c => c.toUpperCase());
}

function loadData(filePath) {
  const content = fs.readFileSync(filePath);
  return JSON.parse(content);
}

function loadTemplate(filePath) {
  const content = fs.readFileSync(filePath);
  return Handlebars.compile(content.toString('utf-8'));
}

function run(dataFile, templateFile, capHelper) {
  const template = loadTemplate(templateFile);
  const data = loadData(dataFile);
  const context = buildContext(data);
  Handlebars.registerHelper('cap', capHelper);
  const output = template(context);
  console.log(output);
}

run(process.argv[2], process.argv[3], capitalize);
