from django.forms import ModelForm
from .models import Room, User, Message
from django.contrib.auth.forms import UserCreationForm, UserChangeForm


class MyUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class MyUserUpdateForm(UserChangeForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'bio','photo',
                  'linkedin_url', 'twitter_url', 'insta_url', 'email']


class RoomForm(ModelForm):
    class Meta:
        model = Room
        fields = '__all__'
        exclude = ['host', 'participants']


class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email']


class MsgForm(ModelForm):
    class Meta:
        model = Message
        fields = ['body']
