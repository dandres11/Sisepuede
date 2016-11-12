function registrar_empresa(){
    
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    alert(nombre);
    alert(correo);
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('si ajax');
        }
    };
    xmlhttp.open("POST", "https://sis.000webhostapp.com/registrar-empresa.php?name=" + nombre + "&email=" + correo);
    xmlhttp.send();
    
   
}
//Fin de la validación