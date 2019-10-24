import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../providers/ContextProvider';
import { Container, Alert } from 'reactstrap';
import { CardBox } from '../../components/Card/CardBox';
import Fetch from '../../providers/Fetch';
import './Login.css';
export default (props) => {
    const [, dispatch] = useStateValue();

    const [userData, setuserData] = useState({
        correo: '',
        clave: ''
    });

    const [status, setStatus] = useState({
        error: false,
        status: 0
    });


    const errorsEnum = (error) => {
        switch (error) {
            case 401:
                return "Usuario no existe";
            case 402:
                return "Clave Invalida";
            default:
                return "Falla en el sistema";
        };
    };

    const handleChange = (evt) => {
        setuserData({ ...userData, [evt.target.name]: evt.target.value })
    };

    const sendData = async (evt) => {
        evt.preventDefault();
        let resp = await Fetch.post("user/login", { correo: userData.correo.toLowerCase(), clave: userData.clave });
        if (resp.status === 200) {
            const user = resp.message;
            localStorage.setItem('user', JSON.stringify({ ...user }))
            dispatch({ type: 'SET_LOGGED' });
            props.history.push('/');
        } else {
            setStatus({
                error: true,
                status: resp.status
            });
        };
    };

    return (
        <Container>
            <div className="d-flex justify-content-center login">
                <CardBox title={<h2>Iniciar Sesion</h2>} width={50}>
                    <div className="d-flex flex-column justify-content-center align-items-center mt-4 ml-5 mr-5" style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
                        <form onSubmit={sendData} className="w-100">
                            <h2>Email</h2>
                            <input name="correo" className="mt-3 p-2" type="email" placeholder="correo@ejemplo.com" value={userData.correo} onChange={handleChange} />
                            <h2 className="mt-3">Clave</h2>
                            <input name="clave" className="mt-3 p-2" type="password" placeholder="*********" value={userData.clave} onChange={handleChange} />
                            {(status.error) ?
                                <>
                                    <div className="d-flex flex-row w-100 mt-4">
                                        <Alert color="danger">
                                            {errorsEnum(status.status)}, vuelva a intentarlo...
                                        </Alert>
                                    </div>
                                </> : ""}
                            <div className={`d-flex flex-row w-100 ${(status.error) ? "mt-2" : "mt-5"} mb-5`} style={{ background: "", height: "" }}>
                                <div className="d-flex flex-fill links justify-content-center align-items-center">
                                    <Link to='/forgot'>Olvidaste tu Clave?</Link> / <Link to='/register'>Registrarme</Link>
                                </div>
                                <div className="d-flex flex-fill justify-content-center align-items-center">
                                    <button type="submit" className="pl-4 pr-4 pt-2 pb-2">Iniciar Sesion</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </CardBox>
            </div>
        </Container>
    )
}