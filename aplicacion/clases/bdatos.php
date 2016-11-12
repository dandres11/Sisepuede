<?php
class bdatos
{

	//Definicion de atributos de la clase
	var $bd_nombre;
	var $bd_clave;
	var $bd_ip_host;
	var $bd_usuario;
	var $bd_conexion;
	var $bd_resultado;
	var $bd_nregistros;
	var $bd_registro;
    var $filasAfectadas;

	/*
	* @method :bdatos()
	* @brief :  Metodo para definir los atributos de la clase bdatos          
	* @param: 
	* @return: 
	*/
	function bdatos()
	{
		//("localhost", "root", "", "powermen");
		//("localhost", "powermen_web", "webweb", "powermen_powermen")		
		$this->bd_nombre="ihc";
        $this->bd_clave="";
        $this->bd_ip_host="localhost";
        $this->bd_usuario="root";
		
	}

	/*
	* @method : bd_conectar()
	* @brief :  Metodo para conectar la base de datos ($servidor,$usuario,$clave,$nombre)
	* @param:$servidor,$usuario,$clave,$nombre
	* @return: devuelve TRUE si se encuentra concetado, de lo contrario devuelve FALSE.(error de conexion)
	*/
	function bd_conectar($servidor,$usuario,$clave,$nombre)
	{
		$conectado=true;
		$this->bd_conexion= new mysqli($servidor,$usuario,$clave,$nombre);
		if(!$this->bd_conexion)
		{
			$conectado=false;
			die("Error de conexion a la base de datos: ".mysqli_connect_error());            
		}		
		return($conectado);
	}
	
	/*
	* @method : bd_desconectar)
	* @brief :  Metodo para desconectar la base de datos ($servidor,$usuario,$clave,$nombre)
	* @param: no tiene
	* @return: no tiene
	*/
	function bd_desconectar()
	{
		$this->bd_conexion->close();
	}

	/*
	* @method : bd_consultar
	* @brief :  Metodo para consultar base de datos
	* @param:$sql
	* @return:
	*/
	function bd_consultar($sql)
	{
	    $this->bd_conectar($this->bd_ip_host, $this->bd_usuario, $this->bd_clave,$this->bd_nombre);
	    $this->bd_resultado=$this->bd_conexion->query($sql);
        $res=$this->bd_resultado;
	    $this->bd_desconectar();	    
		//$this->bd_nregistros= $res->num_rows;
        //$this->filasAfectadas = $this->bd_conexion->affected_rows;
	}
	
	/*
	* @method : bd_insertar
	* @brief :  Metodo para insrtar ($tabla, $campo, $valores)
	* @param:$tabla, $campo, $valores
	* @return: sql
	*/
	function bd_insertar($tabla, $campo, $valores)
	{
		$sql="INSERT INTO ".$tabla." (".$campo.") VALUES (".$valores.");";
		$this->bd_consultar($sql);
		return($sql);
	}
	
	/*
	* @method : bd_eliminar($tabla, $campo, $codigo)
	* @brief :  Metodo para eliminar ($tabla, $campo, $codigo)
	* @param:$tabla, $campo, $codigo
	* @return: $sql
	*/
	function bd_eliminar($tabla, $campo, $codigo)
	{
		$sql="DELETE FROM ".$tabla." WHERE ".$campo. " = ".$codigo;
		$this->bd_consultar($sql);
		return($sql);
	}

	/*
	* @method : bd_modificar
	* @brief :  Metodo para modificar ($tabla, $campoyvalores, $condicion)
	* @param:($tabla, $campoyvalores, $condicion)
	* @return: 
	*/
	function bd_modificar($tabla, $campoyvalores, $condicion)
	{
		$sql="UPDATE ".$tabla." SET ".$campoyvalores. " WHERE ".$condicion;
		$this->bd_consultar($sql);
		return($sql);
	}

	/*
	* @method : bd_extraer
	* @brief :  Metodo para modificar ($tabla, $campoyvalores, $condicion)
	* @param: no tiene
	* @return: 
	*/
	function bd_extraer()
	{
		//Obtener una fila de resultado como un array asociativo
		$this->bd_registro = $this->bd_resultado->fetch_assoc();
		return ($this->bd_registro);
	}

	function comprobarConexion()
    {
        if(mysqli_connect_errno()) 
		{
			printf("Error de conexión: %s\n", mysqli_connect_error());
            exit();
        }
        else
        {return true;}
    }

    function insertarCont($tabla,$campos,$valores)
    {
        $mysqli = new mysqli("localhost", "root", "root", "powermen");
        //$mysqli = new mysqli("localhost", "powermen_web", "webweb", "powermen_powermen");
		/* verificiar la conexion */        
        if($this->comprobarConexion()==true)
        {
            // VALUES ('".$_POST['departamento_nombre']."', "."'".$_POST['departamento_descripcion']."', "."'".$lugar.$nombre."')";
			//$sql="INSERT INTO `depto`(`dep_nombre`, `dep_descripcion`, `dep_img`) VALUES (`".$_POST['departamento_nombre']."`, `".$_POST['departamento_descripcion']."`, `".$lugar."`)";                                    
            $sql="INSERT INTO $tabla($campos) VALUES ($valores)";                                    
            if ($mysqli->query($sql) == TRUE) 
            {    
                echo "<script language=javascript> window.location.href='contacto.html'</script>";
            }
            else 
            {
                echo "Error: " . $sql . "<br>" . $mysqli->error;
            }
			$mysqli->close();
        }
        echo "info: 2";
    }
    
    function respaldarServicio($servicio)
    {
        $this->bd_eliminar("tbl_respaldo_servicios", "ser_servicio", "'".$servicio."'");
        $this->bd_consultar("INSERT INTO tbl_respaldo_servicios SELECT * FROM tbl_servicios WHERE ser_servicio = '".$servicio."';");
    }

    function restaurarServicio($servicio)
    {
        $this->bd_eliminar("tbl_servicios", "ser_servicio", "'".$servicio."'");
        $this->bd_consultar("INSERT INTO tbl_servicios SELECT * FROM tbl_respaldo_servicios WHERE ser_servicio = '".$servicio."';");
    }
}        
?>