from rest_framework import serializers
from .models import User, Student, AcademicLevel, GradeLevel, Attendance, FeeTransaction

# 1. User Serializer (Handles passwords securely)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'phone_number', 'password']
        extra_kwargs = {'password': {'write_only': True}} # Password won't be sent back in JSON

    def create(self, validated_data):
        # Uses Django's built-in helper to hash the password properly
        return User.objects.create_user(**validated_data)

# 2. Basic Academic Serializers
class AcademicLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicLevel
        fields = '__all__'

class GradeLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradeLevel
        fields = '__all__'

# 3. Student Serializer (Includes nested data for your dashboard)
class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer() # Nest the user info inside the student
    
    class Meta:
        model = Student
        fields = ['user', 'admission_no', 'grade', 'status', 'enrollment_date']

# 4. Attendance & Fees
class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class FeeTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeTransaction
        fields = '__all__'