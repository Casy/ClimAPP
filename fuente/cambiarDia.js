
var cambiarDia = function cambiarDia(contenido,id){
	var dias = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
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

	$('#grados_dia_seleccionado' ).html( parseInt(vars[auxiliar].temp.day,10) );
	$('#tipo_dia_seleccionado').html( vars[auxiliar].weather[0].description );
	$('#maxima_dia_seleccionado').html( parseInt(vars[auxiliar].temp.max,10) );
	$('#minima_dia_seleccionado').html( parseInt(vars[auxiliar].temp.min,10) );
	$('#clima_icon').attr('src', 'http://openweathermap.org/img/w/'+vars[auxiliar].weather[0].icon+'.png');
	
	if(id != 'dia_1'){
		$('#dia_anterior').html( '&lt; DIA ANTERIOR' );
	}else $('#dia_anterior').empty();

	if(id == 'dia_7'){
		$('#dia_siguiente').empty();
	}else $('#dia_siguiente').html( 'DIA SIGUIENTE &gt;' );
}


module.exports = cambiarDia; 