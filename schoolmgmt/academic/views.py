# academic/views.py
from rest_framework import viewsets
from .models import User, Student, AcademicLevel, GradeLevel, Attendance, FeeTransaction
from .serializers import (
    UserSerializer, StudentSerializer, AcademicLevelSerializer, 
    GradeLevelSerializer, AttendanceSerializer, FeeTransactionSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AcademicLevelViewSet(viewsets.ModelViewSet):
    queryset = AcademicLevel.objects.all()
    serializer_class = AcademicLevelSerializer

class GradeLevelViewSet(viewsets.ModelViewSet):
    queryset = GradeLevel.objects.all()
    serializer_class = GradeLevelSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class FeeTransactionViewSet(viewsets.ModelViewSet):
    queryset = FeeTransaction.objects.all()
    serializer_class = FeeTransactionSerializer