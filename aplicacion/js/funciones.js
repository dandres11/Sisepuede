

function validarDatos(){
	if ($("#tbNombre").val()==""){
		alert('Debe ingresar el nombre');
		$("#tbNombre").focus();
		return false;
	}

	if ($("#tbApellidoPaterno").val() ==""){
		alert('Debe ingresar el apellido paterno');
		$("#tbApellidoPaterno").focus();
		return false;
	}

	if ($("#tbApellidoMaterno").val() ==""){
		alert('Debe ingresar el apellido materno');
		$("#tbApellidoMaterno").focus();
		return false;
	}

	if ($("#tbFecha").val() ==""){
		alert('Debe ingresar la fecha');
		$("#tbFecha").focus();
		return false;
	}
		
	return true;
}