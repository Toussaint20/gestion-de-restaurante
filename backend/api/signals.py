from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Pedido, Mesa, DetallePedido

@receiver(post_save, sender=Pedido)
def actualizar_estado_mesa(sender, instance, **kwargs):
    if instance.estado != 'pendiente':
        mesa = instance.mesa
        mesa.estado = 'ocupada'
        mesa.save()

@receiver(post_delete, sender=Pedido)
def liberar_mesa(sender, instance, **kwargs):
    mesa = instance.mesa
    if not Pedido.objects.filter(mesa=mesa).exists():
        mesa.estado = 'disponible'
        mesa.save()
