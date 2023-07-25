data "cloudinit_config" "ec2_bastion_ubuntu" {
  gzip          = true
  base64_encode = true

  part {
    content_type = "text/cloud-config"
    content = templatefile("${path.module}/templates/ec2-bastion-ubuntu.cc.yml", {
      automation_username : "ansible"
    })
  }
}
