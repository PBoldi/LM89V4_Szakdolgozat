from rest_framework import generics, status
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import *
from .serializers import *


class AuthenticatedUser(generics.GenericAPIView):
    serializer_class = UserSerializerRUD

    def get_object(self):
        return User.objects.filter(pk=self.request.user.id).first()
    
    def get(self, request):
        return Response(self.serializer_class(self.get_object()).data, status=status.HTTP_200_OK)
        

class PersonQuestionLC(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = PersonQuestion.objects.all()
    serializer_class = PersonQuestionSerializer


class PersonQuestionRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    queryset = PersonQuestion.objects.all()
    serializer_class = PersonQuestionSerializer


class SportsLC(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Sport.objects.all()
    serializer_class = SportSerializer


class SportsRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    queryset = Sport.objects.all()
    serializer_class = SportSerializer


class TrainerProfileLC(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = TrainerProfile.objects.all()
    serializer_class = TrainerProfileSerializer


class UsersLC(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    
    def get_serializer_class(self):
        return UserSerializerL if self.request.method in SAFE_METHODS else UserSerializerC
    

class UsersRUD(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    
    def get_serializer_class(self):
        return UserSerializerRUD