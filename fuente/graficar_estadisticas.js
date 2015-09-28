var Chart = require('chart.js');


var graficar = function(datos){

	var data = {
	    labels: [get_dia(datos.clima_completo.list[0].dt),get_dia(datos.clima_completo.list[1].dt), get_dia(datos.clima_completo.list[2].dt), get_dia(datos.clima_completo.list[3].dt), get_dia(datos.clima_completo.list[4].dt)],	    
	    datasets: [
	        {
	            label: "Temperaturas",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [datos.clima_completo.list[0].temp.max, datos.clima_completo.list[1].temp.max, datos.clima_completo.list[2].temp.max, datos.clima_completo.list[3].temp.max, datos.clima_completo.list[4].temp.max]
	        }
	    ]
	};

	var presion = {
	    labels: [get_dia(datos.clima_completo.list[0].dt),get_dia(datos.clima_completo.list[1].dt), get_dia(datos.clima_completo.list[2].dt), get_dia(datos.clima_completo.list[3].dt), get_dia(datos.clima_completo.list[4].dt)],
	    datasets: [
	        {
	            label: "Temperaturas",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [datos.clima_completo.list[0].pressure, datos.clima_completo.list[1].pressure, datos.clima_completo.list[2].pressure, datos.clima_completo.list[3].pressure, datos.clima_completo.list[4].pressure]
	        }
	    ]
	};

	var humedad = {
	    labels: [get_dia(datos.clima_completo.list[0].dt),get_dia(datos.clima_completo.list[1].dt), get_dia(datos.clima_completo.list[2].dt), get_dia(datos.clima_completo.list[3].dt), get_dia(datos.clima_completo.list[4].dt)],
	    datasets: [
	        {
	            label: "Temperaturas",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [datos.clima_completo.list[0].temp.min, datos.clima_completo.list[1].temp.min, datos.clima_completo.list[2].temp.min, datos.clima_completo.list[3].temp.min, datos.clima_completo.list[4].temp.min]
	        }
	    ]
	};

	var grados_semanal= {
	    labels: [get_dia(datos.clima_completo.list[0].dt),get_dia(datos.clima_completo.list[1].dt), get_dia(datos.clima_completo.list[2].dt), get_dia(datos.clima_completo.list[3].dt), get_dia(datos.clima_completo.list[4].dt)],
	    datasets: [
	        {
	            label: "Temperaturas",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [datos.clima_completo.list[0].speed, datos.clima_completo.list[1].speed, datos.clima_completo.list[2].speed, datos.clima_completo.list[3].speed, datos.clima_completo.list[4].speed]
	        }
	    ]
	};


	var ctx = $("#grados_horas").get(0).getContext("2d");
	new Chart(ctx).Line(data,{bezierCurve: false, scaleBeginAtZero: true, scaleFontColor: "#fff"});
	ctx = $("#presion_horas").get(0).getContext("2d");
	new Chart(ctx).Line(presion,{scaleBeginAtZero: true, scaleFontColor: "#fff"});
	ctx = $("#humedad_horas").get(0).getContext("2d");
	new Chart(ctx).Bar(humedad,{scaleBeginAtZero: true, scaleFontColor: "#fff"});
	ctx = $("#grados_semana").get(0).getContext("2d");
	new Chart(ctx).Bar(grados_semanal,{scaleBeginAtZero: true, scaleFontColor: "#fff"});


	var temperatura= 0, maxima=0,minima=0;
	for(i=0; i < 7; i++){
		temperatura+= datos.clima_completo.list[i].temp.day;
		maxima += datos.clima_completo.list[i].temp.max;
		minima += datos.clima_completo.list[i].temp.min;
	}

	$('#prom_grados_semanal').html(parseInt(temperatura/7,10));
	$('#prom_maxima_semanal').html(parseInt(maxima/7,10));
	$('#prom_minima_semanal').html(parseInt(minima/7,10));
	

}

function convertir_temperatura(temp){
	 return parseInt(temp- 273,10);
}

function get_hora(hora){
	fecha = new Date(hora*1000);
	return fecha.getDay();
}

function get_dia(hora){
	var dias = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
	fecha = new Date(hora*1000);
	return dias[fecha.getDay()];
}

module.exports = graficar;