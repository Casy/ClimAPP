
var cambiarDia = function cambiarDia(contenido,id){
	var dias = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
	var dias_completos = ['DOMINGO','LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO'];
	var semana = ['dia_1','dia_2','dia_3','dia_4','dia_5','dia_6','dia_7'];
	var i = 0, x = 0; //Indices para iterar
	var auxiliar;
	var bandera = true;

	while(i<7 &&bandera){
		if(dias[i] == contenido){
			while(x<7 && bandera){
				if(semana[x] == id){
					auxiliar = x;
					bandera = false;
				}
				x++;
			}
		}
		i++;
	}
	/*
	TODO: cambiar el 'ahora' por 'Mañana' o el dia que le siga completo
	$('#dia_seleccionado')
	*/

	$('#clima_icon').effect("fade", 500, function(){
		$(this).attr('src', 'http://openweathermap.org/img/w/'+vars[auxiliar].weather[0].icon+'.png');
	}).effect("fade", 500);
	$('#grados_dia_seleccionado' ).effect("fade", 500, function(){
		$(this).html( parseInt(vars[auxiliar].temp.day,10));
	}).effect("fade", 500);
	$('#tipo_dia_seleccionado').effect("fade", 500, function(){
		$(this).html( vars[auxiliar].weather[0].description);
	}).effect("fade", 500);
	$('#maxima_dia_seleccionado').effect("fade", 500, function(){
		$(this).html( parseInt(vars[auxiliar].temp.max,10));
	}).effect("fade", 500);
	$('#minima_dia_seleccionado').effect("fade", 500, function(){
		$(this).html( parseInt(vars[auxiliar].temp.min,10));
	}).effect("fade", 500);


	if(id == 'dia_1'){
		$('#dia_anterior').effect("fade", 500, function(){
			$('#dia_anterior').empty();	
		});
	}else {
		if($('#dia_anterior').css('display') == 'none'){
			$('#dia_anterior').effect("fade", 500, function(){
				$('#dia_anterior').html( '&lt; DIA ANTERIOR' );
			});
		}
	}

	if(id == 'dia_7'){
		$('#dia_siguiente').effect("fade", 500, function(){
			$('#dia_siguiente').empty();	
		});
	}else {
		if($('#dia_siguiente').css('display') == 'none'){
			$('#dia_siguiente').effect("fade", 500, function(){
				$('#dia_siguiente').html( 'DIA SIGUIENTE &gt;' );
			});
		}
	}
}


module.exports = cambiarDia; 