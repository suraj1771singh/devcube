# take python object and serialize it into json object
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from base.models import Room, Topic, User, Message

# from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', "last_login")


class RoomSerializer(ModelSerializer):
    # username = serializers.SerializerMethodField()
    # host_profile_photo = serializers.SerializerMethodField()
    # user_profile_photo = serializers.ImageField(source='user.profile_photo')
    host = UserSerializer()
    participants = UserSerializer(many=True)

    class Meta:
        model = Room
        fields = '__all__'

    # def get_username(self, obj):
    #     return obj.host.email
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        host_data = representation.pop('host')

        host_email = host_data.get('email')
        host_id = host_data.get('id')
        representation['host'] = {'email': host_email, 'id': host_id}

        participants_data = representation.pop('participants')
        representation['participants'] = [
            {key: value for key, value in item.items() if key in ["id", "email"]} for item in participants_data]
        return representation


class MsgSerializer(ModelSerializer):
    user = UserSerializer()
    room = RoomSerializer()

    class Meta:
        model = Message
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_data = representation.pop('user')
        user_id = user_data.get('id')
        user_email = user_data.get('email')
        room_data = representation.pop('room')
        room_id = room_data.get('id')
        room_name = room_data.get('name')

        representation['user'] = {'id': user_id, 'email': user_email}
        representation['room'] = {'id': room_id, 'name': room_name}
        return representation


class TopicSerializer(ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
