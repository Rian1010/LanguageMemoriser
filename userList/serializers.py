from rest_framework import serializers

from .models import userWordList

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = userWordList
        fields = '__all__'