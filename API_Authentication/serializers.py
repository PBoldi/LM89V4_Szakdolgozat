from rest_framework.serializers import ModelSerializer, ReadOnlyField, SerializerMethodField

from .models import *


class PersonQuestionSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = PersonQuestion


class SportSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Sport


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
    

class UserSerializerRUD(ModelSerializer):
    full_name = ReadOnlyField()
    profile_picture = SerializerMethodField()

    class Meta:
        exclude = ('last_login', 'password')
        model = User
        read_only_fields = ('is_active', 'is_admin')

    def get_profile_picture(self, instance):
        return f'{"http://localhost:8000/media/{instance.profile_picture}"}' if instance.profile_picture else None
    