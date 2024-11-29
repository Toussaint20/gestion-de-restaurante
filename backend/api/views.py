# api/views.py
from rest_framework import viewsets
from .models import Pedido
from .serializers import PedidoSerializer
from .models import Mesa
from .serializers import MesaSerializer

class MesaViewSet(viewsets.ModelViewSet):
    queryset = Mesa.objects.all()
    serializer_class = MesaSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

