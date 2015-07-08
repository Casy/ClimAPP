var controller = {}

controller.datos = {};

controller.iniciar = function(){
	controller.controller();
	$("#clima_actual").click(); // Inicio la primer vista
	$("header").fadeIn();
	$("footer").fadeIn();

	//controller.datos.clima_completo.list[0].weather[0].id = 201;
	controller.hay_tormenta();
	controller.ciudades_cercanas();
}

controller.get_clima_iniciar = function(posicion){

	controller.datos.latitud = posicion.coords.latitude;
	controller.datos.longitud = posicion.coords.longitude;

	$.ajax({ 
		type: "GET", 
		url: "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+controller.datos.latitud+"&lon="+controller.datos.longitud+"&lang=es&units=metric&cnt=7&mode=json&APPID=c44a164d60b023ea3f628c7677c0d6b0",
		dataType: "json",
		success: function (data) {
			controller.datos.clima_completo = data;
			vars = data.list;
			controller.iniciar();
			/*
			TODO:
			CAMBIAR EL BACKGROUND PORQUE NO ANDA
			*/
		},  
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

controller.ciudades_cercanas = function(){
	//http://api.openweathermap.org/data/2.5/find?lat=-34.841&lon=-58.3683&cnt=3
	$.ajax({ 
		type: "GET",
		url: 'http://api.openweathermap.org/data/2.5/find?lat='+controller.datos.latitud +'&lon='+controller.datos.longitud+'&units=metric&cnt=4&mode=json&APPID=c44a164d60b023ea3f628c7677c0d6b0',
		dataType: "json",
		success: function (data) {
			console.log("Ciudades cercanas -> LISTO");
			controller.datos.ciudades_cercanas = data;

		},  
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

controller.errores = function(error){
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

controller.ver_mas = function(){
	var setearVerMas = require('./setearVerMas.js');
	$("#ver_mas").on("click", function(){
		if(vista_actual != 'ver_mas' && estado_vistas != true){
			vista_actual = 'ver_mas';
			estado_vistas = true;
			
			$("content").effect('fade', 1000, function(){
				$(this).load('vistas/clima_ver_mas.html', function(){
					setearVerMas(controller.datos.clima_completo.list);//VER MAS VISTA
					$(this).effect('fade', 1000, function(){
						estado_vistas = false;			
					})
				});
				
			});
			
		}
	});
}

controller.hay_tormenta = function(){
	if(controller.datos.clima_completo.list[0].weather[0].id >= 200 && controller.datos.clima_completo.list[0].weather[0].id <= 232){
				$('#back_clima').attr('background-image', "url('../img/back_tormenta.jpg')");
				$('#container_alerta').attr('class','alert-on row');
			}
}

controller.controller = function(){
	var cambiarDia = require('./cambiarDia.js');
	var organizarDias = require('./organizarDias.js');
	var generarMapa = require('./generarMapa.js');
	var primerDia = require('./primerDia.js');
	var setCercanos = require('./setCercanos.js');
	var clima_cercanias = require('./clima_cercanias.js');

	$("#clima_actual").on("click", function(){
		if(vista_actual != 'clima_actual' && estado_vistas != true){
			vista_actual = 'clima_actual';
			estado_vistas = true; 
			
			$("content").effect('fade', 1000, function(){
				$(this).load('vistas/clima_actual.html', function(){
					primerDia(controller.datos.clima_completo.list[0]);
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

					controller.ver_mas(); 

					$(this).effect('fade', 1000, function(){
						estado_vistas = false;		
					})
				});
				
				$("#load_state").slideUp();
			});
			
		}
	});



	$("#mapa_zona").on("click", function(){
		if(vista_actual != 'mapa_zona' && estado_vistas != true){
			vista_actual = 'mapa_zona';
			estado_vistas = true;
			$("content").effect('fade', 1000, function(){
				$(this).load('vistas/mapa_zona.html', function(){
					generarMapa(controller.datos.latitud, controller.datos.longitud, 9, 9);///GENERADOR DEL MAPA
					setCercanos(controller.datos); //Dos ciudades cercanas EN EL MAPA
					$(this).effect('fade', 1000, function(){
						estado_vistas = false;			
					})
				});
				
			});
		}
	});

	$("#clima_cercanias").on("click", function(){
		if(vista_actual != 'clima_cercanias' && estado_vistas != true){
			vista_actual = 'clima_cercanias';
			estado_vistas = true;
			$("content").effect('fade', 1000, function(){
				$(this).load('vistas/clima_cercanias.html', function(){
					clima_cercanias(controller.datos.ciudades_cercanas); //Setea las 4 ciudades cercanas
					$(this).effect('fade', 1000, function(){
						estado_vistas = false;			
					})
				});
				
			});
			
		}
	});


	$("#ver_mapa").on("click", function(){
		if(vista_actual != 'ver_mapa' && estado_vistas != true){
			vista_actual = 'ver_mapa';
			estado_vistas = true;
			$("content").effect('fade', 1000, function(){
				$(this).load('vistas/ver_mapa.html', function(){
					generarMapa(controller.datos.latitud, controller.datos.longitud, 16, 3);
					$(this).effect('fade', 1000, function(){
						estado_vistas = false;			
					})
				});
				
			});
			
		}
	});

	$("#estadisticas").on("click", function(){
		if(vista_actual != 'estadisticas' && estado_vistas != true){
			vista_actual = 'estadisticas';
			estado_vistas = true;
			$("content").effect('fade', 1000, function(){
				$(this).load('vistas/estadisticas.html', function(){
					// Accion
					$(this).effect('fade', 1000, function(){
						estado_vistas = false;			
					})
				});
			});
		}
	});

}

module.exports = controller;