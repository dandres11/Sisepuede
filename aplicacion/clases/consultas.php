<?php
/*
* @file : consultas.php.
* @class : consultas 
* @brief : consultas asociadas al negocio de la aplicacion.
*
*/
class consultas
{
    //Definicion de atributos de la clase
    var $con_sql; 
		
		
    /*
    * @method : m_consultas()
    * @brief : Metodo constructor
    * @param: No aplica.
    * @return: atributo m_con_sql en vacio
    */
    function consultas()
    {
        $this->con_sql=""; 
    }
		
    /*
    * @method : m_con_listarPersonas()
    * @brief :  
    * @param: $buscar: criterio de busqueda.
    * @return: devuelve cadena con la consulta sql
    */
  
    function con_listar_temas() {        
        $this->con_sql ="SELECT * FROM temas";
        return($this->con_sql);
    }
    
}
?>