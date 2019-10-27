export const userState = () => {
    const user = {
    nombre: null,
    apellido: null,
    correo: null,
    id: null,
    token: null,
    super_user: null
    }
    return JSON.parse(localStorage.getItem('user')) || {...user}
}

export const appState = () => {
    const app = {
        logged: ((JSON.parse(localStorage.getItem('user'))) ? true : false),
        aeropuertos: [],
        aeropuerto_actual: null,
        agencias: [],
        agencia_actual: null,
        location: null,
        vuelos: {
            llegadas: [],
            salidas: []
        },
        selector_aero: 0,
        selector_agencia: 0
    }
    return {...app};
}