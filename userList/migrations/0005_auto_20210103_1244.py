# Generated by Django 3.1.1 on 2021-01-03 12:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userList', '0004_auto_20210103_1241'),
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
