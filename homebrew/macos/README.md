# Brewfile for macOS

[Homebrew](https://brew.sh) uses Brewfiles to install a list of software.

## Installing Software with a Brewfile

Run this command to install the software that is listed in the Brewfile:

    brew bundle --file ./Brewfile

> Homebrew automatically installs the [Homebrew Bundle](https://github.com/Homebrew/homebrew-bundle) extension the first time that you run a Bundle command.

## Creating a Brewfile

Run this command to generate a Brewfile from a macOS system:

    brew bundle dump
