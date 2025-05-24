from django.urls import path
from .views import BookAPIView

urlpatterns = [
    path('', BookAPIView.as_view()),  # URL pattern for the book API view
]