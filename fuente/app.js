
window.$ = require('jquery');
window.L = require('leaflet');
window.OWM = require('./leaflet-openweathermap'); 
var cambiarDia = require('./cambiarDia.js');
var organizarDias = require('./organizarDias.js');
var generarMapa = require('./generarMapa.js');
var primerDia = require('./primerDia.js');

window.clima_completo;	//Todo el json que devuelve
window.vars;			//7 dias de la semana
window.latitud
window.longitud
var diaActual;
 

if (navigator.geolocation){

  navigator.geolocation.getCurrentPosition(getClima,error);

}else{alert('El navegador no soporta geolocalizacion.');}


function getClima(posicion){

	latitud = posicion.coords.latitude;
	longitud = posicion.coords.longitude;

	$.ajax({ 
		type: "GET",
		url: "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+latitud+"&lon="+longitud+"&lang=es&units=metric&cnt=7&mode=json&APPID=c44a164d60b023ea3f628c7677c0d6b0",
		dataType: "json",
		success: function (data) {
			clima_completo = data;
			vars = data.list;
			console.log(data.city.country); 
			console.log(latitud);
			console.log(longitud);

			primerDia(vars[0]);
			ciudades_cercanas()

		},  
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		}
});

} 
 
function error(error)
       {
         if(error.code == 0)
            alert("Error Desconocido");
         else if(error.code == 1)
             alert("No fue posible contactarte");
         else if(error.code == 2)
            alert("No hay una ubicacion disponible");
         else if(error.code == 3)
            alert("Tiempo agotado");
        else 
            alert("Error Desconocido"); 
        }

$('.dias').on('click', function(){
				$('.dias').removeClass('dia-selected');
				$(this).addClass('dia-selected');
				cambiarDia($(this).text(), $(this).attr( 'id' ));
			})

$('#dia_siguiente').on('click',function() {
	$('div.dia-selected').next().click();
});

$('#dia_anterior').on('click',function() {
	$('div.dia-selected').prev().click();
});

$('#container_clima').on('click', function(){generarMapa()});


function ciudades_cercanas(){
	//http://api.openweathermap.org/data/2.5/find?lat=-34.841&lon=-58.3683&cnt=3
	$.ajax({ 
		type: "GET",
		url: 'http://api.openweathermap.org/data/2.5/find?lat='+latitud+'&lon='+longitud+'&cnt=3&mode=json&APPID=c44a164d60b023ea3f628c7677c0d6b0',
		dataType: "json",
		success: function (data) {
			alert("Listo!");

		},  
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

