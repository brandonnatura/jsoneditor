<?php

require '../vendor/autoload.php';


require 'connect_db.php';


//$cliente = new MongoDB\Client("mongodb://localhost:27017");

if(isset($_POST['updateSchemaQaPost'])){


	try {
        $postid= $_POST['updateSchemaQaPost']['qaPostId'];

		$newSchema= json_decode($_POST['updateSchemaQaPost']['newSchema']);
		//$schema= $newSchema['schema'];


		$content= $_POST['updateSchemaQaPost']['content'];
		$categoryId= $_POST['updateSchemaQaPost']['categoryid'];

		$schema = json_encode($newSchema->schema); 


		$query = "UPDATE  qa_posts SET content='".$content."' WHERE  postid=".$postid;
		$result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());


		$query = "UPDATE  qa_categories SET schema='".$schema."' WHERE  categoryid=".$categoryId;
		$result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());

		echo "Actualizado correctamente!";
    } catch (Exception $e) {
        echo 'Ha habido una excepción: ' . $e->getMessage() ;
    }
	
	
	die;

}


if(isset($_POST['getSchema'])){

	$query = 'SELECT  postid, categoryid, c.title, p.title, p.content, c.schema FROM qa_posts p INNER JOIN  qa_categories c USING (categoryid) WHERE  postid='.$_POST['getSchema'].' LIMIT 1';
	$result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());
	$qa_posts = pg_fetch_array($result, NULL, PGSQL_ASSOC);

	echo json_encode($qa_posts);

	die;

}










?>