<?php
    
    $correo = $_GET['InputEmail'];
    $contraseña = $_GET['InputPassword'];

    $con = mysqli_conect("localhost", "root", "", "registrar_empresa");
    $ result = mysqli_query($con, "SELECT * FROM usuario_empresa WHERE correo, contraseña = '".$correo.$contraseña."'")
     if (mysqli_num_rows($result)>0 )
         echo "gracias por ingresar";
    else echo "no se encuentra registrado ";
         
?>