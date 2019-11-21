import React, { useEffect } from 'react';
import { useStateValue } from '../../providers/ContextProvider'
import useBoletos from '../../app/hooks/useBoletos';
import { Table } from 'reactstrap';
import CardBox from '../../components/CardBox/CardBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Boletos.css';

const Boletos = () => {
    const [context, dispatch] = useStateValue();
    const boletos = useBoletos();

    useEffect(() => {
        // console.log("desde useEffect", boletos);
    },[])

    return (
        <>
            <div className="d-flex justify-content-center">
                <CardBox title={<><h2>Mis Boletos</h2></>} titleAlign={"center"} opacity={0.5}>
                    <div className="d-flex justify-content-center align-items-center mt-5">
                        <CardBox title="xD" titleAlign={"start"} width={75}>
                            <div className="p-4">
                                <Table className="tabla">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </CardBox>
                    </div>
                </CardBox>
            </div>
        </>
    );
};

export default Boletos;