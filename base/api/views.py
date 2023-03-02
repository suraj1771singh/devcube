from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.models import User

from base.models import Room, Topic, User
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
@permission_classes([IsAuthenticated])
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
    form = RoomForm(request.data)
    if form.is_valid():
        room = form.save(commit=False)
        room.host = request.user
        room.save()
        return Response({'msg': "Created room successfully !"}, status=status.HTTP_200_OK)
    else:
        return Response({'msg': "Invalid form Details!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllRooms(request):
    rooms = Room.objects.all()
    # many is set to true, to serialize many objects
    serializer = RoomSerializer(rooms, many=True)
    try:
        for room in serializer.data:
            user = User.objects.get(id=room['host'])
            room['hostname'] = user.username
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        Response({'msg': "Something went wrong !"},
                 status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoomsByUser(request, pk):
    user = User.objects.get(id=pk)
    rooms = user.room_set.all()
    # many is set to true, to serialize many objects
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoomsById(request, pk):
    rooms = Room.objects.get(id=pk)
    serializer = RoomSerializer(rooms, many=True)
    try:
        for room in serializer.data:
            user = User.objects.get(id=room['host'])
            room['hostname'] = user.username
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        Response({'msg': "Something went wrong !"},
                 status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteRoom(request, pk):
    try:
        room = Room.objects.get(id=pk)
        if request.user != room.host:
            return Response({"msg": "Unauthorized request"}, status=status.HTTP_401_UNAUTHORIZED)
        room.delete()
        return Response({'msg': "Successfully Deleted "}, status=status.HTTP_200_OK)
    except Room.DoesNotExist:
        return Response({'msg': "Room doesn't exist"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def updateRoom(request, pk):
    room = Room.objects.get(id=pk)
    if request.user != room.host:
        return Response({'msg': "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    form = RoomForm(request.data, instance=room)
    if form.is_valid():
        form.save()
        return Response({'msg': "Updated successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({'msg': "Invalid update"}, status=status.HTTP_400_BAD_REQUEST)

# ------------------------Topics


@api_view(['GET'])
def getTopics(request):
    topics = Topic.objects.all()
    sl = TopicSerializer(topics, many=True)
    return Response(sl.data)
