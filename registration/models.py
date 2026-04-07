# green_minds/models.py
from django.db import models

class SchoolRegistration(models.Model):
    school_name = models.CharField(max_length=255)
    school_type = models.CharField(max_length=100, choices=[
        ('primary', 'Primary School'),
        ('secondary', 'Secondary School'),
        ('mixed', 'Mixed Primary & Secondary'),
    ])
    location = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    number_of_students = models.IntegerField()
    current_environmental_programs = models.TextField(blank=True)
    interest_reason = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.school_name

class EducatorVolunteer(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    profession = models.CharField(max_length=255)
    area_of_expertise = models.CharField(max_length=255, choices=[
        ('environmental_science', 'Environmental Science'),
        ('agriculture', 'Agriculture/Gardening'),
        ('waste_management', 'Waste Management'),
        ('education', 'Education/Teaching'),
        ('other', 'Other'),
    ])
    availability = models.CharField(max_length=100, choices=[
        ('weekends', 'Weekends'),
        ('weekdays', 'Weekdays'),
        ('both', 'Both Weekends and Weekdays'),
        ('flexible', 'Flexible'),
    ])
    experience = models.TextField()
    preferred_school_level = models.CharField(max_length=100, choices=[
        ('primary', 'Primary School'),
        ('secondary', 'Secondary School'),
        ('both', 'Both'),
    ])
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.full_name