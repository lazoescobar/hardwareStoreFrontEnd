"use client";
import { useState, useEffect} from "react";

import styles from './grillaMovimientosProducto.module.css'
import Spinner from '@/components/common/spinner';

import consultaMovimientoIngresoEgreso from '@/services/movimientosProducto/consultaMovimientosIngresoEgreso';
import { InfoProducto } from '@/services/producto/types/InterfacesProducto';
import { InfaceSalidaConsultaMovimientos, Movimiento } from '@/services/movimientosProducto/types/InterfaceMovimientoProducto';


interface Props {
    contador: number;
    producto: InfoProducto;
}

const GrillaMovimientoProducto : React.FC<Props> = ({ contador,  producto }) => {

    const [cargando, setCargando] = useState<boolean>(true);
    const mensajeCargando: string = "Espere un momento... Cargando movmimientos";
    const [errorCarga, setErrorCarga] = useState<boolean>(false);
    const [mensajeErrorCarga, setMensajeErrorCarga] = useState<string>("");
    const [movimientos, setMovimientos] = useState<Array<Movimiento>>([]);

    useEffect(() => {
        if(cargando === false){
            setCargando(true);
            setMensajeErrorCarga("");
        }

        setTimeout(() => {
            consultaMovimientoIngresoEgreso(producto.id)
            .then(response => {
                const movimientosProducto : InfaceSalidaConsultaMovimientos = response;
                if(movimientosProducto.movimientos){
                    setErrorCarga(false);
                    setCargando(false);
                    setMovimientos(movimientosProducto.movimientos);
                }
                else{
                    setMensajeErrorCarga(movimientosProducto.mensaje);
                    setErrorCarga(true);
                    setCargando(false);
                }
            })
            .catch(error => {
                console.log(error);
                setCargando(false);
                setMensajeErrorCarga("Sin registro de movimientos");
                setErrorCarga(true);
            })
        }, 2000); 
    }, [contador]);

  return (
    <div className={styles.divbase}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-12 text-center">
                    <h4> <strong> Movimientos producto </strong></h4>
                    <br/>
                </div>
                {
                    (cargando) && 
                    <div className="col-lg-8 text-center">
                        <Spinner mostrar={cargando} mensaje={mensajeCargando}></Spinner>
                    </div>
                }

                {
                    (errorCarga) && 
                    <div className="col-lg-8 text-center">
                        <strong> {mensajeErrorCarga} </strong>
                    </div>
                }

                {           
                    (cargando === false && errorCarga === false) && 
                    <div className={styles.alturatabla}>
                        <div className="col-lg-12 text-center">
                            <table className="table table-bordered">
                                <thead className="table-secondary">
                                    <tr>
                                    <th scope="col">Fecha Movimiento</th>
                                    <th scope="col">Tipo Movimiento</th>
                                    <th scope="col">{"(+) Ingreso"}</th>
                                    <th scope="col">{"(-) Egreso"}</th>
                                    <th scope="col">Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {   movimientos.map((movimiento, index) => (
                                        <tr key={"tr-row"+index}>
                                            <td>{movimiento.fechaMovimiento}</td>
                                            <td>{movimiento.tipoMovimiento}</td>
                                            <td>{ (movimiento.ingreso && movimiento.ingreso !== 0) ?movimiento.ingreso : "" }</td>
                                            <td>{ (movimiento.egreso && movimiento.egreso !== 0) ?movimiento.egreso : "" }</td>
                                            <td>{movimiento.stock}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>    
                    </div>
                }

            </div>
        </div>
    </div>
  );
};

export default GrillaMovimientoProducto;