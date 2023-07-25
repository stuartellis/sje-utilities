module "s3_bucket_incoming" {

  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "3.10.1"

  bucket        = "${local.s3_bucket_prefix}-incoming-${local.s3_bucket_suffix}"
  force_destroy = true

  control_object_ownership = true

  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true
}
