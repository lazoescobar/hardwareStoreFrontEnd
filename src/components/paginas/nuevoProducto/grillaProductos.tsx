"use client";
import { useState, useEffect} from "react";

import styles from './grillaProducto.module.css'
import Spinner from '@/components/common/spinner';


interface Props {
    contador: number;
    nombre: string;
}

import consultaProductosPorNombre from '@/services/producto/consultaProductoPorNombre';
import { InterfaceConsultaProductosPorNombre, ProductoPorNombre } from '@/services/producto/types/InterfacesProducto';

const GrillaProductos : React.FC<Props> = ({ contador, nombre }) => {

    const [cargando, setCargando] = useState<boolean>(true);
    const mensajeCargando: string = "Espere un momento... Cargando coincidencia de productos";
    const [errorCarga, setErrorCarga] = useState<boolean>(false);
    const [mensajeErrorCarga, setMensajeErrorCarga] = useState<string>("");
    const [productos, setProductos] = useState<Array<ProductoPorNombre>>([]);
    
    useEffect(() => {
        if(contador === 0){
            setCargando(false);
            setErrorCarga(true);
            setMensajeErrorCarga("Aun no se ha realizado busqueda");
        }else{
            setCargando(true);
            setErrorCarga(false);
            setTimeout(() => {
                consultaProductosPorNombre(nombre)
                .then(response => {
                    const infoConsultaProductos : InterfaceConsultaProductosPorNombre = response;
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
        }
        
    }, [contador]);

  return (
    <div className={styles.divbase}>
        <div className="container-fluid">
            <div className="row justify-content-center">
                    <div className={(!cargando && !errorCarga) ? styles.alturatabla : ""}>
                        <div className="col-lg-12 text-center">
                            <table className="table table-bordered">
                                <thead>
                                    <tr className="table-secondary">
                                        <th scope="col">Nombre producto</th>
                                        <th scope="col">Fecha registro producto</th>
                                    </tr>
                                </thead>
                                {           
                                    (cargando === false && errorCarga === false) &&
                                    
                                    <tbody>
                                    {  
                                        productos.map((productoPorNombre, index) => (
                                            <tr key={"tr-row"+index}>
                                                <td>{productoPorNombre.nombre}</td>
                                                <td>{productoPorNombre.fechaRegistroProducto}</td>
                                            </tr>
                                    ))}
                                    </tbody>
                                }
                            </table>
                        </div>    
                    </div>
                    {
                        (cargando) && 
                        <div className="col-lg-6 text-center">
                            <br/>
                            <Spinner mostrar={cargando} mensaje={mensajeCargando}></Spinner>
                        </div>
                    }

                    {
                        (errorCarga) && 
                        <div className="col-lg-8 text-center">
                             <br/>
                            <strong> {mensajeErrorCarga} </strong>
                        </div>
                    }
            </div>
        </div>
    </div>
  );
};

export default GrillaProductos;