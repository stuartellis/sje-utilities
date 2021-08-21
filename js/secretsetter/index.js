#!/usr/bin/env node

const { execSync } = require('child_process');

const tagVariables = {
  'sje:resource:environment': 'Environment.Name', 
  'sje:ci:pipeline': 'Build.DefinitionName', 
  'sje:ci:buildno': 'Build.BuildNumber',
  'sje:vcs:repo': 'Build.Repository.Name', 
  'sje:vcs:branch': 'Build.SourceBranchName',
  'sje:vcs:commit': 'Build.SourceVersion'
};

if (!(process.argv[2])) {
  console.error('Specify a secret ID');
  process.exit(1);
}

if (!(process.argv[3])) {
  console.error('Specify a secret value');
  process.exit(1);
}

const secretId = process.argv[2];
const secretValue = process.argv[3];

function describeSecretCmd(secretId) {
  let cmdText = `aws secretsmanager describe-secret --secret-id ${secretId}`;
  const notExistsErrText = 'An error occurred (ResourceNotFoundException)';
  try {
    const output = execSync(cmdText);
    const resourceDescription = JSON.parse(output.toString());
    if (resourceDescription.Name === secretId) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    if (err.stderr
      && err.stderr.toString().trim().startsWith(notExistsErrText)
    ) {
      return false;
    } else {
      throw err;
    }
  }
}

function tagsFromEnv(mapping) {
  let tags = [];
  for (const [t, v] of Object.entries(mapping)) {
    let envVar = v.toUpperCase().replace(/\./g, '_');
    if (process.env[envVar]) {
      tags.push({Key: t, Value: process.env[envVar]});
    }
  }
  return tags;
}

const tags = JSON.stringify(tagsFromEnv(tagVariables));
const secretExists = describeSecretCmd(secretId);

if (secretExists) {
  execSync(`aws secretsmanager update-secret --secret-id ${secretId} --secret-string ${secretValue}`);
  execSync(`aws secretsmanager tag-resource --secret-id ${secretId} --tags '${tags}'`);
} else {
  console.log(`New secret will be created: ${secretId}`);
  execSync(`aws secretsmanager create-secret --name ${secretId} --secret-string ${secretValue} --tags '${tags}'`);
}
