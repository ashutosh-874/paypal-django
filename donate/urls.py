from django.urls import path
from .views import HomeView, sendMail

urlpatterns = [
    path('', HomeView.as_view(), name = 'home'),
    path('send-mail/', sendMail, name = 'send_mail'),
]