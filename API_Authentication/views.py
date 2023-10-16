from rest_framework import generics, status
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from django_pandas.io import read_frame
import pandas as pd
import random
from sklearn.metrics.pairwise import cosine_similarity, linear_kernel

from .models import *
from .serializers import *


def standardize(row):
    new_row = (row - row.mean()) / (row.max() - row.min())
    return new_row

def get_recommended_users(user):
    athlete_profiles_df = read_frame(AthleteProfile.objects.all())
    person_question_weighing_df = pd.DataFrame.from_records(PersonQuestionWeighing.objects.all().values( 'athlete_profile__id', 'weight', 'person_question__question'))
    merged_df = athlete_profiles_df.merge(person_question_weighing_df, left_on="id", right_on="athlete_profile__id")

    merged_pivot_df = merged_df.pivot(index="id", columns="person_question__question", values="weight").fillna(0)

    merged_pivot_df_standard = merged_pivot_df.apply(standardize)

    cosine_sim = cosine_similarity(merged_pivot_df_standard)
    sim_dataframe = pd.DataFrame(cosine_sim, index=merged_pivot_df_standard.index, columns=merged_pivot_df_standard.index)

    stress_value = random.randint(1, 5)
    similar_score = sim_dataframe[user.athlete_profile.id] * (stress_value - 2.5)
    similar_score = similar_score.sort_values(ascending=False)

    users = similar_score.index.values.tolist()

    return users


class AthleteProfileLC(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = AthleteProfile.objects.all()

    def get_queryset(self):
        athlete_profile_pks = get_recommended_users(self.request.user)

        athlete_profiles = AthleteProfile.objects.filter(pk__in=athlete_profile_pks).exclude(pk=self.request.user.athlete_profile.id)

        athlete_profiles = sorted(athlete_profiles, key=lambda obj: athlete_profile_pks.index(obj.pk))

        return athlete_profiles

        return AthleteProfile.objects.exclude(
            pk__in=UserAthleteConnection.objects.filter(user=self.request.user).values_list('athlete_profile')).exclude(pk=self.request.user.athlete_profile.id)

    def get_serializer_class(self):
        return AthleteProfileSerializerL if self.request.method in SAFE_METHODS else AthleteProfileSerializer


class AthleteProfileRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = AthleteProfile.objects.all()
    serializer_class = AthleteProfileSerializer


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


class PersonQuestionWeighingLC(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = PersonQuestionWeighing.objects.all()
    serializer_class = PersonQuestionWeighingSerializer

    def get_queryset(self):
        return PersonQuestionWeighing.objects.filter(athlete_profile=self.request.user.athlete_profile)


class PersonQuestionWeighingU(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    queryset = PersonQuestionWeighing.objects.all()
    serializer_class = PersonQuestionWeighingSerializer

    def get_queryset(self):
        return PersonQuestionWeighing.objects.filter(athlete_profile=self.request.user.athlete_profile)


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
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return TrainerProfile.objects.exclude(pk__in=UserTrainerConnection.objects.filter(user=self.request.user).values_list('trainer_profile'))

    def get_serializer_class(self):
        return TrainerProfileSerializerL if self.request.method in SAFE_METHODS else TrainerProfileSerializer


class TrainerProfileRUD(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = TrainerProfile.objects.all()
    serializer_class = TrainerProfileSerializer


class UserAthleteConnectionC(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserAthleteConnection.objects.all()
    serializer_class = UserAthleteConnectionSerializer


class UserTrainerConnectionC(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserTrainerConnection.objects.all()
    serializer_class = UserTrainerConnectionSerializer


class UsersLC(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()

    def get_serializer_class(self):
        return UserSerializerL if self.request.method in SAFE_METHODS else UserSerializerC


class UsersRUD(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_serializer_class(self):
        return UserSerializerU if self.request.method in ['PATCH', 'PUT'] else UserSerializerRUD


class UserSportsLC(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSportsSerializer

    def get_queryset(self):
        return UserSport.objects.filter(user=self.request.user)


class UserSportsD(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSportsSerializer

    def get_queryset(self):
        return UserSport.objects.filter(user=self.request.user)