# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT

module "iam_assumable_role_ec2_coracle" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role"
  version = "5.2.0"

  create_role             = true
  create_instance_profile = true

  role_name = "${local.ec2_prefix}-role"

  custom_role_trust_policy = data.aws_iam_policy_document.ec2_service_assume.json

  # FIXME
  # custom_role_policy_arns = [
  #   "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
  #   module.iam_policy_secrets_coracle.arn
  # ]

  # number_of_custom_role_policy_arns = 2

  custom_role_policy_arns = [
    "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
  ]

  number_of_custom_role_policy_arns = 1
}
