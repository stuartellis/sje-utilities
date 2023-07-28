#!/usr/bin/env python3

import logging
import time

import boto3
import botocore


AWS_REGION="eu-west-2"

S3_BUCKET_NAME="333594256635-sel-longterm-0010"

TARGET_KEYS = [
  "a1/aac.txt", "edk2.git-ovmf-x64-0-20220719.209.gf0064ac3af.EOL.no.nore.updates.noarch.rpm",
]


def is_delete_marker(version):
    try:
        version.head()
        return False
    except botocore.exceptions.ClientError as e:
        if 'x-amz-delete-marker' in e.response['ResponseMetadata']['HTTPHeaders']:
            return True
        # an older version of the key but not a DeleteMarker
        elif '404' == e.response['Error']['Code']:
            return False

def get_stdout_logger():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    formatter = logging.Formatter(
        fmt="{asctime} {levelname} {name} - {message}", style="{",
		     datefmt="%Y-%m-%d %H:%M:%S%z"
    )
    formatter.converter = time.gmtime

    handler = logging.StreamHandler()
    handler.setFormatter(formatter)
    logger.addHandler(handler)

    return logger

def get_versions(bucket, key):
    live_versions = []
    deleted_versions = []
    versions = bucket.object_versions.filter(Prefix=key)
    for version in versions:
        if is_delete_marker(version):
            deleted_versions.append(version)
        else:
            live_versions.append(version)
    return {"live": live_versions, "deleted": deleted_versions}

def list_objects(versions):
    for version in versions:
       logger.info(f"List {version}")

def purge_keys(bucket, object_keys, logger):
    logger.info(f"Starting purge for {len(object_keys)} keys in {bucket.name}")
    logger.info(f"Get all versions for selected keys in {bucket.name}")
    for name in object_keys:
        current_versions = get_versions(bucket, name)

        if len(current_versions["live"]) > 0:
            logger.info(f"{name} - Deleting - live objects")
            for version in current_versions["live"]:
                logger.info(f"{name} - Delete version: {version.id}")
                version.delete()
        else:
            logger.info(f"{name} - No live objects found with this name")

        if len(current_versions["deleted"]) > 0:
            logger.info(f"{name} - Removal - delete markers")
            for version in current_versions["deleted"]:
                logger.info(f"{name} - Delete: {version.id}")
                version.delete()
        else:
            logger.info(f"{name} - No delete markers found for this name")

    logger.info("Post-purge check")
    for name in object_keys:

        logger.info(f"Post-purge - Checking live objects for {name}")
        remaining_versions = get_versions(bucket, name)

        if len(current_versions["live"]) == 0:
            logger.info(f"No live objects remaining for {name}")
        else:
            for version in remaining_versions["live"]:
                logger.warning(f"{name} - Live object version {version.id} still exists")

        logger.info(f"Post-purge - Checking delete markers for {name}")
        if len(current_versions["deleted"]) == 0:
            logger.info(f"{name} - No delete markers present")
        else:
            for version in remaining_versions["deleted"]:
                logger.warning(f"{name} - Delete marker {version.id} still exists")

if __name__ == "__main__":
    logger = get_stdout_logger()
    s3 = boto3.resource("s3")
    target_bucket = s3.Bucket(S3_BUCKET_NAME)
    purge_keys(target_bucket, TARGET_KEYS, logger)
