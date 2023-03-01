from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('rooms/', views.getRooms),
    path('topics/', views.getTopics),
    path('room/', views.getRoom),
    path('user/<str:pk>/', views.getUserProfile),
    path('createroom/', views.createRoom),
    path('register/', views.registerUser),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
