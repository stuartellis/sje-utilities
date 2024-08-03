# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT

resource "aws_security_group" "compute_coracle" {
  name        = "${local.ec2_prefix}-sg"
  vpc_id      = var.ec2_network_config["vpc_id"]
  description = local.ec2_prefix
}

resource "aws_security_group_rule" "compute_coracle_egress" {
  type              = "egress"
  security_group_id = aws_security_group.compute_coracle.id
  from_port         = 0
  to_port           = 0
  protocol          = -1
  description       = "Default egress"
  cidr_blocks       = ["0.0.0.0/0"]
}
