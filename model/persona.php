<?php

require '../vendor/autoload.php';


$cliente = new MongoDB\Client("mongodb://localhost:27017");

if(isset($_POST['insertarPersona'])){

	$coleccion = $cliente->prueba->persona;


	$resultado = $coleccion->insertOne( $_POST['insertarPersona'] );


	echo "Inserted with Object ID '{$resultado->getInsertedId()}'";
	die;

}


if(isset($_POST['getSchemaPersona'])){

	$coleccion = $cliente->prueba->schemaform;

	$id="5b50e65152866b3600a3a42c";


	$schema = $coleccion->findOne( ['_id' =>  new MongoDB\BSON\ObjectID($id) ]) ;
	//$schema = $coleccion->findOne( ['_id' =>   new MongoDB/BSON/MongoId($id) ]); mal
	
	

	echo json_encode($schema);

	die;

}




?>