# SPDX-FileCopyrightText: 2024-present Stuart Ellis <stuart@stuartellis.name>
#
# SPDX-License-Identifier: MIT

data "cloudinit_config" "ec2_coracle_ubuntu" {
  gzip          = true
  base64_encode = true

  part {
    content_type = "text/cloud-config"
    content = templatefile("${path.module}/templates/ec2-coracle-ubuntu.cc.yml", {
      automation_username : "ansible"
    })
  }
}
