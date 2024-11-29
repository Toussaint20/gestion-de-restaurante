# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PedidoViewSet
from .views import MesaViewSet

router = DefaultRouter()
router.register(r'pedidos', PedidoViewSet)
router.register(r'mesas', MesaViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

urlpatterns = [
    path('api/', include(router.urls)),  # Incluye las rutas creadas por el router
]