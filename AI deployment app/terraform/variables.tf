variable "k8s_cluster_endpoint" {
  description = "The endpoint of the Kubernetes cluster."
  type        = ""
}

variable "k8s_client_cert" {
  description = "Path to the client certificate file for the Kubernetes cluster."
  type        = ""
}

variable "k8s_client_key" {
  description = "Path to the client key file for the Kubernetes cluster."
  type        = ""
}

variable "k8s_cluster_ca_cert" {
  description = "Path to the cluster CA certificate file for the Kubernetes cluster."
  type        = ""
}
