
var cantidad_movimiento = function(zoom){
	var cantidad_movimiento;
	switch(zoom){
			case 3: cantidad_movimiento = 30.0;
				break;
			case 4: cantidad_movimiento = 15.0;
				break;
			case 5: cantidad_movimiento  = 10.0;
				break;
			case 6: cantidad_movimiento = 5.0;
				break;
			case 7: cantidad_movimiento =3.0;
				break;
			case 8: cantidad_movimiento = 1.5;
				break;
			case 9: cantidad_movimiento  = 0.6;
				break;
			case 10: cantidad_movimiento = 0.3;
				break;
		}
		return cantidad_movimiento;
}


module.exports = cantidad_movimiento;