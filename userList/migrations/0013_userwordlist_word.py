# Generated by Django 3.1.1 on 2021-01-03 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userList', '0012_userwordlist_definition'),
    ]

    operations = [
        migrations.AddField(
            model_name='userwordlist',
            name='word',
            field=models.CharField(default='', max_length=240),
        ),
    ]
