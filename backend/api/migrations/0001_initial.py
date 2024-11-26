# Generated by Django 5.1.3 on 2024-11-26 03:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('cargo', models.CharField(choices=[('mesero', 'Mesero'), ('cocinero', 'Cocinero'), ('supervisor', 'Supervisor'), ('administrador', 'Administrador')], max_length=50)),
                ('telefono', models.CharField(blank=True, max_length=20, null=True)),
                ('correo', models.EmailField(blank=True, max_length=254, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Inventario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_producto', models.CharField(max_length=100)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('cantidad', models.IntegerField()),
                ('unidad_medida', models.CharField(choices=[('unidad', 'Unidad'), ('litro', 'Litro'), ('gramo', 'Gramo'), ('kg', 'Kilogramo'), ('ml', 'Mililitro')], max_length=10)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_plato', models.CharField(max_length=100)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Mesa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero_mesa', models.IntegerField(unique=True)),
                ('capacidad', models.IntegerField()),
                ('estado', models.CharField(choices=[('disponible', 'Disponible'), ('ocupada', 'Ocupada')], default='disponible', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateTimeField()),
                ('total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('estado', models.CharField(choices=[('pendiente', 'Pendiente'), ('preparando', 'Preparando'), ('servido', 'Servido')], default='pendiente', max_length=10)),
                ('empleado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.empleado')),
                ('mesa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.mesa')),
            ],
        ),
        migrations.CreateModel(
            name='DetallePedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField()),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.menu')),
                ('pedido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.pedido')),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_usuario', models.CharField(max_length=50, unique=True)),
                ('contrasena', models.CharField(max_length=255)),
                ('tipo_usuario', models.CharField(choices=[('mesero', 'Mesero'), ('cocinero', 'Cocinero'), ('supervisor', 'Supervisor'), ('administrador', 'Administrador')], max_length=50)),
                ('empleado', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.empleado')),
            ],
        ),
    ]
