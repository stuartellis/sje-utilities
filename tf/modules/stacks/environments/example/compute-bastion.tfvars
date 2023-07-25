tf_exec_role_arn = "FIXME"

ec2_instance_config = {
  image_id                  = "FIXME"
  instance_type             = "t3.micro"
  ebs_volume_size           = 24
  ebs_delete_on_termination = true
}

ec2_network_config = {
  subnet_id = "FIXME"
  vpc_id    = "FIXME"
}
