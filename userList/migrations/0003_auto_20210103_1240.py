# Generated by Django 3.1.1 on 2021-01-03 12:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userList', '0002_auto_20200907_1156'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userwordlist',
            name='definition',
        ),
        migrations.RemoveField(
            model_name='userwordlist',
            name='word',
        ),
    ]