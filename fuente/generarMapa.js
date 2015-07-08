

var generarMapa = function mapa(latitud, longitud, zoomMax,zoomMin){
	//MAPA CREACION
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: zoomMin, maxZoom:zoomMax, attribution: osmAttrib});
	var city = L.OWM.current({intervall: 15, imageLoadingUrl: 'img/owmloading.gif', lang: 'sp', minZoom: zoomMin, maxZoom: zoomMax});
	map = new L.Map('mapa_container');
	map.setView(new L.LatLng(latitud,longitud),zoomMin);
	map.addLayer(osm);
	map.addLayer(city);
	///////////////////////////////////////
};

module.exports = generarMapa;