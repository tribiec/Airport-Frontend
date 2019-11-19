/* eslint-disable no-undef */
//* Configuracion Google Maps API
//? Helpers

const puntoMedio = (lat1, lng1, lat2, lng2) => {
    const toRadians = (degrees) => {
      return degrees * Math.PI / 180;
    };
  
    const toDegrees = (radians) => {
      return radians * 180 / Math.PI;
    };
    
    const dLon = toRadians(lng2 - lng1);
  
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);
    lng1 = toRadians(lng1);
  
    const Bx = Math.cos(lat2) * Math.cos(dLon);
    const By = Math.cos(lat2) * Math.sin(dLon);
    const lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
    const lng3 = lng1 + Math.atan2(By, Math.cos(lat1) + Bx);
    // retornar en grados
    return { lat: Number(toDegrees(lat3).toPrecision(5)), lng: Number(toDegrees(lng3).toPrecision(5)) };
  };
  
  const DMStoD = (_dms) => {
    const dms_string = String(_dms.toPrecision(6));
    const dms = {};
    let operador = 0;
  
    if (dms_string.substr(0, 1) == "-") {
      console.log("Coordenada Negativa");
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
  
  function initMap(aeropuertos,id) {
    let marker1, marker2;
    let poly, geodesicPoly;
    let map = new google.maps.Map(document.getElementById(id), {
      zoom: 6,
      center: { ...puntoMedio(aeropuertos[0].lat, aeropuertos[0].lng, aeropuertos[1].lat, aeropuertos[1].lng) },
      draggable: false,
      disableDefaultUI: true
    });
  
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