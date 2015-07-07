

var setearVerMas = function setearVerMas(clima_semana){
	var dias_completos = ['DOMINGO','LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO'];
	var fecha;
	var i;;


	for(i=0; i < 4; i++){
		fecha = new Date(clima_semana[i].dt*1000);
		fecha = dias_completos[fecha.getDay()]+' '+fecha.getDate()+'/'+(fecha.getMonth()+1);
		$('#dia_'+(i+1)+'_completo').html(fecha);
		$('#icono_dia_'+(i+1)).attr('src', 'http://openweathermap.org/img/w/'+clima_semana[i].weather[0].icon+'.png');
		$('#grados_dia_'+(i+1)).html(parseInt(clima_semana[i].temp.day, 10));
		$('#tipo_dia_'+(i+1)).html(clima_semana[i].weather[0].description);
		$('#maxima_dia_'+(i+1)).html(parseInt(clima_semana[i].temp.max,10));
		$('#minima_dia_'+(i+1)).html(parseInt(clima_semana[i].temp.min,10));
		$('#direccion_viento_dia_'+(i+1)).html(direccion_viento(clima_semana[i]));
		$('#velocidad_viento_dia_'+(i+1)).html(velocidad_viento(clima_semana[i])+' ');
	}
}


function direccion_viento(dia_viento){
	var grados = dia_viento.deg;
	var viento;

	if(grados >= 0 && grados < 90 || grados == 360){
		if(grados == 0){
			viento = 'N';
		}else viento = 'NE';
	}else if(grados >= 180 && grados < 270){
		if(grados == 180){
			viento = 'S';
		}else viento = 'SO';
	}else if(grados >= 90 && grados < 180){
		if(grados == 90){
			viento = 'E';
		}else viento = 'SE';
	}else if(grados >= 270 && grados < 360){
		if(grados == 270){
			viento = 'O';
		}else viento = 'NO';
	}

	return viento;
}

function velocidad_viento(dia){
	var velocidad = dia.speed;

	velocidad = parseInt(velocidad * 3.6, 10);
	return velocidad;
}



module.exports = setearVerMas;