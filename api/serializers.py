from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Group, Event, UserProfile

class EventSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Event
        fields = ('id', 'team1', 'team2', 'time', 'score1', 'score2', 'group')

class GroupSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Group
        fields = ('id', 'name', 'location', 'description')

class GroupFullSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True)
    class Meta: 
        model = Group
        fields = ('id', 'name', 'location', 'description', 'events')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'image')

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ('id', 'username', 'profile')