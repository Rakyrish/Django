from django.urls import path
from .views import BookListView

urlpatterns = [
    path('', BookListView.as_view(), name='book_list'),  # URL pattern for the book list view
    # Add more URL patterns as needed
]