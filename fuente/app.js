
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
	var algo = false;

	if (navigator.geolocation){ 
		navigator.geolocation.getCurrentPosition(controller.get_clima_iniciar, geoLocalizar);
	}else{
		console.error('El navegador no soporta geolocalizacion.');
		api_geo();

	}

	function geoLocalizar(){ 
		if(geo.init()){
			geo.getCurrentPosition(controller.get_clima_iniciar, controller.errores);
		}
	}

	function api_geo(){
		$.ajax({ 
		type: 'GET', 
		url: 'http://ip-api.com/json',
		success: function (data) {
				console.warn(data);
				algo = false
				if(data.status === 'success'){
					var datos = {coords:{
									latitude:data.lat,
									longitude:data.lon
								}};
					controller.get_clima_iniciar(datos);
					window.datos= data;
				}else{
					$.ajax({
						type: 'GET',
						url: 'http://api.wipmania.com/json',
						success: function(data){
							var datos = {coords:{
								latitude:data.latitude,
								longitude:data.longitude
							}};
							controller.get_clima_iniciar(datos);
							window.datos= data;
						}
					});
				}

		},


		error: function (jqXHR, textStatus, errorThrown) {
			alert(textStatus);
		}
	});
	}	

});