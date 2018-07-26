
var editor;
var $editor = document.getElementById('editor');

$(document).ready(function(){
	getSchema();
});


function getSchema(){
  var qaPostId= $('#qa_post_id').val();


  if(qaPostId != ''){

  	$.ajax({
          url: "../../model/qa_post.php",
          data: {getSchema:qaPostId},
          type: 'POST',
          success: function (json) {
              var currentSchema=JSON.parse(json);

              console.log(currentSchema.content);
              var startValue =  JSON.parse(currentSchema.content) ;

              localStorage.setItem('_currentSchema', JSON.stringify({schema: JSON.parse(currentSchema.schema)}));
              var element = document.getElementById('editor_holder');


      		    // Initialize the editor with a JSON schema
      		    editor = new JSONEditor(document.getElementById('editor_holder'),{
      		        schema: JSON.parse(currentSchema.schema),
                  startval: startValue,
                  disable_collapse: true,
                  disable_edit_json: true,
                  form_name_root: currentSchema.titleqaposts
      		    });


      		       // Hook up the submit button to log to the console
      		    document.getElementById('submit').addEventListener('click',function() {
      		        // Get the value from the editor
                  
                   
                  var data = JSON.stringify(editor.getValue());
                  var newSchema = localStorage.getItem('_currentSchema');
                  var categoryid =  currentSchema.categoryid;
                  updateSchema(qaPostId, newSchema, data, categoryid);
      		     });



          },
          error: function (xhr, status) {
              alert('Ocurrió un problema: ' + status);
          },
          complete: function (xhr, status) {
          }
      });
  }else{

      var categoyId =  $('#selectCategorias').val();

      if(categoyId != '0' ){
        var qaPostId = null;
        $.ajax({
            url: "../../model/qa_post.php",
            data: {getSchemaByCategory:categoyId},
            type: 'POST',
            success: function (json) {
                var currentSchema=JSON.parse(json);

                localStorage.setItem('_currentSchema', JSON.stringify({schema: JSON.parse(currentSchema.schema)}));
                var element = document.getElementById('editor_holder');


                if(editor) editor.destroy();

                // Initialize the editor with a JSON schema
                editor = new JSONEditor(document.getElementById('editor_holder'),{
                    schema: JSON.parse(currentSchema.schema),
                    disable_collapse: true,
                    disable_edit_json: true,
                    form_name_root: currentSchema.title
                });

                


                   // Hook up the submit button to log to the console
                document.getElementById('submit').addEventListener('click',function() {
                    // Get the value from the editor
                    var data = JSON.stringify(editor.getValue());
                    var newSchema = localStorage.getItem('_currentSchema');
                    var categoryid =  currentSchema.categoryid;
                    updateSchema(qaPostId, newSchema, data, categoryid);
                 });



            },
            error: function (xhr, status) {
                alert('Ocurrió un problema: ' + status);
            },
            complete: function (xhr, status) {
            }
        });
      }

  }


  }

function updateSchema(qaPostId, newSchema, data, categoryid){

  $.ajax({
        url: "../../model/qa_post.php",
        data: {updateSchemaQaPost:{
                qaPostId: qaPostId,
                newSchema:  newSchema,
                content: data,
                categoryid: categoryid
          }
        },
        type: 'POST',
        success: function (json) {
            //var currentSchema=JSON.parse(json);
            alert(json);


        },
        error: function (xhr, status) {
            alert('Ocurrió un problema: ' + status);
        },
        complete: function (xhr, status) {
        }
  });


}

function setNewSchema(){

  try{

	var newSchema=JSON.parse($('#textAreaSchema').val());
	var oldSchema=JSON.parse(localStorage.getItem('_currentSchema'));
	var oldProperties = oldSchema.schema.properties;
	oldProperties[Object.keys(newSchema)[0]]=newSchema[Object.keys(newSchema)[0]];
	var newProperties = oldProperties;
	oldSchema.schema.properties=newProperties;
	localStorage.setItem('_currentSchema',JSON.stringify(oldSchema));
	reloadSchema();

  }catch(ex){
      alert("Error en el Schema!");
  }
	

}

function showPropertieSchemaEdit(nomCampo){
	

	var currentSchema=JSON.parse(localStorage.getItem('_currentSchema'));
	var propSchema=currentSchema['schema']['properties'][nomCampo.key];

	$("#myModal").modal();
  var formSchema= '<div class="form-group">'
                                +'<label for="comment">Schema</label>'
                                +'<textarea id="textAreaSchema" class="form-control" rows="5" id="comment"></textarea>'
                            +'</div>';
  $('#modal-body-div').html(formSchema);

	$('#textAreaSchema').val(JSON.stringify(propSchema,undefined, 4));
	$("#btn-modal-schema").attr("onclick","setPropertieSchema('"+nomCampo.key+"')");
}

function setPropertieSchema(nomCampoKey){

  try{
	var currentSchema=JSON.parse(localStorage.getItem('_currentSchema'));
	var newSchema=JSON.parse($('#textAreaSchema').val());
	currentSchema['schema']['properties'][nomCampoKey]= newSchema;
	localStorage.setItem('_currentSchema',JSON.stringify(currentSchema));
	reloadSchema();

  }catch(ex){
      alert("Error en el Schema!");
  }
}



function reloadSchema(data=null){


	var currentSchema=JSON.parse(localStorage.getItem('_currentSchema'));
	schema = currentSchema.schema;
	var newStartValue=editor.getValue();

  if(data != null ){
    if(data.tipo == '1'){
        delete newStartValue[data.nomCampoKey];
    }
  }
  

  if(editor) editor.destroy();
  editor = new JSONEditor($editor,{
    schema: schema,
    startval: newStartValue,
    disable_collapse: true,
    disable_edit_json: true,

  });

  

  

}

function viewUsSchema (data){

	$("#myModal").modal();

  var formSchema= '<div class="form-group">'
                                +'<label for="comment">Schema</label>'
                                +'<textarea id="textAreaSchema" class="form-control" rows="5" id="comment"></textarea>'
                            +'</div>';
  $('#modal-body-div').html(formSchema);

      var newSchema={};
      switch(data.type) {
          case 0:
              newSchema[data.title] =  {
                  "type": "string",
                  "description": "",
                  "minLength": 4,
                  "default": "Jeremy Dorn"
              };
              break;
          case 1:
              newSchema [data.title] =  {
                "type": "integer",
                "default": 21,
                "minimum": 18,
                "maximum": 99
              };

              break;
          case 2:
              newSchema [data.title] =  {
                "type": "integer",
                "default": 21,
                "minimum": 18,
                "maximum": 99
              };
              break;
          case 3:
              newSchema [data.title] = {
                "type": "boolean",
                "format": "select"
              };
              break;
          case 4:
              newSchema [data.title] =  {
                "type": "string",
                "enum": [
                  "male",
                  "female"
                ]
              };
              break;
          case 5:
              newSchema [data.title] =  {
                "type": "string",
                "enum": [
                  "male",
                  "female"
                ]
              };
              break;
          default:
              newSchema = '';
      };

      $("#btn-modal-schema").attr("onclick","setNewSchema()");
      $("#btn-modal-schema").text("Editar");

      $('#textAreaSchema').val(JSON.stringify(newSchema,undefined, 4));

}


function showRequeridosModal(){
	$("#myModal").modal();

	var currentSchema=JSON.parse(localStorage.getItem('_currentSchema'));
	var currentProperties = currentSchema['schema']['properties'];
	var currentKeys= Object.keys(currentProperties) ;
  var currentRequiredSchema = currentSchema['schema']['required'];
	$('#textAreaSchema').val(JSON.stringify(currentKeys,undefined, 4));
	$("#btn-modal-schema").attr("onclick","setRequiredSchema()");

  var requeridos = '<form action="" id="form_requeridos" >';
  
  currentKeys.forEach(function(element) {

    var check= currentRequiredSchema.includes(element) ? 'checked': '';
    requeridos +='<div class="checkbox" style="margin-top: 0px;">';
      requeridos +='<label style="font-weight: normal; font-size: 14px;">'+element
      requeridos +='<input type="checkbox" value="'+element+'"  '+check+'  name="requeridos" style="display: inline-block; width: auto; position: relative; float: left;">'
      requeridos +='</label>'
    requeridos +='</div>';


  });

  requeridos +="</form>";
    
  
  $('#modal-body-div').html(requeridos);

}



function setRequiredSchema(){
  try{
	var currentSchema=JSON.parse(localStorage.getItem('_currentSchema'));
	//var currentRequiredSchema =  currentSchema['schema']['required'];

  var formRequired = $('#form_requeridos').serializeArray();

  var currentRequiredSchemaNew = [];
  formRequired.forEach(function(element) {
      currentRequiredSchemaNew.push(element.value);
  });

	currentSchema['schema']['required']=currentRequiredSchemaNew;
	localStorage.setItem('_currentSchema',JSON.stringify(currentSchema));
	reloadSchema();
  }catch(ex){
      alert("Error en el Schema!");
  }
}


function getOptionButtons(input){

    var containerEditBoton= document.createElement('div');
    containerEditBoton.classList.add("btn-group");
    containerEditBoton.classList.add("options-qa-post");
    containerEditBoton.style.margin = "5px";


    // Boton editar

    var btnEdit = document.createElement("BUTTON");        // Create a <button> element
    //var t = document.createTextNode(" Editar");  

    var node = document.createElement("I");
    node.classList.add("fa");
    node.classList.add("fa-pencil");

    btnEdit.appendChild(node);

    // Create a text node
    //btnEdit.appendChild(t);
    btnEdit.classList.add("btn");
    btnEdit.classList.add("btn-default");
    btnEdit.classList.add("json-editor-btn-edit");
    btnEdit.classList.add("json-schema-btn-edit");

    btnEdit.addEventListener('click',function(e) {
         showPropertieSchemaEdit(input);
    });
    containerEditBoton.appendChild(btnEdit);

    // Boton eliminar

    var btnDel = document.createElement("BUTTON");        // Create a <button> element
    //var t = document.createTextNode(" Eliminar");  

    var node = document.createElement("I");
    node.classList.add("fa");
    node.classList.add("fa-times");

    btnDel.appendChild(node);

    // Create a text node
    //btnDel.appendChild(t);
    btnDel.classList.add("btn");
    btnDel.classList.add("btn-danger");
    btnDel.classList.add("json-editor-btn-edit");
    btnDel.classList.add("json-schema-btn-edit");

    btnDel.addEventListener('click',function(e) {
         delPropertieSchema(input.key);
    });

    containerEditBoton.appendChild(btnDel);


    return  containerEditBoton;
}

function delPropertieSchema(nomCampoKey){

  if(confirm("Esta seguro ?")){
    try{
      var currentSchema=JSON.parse(localStorage.getItem('_currentSchema'));
      delete currentSchema['schema']['properties'][nomCampoKey];
      //console.log(currentSchema['schema']['properties'][nomCampoKey]);
      //console.log(nomCampoKey);
      localStorage.setItem('_currentSchema',JSON.stringify(currentSchema));
      var data = {
          tipo: '1',
          nomCampoKey: nomCampoKey
      };
      reloadSchema(data);

    }catch(ex){
      alert("Error en el Schema!");
    }
  }else{
      reloadSchema();
  }
  
}





