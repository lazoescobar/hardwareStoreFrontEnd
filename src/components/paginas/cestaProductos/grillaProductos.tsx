"use client";
import { useState, useEffect} from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import styles from './grillaProductos.module.css'
import Spinner from '@/components/common/spinner';

import consultaProductos from '@/services/producto/consultaProductos';

import { InterfaceConsultaProductos, Producto } from '@/services/producto/types/InterfacesProducto';


interface Props {
    contador: number;
    nombreBusquedaProducto: string;
    todos: boolean;
    tipoUsuario: string;
}

const GrillaProductos : React.FC<Props> = ({ contador, nombreBusquedaProducto, todos, tipoUsuario}) => {

    const [cargando, setCargando] = useState<boolean>(true);
    const mensajeCargando: string = "Espere un momento... Cargando listado de productos";
    const [errorCarga, setErrorCarga] = useState<boolean>(true);
    const [mensajeErrorCarga, setMensajeErrorCarga] = useState<string>("");
    const [productos, setProductos] = useState<Array<Producto>>([]);

    useEffect(() => {
        if(cargando === false){
            setCargando(true);
            setMensajeErrorCarga("");
        }

        setTimeout(() => {
            consultaProductos(nombreBusquedaProducto, todos)
            .then(response => {
                const infoConsultaProductos : InterfaceConsultaProductos = response;
                if(infoConsultaProductos.productos){
                    setErrorCarga(false)
                    setProductos(infoConsultaProductos.productos);
                }
                else{
                    setErrorCarga(true);
                    setMensajeErrorCarga(infoConsultaProductos.mensaje);
                    setProductos([]);
                }
                setCargando(false);
            })
            .catch(error => {
                setCargando(false);
                setMensajeErrorCarga("No se encontaron productos");
            })

        }, 2000); 
    }, [contador]);

  return (
        <div className={styles.divbase}>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className={(!cargando && !errorCarga) ? styles.alturatabla : ""}>
                        <div className="col-lg-12 text-center">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre producto</th>
                                        <th scope="col">Fecha registro producto</th>
                                        <th scope="col">Fecha último ingreso</th>
                                        <th scope="col">Fecha último engreso</th>
                                        <th scope="col">Cantidad stock actual</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                {           
                                    (cargando === false && errorCarga === false) &&
                                    <tbody>
                                    {  
                                        productos.map((producto, index) => (
                                            <tr key={"tr-row"+index} className={( tipoUsuario === "DUE" && ((producto.tipo === "CAJ" && producto.stockActual < 5) || (producto.tipo === "UNI" && producto.stockActual < 20))) ? styles.colored: ""}>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.fechaRegistroProducto}</td>
                                                <td>{ producto.fechaUltimoIngreso ?? "Sin ingresos" }</td>
                                                <td>{ producto.fechaUltimoIngreso ?? "Sin egresos" }</td>
                                                <td>{producto.stockActual}</td>
                                                
                                                <td className={styles.textblack}>
                                                    <div >
                                                        <Link legacyBehavior href={`/producto/${producto.id}`} prefetch={false} replace passHref>
                                                            <a href={`/producto/${producto.id}`} className={styles.textblack}><strong className={styles.textblack}>Ver producto </strong></a>
                                                        </Link>
                                                        <FontAwesomeIcon icon={faEye} className={styles.textblack}/>
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

export default GrillaProductos;