# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT
#
# Configuration for the just task runner
#
# See https://just.systems

mod containers
mod pre-commit
mod project

alias bootstrap := setup

# List available recipes
help:
    @just --unstable --list

# Delete generated files
clean:
    @just --unstable project::clean
    @just --unstable containers::clean

# Format code
fmt:
    @just --unstable pre-commit::run ruff-format

# Run all checks
lint:
    @just --unstable pre-commit::check

# Set up environment for development
setup:
    @just --unstable pre-commit::setup

# Run tests for project
test:
    @just --unstable lint
