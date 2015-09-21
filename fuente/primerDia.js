var organizarDias = require('./organizarDias.js');

var primerDia = function(diaActual) {
    $('#clima_icon').attr('src', 'img/ICONS/' + diaActual.weather[0].icon + '.png');
    $('#grados_dia_seleccionado').html(parseInt(diaActual.temp.day, 10));
    $('#tipo_dia_seleccionado').html(diaActual.weather[0].description);
    $('#maxima_dia_seleccionado').html(parseInt(diaActual.temp.max, 10));
    $('#minima_dia_seleccionado').html(parseInt(diaActual.temp.min, 10));
    organizarDias(diaActual.dt);
}


module.exports = primerDia;
