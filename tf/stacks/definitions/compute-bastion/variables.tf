variable "environment" {
  type = string
}

variable "product_name" {
  type = string
}

variable "stack_name" {
  type = string
}

variable "variant" {
  type = string
}

variable "tf_exec_role_arn" {
  type = string
}

variable "ec2_instance_config" {
  type = map(any)
}

variable "ec2_network_config" {
  type = map(any)
}
