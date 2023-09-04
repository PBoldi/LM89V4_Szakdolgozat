from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class AthleteProfile(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table = 'AthleteProfile'


class TrainerProfile(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table = 'TrainerProfile'

    biography = models.CharField(blank=True, db_column='Biography', max_length=1000)
    certificate = models.ImageField(blank=True, db_column='Certificate', max_length=1000, upload_to='API_Authentication/user/certificate/')
    is_available_online = models.BooleanField(db_column='IsAvailableOnline', default=False)
    is_dietician = models.BooleanField(db_column='IsDietician', default=False)
    price_per_hour = models.PositiveIntegerField(db_column='PricePerHour', default=0)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        user = self.model(email=self.normalize_email(email), email_notification=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table = 'Users'

    birth_date = models.DateField(db_column='BirthDate', null=True)
    email = models.EmailField(db_column='Email', max_length=50, unique=True)
    first_name = models.CharField(blank=True, db_column='FirstName', max_length=255)
    last_name = models.CharField(blank=True, db_column='LastName', max_length=255)
    profile_picture = models.ImageField(blank=True, db_column='ProfilePicture', max_length=1000, upload_to='API_Authentication/user/image/')
    sex = models.BooleanField(db_column='Sex (1 stands for male)', null=True)
    is_admin = models.BooleanField(db_column='IsAdmin', default=False)

    athlete_profile = models.ForeignKey(AthleteProfile, db_column='AthleteProfileID', on_delete=models.SET_NULL, null=True)
    trainer_profile = models.ForeignKey(TrainerProfile, db_column='TrainerProfileID', on_delete=models.SET_NULL, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    @property
    def full_name(self):
        return f'{self.last_name} {self.first_name}' if self.first_name and self.last_name else None

    @property
    def is_staff(self):
        return self.is_admin

    def __str__(self):
        return self.email
    

class AthleteQuestionTest(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table = 'AthleteQuestionTest'

    athlete_profile = models.ForeignKey(AthleteProfile, db_column='AthleteProfileID', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True,db_column='TimeStamp')


class ConnectionType(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table = 'ConnectionType'
    
    connection_type = models.CharField(db_column='ConnectionType', max_length=255)


class PersonQuestion(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table = 'PersonQuestions'

    question = models.CharField(db_column='Question', max_length=1000)
    weight = models.PositiveIntegerField(db_column='Weight', default=0)


class PersonQuestionWeighing(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table = 'PersonQuestionWeighings'

    athlete_question_test = models.ForeignKey(AthleteQuestionTest, db_column='AthleteQuestionTestID', on_delete=models.CASCADE)
    person_question = models.ForeignKey(PersonQuestion, db_column='PersonQuestionID', on_delete=models.CASCADE)
    
    weight = models.PositiveIntegerField(db_column='Weight', default=0)


class Sport(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table = 'Sports'

    name = models.CharField(db_column='Name', max_length=255)


class TrainerRating(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table = 'TrainerRatings'

    athlete_profile = models.ForeignKey(AthleteProfile, db_column='AthleteProfileID', on_delete=models.CASCADE)
    trainer_profile = models.ForeignKey(TrainerProfile, db_column='TrainerProfileID', on_delete=models.CASCADE)

    rating = models.PositiveIntegerField(db_column='Rating', default=0)


class UserConnection(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table= 'UserConnections'
    
    connection_type = models.ForeignKey(ConnectionType, db_column='ConnectionTypeID', on_delete=models.CASCADE)
    user1 = models.ForeignKey(User, db_column='User1ID', on_delete=models.CASCADE, related_name='user1')
    user2 = models.ForeignKey(User, db_column='User2ID', on_delete=models.CASCADE, related_name='user2')


class UserSport(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)

    class Meta:
        db_table = 'UserSports'

    sport = models.ForeignKey(Sport, db_column='SportID', on_delete=models.CASCADE)
    user = models.ForeignKey(User, db_column='UserID', on_delete=models.CASCADE)