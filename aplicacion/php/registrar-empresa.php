<?php

$conexion = mysqli_connect("locahost","root","","registrar_empresa");

                $nombreE = $_POST["nombreE"];
                $emailE = $_POST["emailE"];
                $nomUE = $_POST["nomUE"];
                $clave = $_POST["password"];

    $sel = "SELECT * FROM usuario_empresa WHERE correo='$emailE'";

    $ejecutar = mysqli_query($conexion, $sel);

    $chequear_email = mysqli_num_rows($ejecutar);

    if($chequear_email == 1){
        echo "alert(el email ya se encuentra registrado, utuliza otro)";
        exit();
        
        
    }else{
        $insertar = "INSERT INTO usuario_empresa(nombre, correo, username, contraseña) VALUES('$nombreE' , '$emailE' , '$nomUE' , '$clave' , )";
        $ejecutar = mysqli_query($conexion, $insertar);
        
        if($ejecutar){
            echo "alert(su empresa ha sido registrada)";
        }
        
    }
        




?>