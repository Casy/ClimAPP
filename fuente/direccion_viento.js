
var direccion_viento = function direccion_viento(dia_viento){
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

module.exports = direccion_viento;