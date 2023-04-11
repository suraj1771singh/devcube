from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    #---------- ROOMS
    path('createroom/', views.createRoom),
    path('rooms/', views.getAllRooms),
    path('room/<str:pk>/', views.getRoomsById),
    path('rooms-user/<str:pk>/', views.getRoomsByUser),
    path('room-delete/<str:pk>/', views.deleteRoom),
    path('room-update/<str:pk>/', views.updateRoom),
    path('room-add-participant/<str:pk>/', views.addParticipant),
    path('room-remove-participant/<str:pk>/', views.removeParticipant),
    path('rooms-joined/<str:pk>/', views.getJoinedRoomsByUser),
    path('rooms-topic/', views.getRoomByTopics),

    # ---------FOLLOWER AND FOLLOWING
    path('follow/<str:pk>/', views.follow),
    path('unfollow/<str:pk>/', views.unfollow),
    path('followers/<str:pk>/', views.getFollowers),
    path('following/<str:pk>/', views.getFollowing),

    #---------- TOPICS
    path('topics/', views.getTopics),

    # -----------MESSAGE
    path('createMsg/<str:pk>/', views.createMsg),
    path('msgs/', views.getAllMsg),
    path('msgs-user/<str:pk>/', views.getMsgsByUser),
    path('msg-update/<str:pk>/', views.updateMsg),
    path('msg-delete/<str:pk>/', views.deleteMsg),
    path('msgs-room/<str:pk>/', views.getMsgsByRoom),
    path('msg-like/<str:pk>/', views.likeMsg),

    #----------- USER
    path('user/<str:pk>/', views.getUserProfile),
    path('register/', views.registerUser),
    path('update/', views.updateUser),

    #----------- TOKEN
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
