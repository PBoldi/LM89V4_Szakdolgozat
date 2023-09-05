from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import *


urlpatterns = [
    path('token/', TokenObtainPairView.as_view()),                      #
    path('token/refresh/', TokenRefreshView.as_view()),                 # 
    path('users/', UsersLC.as_view()),                                  #
]