from django.contrib import admin
from .models import Room, Topic, Message, User, UserRelationship
# Register your models here.

admin.site.register(User)
admin.site.register(Room)
admin.site.register(Topic)
admin.site.register(Message)
admin.site.register(UserRelationship)
