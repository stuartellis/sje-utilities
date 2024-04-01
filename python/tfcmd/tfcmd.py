#!/usr/bin/env python3

# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT

"""
Command-line module for the tfcmd application.

This script generates TF commands.
"""

import logging
import logging.config
import shutil
import sys
from typing import Any, TextIO

_DATE_FORMAT = "%Y-%m-%dT%H:%M:%SZ"

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


class TfNoExeError(Exception):
    """Exception for TF executable."""

    def __init__(self: Any, message: str, errors: object) -> None:
        """Construct instance of TfNoExeError."""
        super().__init__(message)
        self.errors = errors


def tf_exe_name() -> str:
    """Get command name for TF."""
    exe: str = ""
    exe_names = ["tofu", "terraform"]
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
        setup_logging("INFO")
        print(argv, file=stdout)
        logger.info(tf_exe_name())
    except Exception as e:  # noqa: BLE001
        print(e)
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main(sys.argv, sys.stdout)
