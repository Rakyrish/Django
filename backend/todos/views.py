from django.shortcuts import render
from .models import Todo
from .serializers import TodoSerializer
from rest_framework import generics

class ListTodo(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class DetailTodo(generics.RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer    

# Create your views here.
