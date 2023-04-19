# resource "google_storage_bucket_object" "js_files" {
#     for_each = fileset(var.widget_folder_location, "*.js")
    
#     bucket = var.bucket_name
#     content = file()

# }

resource "google_storage_bucket_object" "auth_js" {
  bucket = var.bucket_name

  name = "${var.prefix}/auth.js"
  source = "${path.root}/../../../widgets/ask-sac/Auth.js"
  content_type = "text/javascript"
}

resource "google_storage_bucket_object" "widget_js" {
  bucket = var.bucket_name

  name = "${var.prefix}/askSacWidget.js"
  source = "${path.root}/../../../widgets/ask-sac/askSacWidget.js"
  content_type = "text/javascript"
}