
var editor;
var $editor = document.getElementById('editor');

$(document).ready(function(){
	getSchema();
});


function getSchema(){
	$.ajax({
        url: "../../model/persona.php",
        data: {getSchemaPersona:1},
        type: 'POST',
//        dataType: '',
        success: function (json) {
            currentSchema=JSON.parse(json);
            localStorage.setItem('_currentSchema',json);
            var element = document.getElementById('editor_holder');


		    // Initialize the editor with a JSON schema
		    editor = new JSONEditor(document.getElementById('editor_holder'),{
		        schema: currentSchema.schema
		    });
		       // Hook up the submit button to log to the console
		     document.getElementById('submit').addEventListener('click',function() {
		        // Get the value from the editor
		        console.log(editor.getValue());
		     });

        },
        error: function (xhr, status) {
            alert('Ocurrió un problema: ' + status);
        },
        complete: function (xhr, status) {
        }
    });
}

function setNewSchema(){
	var newSchema=JSON.parse($('#textAreaSchema').val());
	var oldSchema=JSON.parse(localStorage.getItem('_currentSchema'));

	
	var oldProperties = oldSchema.schema.properties;
	oldProperties[Object.keys(newSchema)[0]]=newSchema[Object.keys(newSchema)[0]];
	var newProperties = oldProperties;
	oldSchema.schema.properties=newProperties;
	localStorage.setItem('_currentSchema',JSON.stringify(oldSchema));

	reloadSchema();
	

}

function showPropertieSchemaEdit(nomCampo){
	console.log(nomCampo);
	var currentSchema=JSON.parse(localStorage.getItem('_currentSchema'));
	var propSchema=currentSchema['schema']['properties'][nomCampo.key];

	$("#myModal").modal();
	$('#textAreaSchema').val(JSON.stringify(propSchema,undefined, 4));
	$("#btn-modal-schema").attr("onclick","setPropertieSchema('"+nomCampo.key+"')");
}

function setPropertieSchema(nomCampoKey){

	var currentSchema=JSON.parse(localStorage.getItem('_currentSchema'));
	var newSchema=JSON.parse($('#textAreaSchema').val());
	currentSchema['schema']['properties'][nomCampoKey]= newSchema;
	localStorage.setItem('_currentSchema',JSON.stringify(currentSchema));
	reloadSchema();
}



function reloadSchema(){


	var currentSchema=JSON.parse(localStorage.getItem('_currentSchema'));
	schema = currentSchema.schema;
	var newStartValue=editor.getValue();


	if(editor) editor.destroy();
        editor = new JSONEditor($editor,{
            schema: schema,
            startval: newStartValue


    });

}

function viewUsSchema (data){

	$("#myModal").modal();

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
	$('#textAreaSchema').val(JSON.stringify(currentKeys,undefined, 4));
	$("#btn-modal-schema").attr("onclick","setRequiredSchema()");
}



function setRequiredSchema(){
	var currentSchema=JSON.parse(localStorage.getItem('_currentSchema'));
	var currentRequiredSchema =  JSON.parse($('#textAreaSchema').val());
	currentSchema['schema']['required']=currentRequiredSchema;
	localStorage.setItem('_currentSchema',JSON.stringify(currentSchema));
	reloadSchema();
}





