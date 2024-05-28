"use client";
import { useState, useEffect} from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';

import styles from './grillaUsuarios.module.css'
import Spinner from '@/components/common/spinner';

import consultaUsuarios from '@/services/usuario/consultaUsuarios';
import {InterfaceConsultaUsuarios, Usuario} from '@/services/usuario/types/InterfacesUsuario';

interface Props {
    contador: number;
    nombreBusquedaProducto: string;
    todos: boolean;
}

const GrillaUsuarios : React.FC<Props> = ({ contador, nombreBusquedaProducto, todos}) => {

    const [cargando, setCargando] = useState<boolean>(true);
    const mensajeCargando: string = "Espere un momento... Cargando listado de usuarios";
    const [errorCarga, setErrorCarga] = useState<boolean>(true);
    const [mensajeErrorCarga, setMensajeErrorCarga] = useState<string>("");
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([]);

    useEffect(() => {
        if(cargando === false){
            setCargando(true);
            setMensajeErrorCarga("");
        }

        
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
                setCargando(false);
                setMensajeErrorCarga("No se encontaron productos");
            })

        }, 2000);
    }, [contador]);

    const activarODesactivar = async (idUsuario: number, estado: string) => {
       console.log(idUsuario);
       console.log(estado);
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
                                                        <div className="col-lg-6 text-end">

                                                            <button className="btn" onClick={()=> activarODesactivar(usuario.id, usuario.estado) }>
                                                             {
                                                                (usuario.estado === "ACT") 
                                                                ? 
                                                                    <strong className={styles.textgreen}>ON 
                                                                        <FontAwesomeIcon icon={faToggleOff} />
                                                                    </strong>
                                                                :
                                                                    <strong className={styles.textred}>OFF 
                                                                        <FontAwesomeIcon icon={faToggleOn} />
                                                                    </strong>
                                                            }    
                                                             </button>
                                                            
                                                        </div>
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