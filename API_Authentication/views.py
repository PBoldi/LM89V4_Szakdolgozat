from rest_framework import generics
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import AllowAny

from .models import User
from .serializers import UserSerializerC, UserSerializerL

class UsersLC(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    
    def get_serializer_class(self):
        return UserSerializerL if self.request.method in SAFE_METHODS else UserSerializerC