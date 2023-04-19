resource "random_id" "random" {
  byte_length = 2
  keepers = {
    project = var.project
  }
}

resource "google_storage_bucket" "bucket" {
  project = var.project
  
  name          = "${var.bucket_name}-${random_id.random.dec}"
  location      = var.location
  force_destroy = var.force_destroy

  uniform_bucket_level_access = true

  public_access_prevention = var.public ? "inherited" : "enforced"
  

#   website {
#     main_page_suffix = "index.html"
#     not_found_page   = "404.html"
#   }
#   cors {
#     origin          = ["https://google-1.us10.hcs.cloud.sap/"]
#     method          = ["GET", "HEAD"]
#     response_header = ["*"]
#     max_age_seconds = 3600
#   }
}

resource "google_storage_bucket_iam_binding" "binding" {
  count = var.public ? 1 : 0
  
  bucket = google_storage_bucket.bucket.name
  role = "roles/storage.objectViewer"
  members = [
      "allUsers",
    ]
}