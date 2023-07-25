resource "aws_ssm_parameter" "stack_present" {
  name  = "/stacks/${var.environment}/${var.product_name}/${var.stack_name}/${var.variant}/present"
  type  = "String"
  value = "true"
}
