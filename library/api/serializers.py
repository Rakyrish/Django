from rest_framework import serializers
from books.models import Book
# api/serializers.py
# Serializer for the Book model
class BookSerializer(serializers.ModelSerializer):
 
 class Meta:
  model = Book
  fields = ('title', 'author', 'isbn')