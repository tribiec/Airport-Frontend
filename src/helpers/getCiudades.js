const getCiudades = (destinos) => {
    const ciudades = [...new Set(destinos.map(destino => destino.destino_ciudad))];
    let respuesta = {};
    ciudades.forEach(ciudad => {
        const vuelosCiudad = destinos.filter(destino => destino.destino_ciudad === ciudad);
        const aeropuertos_ciudad = [...new Set(vuelosCiudad.map(destino => destino.destino_id))];
        let aeropuertos_ciudad_vuelos = {};
        aeropuertos_ciudad.forEach(aeropuerto => {
            aeropuertos_ciudad_vuelos[`${aeropuerto}`] = vuelosCiudad.filter(vuelo => (vuelo.destino_id === aeropuerto));
        });
        respuesta[`${ciudad}`] = {...aeropuertos_ciudad_vuelos};
    });
    return respuesta;
}

export default getCiudades;