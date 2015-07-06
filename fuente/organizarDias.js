

var organizarDias = function organizarDias(dia){
	var semana = ['dia_1','dia_2','dia_3','dia_4','dia_5','dia_6','dia_7'];
	var dias = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
	var fecha = new Date(dia*1000);
	var dia = fecha.getDay(); 

	for(i=0 ; i<7 ;i++){
		$('#'+semana[i]).html(dias[dia]);
		dia++;
		if(dia > 6){
			dia = 0;
		}
	}

	$('.dias').removeClass('dia-selected');
	$('#dia_1').addClass('dia-selected');
	$('#dia_anterior').empty();
}


module.exports = organizarDias;