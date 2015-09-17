

var diaSemana = function diaSemana(day){

	var fecha = new Date(day*1000);
	var cadena = fecha.getDate()+'/'+fecha.getMonth();
	var dia; 
 	
	console.log(cadena);
	console.log(fecha.getDay());
	switch(fecha.getDay()){
		case 0: dia = 'dia_7';
			break;
		case 1: dia = 'dia_1';
			break;
		case 2: dia = 'dia_2';
			break;
		case 3: dia = 'dia_3';
			break;
		case 4: dia = 'dia_4';
			break;
		case 5: dia = 'dia_5';
			break;
		case 6: dia = 'dia_6';
			break;
	}
	return dia;
}



module.exports = diaSemana;