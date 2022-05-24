# sje-utilities

Assorted tools and experiments.

[![Stability: Experimental](https://masterminds.github.io/stability/experimental.svg)](https://masterminds.github.io/stability/experimental.html)

## Pre-commit Hooks

This repository uses [Pre-commit](https://www.pre-commit.com) to provide Git hooks.

## Setup

First, install these tools:

- [Pre-commit](https://www.pre-commit.com)
- AWS CLI version 2
- [cfn-lint](https://github.com/aws-cloudformation/cfn-lint).

Next, run *pre-commit install* to set up the pre-commit hooks:

    pre-commit install

### Installing Ansible

Install Ansible and [Ansible Lint](https://ansible-lint.readthedocs.io/):

    pip3 --user pipx
    pipx install ansible-core
    pipx install ansible-lint
    pipx inject ansible-lint ansible-core yamllint

Install AWS support:

    pipx inject ansible-core boto3
    ansible-galaxy collection install amazon.aws

Install Azure support:

    ansible-galaxy collection install azure.azcollection
    pipx runpip ansible-core install -r ~/.ansible/collections/ansible_collections/azure/azcollection/requirements-azure.txt

Install Windows support:

    ansible-galaxy collection install ansible.windows
    ansible-galaxy collection install chocolatey.chocolatey
    pipx inject ansible-core pywinrm

Install Linux support:

    ansible-galaxy collection install jnv.unattended-upgrades
