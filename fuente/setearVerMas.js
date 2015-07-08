var direccion_viento = require('./direccion_viento.js');

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


function velocidad_viento(dia){
	var velocidad = dia.speed;

	velocidad = parseInt(velocidad * 3.6, 10);
	return velocidad;
}



module.exports = setearVerMas;