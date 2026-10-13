from django.contrib import admin
from django.urls import path, include, re_path
from .views import frontend

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("luxury.urls")),
    # Serve the React app and support direct links to React Router pages.
    re_path(r"^(?!static/).*$", frontend),
]
