from rest_framework import status
from rest_framework.test import APITestCase
import json


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