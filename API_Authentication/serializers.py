from django.db import transaction
from rest_framework.serializers import ModelSerializer, ReadOnlyField, SerializerMethodField

from .models import *


class AthleteProfileSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = AthleteProfile

    def create(self, validated_data):
        with transaction.atomic():
            athlete_profile = AthleteProfile.objects.create(**validated_data)
            user = User.objects.get(id=self.context['request'].user.id)
            user.athlete_profile = athlete_profile
            user.save()
            return athlete_profile


class TrainerProfileSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = TrainerProfile

    def create(self, validated_data):
        with transaction.atomic():
            trainer_profile = TrainerProfile.objects.create(**validated_data)
            user = User.objects.get(id=self.context['request'].user.id)
            user.trainer_profile = trainer_profile
            user.save()
            return trainer_profile


class PersonQuestionSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = PersonQuestion


class PersonQuestionWeighingSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = PersonQuestionWeighing


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
        return f'{"http://localhost:8000/media/"}{instance.profile_picture}' if instance.profile_picture else None


class UserSportForProfilesSerializer(ModelSerializer):
    sport = SportSerializer()

    class Meta:
        model = UserSport
        fields = ('sport',)


class UserSerializerForProfilesL(ModelSerializer):
    profile_picture = SerializerMethodField()
    usersport_set = UserSportForProfilesSerializer(many=True)
    
    class Meta:
        fields = '__all__'
        model = User

    def get_profile_picture(self, instance):
        return f'{"http://localhost:8000/media/"}{instance.profile_picture}' if instance.profile_picture else None
    

class AthleteProfileSerializerL(ModelSerializer):
    user_set = UserSerializerForProfilesL(many=True)

    class Meta:
        fields = '__all__'
        model = AthleteProfile


class TrainerProfileSerializerL(ModelSerializer):
    user_set = UserSerializerForProfilesL(many=True)
    class Meta:
        fields = '__all__'
        model = TrainerProfile


class UserAthleteConnectionSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = UserAthleteConnection


class UserTrainerConnectionSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = UserTrainerConnection        


class UserSerializerRUD(ModelSerializer):
    athlete_profile = AthleteProfileSerializer()
    trainer_profile = TrainerProfileSerializer()
    full_name = ReadOnlyField()
    profile_picture = SerializerMethodField()

    class Meta:
        exclude = ('last_login', 'password')
        model = User
        read_only_fields = ('is_active', 'is_admin')

    def get_profile_picture(self, instance):
        return f'{"http://localhost:8000/media/"}{instance.profile_picture}' if instance.profile_picture else None
    
class UserSerializerU(ModelSerializer):
    class Meta:
        model = User
        fields= '__all__'


class UserSportsSerializer(ModelSerializer):
    class Meta:
        model = UserSport
        fields = '__all__'