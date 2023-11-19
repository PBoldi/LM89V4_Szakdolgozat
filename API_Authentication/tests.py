from rest_framework import status
from rest_framework.test import APITestCase
import json

from .models import AthleteProfile, TrainerProfile, User

def create_admin(self):
    data = {"email":"admin@admin.admin", "password":"admin"}
    User.objects.create_superuser(email=data["email"], password=data["password"])
    response = self.client.post('http://localhost:8000/auth/token/', data, format='json')
    return json.loads(response.content)['access']


def create_user(self):
    data = {"email":"test@test.test", "password":"test"}
    self.client.post('http://localhost:8000/auth/users/', data, format='json')
    response = self.client.post('http://localhost:8000/auth/token/', data, format='json')
    return json.loads(response.content)['access']


class AuthenticatedUserTestCase(APITestCase):
    def setUp(self):
        data = {"email":"test@test.test", "password":"test"}
        response = self.client.post('http://localhost:8000/auth/users/', data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post('http://localhost:8000/auth/token/', data, format='json')
        AuthenticatedUserTestCase.access_token = json.loads(response.content)['access']

    def test_authenticated_user(self):
        response = self.client.get(
            'http://localhost:8000/auth/users/authenticated/', HTTP_AUTHORIZATION='Bearer {}'.format(AuthenticatedUserTestCase.access_token), format='json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], "test@test.test")

    def test_authenticated_user_401(self):
        response = self.client.get(
            'http://localhost:8000/auth/users/authenticated/', 
        )
        self.assertEqual(response.status_code, 401)

    def test_user_update(self):
        data = {"first_name": "Test", "last_name": "Elek", "sex": True, "city": "Budapest", }
        response = self.client.patch('http://localhost:8000/auth/users/1', data, HTTP_AUTHORIZATION='Bearer {}'.format(AuthenticatedUserTestCase.access_token), format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["first_name"], "Test")
        self.assertEqual(response.data["last_name"], "Elek")
        self.assertEqual(response.data["sex"], True)
        self.assertEqual(response.data["city"], "Budapest")

    def test_user_update_not_found(self):
        data = {"first_name": "Test", "last_name": "Elek", "sex": True, "city": "Budapest", }
        response = self.client.patch('http://localhost:8000/auth/users/2', data, HTTP_AUTHORIZATION='Bearer {}'.format(AuthenticatedUserTestCase.access_token), format='json')
        self.assertEqual(response.status_code, 404)


class AthleteProfileTestCase(APITestCase):
    def setUp(self):
        AthleteProfileTestCase.access = create_user(self)

        data = {"user": 1, "biography": "Test biography", "height": 180, "weight": 80}
        response = self.client.post('http://localhost:8000/auth/athlete-profile/', data, HTTP_AUTHORIZATION='Bearer {}'.format(AthleteProfileTestCase.access), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_athlete_profile_no_height(self):

        data = {"user": 1, "biography": "Test biography",  "weight": 80}
        response = self.client.post('http://localhost:8000/auth/athlete-profile/', data, HTTP_AUTHORIZATION='Bearer {}'.format(AthleteProfileTestCase.access), format='json')
        self.assertEqual(response.status_code, 400)

    def test_get_athlete_profile(self):
        response = self.client.get(f'http://localhost:8000/auth/athlete-profile/{1}', HTTP_AUTHORIZATION='Bearer {}'.format(AthleteProfileTestCase.access), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"id": 1, "user": 1, "biography": "Test biography", "height": 180, "weight": 80})
    
    def test_update_athlete_profile(self):
        data = {"biography": "Test biography!"}
        response = self.client.patch(f'http://localhost:8000/auth/athlete-profile/{1}', data, HTTP_AUTHORIZATION='Bearer {}'.format(AthleteProfileTestCase.access), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["biography"], "Test biography!")
       

class TrainerProfileTestCase(APITestCase):
    def setUp(self):
        AthleteProfileTestCase.access = create_user(self)

        data = {"user": 1, "biography": "Test biography", "is_available_online": True, "price_per_hour": 50}
        response = self.client.post('http://localhost:8000/auth/trainer-profile/', data, HTTP_AUTHORIZATION='Bearer {}'.format(AthleteProfileTestCase.access), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_trainer_profile(self):
        response = self.client.get(f'http://localhost:8000/auth/trainer-profile/{1}', HTTP_AUTHORIZATION='Bearer {}'.format(AthleteProfileTestCase.access), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["biography"], "Test biography")
        self.assertEqual(response.data["is_available_online"], True)       
        self.assertEqual(response.data["is_dietician"], False)       
        self.assertEqual(response.data["price_per_hour"], 50)     
    
    def test_update_trainer_profile(self):
        data = {"biography": "Test biography!", "is_available_online": False, "is_dietician": False, "price_per_hour": 55}
        response = self.client.patch(f'http://localhost:8000/auth/trainer-profile/{1}', data, HTTP_AUTHORIZATION='Bearer {}'.format(AthleteProfileTestCase.access), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["biography"], "Test biography!")       
        self.assertEqual(response.data["is_available_online"], False)       
        self.assertEqual(response.data["is_dietician"], False)       
        self.assertEqual(response.data["price_per_hour"], 55)


class SportsTestCase(APITestCase):
    def setUp(self):
        SportsTestCase.access = create_user(self)
        SportsTestCase.access_admin = create_admin(self)

        data={"name": "Labdarúgás"}

        response = self.client.post('http://localhost:8000/auth/sports/', data, HTTP_AUTHORIZATION='Bearer {}'.format(SportsTestCase.access_admin), format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_sport(self):
        response = self.client.get(f'http://localhost:8000/auth/sports/1', HTTP_AUTHORIZATION='Bearer {}'.format(SportsTestCase.access), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Labdarúgás")     
    
    def test_update_sport(self):
        data = {"name": "Foci"}
        response = self.client.patch(f'http://localhost:8000/auth/sports/1', data, HTTP_AUTHORIZATION='Bearer {}'.format(SportsTestCase.access_admin), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Foci")

    def test_delete_sport(self):
        response = self.client.delete(f'http://localhost:8000/auth/sports/1', HTTP_AUTHORIZATION='Bearer {}'.format(SportsTestCase.access_admin), format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_sport_not_admin(self):
        data = {"name": "Foci"}
        response = self.client.patch(f'http://localhost:8000/auth/sports/1', data, HTTP_AUTHORIZATION='Bearer {}'.format(SportsTestCase.access), format='json')
        self.assertEqual(response.status_code, 403)

    def test_delete_sport_not_admin(self):
        response = self.client.delete(f'http://localhost:8000/auth/sports/1', HTTP_AUTHORIZATION='Bearer {}'.format(SportsTestCase.access), format='json')
        self.assertEqual(response.status_code, 403)


class PersonQuestionTestCase(APITestCase):
    def setUp(self):
        PersonQuestionTestCase.access = create_user(self)
        PersonQuestionTestCase.access_admin = create_admin(self)

        data={"question": "Szereted az alkalmazást?"}
        response = self.client.post('http://localhost:8000/auth/person-questions/', data, HTTP_AUTHORIZATION='Bearer {}'.format(PersonQuestionTestCase.access_admin), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_person_question(self):
        response = self.client.get(f'http://localhost:8000/auth/person-questions/1', HTTP_AUTHORIZATION='Bearer {}'.format(PersonQuestionTestCase.access), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["question"], "Szereted az alkalmazást?")     
    
    def test_update_person_question(self):
        data = {"question": "Szereted az TrainingAssistort?"}
        response = self.client.patch(f'http://localhost:8000/auth/person-questions/1', data, HTTP_AUTHORIZATION='Bearer {}'.format(PersonQuestionTestCase.access_admin), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["question"], "Szereted az TrainingAssistort?")

    def test_delete_person_question(self):
        response = self.client.delete(f'http://localhost:8000/auth/person-questions/1', HTTP_AUTHORIZATION='Bearer {}'.format(PersonQuestionTestCase.access_admin), format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_person_question_not_admin(self):
        data = {"question": "Szereted az TrainingAssistort?"}
        response = self.client.patch(f'http://localhost:8000/auth/person-questions/1', data, HTTP_AUTHORIZATION='Bearer {}'.format(PersonQuestionTestCase.access), format='json')
        self.assertEqual(response.status_code, 403)

    def test_delete_person_question_not_admin(self):
        response = self.client.delete(f'http://localhost:8000/auth/person-questions/1', HTTP_AUTHORIZATION='Bearer {}'.format(PersonQuestionTestCase.access), format='json')
        self.assertEqual(response.status_code, 403)


class CreateTestAthleteUsersTestCase(APITestCase):
    def setUp(self):
        CreateTestAthleteUsersTestCase.access = create_user(self)
        CreateTestAthleteUsersTestCase.access_admin = create_admin(self)

    def test_create_test_athletes_not_admin(self):
        response = self.client.post(f'http://localhost:8000/auth/create-test-athlete-profile/', HTTP_AUTHORIZATION='Bearer {}'.format(CreateTestAthleteUsersTestCase.access), format='json')
        self.assertEqual(response.status_code, 403)

    def test_create_test_athletes(self):
        response = self.client.post(f'http://localhost:8000/auth/create-test-athlete-profile/', HTTP_AUTHORIZATION='Bearer {}'.format(CreateTestAthleteUsersTestCase.access_admin), format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.count(), 1002)
        self.assertEqual(AthleteProfile.objects.count(), 1000)


class CreateTestTrainerUsersTestCase(APITestCase):
    def setUp(self):
        CreateTestTrainerUsersTestCase.access = create_user(self)
        CreateTestTrainerUsersTestCase.access_admin = create_admin(self)

    def test_create_test_athletes_not_admin(self):
        response = self.client.post(f'http://localhost:8000/auth/create-test-trainer-profile/', HTTP_AUTHORIZATION='Bearer {}'.format(CreateTestTrainerUsersTestCase.access), format='json')
        self.assertEqual(response.status_code, 403)

    def test_create_test_athletes(self):
        response = self.client.post(f'http://localhost:8000/auth/create-test-trainer-profile/', HTTP_AUTHORIZATION='Bearer {}'.format(CreateTestTrainerUsersTestCase.access_admin), format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.count(), 502)
        self.assertEqual(TrainerProfile.objects.count(), 500)


class UserConnectionsTestCase(APITestCase):
    def setUp(self):
        UserConnectionsTestCase.access_athlete = create_user(self)
        UserConnectionsTestCase.access_trainer = create_user(self)

        data = {"user": 1, "biography": "Test biography", "height": 180, "weight": 80}
        response = self.client.post('http://localhost:8000/auth/athlete-profile/', data, HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_athlete), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        UserConnectionsTestCase.athlete = response.data

        data = {"user": 1, "biography": "Test biography", "is_available_online": True, "is_dietician": True, "price_per_hour": 50}
        response = self.client.post('http://localhost:8000/auth/trainer-profile/', data, HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_trainer), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        UserConnectionsTestCase.trainer = response.data

    def test_athlete_connect_to_trainer(self):
        data = {"athlete_profile": UserConnectionsTestCase.athlete["id"], "trainer_profile": UserConnectionsTestCase.trainer["id"], "connect": True}
        response = self.client.post('http://localhost:8000/auth/user-trainer-connection/', data, HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_athlete), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["connect"], True)

        response = self.client.get('http://localhost:8000/auth/applied-athletes/', HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_trainer), format='json')
        self.assertEqual(len(response.data), 1)

        response = self.client.get('http://localhost:8000/auth/trainer-profile/', HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_athlete), format='json')
        self.assertEqual(len(response.data), 0)

    def test_athlete_connect_false_to_trainer(self):
        data = {"athlete_profile": UserConnectionsTestCase.athlete["id"], "trainer_profile": UserConnectionsTestCase.trainer["id"], "connect": False}
        response = self.client.post('http://localhost:8000/auth/user-trainer-connection/', data, HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_athlete), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["connect"], False)

        response = self.client.get('http://localhost:8000/auth/applied-athletes/', HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_trainer), format='json')
        self.assertEqual(len(response.data), 0)

        response = self.client.get('http://localhost:8000/auth/trainer-profile/', HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_athlete), format='json')
        self.assertEqual(len(response.data), 0)

    def test_trainer_connect_to_athlete(self):
        data = {"athlete_profile": UserConnectionsTestCase.athlete["id"], "trainer_profile": UserConnectionsTestCase.trainer["id"], "connect": True}
        response = self.client.post('http://localhost:8000/auth/trainer-athlete-connection/', data, HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_trainer), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["connect"], True)
        
        response = self.client.get('http://localhost:8000/auth/athlete-trainers/', HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_athlete), format='json')
        self.assertEqual(len(response.data), 1)

        response = self.client.get('http://localhost:8000/auth/trainer-athletes/', HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_trainer), format='json')
        self.assertEqual(len(response.data), 1)


    def test_trainer_connect_false_to_athlete(self):
        data = {"athlete_profile": UserConnectionsTestCase.athlete["id"], "trainer_profile": UserConnectionsTestCase.trainer["id"], "connect": False}
        response = self.client.post('http://localhost:8000/auth/trainer-athlete-connection/', data, HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_trainer), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["connect"], False)

        response = self.client.get('http://localhost:8000/auth/athlete-trainers/', HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_athlete), format='json')
        self.assertEqual(len(response.data), 0)

        response = self.client.get('http://localhost:8000/auth/trainer-athletes/', HTTP_AUTHORIZATION='Bearer {}'.format(UserConnectionsTestCase.access_trainer), format='json')
        self.assertEqual(len(response.data), 0)

