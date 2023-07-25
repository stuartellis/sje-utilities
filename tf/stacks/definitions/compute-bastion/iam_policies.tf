
data "aws_iam_policy_document" "ec2_service_assume" {
  statement {
    sid     = "CustomAllowAssumeRoleEc2Service"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

# FIXME
# data "aws_iam_policy_document" "get_secrets_bastion" {
#   statement {
#     sid = "CustomAllowAccessToSecrets"

#     actions = [
#       "secretsManager:GetSecretValue",
#     ]

#     resources = "FIXME"
#   }
# }

# module "iam_policy_secrets_bastion" {
#   source  = "terraform-aws-modules/iam/aws//modules/iam-policy"
#   version = "5.2.0"

#   name = "${local.ec2_prefix}-secretaccess"

#   policy = data.aws_iam_policy_document.get_secrets_bastion.json
# }
