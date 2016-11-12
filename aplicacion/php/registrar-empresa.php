<?php
require("../clases/bdatos.php");
$nombre = $_GET['name'];
$correo = $_GET['email'];

$obj_bd = new bdatos();

$obj_bd->bd_insertar("registrar_empresa", "nombre, correo", $nombre.",".$correo);
var_dump($obj_bd);
?>