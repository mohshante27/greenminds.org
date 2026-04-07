# green_minds/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('register-school/', views.register_school, name='register_school'),
    path('volunteer-educator/', views.volunteer_educator, name='volunteer_educator'),
    path('school-registration-success/', views.school_registration_success, name='school_registration_success'),
    path('volunteer-success/', views.volunteer_success, name='volunteer_success'),
]