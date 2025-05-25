from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'body', ]
        read_only_fields = ['id', ]
        write_only_fields = ['title', 'body']
        extra_kwargs = {
            'title': {'required': True, 'allow_blank': False},
            'body': {'required': False, 'allow_blank': True}
        }