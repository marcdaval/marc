
// Objeto de acceso a datos
const persistence = new Persistence();
	let esNuevo = true;
	let indice = -1;
/* MENU */
// selecciona el menú y agrega un evento click con una función que maneja la lógica del menú
$("ul li a").click( function(){

	if( !$(this).hasClass('active') ){

		$("ul li a").toggleClass('active');
		$("#registros").toggle();
		$('#formulario').toggle();

	}

} );


/* FORMULARIO */
// Guardar
$("form").submit( function( evento ){
	evento.preventDefault();

	// objeto persona
	let persona = {
		nombre: $("#nombre").val(),
		telefono: $("#telefono").val(),
		email: $("#email").val(),
		direccion: $("#direccion").val()
	};

	if(esNuevo){
		persistence.guardar( persona );
		}else{
			persistence.modificar(persona, indice);
		}

	// limpia el formulario
	$('#btnCancelar').click();

	// carga de nuevo toda la tabla
	cargarTabla();


} );


$('#btnCancelar').click(function(event){
	esNuevo= true;
});


function editar(btn){
	esNuevo= false;
	indice = $(btn).parent().parent().index();
	let  contacto = persistence.recuperarPorIndice( indice);
	$ ("#nombre").val(contacto.nombre);
	$ ("#telefono").val(contacto.telefono);
	$ ("#email").val(contacto.email);
	$ ("#direccion").val(contacto.direccion);
	$ ("#reg").click();
}

function eliminar(btn){
	indice = $(btn).parent().parent().index();
	persistence.eliminar(indice);
	cargarTabla();
}

/* TABLA */

// Cargar dato
// Carga todos los datos que hay en el localStroge
// recorriendo el array que es recupera por medio del
// metodo persistence.recuperarTodos()
function cargarTabla(){

	// Elimina todos los items de la tabla, para volver a
	// cargar
	$('#tbContactos tbody').html("");

	// recupera todos los datos en formato de array de objetos
	persistence.recuperarTodos().forEach( function( elem, key ){

		let tmp = `<tr>
                    <th scope="row">${ key }</th>
                    <td>${ elem.nombre }</td>
                    <td>${ elem.telefono }</td>
                    <td>${ elem.email }</td>
                    <td>${ elem.direccion }</td>
                    <td>
                        <button onclick="editar(this)" class="bnt btn-outline-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="eliminar(this)" class="bnt btn-outline-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Eliminar">
                            <i class="fas fa-eraser"></i>
                        </button>
                    </td>
                </tr>`;

        // agrega cada item recuperado del localStorage
        // al final de la tabla
        $('#tbContactos tbody').append( tmp );
	} );


}

cargarTabla();








