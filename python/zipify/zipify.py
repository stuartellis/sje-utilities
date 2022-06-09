#!/usr/bin/env python3

"""
Zipify creates a ZIP archive for the specified directory.
"""

import argparse
import logging
import os
import time
from datetime import datetime, timezone
from pathlib import Path
from zipfile import ZipFile

# Functions


def archive_name(prefix, timestamp, extension):
    return f"{prefix}-{timestamp}.{extension}"


def cli_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("source", help="Source directory", type=str)
    parser.add_argument("target", help="Target directory", type=str)
    return parser.parse_args()


def create_archive(src_dir, path):
    with ZipFile(path, "w") as zip:
        for path, directories, files in os.walk(src_dir):
            for file in files:
                file_name = os.path.join(path, file)
                zip.write(file_name)


def get_log_handler(file=""):
    handler = logging.FileHandler(file) if file else logging.StreamHandler()
    formatter = logging.Formatter(
        fmt="%(asctime)s.%(msecs)03d %(levelname)s %(name)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    formatter.converter = time.gmtime
    handler.setFormatter(formatter)
    return handler


def get_logger(level, handler):
    logger = logging.getLogger()
    logger.addHandler(handler)
    logger.setLevel(level)
    return logger


def short_timestamp(dt):
    iso_date = dt.strftime("%Y%m%dT%H%M%SZ")
    return iso_date


def main():
    utc_dt = datetime.now(timezone.utc)
    timestamp = short_timestamp(utc_dt)
    handler = get_log_handler(f"zipify-{timestamp}.log")
    logger = get_logger(logging.INFO, handler)
    logger.info(f"Set the timestamp: {timestamp}")
    args = cli_args()
    source_path = Path(args.source)
    target_path = Path(args.target)
    file_name = archive_name(source_path.name, timestamp, "zip")
    archive_path = target_path.joinpath(file_name)
    logger.info(f"Create ZIP for {args.source}: {archive_path}")
    create_archive(args.source, archive_path)


# Main


if __name__ == "__main__":
    main()

# Tests


def test_archive_name_matches_format():
    prefix = "adirectory"
    timestamp = "20220501T010101Z"
    expected_name = f"{prefix}-{timestamp}.zip"
    actual_name = archive_name(prefix, timestamp, "zip")
    assert actual_name == expected_name


def test_short_timestamp_matches_format():
    dt = datetime(2022, 5, 1, 1, 1, 1, tzinfo=timezone.utc)
    expected_timestamp = "20220501T010101Z"
    actual_timestamp = short_timestamp(dt)
    assert actual_timestamp == expected_timestamp
