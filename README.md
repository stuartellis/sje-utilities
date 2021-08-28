# sje-utilities

Assorted tools and experiments.

[![Stability: Experimental](https://masterminds.github.io/stability/experimental.svg)](https://masterminds.github.io/stability/experimental.html)

## Pre-commit Hooks

This repository uses [Husky](https://typicode.github.io/husky/) to provide Git hooks.

Before each commit:

- [gitleaks](https://github.com/zricethezav/gitleaks) will run on the repository.
- [lint-staged](https://github.com/okonet/lint-staged) will test commits to the *cloudformation/* directory. It runs [cfn-lint](https://github.com/aws-cloudformation/cfn-lint) on YAML files and [jsonlint](https://www.npmjs.com/package/jsonlint) on JSON files.

## Setup

First, install these tools:

- Node.js 14 or above
- AWS CLI version 2
- [cfn-lint](https://github.com/aws-cloudformation/cfn-lint).
- [gitleaks](https://github.com/zricethezav/gitleaks)

Next, run *npm install* to set up the pre-commit hooks:

    npm install
