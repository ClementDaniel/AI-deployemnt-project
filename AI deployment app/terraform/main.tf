resource "kubernetes_namespace" "staging" {
  metadata {
    name = "staging"
  }
}

resource "kubernetes_deployment" "staging_backend" {
  metadata {
    name      = "backend"
    namespace = kubernetes_namespace.staging.metadata[0].name
  }
  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "backend"
      }
    }
    template {
      metadata {
        labels = {
          app = "backend"
        }
      }
      spec {
        container {
          image = "my-app/backend:staging"
          name  = "backend"
          ports {
            container_port = 3000
          }
        }
      }
    }
  }
}
