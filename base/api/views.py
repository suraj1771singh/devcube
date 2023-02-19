from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Room, Topic
from .serializers import RoomSerializer, UserSerializer, TopicSerializer
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import status
from ..forms import RoomForm, UserForm


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/rooms',
        'GET /api/room/:id'
    ]
    return Response(routes)


@api_view(['GET'])
def getRooms(request):
    rooms = Room.objects.all()
    # many is set to true, to serialize many objects
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)

# _____________________Rooms__________________________


@api_view(['GET'])
def getRoom(request, pk):
    room = Room.objects.get(id=pk)
    # many is set to true, to serialize many objects
    serializer = RoomSerializer(room, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getTopics(request):
    topics = Topic.objects.all()
    sl = TopicSerializer(topics, many=True)
    return Response(sl.data)


@api_view(['POST'])
def createRoom(request):

    sl = RoomSerializer(data=request.data)
    if sl.is_valid():
        room = sl.save(commit=False)
        room.host = request.user
        room.save()
        return Response(sl.data)
    else:
        return Response({'msg': "Invalid form Details!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUserProfile(request, pk):
    try:
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'msg': "User doesn't exist!"},
                        status=status.HTTP_400_BAD_REQUEST)
