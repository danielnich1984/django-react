# Generated by Django 5.0.1 on 2024-01-16 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='bio',
            field=models.CharField(default='', max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='is_premium',
            field=models.BooleanField(default=False),
        ),
    ]