from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from datetime import datetime
from .models import Group, Event, UserProfile, Member, Comment, Bet
from .serializers import BetSerializer, GroupSerializer, GroupFullSerializer, EventSerializer, UserSerializer, UserProfileSerializer, ChangePasswordSerializer, MemberSerializer, CommentSerializer, EventFullSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
import pytz

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(methods=['PUT'], detail=True, serializer_class=ChangePasswordSerializer, permission_classes=(IsAuthenticated,))
    def change_password(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'message': 'Wrong old password'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'message': 'Password Updated'}, status=status.HTTP_200_OK)

class UserProfileViewset(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

class CommentViewset(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class GroupViewset(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GroupFullSerializer(instance, many=False, context={'request':request})
        return Response(serializer.data)


class EventViewset(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = EventFullSerializer(instance, many=False, context={'request':request})
        return Response(serializer.data)

class MemberViewset(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    @action(methods=['POST'], detail=False)
    def join(self, request):
        if 'group' in request.data and 'user' in request.data:
            try:
                group = Group.objects.get(id=request.data['group'])
                user = User.objects.get(id=request.data['user'])

                member = Member.objects.create(group=group, user=user, admin=False)
                serializer = MemberSerializer(member, many=False)
                response = {'message': 'Joined Group', 'results': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                response = {'message': 'Cannot join'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
                               
        else:
            response = {'message': 'Wrong Params'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
    @action(methods=['POST'], detail=False)
    def leave(self, request):
        if 'group' in request.data and 'user' in request.data:
            try:
                group = Group.objects.get(id=request.data['group'])
                user = User.objects.get(id=request.data['user'])
                member = Member.objects.get(group=group, user=user)
                member.delete()
                serializer = MemberSerializer(member, many=False)
                response = {'message': 'Left Group', 'results': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                response = {'message': 'Cannot leave group'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
                               
        else:
            response = {'message': 'Wrong Params'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

class BetViewset(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        response = {"message": "Method not allowed"}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def update(self, request, *args, **kwargs):
        response = {"message": "Method not allowed"}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @action(detail=False, methods=['POST'], url_path='place_bet')
    def place_bet(self, request):
        if 'event' in request.data and 'score1' in request.data and 'score2' in request.data:
            event_id = request.data['event']
            event = Event.objects.get(id=event_id)

            #Check if user is in group
            in_group = self.checkifUserInGroup(event, request.user)


            if event.time > datetime.now(pytz.UTC) and in_group:

                score1 = request.data['score1']
                score2 = request.data['score2']

                try:
                    #Update Here
                    my_bet = Bet.objects.get(events=event_id, user=request.user.id)
                    my_bet.score1 = score1
                    my_bet.score2 = score2
                    my_bet.save()
                    serializer = BetSerializer(my_bet, many=False)
                    response = {"message": "Bet Updated", "new": False, "results": serializer.data}
                    return Response(response, status=status.HTTP_200_OK)
                except:
                    #Create Here
                    my_bet = Bet.objects.create(events=event, user=request.user, score1=score1, score2=score2)
                    serializer = BetSerializer(my_bet, many=False)
                    response = {"message": "Bet Created", "new": True, "results": serializer.data}
                    return Response(response, status=status.HTTP_200_OK)

            else:
                response = {"message": "You can't place a bet. Too late!"}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
                
        else:
            response = {"message": "Wrong Params"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
    def checkifUserInGroup(self, event, user):
        try:
            return Member.objects.get(user=user, group=event.group)
        except:
            return False


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = User.objects.get(id=token.user_id)
        serializer = UserSerializer(user, many=False)
        return Response({ 'token': token.key, 'user': serializer.data })