# green_minds/views.py
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import SchoolRegistrationForm, EducatorVolunteerForm

def register_school(request):
    if request.method == 'POST':
        form = SchoolRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Thank you! Your school registration has been submitted successfully.')
            return redirect('school_registration_success')
    else:
        form = SchoolRegistrationForm()
    
    return render(request, 'register_school.html', {'form': form})

def volunteer_educator(request):
    if request.method == 'POST':
        form = EducatorVolunteerForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Thank you for volunteering! Your application has been submitted.')
            return redirect('volunteer_success')
    else:
        form = EducatorVolunteerForm()
    
    return render(request, 'volunteer_educator.html', {'form': form})

def school_registration_success(request):
    return render(request, 'school_registration_success.html')

def volunteer_success(request):
    return render(request, 'volunteer_success.html')