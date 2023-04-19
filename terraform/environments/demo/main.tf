locals {
    project_id = "sandbox-sac-llm-demo"
}


module "widget_storage" {
    source = "../../modules/gcp/gcs"
    project = local.project_id

    bucket_name = "sap-ce-custom-widget-store"
    location = "EU"

    force_destroy = true
    public = true
    


}

module "ask_sac_widget" {
    source = "../../modules/sap/sac-widget"

    bucket_name = module.widget_storage.bucket_name
    prefix = "askSac"
    widget_folder_location = "${path.root}/../../../widgets/ask-sac"
    widget_json_template_location = "${path.root}/../../../widgets/ask-sac/askSacWidget.json.template"
}

# module "cloud_build" {

# }