var controller = {}

controller.datos = {};

controller.iniciar = function(){
	controller.controller();
	$('#clima_actual').click(); // Inicio la primer vista
	$('header').fadeIn();
	$('footer').fadeIn();

	controller.hay_tormenta();
	controller.ciudades_cercanas_estadisticas();
	controller.activar_teclado();
}

controller.get_clima_iniciar = function(posicion){

	controller.datos.latitud = posicion.coords.latitude;
	controller.datos.longitud = posicion.coords.longitude;
	var query = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+controller.datos.latitud+'&lon='+controller.datos.longitud+'&lang=es&units=metric&cnt=7&mode=json&APPID=c44a164d60b023ea3f628c7677c0d6b0';
	$.ajax({ 
		type: 'GET', 
		url: query,
		dataType: 'json',
		success: function (data) {
			if (data.cod == '404') {
				var posicion_bsas = {};
				posicion_bsas.coords = {};
				posicion_bsas.coords.latitude = -34.6037;
				posicion_bsas.coords.longitude = -58.381103;
				controller.get_clima_iniciar(posicion_bsas);
			};
			controller.datos.clima_completo = data;
			vars = data.list;
			controller.iniciar();
		},  
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

controller.ciudades_cercanas_estadisticas = function(){
	//http://api.openweathermap.org/data/2.5/find?lat=-34.841&lon=-58.3683&cnt=3
	$.ajax({ 
		type: 'GET',
		url: 'http://api.openweathermap.org/data/2.5/find?lat='+controller.datos.latitud +'&lon='+controller.datos.longitud+'&units=metric&cnt=4&mode=json&lang=sp&APPID=c44a164d60b023ea3f628c7677c0d6b0',
		dataType: 'json',
		success: function (data) {
			controller.datos.ciudades_cercanas = data;
			controller.get_estadisticas();//Se llama a estadisticas aca, porque sino no esta definida la variable.
		},  
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

controller.errores = function(error){
	if(error.code == 0)
		alert('Error Desconocido');
	else if(error.code == 1)
		alert('No fue posible contactarte');
	else if(error.code == 2)
		alert('No hay una ubicacion disponible');
	else if(error.code == 3)
		alert('Tiempo agotado');
	else 
		alert('Error Desconocido'); 
}

controller.ver_mas = function(){
	var setearVerMas = require('./setearVerMas.js');
	$('#ver_mas').on('click', function(){
		if(vista_actual != 'ver_mas' && estado_vistas != true){
			vista_actual = 'ver_mas';
			estado_vistas = true;
			
			$('content').effect('fade', 1000, function(){
				$(this).load('vistas/clima_ver_mas.html', function(){
					controller.set_background();
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
		$('#container_alerta').attr('class','alert-on row');
	}
}

controller.set_background = function(icono){
	var background;
	if(!!icono){
		background = icono;
	}else{
		background = this.datos.clima_completo.list[0].weather[0].icon
	}
	$('#container_clima').removeClass().addClass('row');
	switch(background){//this.datos.clima_completo.list[0].weather[0].icon){
		case '01d':
		$('#container_clima').addClass('back_dia');
		break;
		case '01n':
		$('#container_clima').addClass('back_noche');
		break;
		case '02d':
		$('#container_clima').addClass('back_dia_poco_nublado');
		break;
		case '02n':
		$('#container_clima').addClass('back_noche_poco_nublado');
		break;
		case '03d':
		case '04d':
		$('#container_clima').addClass('back_dia_nublado');
		break;
		case '03n':
		case '04n':
		$('#container_clima').addClass('back_noche_nublado');
		break;
		case '09d':
		case '10d':
		$('#container_clima').addClass('back_dia_lluvioso');
		break;
		case '09n':
		case '10n':
		$('#container_clima').addClass('back_noche_lluvioso');
		break;
		case '11d':
		$('#container_clima').addClass('back_dia_tormenta');
		break;
		case '11n':
		$('#container_clima').addClass('back_dia_tormenta');
		break;
		case '13d':
		$('#container_clima').addClass('back_dia_nieve');
		break;
		case '13n':
		$('#container_clima').addClass('back_noche_nieve');
		break;
		case '50d':
		$('#container_clima').addClass('back_dia_neblina');
		break;
		case '50n':
		$('#container_clima').addClass('back_noche_neblina');
		break;
	}
}

controller.movimiento = function(){
	var cantidad_movimiento = require('./cant_movimiento.js');//Depende del zoom, setea la cantidad que suma/resta
	var cantidad;
	$('#grados_dia_actual').html(parseInt(controller.datos.clima_completo.list[0].temp.day,10));
	$('#ciudad_ahora').html(controller.datos.clima_completo.city.name);
	$('#mapa-zoom-mas').on('click', function(){map.zoomIn();});
	$('#mapa-zoom-menos').on('click', function(){map.zoomOut();});
	$('#mapa-up').on('click', function(){
		cantidad = cantidad_movimiento(map.getZoom());
		map.panTo([map.getCenter().lat+cantidad,map.getCenter().lng]);
	});
	$('#mapa-down').on('click', function(){
		cantidad = cantidad_movimiento(map.getZoom());
		map.panTo([map.getCenter().lat-cantidad,map.getCenter().lng]);
	});
	$('#mapa-left').on('click', function(){
		cantidad = cantidad_movimiento(map.getZoom());
		map.panTo([map.getCenter().lat,map.getCenter().lng-cantidad]);
	});
	$('#mapa-right').on('click', function(){
		cantidad = cantidad_movimiento(map.getZoom());
		map.panTo([map.getCenter().lat,map.getCenter().lng+cantidad]);
	});
}

controller.get_estadisticas = function(){
	//http://api.openweathermap.org/data/2.5/history/city?lat=controller.datos.latitud&lon=controller.datos.longitud&type=hour&start={start}&cnt=8
	//var horasAtras = new Date(controller.datos.clima_completo.list[0].dt*1000);
	var horasAtras = new Date(controller.datos.ciudades_cercanas.list[0].dt*1000);
	horasAtras = (horasAtras.getTime()/1000) - 18000;
	$.ajax({ 
		type: 'GET',
		url: 'http://api.openweathermap.org/data/2.5/history/city?lat='+controller.datos.latitud+'&lon='+controller.datos.longitud+'&type=hour&start='+horasAtras+'&cnt=5&APPID=c44a164d60b023ea3f628c7677c0d6b0',
		dataType: 'json',
		success: function (data) {
			controller.datos.estadisticas = data;

		},  
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
} 

controller.activar_teclado = function(){
	//Teclado
	var bn_active = [];
	$(document).on('mouseover', 'div', function(e) {
		e.preventDefault();
		bind_select(e);
	});
	$(document).on('mouseover', 'i', function(e) {
		e.preventDefault();
		bind_select(e);
	});


	var bind_select = function(e){
		if(typeof bn_active['bn'] != 'undefined' && $(e.target).attr('bn') != bn_active['bn']){
			$('[bn='+bn_active['bn']+']').removeClass('active_d');
			$('[bn='+bn_active['bn']+']').removeClass('active_i');
		}
		if(typeof $(e.target).attr('bn') != 'undefined' && $(e.target).attr('bn') != bn_active['bn']){
			bn_active.length = 0;
			bn_active['bn'] = $(e.target).attr('bn');
			
			
			if($('[bn='+bn_active['bn']+']').is('div') || $('[bn='+bn_active['bn']+']').is('button'))
				$('[bn='+bn_active['bn']+']').addClass('active_d');
			else
				$('[bn='+bn_active['bn']+']').addClass('active_i');
			
			if($(e.target).attr('bn-n') != 'undefined'){
				bn_active['bn-n'] = $(e.target).attr('bn-n');
			}
			if($(e.target).attr('bn-p') != 'undefined'){
				bn_active['bn-p'] = $(e.target).attr('bn-p');
			}
			if($(e.target).attr('bn-u') != 'undefined'){
				bn_active['bn-u'] = $(e.target).attr('bn-u');
			}
			if($(e.target).attr('bn-d') != 'undefined'){
				bn_active['bn-d'] = $(e.target).attr('bn-d');
			}
		}
	}

	$(document).bind('keypress', function(e){
		var code = e.keyCode || e.which;
		switch(code){
			//enter
			case 13:
			case 'VK_ENTER':
			$('[bn='+bn_active['bn']+']').click();
			break;
			//iz
			case 37:
			case 'VK_LEFT':
			if(typeof bn_active['bn-p'] != 'undefined'){
				$('[bn='+bn_active['bn-p']+']').trigger('mouseover');
			}
			break;
			//up
			case 38:
			case 'VK_UP':
			if(typeof bn_active['bn-u'] != 'undefined'){
				$('[bn='+bn_active['bn-u']+']').trigger('mouseover');
			}
			break;
			//der
			case 39:
			case 'VK_RIGHT':
			if(typeof bn_active['bn-n'] != 'undefined'){
				$('[bn='+bn_active['bn-n']+']').trigger('mouseover');
			}
			break;
			//down
			case 40:
			case 'VK_DOWN':
			if(typeof bn_active['bn-d'] != 'undefined'){
				$('[bn='+bn_active['bn-d']+']').trigger('mouseover');
			}
			break;
		}
	})
}

controller.controller = function(){
	var cambiarDia = require('./cambiarDia.js');
	var organizarDias = require('./organizarDias.js');
	var generarMapa = require('./generarMapa.js');
	var primerDia = require('./primerDia.js');
	var setCercanos = require('./setCercanos.js');
	var clima_cercanias = require('./clima_cercanias.js');
	var graficar = require('./graficar_estadisticas.js');

	$('#clima_actual').on('click', function(){
		if(vista_actual != 'clima_actual' && estado_vistas != true){
			vista_actual = 'clima_actual';
			estado_vistas = true; 
			
			$('content').effect('fade', 1000, function(){
				$(this).load('vistas/clima_actual.html', function(){
					controller.set_background();
					primerDia(controller.datos.clima_completo.list[0]);
					$('.dias').on('click', function(){
						$('.dias').removeClass('dia-selected');
						$(this).addClass('dia-selected');
						cambiarDia($(this).text(), $(this).attr( 'id' ));
					})

					$('#dia_siguiente').on('click',function() {
						$('div.dia-selected').next().click();
					});

					$('#dia_siguiente').trigger('mouseover');

					$('#dia_anterior').on('click',function() {
						$('div.dia-selected').prev().click();
					});

					controller.ver_mas(); 

					$(this).effect('fade', 1000, function(){
						estado_vistas = false;		
					})
				});
				
				$('#load_state').slideUp();
			});
			
		}
	});



	$('#mapa_zona').on('click', function(){
		if(vista_actual != 'mapa_zona' && estado_vistas != true){
			vista_actual = 'mapa_zona';
			estado_vistas = true;
			controller.set_background();
			$("content").effect('fade', 1000, function(){
				$(this).load('vistas/mapa_zona.html', function(){
					controller.set_background();
					$(this).effect('fade', 1000, function(){
						estado_vistas = false;			
					})
					generarMapa(controller.datos.latitud, controller.datos.longitud, 9, 9);///GENERADOR DEL MAPA
					setCercanos(controller.datos); //Dos ciudades cercanas EN EL MAPA
				});
				
			});
		}
	});

	$('#clima_cercanias').on('click', function(){
		if(vista_actual != 'clima_cercanias' && estado_vistas != true){
			vista_actual = 'clima_cercanias';
			estado_vistas = true;
			controller.set_background();
			$("content").effect('fade', 1000, function(){
				$(this).load('vistas/clima_cercanias.html', function(){
					controller.set_background();
					clima_cercanias(controller.datos.ciudades_cercanas); //Setea las 4 ciudades cercanas
					$(this).effect('fade', 1000, function(){
						estado_vistas = false;			
					})
				});
				
			});
			
		}
	});

	$('#ver_mapa').on('click', function(){
		if(vista_actual != 'ver_mapa' && estado_vistas != true){
			vista_actual = 'ver_mapa';
			estado_vistas = true;
			controller.set_background();
			$("content").effect('fade', 1000, function(){
				$(this).load('vistas/ver_mapa.html', function(){
					controller.set_background();
					$(this).effect('fade', 1000, function(){ 
						estado_vistas = false;			
					})
					generarMapa(controller.datos.latitud, controller.datos.longitud, 10, 3);
					controller.movimiento();
				});
				
			});
			
		}
	});

	$('#estadisticas').on('click', function(){
		if(vista_actual != 'estadisticas' && estado_vistas != true){
			vista_actual = 'estadisticas';
			estado_vistas = true;
			controller.set_background();
			$("content").effect('fade', 1000, function(){
				$(this).load('vistas/estadisticas.html', function(){
					controller.set_background();
					$(this).effect('fade', 1000, function(){
						estado_vistas = false;			
					})
					graficar(controller.datos);//GRAFICOS
				});
			});
		}
	});

}

module.exports = controller;