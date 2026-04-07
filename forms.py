# green_minds/forms.py
from django import forms
from .models import SchoolRegistration, EducatorVolunteer

class SchoolRegistrationForm(forms.ModelForm):
    class Meta:
        model = SchoolRegistration
        fields = '__all__'
        widgets = {
            'current_environmental_programs': forms.Textarea(attrs={'rows': 3}),
            'interest_reason': forms.Textarea(attrs={'rows': 4}),
        }

class EducatorVolunteerForm(forms.ModelForm):
    class Meta:
        model = EducatorVolunteer
        fields = '__all__'
        widgets = {
            'experience': forms.Textarea(attrs={'rows': 4}),
        }