/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
//* Configuracion Google Maps API
//? Helpers

//* Grados, Minutos y Segundos a Decimal
const DMStoD = (_dms) => {
  const dms_string = String(_dms.toPrecision(6));
  const dms = {};
  let operador = 0;

  if (dms_string.substr(0, 1) === "-") {
    dms.grados = Number(dms_string.substr(1, 2));
    dms.minutos = Number(dms_string.substr(4, 2));
    dms.segundos = Number(dms_string.substr(6, 2));
    operador = -1;
  } else {
    dms.grados = Number(dms_string.substr(0, 2));
    dms.minutos = Number(dms_string.substr(3, 2));
    dms.segundos = Number(dms_string.substr(5, 2));
    operador = 1;
  };

  const num = (operador) * (dms.grados + (dms.minutos / 60) + (dms.segundos / (60 * 60)));
  return Number(num.toPrecision(6));
};

//*  ///////////////////////////////         Google Maps API        ///////////////////////////////////////

function initMap(aeropuertos, id) {
  let marker1, marker2;
  let poly, geodesicPoly;
  let bound = new google.maps.LatLngBounds();

  bound.extend(new google.maps.LatLng(aeropuertos[0].lat, aeropuertos[0].lng));
  bound.extend(new google.maps.LatLng(aeropuertos[1].lat, aeropuertos[1].lng));

  let map = new google.maps.Map(document.getElementById(id), {
    draggable: false,
    disableDefaultUI: true
  });

  map.fitBounds(bound);
  map.panToBounds(bound);

  marker1 = new google.maps.Marker({
    map: map,
    position: { lat: DMStoD(aeropuertos[0].lat), lng: DMStoD(aeropuertos[0].lng) }
  });

  marker2 = new google.maps.Marker({
    map: map,
    position: { lat: DMStoD(aeropuertos[1].lat), lng: DMStoD(aeropuertos[1].lng) }
  });

  poly = new google.maps.Polyline({
    strokeColor: '#FF0000',
    strokeOpacity: 0,
    strokeWeight: 0,
    map: map,
  });

  geodesicPoly = new google.maps.Polyline({
    strokeColor: '#6B0504',
    strokeOpacity: 1.0,
    strokeWeight: 1,
    geodesic: true,
    map: map
  });

  const path = [marker1.getPosition(), marker2.getPosition()];
  poly.setPath(path);
  geodesicPoly.setPath(path);

}

export default initMap;