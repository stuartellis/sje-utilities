resource "aws_s3_bucket" "shortterm" {
  bucket = var.shortterm_s3_bucket_name
}

resource "aws_s3_bucket_versioning" "shortterm" {
  bucket = aws_s3_bucket.shortterm.id
  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "shortterm" {
  bucket = aws_s3_bucket.shortterm.id
  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = var.storage_kms_key_id
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "shortterm" {
  bucket = aws_s3_bucket.shortterm.id
  rule {
    id     = "remove_expired_files"
    status = "Enabled"
    expiration {
      days = var.s3_data_retention_days
    }
  }
}

resource "aws_s3_bucket_policy" "shortterm" {
  bucket = aws_s3_bucket.shortterm.id
  policy = data.aws_policy_document.shortterm.json
}
