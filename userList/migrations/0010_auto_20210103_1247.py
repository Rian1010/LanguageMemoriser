# Generated by Django 3.1.1 on 2021-01-03 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userList', '0009_auto_20210103_1247'),
    ]

    operations = [
        migrations.AddField(
            model_name='userwordlist',
            name='definition',
            field=models.CharField(default='', max_length=240),
        ),
        migrations.AddField(
            model_name='userwordlist',
            name='word',
            field=models.CharField(default='', max_length=240),
        ),
    ]