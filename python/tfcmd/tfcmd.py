#!/usr/bin/env python3

# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT

"""
Command-line script for tfcmd.

This script generates TF commands.
"""

import argparse
import logging
import logging.config
import shutil
import sys
from typing import Any, TextIO

_DATE_FORMAT = "%Y-%m-%dT%H:%M:%SZ"
_DESCRIPTION = "Generates TF commands"

logger = logging.getLogger(__name__)


def setup_logging(level: str) -> None:
    """Set configuration for logging."""
    logging_config = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "human_readable": {
                "format": "%(asctime)s %(levelname)s: %(message)s",
                "datefmt": _DATE_FORMAT,
            },
        },
        "handlers": {
            "stdout": {
                "class": "logging.StreamHandler",
                "level": level,
                "formatter": "human_readable",
                "stream": "ext://sys.stdout",
            },
        },
        "loggers": {
            "root": {
                "level": level,
                "handlers": [
                    "stdout",
                ],
            },
        },
    }
    logging.config.dictConfig(config=logging_config)


def build_arg_parser() -> argparse.ArgumentParser:
    """Create argument parser."""
    return argparse.ArgumentParser(description=_DESCRIPTION)


class TfNoExeError(Exception):
    """Exception for TF executable."""

    def __init__(self: Any, message: str, errors: object) -> None:
        """Construct instance of TfNoExeError."""
        super().__init__(message)
        self.errors = errors


def tf_exe_name() -> str:
    """Get command name for TF."""
    exe: str = ""
    exe_names = ["tof", "terraform"]
    for exe_name in exe_names:
        if shutil.which(exe_name):
            exe = exe_name
    if len(exe) > 0:
        return exe
    err = f"None of these TF executables found: {', '.join(exe_names)}"
    raise TfNoExeError(err, [])


def main(argv: list[str], stdout: TextIO) -> None:
    """Run tfcmd from the command-line."""
    try:
        setup_logging("ERROR")
        parser = build_arg_parser()
        args: argparse.Namespace = parser.parse_args(argv)
        run(args, stdout)
    except Exception as e:  # noqa: BLE001
        print(e)
        sys.exit(1)
    sys.exit(0)


def run(args: argparse.Namespace, stdout: TextIO) -> None:
    """Run."""
    start_msg = f"TF executable: {tf_exe_name()}"
    logger.info(start_msg)
    print(args, file=stdout)


if __name__ == "__main__":
    main(sys.argv, sys.stdout)
