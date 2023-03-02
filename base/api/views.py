from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.models import User

from base.models import Room, Topic, User, UserRelationship, Message
from .serializers import RoomSerializer, UserSerializer, TopicSerializer, MsgSerializer
from ..forms import RoomForm, UserForm, MyUserCreationForm, MsgForm


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
    try:
        room = Room.objects.get(id=pk)
        user = room.host
        serializer = RoomSerializer(room, many=False)
        data = serializer.data
        data["hostname"] = user.username
        return Response(data, status=status.HTTP_200_OK)
    except:
        return Response({'msg': "Something went wrong !"},
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


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def addParticipant(request, pk):
    try:
        room = Room.objects.get(id=pk)
    except Room.DoesNotExist:
        return Response({'msg': 'Room does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if user.id == room.host:
        return Response({'msg': "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    room.participants.add(user)
    return Response({'msg': "added successfully"}, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def removeParticipant(request, pk):
    try:
        room = Room.objects.get(id=pk)
    except Room.DoesNotExist:
        return Response({'msg': 'Room does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if user.id == room.host:
        return Response({'msg': "unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    room.participants.remove(user)
    return Response({'msg': "removed successfully"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getJoinedRoomsByUser(request, pk):

    user = User.objects.get(id=pk)
    rooms = Room.objects.filter(participants=user)
    serializer = RoomSerializer(rooms, many=True)
    try:
        for room in serializer.data:
            user = User.objects.get(id=room['host'])
            room['hostname'] = user.username
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        Response({'msg': "Something went wrong !"},
                 status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ------------------------ FOLLOWER AND FOLLOWING


@api_view(['PUT', 'POST'])
@permission_classes([IsAuthenticated])
def follow(request, pk):
    try:
        user_to_follow = User.objects.get(id=pk)
    except:
        Response({'msg': "User to follow doesn't exist"},
                 status=status.HTTP_404_NOT_FOUND)
    relationship, created = UserRelationship.objects.get_or_create(
        follower=request.user,
        followed=user_to_follow,
    )

    if not created:
        return Response({"msg": "You are already following this user."}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'msg': f"started following{ user_to_follow}"},
                    status=status.HTTP_201_CREATED)


@api_view(['PUT', 'POST'])
@permission_classes([IsAuthenticated])
def unfollow(request, pk):
    relationship = UserRelationship.get(follower=request.user, followed_id=pk)
    relationship.delete()
    return Response({'msg': f"Unfollowed user with id {pk} "}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFollowers(request, pk):
    res = UserRelationship.objects.filter(followed_id=pk)
    data = list()
    for e in res:
        data.append(e.follower)
    sl = UserSerializer(data, many=True)
    return Response(sl.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFollowing(request, pk):
    res = UserRelationship.objects.filter(follower_id=pk)
    data = list()
    for e in res:
        data.append(e.followed)
    sl = UserSerializer(data, many=True)
    return Response(sl.data, status=status.HTTP_200_OK)


# ------------------------TOPICS
@api_view(['GET'])
def getTopics(request):
    topics = Topic.objects.all()
    sl = TopicSerializer(topics, many=True)
    return Response(sl.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMsg(request, pk):
    user = request.user
    room = Room.objects.get(id=pk)
    form = MsgForm(request.data)

    if form.is_valid():
        msg = form.save(commit=False)
        msg.user = user
        msg.room = room
        msg.save()
        return Response({'msg': "Message created successfully"}, status=status.HTTP_201_CREATED)
    else:
        return Response({'msg': "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteMsg(request, pk):
    try:
        msg = Message.objects.get(id=pk)
    except Message.DoesNotExist:
        return Response({'msg': "Message doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if msg.user != request.user:
        return Response({'msg': "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    msg.delete()
    return Response({'msg': "Message deleted successfully"},
                    status=status.HTTP_200_OK)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def updateMsg(request, pk):
    try:
        msg = Message.objects.get(id=pk)
    except Message.DoesNotExist:
        return Response({'msg': "Message doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if msg.user != request.user:
        return Response({'msg': "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    form = MsgForm(request.data, instance=msg)
    if form.is_valid():
        form.save()
        return Response({'msg': "Message updated successfully"},
                        status=status.HTTP_200_OK)
    else:
        return Response({'msg': "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllMsg(request):
    msgs = Message.objects.all()
    sl = MsgSerializer(msgs)
    return Response(sl.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMsgsByUser(request, pk):
    user = User.objects.get(id=pk)
    msgs = user.message_set.all()
    sl = MsgSerializer(msgs, many=True)
    return Response(sl.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMsgsByRoom(request, pk):
    room = Room.objects.get(id=pk)
    msgs = room.message_set.all()
    sl = MsgSerializer(msgs, many=True)
    for data in sl.data:
        user = User.objects.get(id=data['user'])
        data["username"] = user.username
    return Response(sl.data, status=status.HTTP_200_OK)
