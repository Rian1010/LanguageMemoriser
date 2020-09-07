from rest_framework import serializers

from .models import userWordList

class UserListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = userWordList
        fields = ('word', 'definition')