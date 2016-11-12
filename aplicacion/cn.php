<?php
$conexion = mysqli_connect("sisepuede.000webhostapp.com", "id180606_sisepuede", "123456789", "id180606_sisepuede") or die (mysqli_error());

if (!$conexion) {
    echo 'Error al conectar a la base de datos';
}
else {
    echo 'Conectado a la base de datos';
}