from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import User

class UserSerializerC(ModelSerializer):
    class Meta:
        fields = ('email', 'password')
        model = User

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'], password=validated_data['password'])
        return user
    
class UserSerializerL(ModelSerializer):
    profile_picture = SerializerMethodField()
    
    class Meta:
        fields = '__all__'
        model = User

    def get_profile_picture(self, instance):
        return f'{"http://localhost:8000/media/{instance.profile_picture}"}' if instance.profile_picture else None