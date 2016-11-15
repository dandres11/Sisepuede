function guardarDatos(xNombreE, xEmail, xNomUE, xClave){

	var variables = { nombreE: xNombreE, emailE: xEmailE, nomUE: xNomUE, clave: xClave};

	var resultado = 0;

	console.log(variables);

	$.ajax({
		type: 'post',
		url: '../php/guardarDatos.php',
		async: true,
		data: variables,
		success: function(xResultado){
			//console.log(xResultado)
			var resultado = $.parseJSON(xResultado);
			console.log(resultado)
			if (resultado.Registrado == 1){
				alert('Datos guardados satisfactoriamente');
				limpiar();
				$("#tbNombre").focus();
			}else{

				alert('Datos no guardados');
			}
			
		}
	})

}