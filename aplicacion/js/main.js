$(document).on('ready' , funcPrincipal);

function funcPrincipal()
{
    $('#loginEm').on('click' , funcVerificar);
}


function funcVerificar()
{
    var valorEscrito = $("InputEmail").val();
    $.get("../php/loginEm.php?correo="+valorEscrito, function(data){
         alert('respuesta del servidor:'+ data);
    })
          
          
    $('#respuesta').text('funciona el login')
}