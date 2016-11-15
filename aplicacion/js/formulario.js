function Controlador($scope, $log) {

  $scope.registrar = function(usuario) {
    $log.info('Usuario: ');
    $log.info(usuario);
    $log.info('fue registrado correctamente!');
  };
};