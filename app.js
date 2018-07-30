var input = document.getElementById('address');
var markers = [];
var map;
var mapOptions;
function initMap() {

  inputAddress();
  mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(-12.08451, -77.05127),
    mapTypeId: 'terrain'
  };

  map = new google.maps.Map(document.getElementById('map'),
    mapOptions);


var jesusMaria = [
  new google.maps.LatLng(-12.06518, -77.04526),
  new google.maps.LatLng(-12.07513, -77.05382),
  new google.maps.LatLng(-12.07261, -77.05709),
  new google.maps.LatLng(-12.07205, -77.05864),
  new google.maps.LatLng(-12.07154, -77.06069),
  new google.maps.LatLng(-12.07165, -77.06146),
  new google.maps.LatLng(-12.07261, -77.06166),
  new google.maps.LatLng(-12.07297, -77.062),
  new google.maps.LatLng(-12.07305, -77.06201),
  new google.maps.LatLng(-12.08127, -77.06646),
  new google.maps.LatLng(-12.08304, -77.06724),
  new google.maps.LatLng(-12.08413, -77.06484),
  new google.maps.LatLng(-12.0854, -77.06433),
  new google.maps.LatLng(-12.08657, -77.06289),
  new google.maps.LatLng(-12.08669, -77.06229),
  new google.maps.LatLng(-12.08802, -77.06032),
  new google.maps.LatLng(-12.09326, -77.05293),
  new google.maps.LatLng(-12.09529, -77.05432),
  new google.maps.LatLng(-12.09797, -77.05565),
  new google.maps.LatLng(-12.09915, -77.05296),
  new google.maps.LatLng(-12.09885, -77.0497),
  new google.maps.LatLng(-12.0984, -77.04907),
  new google.maps.LatLng(-12.09964, -77.04301),
  new google.maps.LatLng(-12.09872, -77.04187),
  new google.maps.LatLng(-12.09543, -77.04005),
  new google.maps.LatLng(-12.0934, -77.04032),
  new google.maps.LatLng(-12.09374, -77.0439),
  new google.maps.LatLng(-12.08309, -77.04493),
  new google.maps.LatLng(-12.08324, -77.04369),
  new google.maps.LatLng(-12.08288, -77.04189),
  new google.maps.LatLng(-12.07976, -77.04166),
  new google.maps.LatLng(-12.07975, -77.04247),
  new google.maps.LatLng(-12.07677, -77.04207),
  new google.maps.LatLng(-12.07448, -77.04197),
  new google.maps.LatLng(-12.0691, -77.03963),
  new google.maps.LatLng(-12.06508, -77.03904),
  new google.maps.LatLng(-12.06508, -77.03904),
  new google.maps.LatLng(-12.06518, -77.04526)

];

var prueba2 =[
  new google.maps.LatLng(-12.08392, -77.03722),
  new google.maps.LatLng(-12.08324, -77.03243),
  new google.maps.LatLng(-12.0924, -77.03148),
  new google.maps.LatLng(-12.09268, -77.03685)
];



var polygon1 = new google.maps.Polygon({
  path: jesusMaria,
  geodesic: false,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 1,
  map: map
});

var polygon2 = new google.maps.Polygon({
  path: prueba2,
  geodesic: false,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 1,
  map: map
});


 //mapLimit.setMap(map);
 var button = document.getElementById('search');

 button.addEventListener('click', function () {
   var text = $('#address').val();
  
   
   deleteMarkers()
   $.ajax({
     url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(text)},Peru&key=AIzaSyA7YnCgF_fr5JpSoRsZZ5C9_YvooKa62Jc`,
     success: function (respuesta) {
       // ubicacion a validar
       var point = new google.maps.LatLng(respuesta.results[0].geometry.location.lat, respuesta.results[0].geometry.location.lng);
       addMarker(point);


       if (google.maps.geometry.poly.containsLocation(point, polygon2)) {
         validateLimit = true;
         validateInputAddress = true;
         console.log('se encuentra en Poligono 1');
         //limit.val(validateLimit)
       } else if (google.maps.geometry.poly.containsLocation(point, polygon1)){
         validateLimit = false;
         validateInputAddress = true;
         console.log('Se encuentra en Poligono 2');
         //limit.val(validateLimit)
       }else{
        console.log('esta fuera de los lìmites');
       }
         

     },
     error: function () {
       console.log("No se ha podido obtener la información");
     }
   });


 });



}



//Agregando marcadores al mapa
function addMarker(location) {
  mapOptions = {
     zoom: 15,
     center: location,
     mapTypeId: 'terrain'
   };
   map = new google.maps.Map(document.getElementById('map'),
     mapOptions);
   var marker = new google.maps.Marker({
     position: location,
     map: map
   });
   markers.push(marker);
 }
 // enviando marcadores en el mapa
 function setMapOnAll(map) {
   for (var i = 0; i < markers.length; i++) {
     markers[i].setMap(map);
   }
 }
 // Funciones para limpiar marcadores
 function clearMarkers() {
   setMapOnAll(null);
 }
 // Muestra y borra marcodores
 function showMarkers() {
   setMapOnAll(map);
 }
 
 function deleteMarkers() {
   clearMarkers();
   markers = [];
 }
 

function inputAddress() {
  let autocompleteorigin = new google.maps.places.Autocomplete(input);
}