from django.urls import path

from .views import health, products


urlpatterns = [
    path("api/health/", health, name="health"),
    path("api/products/", products, name="products"),
]
