

var setCercanos = function setCercanos(datos){

	//CIUDAD CENTRO
	$('#ciudad_ahora').html('AHORA - '+datos.clima_completo.city.name);
	$('#icono_dia_actual').attr('src','img/ICONS/'+datos.clima_completo.list[0].weather[0].icon+'.png');
	$('#grados_dia_actual').html(parseInt(datos.clima_completo.list[0].temp.day,10));
	$('#tipo_dia_1').html(datos.clima_completo.list[0].weather[0].description);
	$('#maxima_dia_1').html(parseInt(datos.clima_completo.list[0].temp.max,10));
	$('#minima_dia_1').html(parseInt(datos.clima_completo.list[0].temp.min,10));
	/////////////////////

	for(i=0; i <2; i++){
		$('#localidad_cercania_'+(i+1)).html(datos.ciudades_cercanas.list[i].name);
		$('#img_cercania_'+(i+1)).attr('src','img/ICONS/'+datos.ciudades_cercanas.list[i].weather[0].icon+'.png');
		$('#temperatura_cercania_'+(i+1)).html(parseInt(datos.ciudades_cercanas.list[0].main.temp,10));	
	}
}



module.exports = setCercanos;