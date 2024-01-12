from api import views
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'groups', views.GroupViewset)
router.register(r'events', views.EventViewset)
router.register(r'users', views.UserViewSet)
                
urlpatterns = [
    path(r'', include(router.urls)),
    path('authenticate/', views.CustomObtainAuthToken.as_view())
]
