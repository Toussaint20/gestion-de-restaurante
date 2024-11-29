# proyecto/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),  # Asegúrate de incluir las urls de la app 'api'
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),  # Asegúrate de incluir las URLs de la app 'api'
]