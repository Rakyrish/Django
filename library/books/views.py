from django.shortcuts import render
from .models import Book
from django.views.generic import ListView

class BookListView(ListView):
    model = Book
    template_name = 'book_list.html'  # Specify your template name
    # context_object_name = 'books'  # Name of the variable to be used in the template

# Create your views here.
