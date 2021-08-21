# sje-utilities

Assorted tools and experiments.

[![Stability: Experimental](https://masterminds.github.io/stability/experimental.svg)](https://masterminds.github.io/stability/experimental.html)

## Pre-commit Hooks

This repository uses [Husky](https://typicode.github.io/husky/) to provide pre-commit hooks.

If [gitleaks](https://github.com/zricethezav/gitleaks) is installed, it will run on the repository before the commit is completed.

[lint-staged](https://github.com/okonet/lint-staged) will run [cfn-lint](https://github.com/aws-cloudformation/cfn-lint) on YAML files in the *cloudformation/* directory before they are committed.

## Setup

First, install these tools:

- Node.js 14 or above
- AWS CLI version 2
- [cfn-lint](https://github.com/aws-cloudformation/cfn-lint).
- [gitleaks](https://github.com/zricethezav/gitleaks)

Next, run *npm install* to set up the pre-commit hooks:

    npm install
