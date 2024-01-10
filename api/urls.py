from api import views
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'groups', views.GroupViewset)
router.register(r'events', views.EventViewset)
                
urlpatterns = [
    path(r'', include(router.urls)),
]
