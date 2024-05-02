"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Image from 'next/image'

import styles from './formularioRegistrarIngresoEgreso.module.css'
import RadioButtonGroup from '@/components/paginas/producto/radioButtonGroup';
import InputField from "@/components/common/inputField";
import Spinner from '@/components/common/spinner';
import Alert from '@/components/paginas/alert'

import { InfoProducto } from '@/services/producto/types/InterfacesProducto';
import obtenerStockActualProducto from '@/services/producto/obtenerStockActualProducto';


interface Props {
    producto: InfoProducto;
}

const FormularioRegistrarIngresoEgreso : React.FC<Props> = ({ producto }) => {

    const options = [{key :'ING',value: 'Ingreso'}, {key: 'EGR', value: 'Egreso'}];

    const [stockActual, setStockActual] = useState<number>(0);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [cantidad, setCantidad] = useState<number>(0);

    useEffect(() => {
        obtenerStockActualProducto(producto.id)
        .then(response => {
            setStockActual(response);
        })
        .catch(error => {
            console.log(error);
        })
      }, []);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleRadioChange = (value: string) => {
        setSelectedValue(value);
        console.log('Valor seleccionado:', value);
    };

    const sumaORestaCantidad = (accion: string) =>{
        if(accion === "R"){
            if(cantidad > 0){
                setCantidad(cantidad -1)
            }
        }
        else{
            if(cantidad < stockActual) setCantidad(cantidad + 1);
        }
    }




  return (
    <div className={styles.border}>
        <div className="container-fluid">
            <form  onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-lg-12 text-center">
                        <h4> <strong> Formulario movimiento ingreso/egreso producto </strong></h4>
                        <br/>
                    </div>
                    <div className="col-lg-12 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <h5 className={styles.subrayado}><strong> Tipo producto: </strong></h5>
                            </div>
                            <div className="col-lg-6 text-center">
                                <h5><strong> {producto.descTipo} </strong></h5>
                            </div>
                        </div>
                        <br/>
                        <br/>
                    </div>
                    <div className="col-lg-12 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-12 text-center">
                                {
                                    (producto.tipo === "CAJ") 
                                    ? 
                                        <Image
                                        src="/images/caja.png"
                                        width={150}
                                        height={150}
                                        alt="Picture of the author"
                                        />
                                    :
                                        <Image
                                            src="/images/unidad.png"
                                            width={150}
                                            height={150}
                                            alt="Picture of the author"
                                        />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <h5 className={styles.subrayado}><strong> Stock actual: </strong></h5>
                            </div>
                            <div className="col-lg-6 text-center">
                                <h5><strong> {stockActual} </strong></h5>
                            </div>
                        </div>
                        <br/>
                        <br/>
                    </div>

                    <div className="col-lg-12 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <h5 className={styles.subrayado}><strong> Tipo movimiento: </strong></h5>
                            </div>
                            <div className="col-lg-6 text-center">
                                <RadioButtonGroup options={options} selectedValue={selectedValue} onChange={handleRadioChange}></RadioButtonGroup>
                            </div>
                        </div>
                        <br/>
                    </div>

                    <div className="col-lg-12 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <h5 className={styles.subrayado}><strong> Nueva cantidad: </strong></h5>
                            </div>
                            <div className="col-lg-6 text-center"> 
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 text-end">
                                        <button className={styles.transparentbuttonsuma} onClick={() => sumaORestaCantidad("S")} >+</button>
                                    </div>
                                    <div className="col-lg-4 text-center">
                                        <h5><strong> {cantidad} </strong></h5>
                                    </div>
                                    <div className="col-lg-4 text-start">
                                        <button  className={styles.transparentbuttonresta} onClick={() => sumaORestaCantidad("R")}>-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>




                    <div className="col-lg-12 text-center">
                        <button type="submit" className="btn btn-primary">Confirmar </button>
                        
                    </div>
                        <br/>
                        <br/>
                    <div className="col-lg-8 text-center">
                        {
                            //(cargando) && <Spinner mostrar={cargando} mensaje={mensajeCargando}></Spinner>
                        }
                        {
                            //(errorCambioNombre) && <Alert mostrar={errorCambioNombre} mensaje={mensajeErrorCambioNombre}></Alert>
                        }
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default FormularioRegistrarIngresoEgreso;