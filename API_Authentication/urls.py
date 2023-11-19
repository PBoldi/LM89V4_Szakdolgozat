from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import *


urlpatterns = [
    path('applied-athletes/', AppliedAthletesL.as_view()),
    path('athlete-partners/', AthletePartnersL.as_view()),
    path('athlete-profile/', AthleteProfileLC.as_view()),
    path('athlete-profile/<int:pk>', AthleteProfileRUD.as_view()),
    path('athlete-to-be-partner/', AthletesToBePartnerL.as_view()),
    path('athlete-trainers/', AthleteTrainers.as_view()),
    path('person-questions/', PersonQuestionLC.as_view()),
    path('person-questions/<int:pk>', PersonQuestionRUD.as_view()),
    path('person-question-weighing/', PersonQuestionWeighingLC.as_view()),
    path('person-question-weighing/<int:pk>', PersonQuestionWeighingU.as_view()),
    path('sports/', SportsLC.as_view()),
    path('sports/<int:pk>', SportsRUD.as_view()),
    path('token/', TokenObtainPairView.as_view()),                      
    path('token/refresh/', TokenRefreshView.as_view()),                 
    path('create-test-athlete-profile/', CreateTestAthleteProfilesView.as_view()),
    path('create-test-trainer-profile/', CreateTestTrainerProfilesView.as_view()),
    path('trainer-athletes/', TrainerAthletes.as_view()),
    path('trainer-athlete-connection/', TrainerAthleteConnectionC.as_view()),
    path('trainer-profile/', TrainerProfileLC.as_view()),
    path('trainer-profile/<int:pk>', TrainerProfileRUD.as_view()),
    path('trainer-rating/', TrainerRatingC.as_view()),
    path('trainer-rating/<int:pk>', TrainerRatingU.as_view()),
    path('user-athlete-connection/', UserAthleteConnectionC.as_view()),
    path('user-trainer-connection/', UserTrainerConnectionC.as_view()),
    path('user-sports/', UserSportsLC.as_view()),
    path('user-sports/<int:pk>', UserSportsD.as_view()),
    path('users/', UsersLC.as_view()),                                  
    path('users/<int:pk>', UsersRUD.as_view()),
    path('users/authenticated/', AuthenticatedUser.as_view()),                         
]