# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT

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
# data "aws_iam_policy_document" "get_secrets_coracle" {
#   statement {
#     sid = "CustomAllowAccessToSecrets"

#     actions = [
#       "secretsManager:GetSecretValue",
#     ]

#     resources = "FIXME"
#   }
# }

# module "iam_policy_secrets_coracle" {
#   source  = "terraform-aws-modules/iam/aws//modules/iam-policy"
#   version = "5.2.0"

#   name = "${local.ec2_prefix}-secretaccess"

#   policy = data.aws_iam_policy_document.get_secrets_coracle.json
# }
