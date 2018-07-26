<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>JSON Editor</title>

  <script src="../../js/libs/json-editor.js"></script>
  <script src="../../js/libs/jquery_3.3.1.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>



  <link rel="stylesheet" id="theme_stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css'>
  <link rel='stylesheet' href='../../css/styles.css'>

  <script>
    // Set the default CSS theme and icon library globally
    JSONEditor.defaults.theme = 'bootstrap3';
    JSONEditor.defaults.iconlib = 'fontawesome4';

    </script>
  </head>
  <body>

    <?php

      require_once '../../model/connect_db.php';

      $id=null;

      $query= "SELECT * FROM qa_categories";
      $result = pg_query($query) or die('La consulta fallo: ' . pg_last_error());



    ?>



    

    <div class="container">


      <div class="row">
        <div class="medium-12-columns">
          <div class="form-group">
            <label for="sel1">Categoria:</label>
            <select class="form-control" id="selectCategorias" onChange="getSchema()">
              <option value="0">Seleccione</option>
              <?php while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) { ?>
                <option value="<?php echo $line['categoryid']?>"><?php echo $line['title']; ?></option>
              <?php } ?>

            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="medium-12-columns">
          <input id="qa_post_id" type="hidden" value="<?php echo $id; ?>" >
          <div id='editor_holder' class='medium-12 columns'></div>
          <div id='editor'></div>
        </div>
      </div>

      <div class="row">
        <div class='medium-12-columns'>
          <button id='submit' class='btn btn-primary'>Almacenar</button>
          <button id='submit' class='btn btn-danger' onclick="showRequeridosModal()"> <i class="fa fa-check-square-o"></i> Requeridos</button>
          <span id='valid_indicator' class='label'></span>
        </div>
      </div>

    </div>

  

    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Modal Header</h4>
          </div>
          <div class="modal-body" id="modal-body-div">
            <div class="form-group">
              <label for="comment">Schema</label>
              <textarea id="textAreaSchema" class="form-control" rows="5" id="comment"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="btn-modal-schema" class="btn btn-primary"  data-dismiss="modal">Crear</button>
          </div>
        </div>

      </div>
    </div>


</body>

<script src="../../js/json-editor-persona.js?version=1"></script>
</html>
