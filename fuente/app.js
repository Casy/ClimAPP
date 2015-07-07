
window.$ = require('jquery');
require('jquery-ui');
window.L = require('leaflet');
window.OWM = require('./leaflet-openweathermap'); 

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
	console.log( "doc ready!" );

	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(controller.get_clima_iniciar, controller.errores);
	}else{
		console.log('El navegador no soporta geolocalizacion.');
	}

});