from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Administrator'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('parent', 'Parent'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    phone_number = models.CharField(max_length=15, blank=True)

    # Adding these avoids the 'user_set' clash directly
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='academic_user_groups', # Custom name
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='academic_user_permissions', # Custom name
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

# 2. Academic Structure
class AcademicLevel(models.Model):
    name = models.CharField(max_length=50) # e.g., Senior Secondary

class GradeLevel(models.Model):
    level = models.ForeignKey(AcademicLevel, on_delete=models.CASCADE)
    name = models.CharField(max_length=20) # e.g., Grade 9
    section = models.CharField(max_length=10) # e.g., A

# 3. Student Records
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    admission_no = models.CharField(max_length=20, unique=True)
    grade = models.ForeignKey(GradeLevel, on_delete=models.SET_NULL, null=True)
    enrollment_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Enrolled')

# 4. Attendance & Fees
class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=1, choices=[('P','Present'), ('A','Absent'), ('L','Leave')])

class FeeTransaction(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    fee_type = models.CharField(max_length=50)
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20) # Paid, Overdue
