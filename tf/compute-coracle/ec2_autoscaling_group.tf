# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT

module "coracle_autoscaling_group" {
  source  = "terraform-aws-modules/autoscaling/aws"
  version = "7.7.0"

  name = "${local.ec2_prefix}-asg"

  min_size                  = 1
  max_size                  = 1
  desired_capacity          = 1
  wait_for_capacity_timeout = 0
  health_check_type         = "EC2"

  instance_type            = var.ec2_instance_config["instance_type"]
  iam_instance_profile_arn = module.iam_assumable_role_ec2_coracle.iam_instance_profile_arn

  security_groups = [
    aws_security_group.compute_coracle.id,
  ]

  service_linked_role_arn = time_sleep.coracle_iam_linked_role_creation.triggers["service_role"]

  vpc_zone_identifier = [var.ec2_network_config["subnet_id"]]
  image_id            = var.ec2_instance_config["image_id"]

  user_data = data.cloudinit_config.ec2_coracle_ubuntu.rendered

  enable_monitoring = true

  block_device_mappings = [
    {
      device_name = "/dev/sda1"
      ebs = {
        delete_on_termination = var.ec2_instance_config["ebs_delete_on_termination"]
        volume_size           = var.ec2_instance_config["ebs_volume_size"]
        volume_type           = "gp3"
      }
    }
  ]

  metadata_options = {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 1
  }
}
