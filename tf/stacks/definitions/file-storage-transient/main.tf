terraform {
  required_version = "> 1.0.0"

  backend "http" {}

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 4.66.1"
    }
  }
}
