<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>JSON Editor</title>

  <script src="../../js/libs/json-editor.js"></script>
  <script src="../../js/libs/jquery_3.3.1.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

  <!-- Foundation CSS framework (Bootstrap and jQueryUI also supported) -->
  <link rel="stylesheet" id="theme_stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <!-- <link rel='stylesheet' href='//cdn.jsdelivr.net/foundation/5.0.2/css/foundation.min.css'> -->
  <!-- Font Awesome icons (Bootstrap, Foundation, and jQueryUI also supported) -->
  <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css'>

</head>

<?php

require_once '../../model/connect_db.php';

$query = 'SELECT  postid, categoryid, c.title, p.title, p.content FROM qa_posts p INNER JOIN  qa_categories c USING (categoryid) ORDER BY categoryid DESC';
$result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());

// Imprimiendo los resultados en HTML


?>

<body>


  <div class="container">
    <div class='medium-12 columns'>
      <table class="table table-hover table-bordered">
        <thead class="thead-dark"> 
          <tr>
            <th scope="col">Postid</th>
            <th scope="col">Categoryid</th>
            <th scope="col">Title</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          <?php 
          while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
            ?>

            <tr>
              <td><?php echo $line['postid'] ; ?></td>
              <td><?php echo $line['categoryid'] ; ?></td>
              <td><?php echo $line['title'] ; ?></td>
              <td>
                <a type="button" class="btn btn-default" aria-label="Left Align" href="form.php?id=<?php echo $line['postid']; ?>" >
                  <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                </a>
              </td>
            </tr>

            <?php
          }
          ?>
        </tbody>
      </table>

    </div>

  </div>


</body>

</html>


