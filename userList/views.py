from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserListSerializer
from .models import userWordList


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/user-word-list/',
        'Detail View': '/user-list-detail/<str:pk>',
        'Create': '/user-word-create/',
        'Update': '/user-word-update/<str:pk>',
        'Delete': '/user-word-delete/<str:pk>'
    }
    return Response(api_urls)

@api_view(['GET'])
def UserListViewSet(request):
    queryset = userWordList.objects.all()
    # .order_by('name')
    serializer_class = UserListSerializer(queryset, many=True)
    return Response(serializer_class.data)

@api_view(['GET'])
def userListDetail(request, pk):
    words = userWordList.objects.get(id=pk)
    # .order_by('name')
    serializer_class = UserListSerializer(words, many=False)
    return Response(serializer_class.data)

@api_view(['POST'])
def userWordCreate(request):
    serializer = UserListSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def userWordUpdate(request, pk):
    word = userWordList.objects.get(id=pk)
    serializer = UserListSerializer(instance=word, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def userWordDelete(request, pk):
    word = userWordList.objects.get(id=pk)
    word.delete()

    return Response("The word has been deleted")