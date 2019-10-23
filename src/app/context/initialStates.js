export const userState = () => {
    const user = {
    nombre: null,
    apellido: null,
    email: null,
    id: null,
    token: null,
    super_user: null
    }
    return JSON.parse(localStorage.getItem('user')) || {...user}
}

export const appState = () => {
    const app = {
        logged: ((JSON.parse(localStorage.getItem('user'))) ? true : false),
        aeropuertos: null,
        aeropuerto_actual: null,
        agencias: null,
        agencia_actual: null,
        location: null,
        vuelos: null
    }
    return {...app};
}