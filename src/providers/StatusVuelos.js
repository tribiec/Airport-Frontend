export const StatusVuelos = (status) => {
    switch (status) {
        case 101:
            return "A tiempo...";
        case 102: 
            return "Demorado por mal tiempo...";
        case 103:
            return "Demorado...";
        case 104:
            return "Cancelado";
        default:
            return "Status desconocido...";
    }
};