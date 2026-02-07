terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 6.0.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = ">= 4.0.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">= 3.6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

/* =========================
   Variables
========================= */

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "app_name" {
  type    = string
  default = "codelink-web"
}

variable "env_name" {
  type    = string
  default = "codelink-prod"
}

variable "github_repository" {
  type = string
}

variable "github_branch" {
  type    = string
  default = "main"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "environment_type" {
  type    = string
  default = "SingleInstance" # or "LoadBalanced"
}

/* =========================
   Random Suffix
========================= */

resource "random_id" "suffix" {
  byte_length = 3
}

locals {
  deploy_bucket_name = lower("${var.app_name}-deploy-${random_id.suffix.hex}")
  cname_prefix       = lower("${var.env_name}-${random_id.suffix.hex}")
}

/* =========================
   S3 Deploy Bucket (for app versions)
========================= */

resource "aws_s3_bucket" "deploy" {
  bucket        = local.deploy_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "deploy" {
  bucket = aws_s3_bucket.deploy.id

  versioning_configuration {
    status = "Enabled"
  }
}

/* =========================
   Elastic Beanstalk Roles
========================= */

# EC2 Instance Profile
data "aws_iam_policy_document" "eb_ec2_assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "eb_ec2" {
  name               = "${var.app_name}-eb-ec2-role"
  assume_role_policy = data.aws_iam_policy_document.eb_ec2_assume.json
}

resource "aws_iam_role_policy_attachment" "eb_webtier" {
  role       = aws_iam_role.eb_ec2.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_instance_profile" "eb_ec2" {
  name = "${var.app_name}-eb-ec2-profile"
  role = aws_iam_role.eb_ec2.name
}

# Elastic Beanstalk Service Role
data "aws_iam_policy_document" "eb_service_assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["elasticbeanstalk.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "eb_service" {
  name               = "${var.app_name}-eb-service-role"
  assume_role_policy = data.aws_iam_policy_document.eb_service_assume.json
}

# AWS recommends attaching these managed policies to the EB service role. :contentReference[oaicite:0]{index=0}
resource "aws_iam_role_policy_attachment" "eb_enhanced_health" {
  role       = aws_iam_role.eb_service.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkEnhancedHealth"
}

resource "aws_iam_role_policy_attachment" "eb_managed_updates" {
  role       = aws_iam_role.eb_service.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy"
}

/* =========================
   Elastic Beanstalk App + Env
========================= */

resource "aws_elastic_beanstalk_application" "app" {
  name = var.app_name
}

# Use Terraform data source to pick the most recent EB solution stack. :contentReference[oaicite:1]{index=1}
data "aws_elastic_beanstalk_solution_stack" "node" {
  most_recent = true
  name_regex  = ".*Amazon Linux 2023.*Node\\.js.*20.*"
}

resource "aws_elastic_beanstalk_environment" "env" {
  name                = var.env_name
  application         = aws_elastic_beanstalk_application.app.name
  solution_stack_name = data.aws_elastic_beanstalk_solution_stack.node.name
  cname_prefix        = local.cname_prefix

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = var.environment_type
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = var.instance_type
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.eb_ec2.name
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = aws_iam_role.eb_service.name
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "NODE_ENV"
    value     = "production"
  }
}

/* =========================
   GitHub Actions OIDC Role (no long-lived keys)
========================= */

data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github.certificates[0].sha1_fingerprint]
}

# OIDC trust restricted to your repo + branch. :contentReference[oaicite:2]{index=2}
data "aws_iam_policy_document" "gha_assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
  test     = "StringLike"
  variable = "token.actions.githubusercontent.com:sub"
  values   = ["repo:${var.github_repository}:*"]
}
  }
}

resource "aws_iam_role" "gha_deploy" {
  name               = "${var.app_name}-gha-deploy"
  assume_role_policy = data.aws_iam_policy_document.gha_assume.json
}

data "aws_iam_policy_document" "gha_policy" {
  statement {
    actions = ["s3:PutObject", "s3:GetObject", "s3:ListBucket"]
    resources = [
      aws_s3_bucket.deploy.arn,
      "${aws_s3_bucket.deploy.arn}/*"
    ]
  }

  statement {
    actions = [
      "elasticbeanstalk:CreateApplicationVersion",
      "elasticbeanstalk:UpdateEnvironment",
      "elasticbeanstalk:DescribeEnvironments",
      "elasticbeanstalk:DescribeEvents"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "gha_deploy" {
  name   = "${var.app_name}-gha-deploy-policy"
  policy = data.aws_iam_policy_document.gha_policy.json
}

resource "aws_iam_role_policy_attachment" "gha_attach" {
  role       = aws_iam_role.gha_deploy.name
  policy_arn = aws_iam_policy.gha_deploy.arn
}

/* =========================
   Outputs
========================= */

# EB provides a CNAME-based public URL for users. :contentReference[oaicite:3]{index=3}
output "app_url" {
  value = "http://${aws_elastic_beanstalk_environment.env.cname}"
}

output "deploy_bucket" { value = aws_s3_bucket.deploy.bucket }
output "eb_app_name" { value = aws_elastic_beanstalk_application.app.name }
output "eb_env_name" { value = aws_elastic_beanstalk_environment.env.name }
output "gha_role_arn" { value = aws_iam_role.gha_deploy.arn }
