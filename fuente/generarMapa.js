

var generarMapa = function mapa(){
	//MAPA CREACION
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 9, maxZoom:9, attribution: osmAttrib});
	var city = L.OWM.current({intervall: 15, imageLoadingUrl: 'img/owmloading.gif', lang: 'sp', minZoom: 9, maxZoom: 9});
	map = new L.Map('mapa_container');
	map.setView(new L.LatLng(latitud,longitud),9);
	map.addLayer(osm);
	map.addLayer(city);
	///////////////////////////////////////
};

module.exports = generarMapa;