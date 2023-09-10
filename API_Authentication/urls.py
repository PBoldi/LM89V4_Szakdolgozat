from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import *


urlpatterns = [
    path('athlete-profile/', AthleteProfileLC.as_view()),
    path('person-questions/', PersonQuestionLC.as_view()),
    path('person-questions/<int:pk>', PersonQuestionRUD.as_view()),
    path('sports/', SportsLC.as_view()),
    path('sports/<int:pk>', SportsRUD.as_view()),
    path('token/', TokenObtainPairView.as_view()),                      
    path('token/refresh/', TokenRefreshView.as_view()),                 
    path('trainer-profile/', TrainerProfileLC.as_view()),
    path('users/', UsersLC.as_view()),                                  
    path('users/<int:pk>', UsersRUD.as_view()),                         
    path('users/authenticated/', AuthenticatedUser.as_view()),                         
]