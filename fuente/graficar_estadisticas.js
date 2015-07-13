var Chart = require('chart.js');


var graficar = function(datos){

	var data = {
	    labels: [get_hora(datos.estadisticas.list[0].dt),get_hora(datos.estadisticas.list[1].dt), get_hora(datos.estadisticas.list[2].dt), get_hora(datos.estadisticas.list[3].dt), get_hora(datos.estadisticas.list[4].dt)],
	    datasets: [
	        {
	            label: "Temperaturas",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [convertir_temperatura(datos.estadisticas.list[0].main.temp), convertir_temperatura(datos.estadisticas.list[1].main.temp), convertir_temperatura(datos.estadisticas.list[2].main.temp), convertir_temperatura(datos.estadisticas.list[3].main.temp), convertir_temperatura(datos.estadisticas.list[4].main.temp)]
	        }
	    ]
	};

	var presion = {
	    labels: [get_hora(datos.estadisticas.list[0].dt),get_hora(datos.estadisticas.list[1].dt), get_hora(datos.estadisticas.list[2].dt), get_hora(datos.estadisticas.list[3].dt), get_hora(datos.estadisticas.list[4].dt)],
	    datasets: [
	        {
	            label: "Temperaturas",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [datos.estadisticas.list[0].main.pressure, datos.estadisticas.list[1].main.pressure, datos.estadisticas.list[2].main.pressure, datos.estadisticas.list[3].main.pressure, datos.estadisticas.list[4].main.pressure]
	        }
	    ]
	};

	var humedad = {
	    labels: [get_hora(datos.estadisticas.list[0].dt),get_hora(datos.estadisticas.list[1].dt), get_hora(datos.estadisticas.list[2].dt), get_hora(datos.estadisticas.list[3].dt), get_hora(datos.estadisticas.list[4].dt)],
	    datasets: [
	        {
	            label: "Temperaturas",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [datos.estadisticas.list[0].main.humidity, datos.estadisticas.list[1].main.humidity, datos.estadisticas.list[2].main.humidity, datos.estadisticas.list[3].main.humidity, datos.estadisticas.list[4].main.humidity]
	        }
	    ]
	};

	var grados_semanal= {
	    labels: [get_dia(datos.clima_completo.list[0].dt),get_dia(datos.clima_completo.list[1].dt), get_dia(datos.clima_completo.list[2].dt), get_dia(datos.clima_completo.list[3].dt), get_dia(datos.clima_completo.list[4].dt),get_dia(datos.clima_completo.list[5].dt),get_dia(datos.clima_completo.list[6].dt)],
	    datasets: [
	        {
	            label: "Temperaturas",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [parseInt(datos.clima_completo.list[0].temp.day), parseInt(datos.clima_completo.list[1].temp.day,10), parseInt(datos.clima_completo.list[2].temp.day,10), parseInt(datos.clima_completo.list[3].temp.day,10), parseInt(datos.clima_completo.list[4].temp.day,10),parseInt(datos.clima_completo.list[5].temp.day,10),parseInt(datos.clima_completo.list[6].temp.day,10)]
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
	return fecha.getHours();
}

function get_dia(hora){
	var dias = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
	fecha = new Date(hora*1000);
	return dias[fecha.getDay()];
}

module.exports = graficar;