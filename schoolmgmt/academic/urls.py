# academic/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, StudentViewSet, AcademicLevelViewSet, 
    GradeLevelViewSet, AttendanceViewSet, FeeTransactionViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'students', StudentViewSet)
router.register(r'levels', AcademicLevelViewSet)
router.register(r'grades', GradeLevelViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'fees', FeeTransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]