provider "kubernetes" {
  host                   = var.k8s_cluster_endpoint
  client_certificate     = file(var.k8s_client_cert)
  client_key             = file(var.k8s_client_key)
  cluster_ca_certificate = file(var.k8s_cluster_ca_cert)
}
