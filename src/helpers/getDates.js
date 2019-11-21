const getDates = (destinos) => {
    const vuelos = [...new Set(destinos[Object.keys(destinos)[0]].map(vuelo => {
        const _date = new Date(vuelo.date);
        return new Date(`${_date.getFullYear()}/${(_date.getMonth()+1)}/${_date.getDate()}`);
    }))];
    return vuelos;
}
export default getDates;