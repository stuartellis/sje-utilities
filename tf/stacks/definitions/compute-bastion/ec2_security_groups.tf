resource "aws_security_group" "compute_bastion" {
  name        = "${local.ec2_prefix}-sg"
  vpc_id      = var.ec2_network_config["vpc_id"]
  description = local.ec2_prefix
}

resource "aws_security_group_rule" "compute_bastion_ingress" {
  type              = "ingress"
  security_group_id = aws_security_group.compute_bastion.id
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  description       = "HTTP access"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "compute_bastion_egress" {
  type              = "egress"
  security_group_id = aws_security_group.compute_bastion.id
  from_port         = 0
  to_port           = 0
  protocol          = -1
  description       = "Default egress"
  cidr_blocks       = ["0.0.0.0/0"]
}
