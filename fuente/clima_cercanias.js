var direccion_viento = require('./direccion_viento');

var clima_cercanias = function clima_cercanias(ciudades){
	ciudades = ciudades.list;

	for(i=0; i < 4; i++){
		$('#dia_'+(i+1)+'_completo').html(ciudades[i].name);
		$('#icono_dia_'+(i+1)).attr('src', 'img/ICONS/'+ciudades[i].weather[0].icon+'.png');
		$('#grados_dia_'+(i+1)).html(parseInt(ciudades[i].main.temp,10));
		$('#tipo_dia_'+(i+1)).html(ciudades[i].weather[0].description);
		$('#maxima_dia_'+(i+1)).html(parseInt(ciudades[i].main.temp_max,10));
		$('#minima_dia_'+(i+1)).html(parseInt(ciudades[i].main.temp_min,10));
		$('#direccion_viento_dia_'+(i+1)).html(direccion_viento(ciudades[i].wind));
		$('#velocidad_viento_dia_'+(i+1)).html(velocidad_viento(ciudades[i].wind));

	}

}

function velocidad_viento(dia){
	var velocidad = dia.speed;

	velocidad = parseInt(velocidad * 3.6, 10);
	return velocidad;
}

module.exports = clima_cercanias;