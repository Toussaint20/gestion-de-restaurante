from django.db import models

# Tabla Mesas
class Mesa(models.Model):
    numero_mesa = models.IntegerField(unique=True)
    capacidad = models.IntegerField()
    estado = models.CharField(
        max_length=10,
        choices=[('disponible', 'Disponible'), ('ocupada', 'Ocupada')],
        default='disponible'
    )

    def __str__(self):
        return f"Mesa {self.numero_mesa}"

# Tabla Empleados
class Empleado(models.Model):
    CARGOS = [
        ('mesero', 'Mesero'),
        ('cocinero', 'Cocinero'),
        ('supervisor', 'Supervisor'),
        ('administrador', 'Administrador'),
    ]
    nombre = models.CharField(max_length=100)
    cargo = models.CharField(max_length=50, choices=CARGOS)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    correo = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.nombre

# Tabla Menú
class Menu(models.Model):
    nombre_plato = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre_plato

# Tabla Pedidos
class Pedido(models.Model):
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('preparando', 'Preparando'),
        ('servido', 'Servido'),
    ]
    mesa = models.ForeignKey(Mesa, on_delete=models.CASCADE)
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    fecha = models.DateTimeField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='pendiente')

    def __str__(self):
        return f"Pedido {self.id} - Mesa {self.mesa.numero_mesa}"

# Tabla Detalles de Pedidos
class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.cantidad}x {self.menu.nombre_plato}"

# Tabla Inventario
class Inventario(models.Model):
    UNIDAD_MEDIDA = [
        ('unidad', 'Unidad'),
        ('litro', 'Litro'),
        ('gramo', 'Gramo'),
        ('kg', 'Kilogramo'),
        ('ml', 'Mililitro'),
    ]
    nombre_producto = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    cantidad = models.IntegerField()
    unidad_medida = models.CharField(max_length=10, choices=UNIDAD_MEDIDA)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre_producto

# Tabla Usuarios
class Usuario(models.Model):
    TIPO_USUARIO = [
        ('mesero', 'Mesero'),
        ('cocinero', 'Cocinero'),
        ('supervisor', 'Supervisor'),
        ('administrador', 'Administrador'),
    ]
    empleado = models.OneToOneField(Empleado, on_delete=models.CASCADE)
    nombre_usuario = models.CharField(max_length=50, unique=True)
    contrasena = models.CharField(max_length=255)
    tipo_usuario = models.CharField(max_length=50, choices=TIPO_USUARIO)

    def __str__(self):
        return self.nombre_usuario
