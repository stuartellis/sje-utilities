# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT

resource "aws_iam_service_linked_role" "coracle_autoscaling" {
  aws_service_name = "autoscaling.amazonaws.com"
  description      = "Service linked role for autoscaling"
  custom_suffix    = local.ec2_prefix
}

resource "time_sleep" "coracle_iam_linked_role_creation" {
  create_duration = "20s"

  triggers = {
    service_role = aws_iam_service_linked_role.coracle_autoscaling.arn
  }
}
