from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('rooms/', views.getRooms),
    path('topics/', views.getTopics),
    path('room/<str:pk>/', views.getRoom),
    path('user/<str:pk>/', views.getUserProfile),
    path('createroom', views.createRoom),
]
