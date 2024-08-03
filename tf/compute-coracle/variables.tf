# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT

variable "ec2_instance_config" {
  type = map(any)
}

variable "ec2_network_config" {
  type = map(any)
}
