# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT

locals {
  ec2_prefix = "${var.product_name}-${var.environment_name}-${var.stack_name}-${var.variant}"
}
