from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from base.models import Room, Topic
from .serializers import RoomSerializer, UserSerializer, TopicSerializer
from ..forms import RoomForm, UserForm, MyUserCreationForm


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/rooms',
        'GET /api/room/:id'
    ]
    return Response(routes)

# --------------------------  USER


@api_view(['POST'])
def registerUser(request):
    form = MyUserCreationForm(request.data)
    if form.is_valid():
        user = form.save(commit=False)
        user.email = user.email.lower()
        user.username = user.email.lower()
        user.save()
        return Response({'msg': "New user created successfully !"}, status=status.HTTP_201_CREATED)
    else:
        return Response({'msg': "All fields are not filled"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUserProfile(request, pk):
    try:
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'msg': "User doesn't exist!"},
                        status=status.HTTP_400_BAD_REQUEST)

#------------------------------ ROOMS


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRoom(request):
    sl = RoomSerializer(data=request.data)
    if sl.is_valid():
        # room = sl.save(commit=False)
        sl.save(host=request.user)
        return Response({'msg': "Created room successfully !"}, status=status.HTTP_200_OK)
    else:
        return Response({'msg': "Invalid form Details!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRooms(request):
    rooms = Room.objects.all()
    # many is set to true, to serialize many objects
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoom(request):
    user = request.user
    room = user.room_set.all()
    # many is set to true, to serialize many objects
    serializer = RoomSerializer(room, many=True)
    return Response(serializer.data)

# ------------------------Topics


@api_view(['GET'])
def getTopics(request):
    topics = Topic.objects.all()
    sl = TopicSerializer(topics, many=True)
    return Response(sl.data)
