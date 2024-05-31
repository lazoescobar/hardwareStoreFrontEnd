"use client";
import { useState, useEffect} from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';

import styles from './grillaUsuarios.module.css'
import Spinner from '@/components/common/spinner';

import consultaUsuarios from '@/services/usuario/consultaUsuarios';
import {InterfaceConsultaUsuarios, Usuario, General} from '@/services/usuario/types/InterfacesUsuario';
import desactivarUsuario from '@/services/usuario/desactivarUsuario';

interface Props {
    nombreUsuario: string;
    idUsuario: number;
    contador: number;
    nombreBusquedaProducto: string;
    todos: boolean;
}

const GrillaUsuarios : React.FC<Props> = ({ nombreUsuario, idUsuario, contador, nombreBusquedaProducto, todos}) => {

    const [cargando, setCargando] = useState<boolean>(true);
    const mensajeCarga: string = "Espere un momento... Cargando listado de usuarios";
    const [mensajeCargando, setMensajeCargando] = useState<string>(mensajeCarga);
    const [errorCarga, setErrorCarga] = useState<boolean>(true);
    const [mensajeErrorCarga, setMensajeErrorCarga] = useState<string>("");
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([]);

    const cargaInfoUsuarios = () => {
        setTimeout(() => {
            consultaUsuarios(nombreBusquedaProducto, todos)
            .then(response => {
                const infoConsultaProductos : InterfaceConsultaUsuarios = response;
                if(infoConsultaProductos.usuarios){
                    setErrorCarga(false)
                    setUsuarios(infoConsultaProductos.usuarios);
                }
                else{
                    setErrorCarga(true);
                    setMensajeErrorCarga(infoConsultaProductos.mensaje);
                    setUsuarios([]);
                }
                setCargando(false);
            })
            .catch(error => {
                setMensajeErrorCarga("No se encontaron productos");
                setCargando(false);
            })
        }, 2000);
    }

    useEffect(() => {
        if(cargando === false){
            setCargando(true);
            setMensajeErrorCarga("");
        }

        setMensajeCargando(mensajeCarga);
        cargaInfoUsuarios();
    }, [contador]);

    const desactivar = async (idUsuarioDesactivar: number) => {
        setUsuarios([]);
        setCargando(true);
        setMensajeCargando("Espere un momento... Desactivando usuario");
        desactivarUsuario(idUsuario, idUsuarioDesactivar)
        .then(response => {
            cargaInfoUsuarios();
        })
        .catch(error => {
            cargaInfoUsuarios();
        })
    }

    return (
        <div className={styles.divbase}>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className={(!cargando && !errorCarga) ? styles.alturatabla : ""}>
                        <div className="col-lg-12 text-center">
                            <table className="table table-bordered">
                                <thead>
                                    <tr className="table-secondary">
                                        <th scope="col">Nombre usuario</th>
                                        <th scope="col">Nombre Completo</th>
                                        <th scope="col">Perfil</th>
                                        <th scope="col">Fecha registro</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                {           
                                    (cargando === false && errorCarga === false) &&
                                    <tbody>
                                    {  
                                    
                                        usuarios.map((usuario, index) => (
                                            <tr key={"tr-row"+index} >
                                                <td>{usuario.nombreUsuario}</td>
                                                <td>{usuario.nombreCompleto}</td>
                                                <td>{usuario.perfil}</td>
                                                <td>{usuario.fechaRegistro}</td>

                                                <td className={styles.textblack}>
                                                    <div className="row">
                                                        <div className="col-lg-6 text-center">
                                                            <Link legacyBehavior href={`/usuario/${usuario.id}`} prefetch={false} replace passHref>
                                                                <a href={`/usuario/${usuario.id}`} className={styles.textblack}><strong className={styles.textblack}>Modificar Pass </strong></a>
                                                            </Link>
                                                        </div>

                                                        {
                                                            (nombreUsuario !== usuario.nombreUsuario) &&
                                                            <div className="col-lg-6 text-end">
                                                                    {
                                                                    (usuario.estado === "ACT") 
                                                                    ? 
                                                                        <button className="btn" onClick={()=> desactivar(usuario.id) }>
                                                                            <strong className={styles.textgreen}>ON 
                                                                                <FontAwesomeIcon icon={faToggleOff} />
                                                                            </strong>
                                                                        </button>
                                                                    :
                                                                        <strong className={styles.textred}>OFF 
                                                                            <FontAwesomeIcon icon={faToggleOn} />
                                                                        </strong>
                                                                }    
                                                            </div>
                                                        }
                                                       
                                                    </div>
                                                </td>
                                            </tr>
                                    ))}
                                    </tbody>
                                }
                            </table>
                        </div>     
                    </div>
                </div>
                {
                    (cargando) && 
                    <div className="row justify-content-center">
                        <div className="col-lg-4 text-center">
                            <br/>
                            <Spinner mostrar={cargando} mensaje={mensajeCargando}></Spinner>
                        </div>
                    </div>
                }

                {
                    (errorCarga) && 
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <br/>
                            <strong> {mensajeErrorCarga} </strong>
                        </div>
                    </div>
                }   
            </div>
        </div>
    );
};

export default GrillaUsuarios;