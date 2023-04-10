from django.db import models
from django.contrib.auth.models import AbstractUser
from .userManager import MyUserManager
# Create your models here.


class User(AbstractUser):
    # Username = None
    email = models.EmailField(unique=True)
    photo = models.ImageField(upload_to="studybud")
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(
        max_length=100, null=True, blank=True, default=None)
    bio = models.TextField(null=True, blank=True)
    linkedin_url = models.CharField(max_length=100, null=True, blank=True)
    twitter_url = models.CharField(max_length=100, null=True, blank=True)
    insta_url = models.CharField(max_length=100, null=True, blank=True)
    following = models.ManyToManyField(
        "self", blank=True)
    objects = MyUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
class Topic (models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Room(models.Model):
    host = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    topic = models.ManyToManyField(
        Topic,  symmetrical=False)
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    participants = models.ManyToManyField(
        User, related_name='participants', blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.name


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    body = models.TextField()
    parent = models.ForeignKey(
        "self", related_name="child", on_delete=models.CASCADE, null=True, blank=True, default=None)
    replies = models.ManyToManyField(
        'self', symmetrical=False, blank=True)
    height = models.IntegerField(blank=False, default=0)
    likes = models.IntegerField(blank=False, default=0)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.body[0:50]


class UserRelationship(models.Model):
    followed = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='user_relationship_as_followed', null=True
    )
    follower = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='user_relationship_as_follower', null=True
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']


# Make migrations
# python manage.py makemigrations
# python manage.py migrate
