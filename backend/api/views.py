from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Pedido, Mesa, Empleado, Inventario, DetallePedido, Usuarios, Menu, IngredienteMenu 
from .serializers import PedidoSerializer, MesaSerializer, EmpleadoSerializer, InventarioSerializer, DetallePedidoSerializer, UsuarioSerializer, MenuSerializer, IngredienteMenuSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response


class MesaViewSet(viewsets.ModelViewSet):
    queryset = Mesa.objects.all()
    serializer_class = MesaSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.prefetch_related('detallepedido_set').all()
    serializer_class = PedidoSerializer

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer

class DetallePedidoViewSet(viewsets.ModelViewSet):
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer

class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuarioSerializer

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class IngredienteMenuViewSet(viewsets.ModelViewSet):
    queryset = IngredienteMenu.objects.all()
    serializer_class = IngredienteMenuSerializer
    
# Para obtener el token (login)
class MyTokenObtainPairView(TokenObtainPairView):
    pass

# Para refrescar el token
class MyTokenRefreshView(TokenRefreshView):
    pass

#actualización de estado de mesa
class ActualizarEstadoMesaView(APIView):
    def post(self, request, mesa_id):
        try:
            mesa = Mesa.objects.get(id=mesa_id)
            nuevo_estado = request.data.get('estado')
            if nuevo_estado not in ['disponible', 'ocupada']:
                return Response({'error': 'Estado no válido'}, status=status.HTTP_400_BAD_REQUEST)
            mesa.estado = nuevo_estado
            mesa.save()
            return Response(MesaSerializer(mesa).data, status=status.HTTP_200_OK)
        except Mesa.DoesNotExist:
            return Response({'error': 'Mesa no encontrada'}, status=status.HTTP_404_NOT_FOUND)

#Visualizar pedido en curso de la mesa
class PedidoEnCursoView(APIView):
    def get(self, request, mesa_id):
        try:
            # Busca un pedido con estado 'pendiente' o 'en_proceso' para la mesa
            pedido_en_curso = Pedido.objects.filter(mesa=mesa_id, estado__in=['pendiente', 'en_proceso']).first()
            
            if not pedido_en_curso:
                return Response({"detail": "La mesa no tiene un pedido en curso."}, status=404)
            
            # Serializa el pedido
            serializer = PedidoSerializer(pedido_en_curso)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)