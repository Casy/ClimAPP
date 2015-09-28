
window.$ = require('jquery');
require('jquery-ui');
window.L = require('leaflet');
window.OWM = require('./leaflet-openweathermap');
window.geo = require('../js/geo.js');

var controller = require('./controller');

window.clima_completo;	//Todo el json que devuelve
window.vars;			//7 dias de la semana
window.latitud;
window.longitud;
window.vista_actual = ""; 
window.estado_vistas = false;

var diaActual;


// SE CARGA EL DOM

$( document ).ready(function() {
	function api_geo(){
		$.ajax({ 
		type: 'GET', 
		url: 'http://ip-api.com/json',
		success: function (data) {
				if(data.status === 'success'){
					console.log("ok!");
					var datos = {coords:{
									latitude:data.lat,
									longitude:data.lon
								}};
					controller.get_clima_iniciar(datos);
				}else{
					var datos = {coords:{
									latitude:-34.6037,
									longitude:-58.381103
								}
							};
					controller.get_clima_iniciar(datos);
						
				}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert(textStatus);
		}
	});
	}
	api_geo();

});