terraform {
 backend "gcs" {
   bucket  = "argolis-palkin-terraform-states"
   prefix  = "argolis.llm-demo"
 }
}