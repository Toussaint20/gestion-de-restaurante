# Generated by Django 5.1.3 on 2024-12-15 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_mesa_pedidoencurso'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='estado',
            field=models.CharField(choices=[('pendiente', 'Pendiente'), ('en_proceso', 'En Proceso'), ('finalizado', 'Finalizado'), ('cancelado', 'Cancelado')], default='pendiente', max_length=10),
        ),
    ]