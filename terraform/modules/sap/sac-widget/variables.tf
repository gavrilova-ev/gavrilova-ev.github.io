variable "bucket_name" {
    type = string
    description = "(Required) Bucket name to upload the files for the widget. Should be publicly accessible"  
}

variable "prefix" {
    type = string
    description = "(Optional) GCS Prefix to be used for file creation in the bucket"
}

variable "widget_folder_location"{
    type = string
    description = "(Required) Relative path to the widget code to upload to the bucket"
}

variable "widget_json_template_location" {
    type = string
    description = "(Required) Relative path to template file for the widget creation"
}

