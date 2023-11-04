from rest_framework.serializers import ModelSerializer, ReadOnlyField, SerializerMethodField

from django.db.models import Avg

from .models import *


class AthleteProfileSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = AthleteProfile


class TrainerProfileSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = TrainerProfile


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
    user = UserSerializerForProfilesL()

    class Meta:
        fields = '__all__'
        model = AthleteProfile


class TrainerRatingSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = TrainerRating


class TrainerProfileSerializerL(ModelSerializer):
    trainer_user_rating = SerializerMethodField()
    trainer_aggregated_rating = SerializerMethodField()
    user = UserSerializerForProfilesL()
    class Meta:
        fields = '__all__'
        model = TrainerProfile

    def get_trainer_user_rating(self, instance):
        return TrainerRatingSerializer(TrainerRating.objects.filter(athlete_profile=self.context['request'].user.athleteprofile, trainer_profile=instance).first()).data
    
    def get_trainer_aggregated_rating(self, instance):
        ratings = TrainerRating.objects.filter(trainer_profile=instance)
        if ratings:
            return ratings.aggregate(Avg("rating", default=0))["rating__avg"]
        return None


class TrainerAthleteConnectionSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = TrainerAthleteConnection


class UserAthleteConnectionSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = UserAthleteConnection


class UserTrainerConnectionSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = UserTrainerConnection        


class UserSerializerRUD(ModelSerializer):
    athleteprofile = AthleteProfileSerializer()
    trainerprofile = TrainerProfileSerializer()
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