# sje-utilities

Assorted tools and experiments.

This repository uses [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to run [cfn-lint](https://github.com/aws-cloudformation/cfn-lint) on YAML files in the *cloudformation/* directory before they are committed.

## Setup

First, install the AWS CLI and [cfn-lint](https://github.com/aws-cloudformation/cfn-lint).

Run *npm install* to set up the pre-commit hooks:

    npm install

