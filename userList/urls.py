from django.urls import include, path
# from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'user-word-list', views.UserListViewSet)

# Wires up the API using automatic URL routing.
# Additionally, includes login URLs for the browsable API.
urlpatterns = [
    # path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    path('', views.apiOverview, name="api-overview"),
    path('user-word-list/', views.UserListViewSet, name='user-word-list'),
    path('user-list-detail/<str:pk>/', views.userListDetail, name="user-list-detail"),
    path('user-word-create/', views.userWordCreate, name='user-word-create'),
    path('user-word-update/<str:pk>/', views.userWordUpdate, name="user-word-update"),
    path('user-word-delete/<str:pk>/', views.userWordDelete, name="user-word-delete")
]