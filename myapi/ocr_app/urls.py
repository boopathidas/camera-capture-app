from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Home page
    path('upload-image/', views.upload_image, name='upload_image'),  # Non-API image upload route
    path('api/upload-image/', views.OCRImageView.as_view(), name='ocr_image_api'),  # API-based image upload for OCR
]
