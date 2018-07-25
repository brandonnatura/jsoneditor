
<?php


$usuario='david';
$pass='david2005';
$host='localhost';
$bd='agenti_conexiones_json';

$db = conectar_PostgreSQL($usuario,$pass,$host,$bd);


function conectar_PostgreSQL( $usuario, $pass, $host, $bd )
{
	$conexion = pg_connect( "user=".$usuario." ".
		"password=".$pass." ".
		"host=".$host." ".
		"dbname=".$bd
		) or die( "Error al conectar: ".pg_last_error() );
	return $conexion;
}


?>