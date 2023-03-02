from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    #---------- ROOMS
    path('rooms/', views.getAllRooms),
    path('room/<str:pk>/', views.getRoomsById),
    path('rooms-user/<str:pk>/', views.getRoomsByUser),
    path('room-delete/<str:pk>/', views.deleteRoom),
    path('room-update/<str:pk>/', views.updateRoom),
    #---------- TOPICS
    path('topics/', views.getTopics),
    #----------- USER
    path('user/<str:pk>/', views.getUserProfile),
    path('createroom/', views.createRoom),
    path('register/', views.registerUser),
    #----------- TOKEN
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
