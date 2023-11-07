from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import *


class IsAdminOrReadOnly(BasePermission):  
    def has_object_permission(self, request, view, obj):
        return request.user.is_admin or request.method in SAFE_METHODS