<?php

require '../vendor/autoload.php';


require 'connect_db.php';


//$cliente = new MongoDB\Client("mongodb://localhost:27017");

if(isset($_POST['updateSchemaQaPost'])){

	$postid= $_POST['updateSchemaQaPost']['qaPostId'];
	$newSchema= json_decode($_POST['updateSchemaQaPost']['newSchema']);
	$content= $_POST['updateSchemaQaPost']['content'];
	$categoryId= $_POST['updateSchemaQaPost']['categoryid'];
	$schema = json_encode($newSchema->schema); 
	$title = "@Prueba";
	try {

		if($postid != null){

			$query = "UPDATE  qa_posts SET content='".$content."' WHERE  postid=".$postid;
			$result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());


			$query = "UPDATE  qa_categories SET schema='".$schema."' WHERE  categoryid=".$categoryId;
			$result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());

			echo "Actualizado correctamente!";
		}else{
			$query = "INSERT INTO  qa_posts (categoryid, title, content, type) VALUES ("
				."'".$categoryId."',"
				."'".$title."',"
				."'".$content."',"
				."'Q'"
				.") RETURNING postid; ";

			$result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());
			$res=pg_fetch_array($result, NULL, PGSQL_ASSOC);
			echo "Actualizado correctamente  con el id ".$res['postid']."!";

		}
        
    } catch (Exception $e) {
        echo 'Ha habido una excepción: ' . $e->getMessage() ;
    }
	
	
	die;

}


if(isset($_POST['getSchema'])){

	try {

	$query = 'SELECT  postid, categoryid, c.title AS titlecategory, p.title AS titleqaposts , p.content, c.schema FROM qa_posts p INNER JOIN  qa_categories c USING (categoryid) WHERE  postid='.$_POST['getSchema'].' LIMIT 1';
	$result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());
	$qa_posts = pg_fetch_array($result, NULL, PGSQL_ASSOC);

	echo json_encode($qa_posts);
	} catch (Exception $e) {
		echo 'Ha habido una excepción: ' . $e->getMessage() ;
	}

	die;

}

if(isset($_POST['getSchemaByCategory'])){

	try {
		$query = 'SELECT  *  FROM qa_categories WHERE  categoryid='.$_POST['getSchemaByCategory'].' LIMIT 1';
		$result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());
		$category = pg_fetch_array($result, NULL, PGSQL_ASSOC);
		echo json_encode($category);
	}catch (Exception $e) {
		echo 'Ha habido una excepción: ' . $e->getMessage() ;
	}

	die;
}










?>