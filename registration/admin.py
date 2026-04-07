# green_minds/admin.py
from django.contrib import admin
from .models import SchoolRegistration, EducatorVolunteer

@admin.register(SchoolRegistration)
class SchoolRegistrationAdmin(admin.ModelAdmin):
    list_display = ('school_name', 'contact_person', 'email', 'location', 'timestamp')
    list_filter = ('school_type', 'timestamp')
    search_fields = ('school_name', 'contact_person', 'email')

@admin.register(EducatorVolunteer)
class EducatorVolunteerAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'profession', 'area_of_expertise', 'timestamp')
    list_filter = ('area_of_expertise', 'preferred_school_level', 'timestamp')
    search_fields = ('full_name', 'email', 'profession')