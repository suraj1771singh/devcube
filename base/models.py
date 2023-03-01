from django.db import models
from django.contrib.auth.models import AbstractUser
from .userManager import MyUserManager
# Create your models here.


class User(AbstractUser):
    # Username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=False)
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
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True)
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
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.body[0:50]


class UserRelationship(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='user_relationship_as_user', null=True
    )
    follower = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='user_relationship_as_follower', null=True
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.follower

# Make migrations
# python manage.py makemigrations
# python manage.py migrate
