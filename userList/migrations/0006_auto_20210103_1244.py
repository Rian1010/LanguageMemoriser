# Generated by Django 3.1.1 on 2021-01-03 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userList', '0005_auto_20210103_1244'),
    ]

    operations = [
        migrations.AddField(
            model_name='userwordlist',
            name='definition',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
        migrations.AddField(
            model_name='userwordlist',
            name='word',
            field=models.CharField(blank=True, max_length=240, null=True),
        ),
    ]
