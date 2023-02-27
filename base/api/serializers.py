# take python object and serialize it into json object
from rest_framework.serializers import ModelSerializer
from base.models import Room, Topic
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RoomSerializer(ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', "last_login")


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
