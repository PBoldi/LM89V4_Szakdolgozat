# Generated by Django 4.2.4 on 2023-10-01 08:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API_Authentication', '0002_athleteprofile_biography'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAthleteConnection',
            fields=[
                ('id', models.AutoField(db_column='ID', primary_key=True, serialize=False)),
                ('connect', models.BooleanField(db_column='Connect')),
                ('athlete_profile', models.ForeignKey(db_column='AthleteProfile', on_delete=django.db.models.deletion.CASCADE, to='API_Authentication.athleteprofile')),
                ('user', models.ForeignKey(db_column='User', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'UserAthleteConnections',
            },
        ),
        migrations.CreateModel(
            name='UserTrainerConnection',
            fields=[
                ('id', models.AutoField(db_column='ID', primary_key=True, serialize=False)),
                ('connect', models.BooleanField(db_column='Connect')),
                ('trainer_profile', models.ForeignKey(db_column='TrainerProfile', on_delete=django.db.models.deletion.CASCADE, to='API_Authentication.trainerprofile')),
                ('user', models.ForeignKey(db_column='User', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'UserTrainerConnections',
            },
        ),
        migrations.RemoveField(
            model_name='userconnection',
            name='connection_type',
        ),
        migrations.RemoveField(
            model_name='userconnection',
            name='user1',
        ),
        migrations.RemoveField(
            model_name='userconnection',
            name='user2',
        ),
        migrations.DeleteModel(
            name='ConnectionType',
        ),
        migrations.DeleteModel(
            name='UserConnection',
        ),
    ]
