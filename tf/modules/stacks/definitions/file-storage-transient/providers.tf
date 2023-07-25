provider "aws" {

  assume_role {
    role_arn = var.tf_exec_role_arn
  }

  default_tags {
    tags = {
      Environment = var.environment
      Product     = var.product_name
      Provisioner = "Terraform"
      Stack       = var.stack_name
      Variant     = var.variant
    }
  }
}
