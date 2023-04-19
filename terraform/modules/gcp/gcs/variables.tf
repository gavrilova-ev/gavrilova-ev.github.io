variable "project" {
    type = string
    description = "(Required)"
}

variable "bucket_name" {
    type = string
    description = "(Required)"  
}

variable "location" {
  type = string
  description = "(Required)"
}

variable "public" {
    type = bool
    description = "(Optional, default 'false') Make bucket and objects universally accessible"
    default = false
}

variable "force_destroy" {
    type = bool
    description = " (Optional, Default: false) When deleting a bucket, this boolean option will delete all contained objects. If you try to delete a bucket that contains objects, Terraform will fail that run."
    default = false
}