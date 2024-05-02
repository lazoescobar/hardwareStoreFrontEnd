"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

import Image from 'next/image'

import styles from './formularioRegistrarIngresoEgreso.module.css'
import RadioButtonGroup from '@/components/paginas/producto/radioButtonGroup';
import Spinner from '@/components/common/spinner';
import Alert from '@/components/paginas/alert'

import { Options } from  './types/Interface';

import { InfoProducto } from '@/services/producto/types/InterfacesProducto';
import obtenerStockActualProducto from '@/services/producto/obtenerStockActualProducto';


interface Props {
    producto: InfoProducto;
}


const FormularioRegistrarIngresoEgreso : React.FC<Props> = ({ producto }) => {

    const options = [{key :'ING',value: 'Ingreso'}, {key: 'EGR', value: 'Egreso'}];

    const [stockActual, setStockActual] = useState<number>(0);
    const [selectedValue, setSelectedValue] = useState<Options | null>(null);
    const [errorSelect, setErrorSelect] = useState<boolean>(false);
    const [errorCantidadCero, setErrorCantidadCero] = useState<boolean>(false);
    const [cantidad, setCantidad] = useState<number>(0);

    const [cargando, setCargando] = useState<boolean>(false);
    const [mostrarAlertaIngresoEgreso, setMostrarAlertaIngresoEgreso] = useState<boolean>(false);
    const [tipoAlerta, setTipoAlerta] = useState<string>("");
    const [mensajeAlertaIngresoEgreso, setMensajeAlertaIngresoEgreso] = useState<string>("MENSAJE");


    useEffect(() => {
        obtenerStockActualProducto(producto.id)
        .then(response => {
            setStockActual(response);
        })
        .catch(error => {
            console.log(error);
        })
      }, []);

    const { data:session } = useSession();
    if(!session){
        return;
    }

    const handleRadioChange = (value: string, label: string) => {

        const option : Options = {key: value, value: label};

        setSelectedValue(option);
        if(value !== null){
            setErrorSelect(false);
            if(value === "EGR"){
                if(cantidad >= stockActual){
                    setCantidad(stockActual);
                }
            }
        }
    };

    const sumaORestaCantidad = (accion: string) =>{
        if(selectedValue === null){
            setErrorSelect(true);
            return;
        }
        
        setErrorCantidadCero(false);
        setErrorSelect(false);
        //Egreso
        if(selectedValue.key === "EGR"){
            accionEgreso(accion);
        }
        //Ingreso
        if(selectedValue.key === "ING"){
            accionIngreso(accion);
        }
    }


    const accionEgreso = (accion: string) => {
        if(accion === "S"){ //SUMA
            if(cantidad >= 0 && cantidad < stockActual){
                setCantidad(cantidad + 1);
            }
        }
        if(accion === "R" && cantidad > 0){
            setCantidad(cantidad - 1);
        }
    }

    const accionIngreso = (accion: string) => {
        if(accion === "S"){ 
            setCantidad(cantidad + 1);
        }
        if(accion === "R" && cantidad > 0){
            setCantidad(cantidad - 1);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!selectedValue){
            setErrorSelect(true);
            return;
        }
        setErrorSelect(false);

        if(cantidad === 0){
            setErrorCantidadCero(true);
            return;
        }
        setErrorCantidadCero(false);

        const {user} = session;
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
                                <RadioButtonGroup options={options} selectedValue={selectedValue?.key ?? null} onChange={handleRadioChange}></RadioButtonGroup>
                            </div>
                        </div>
                    </div>
                    {
                        (errorSelect) && 
                        <div className="col-lg-12 text-center">
                            <span className={styles.validacionmensaje}> Seleccionar un tipo de movimiento </span>
                        </div>

                    }

                    <div className="col-lg-12 text-center">
                        <br/>
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <h5 className={styles.subrayado}><strong> Nueva cantidad: </strong></h5>
                            </div>
                            <div className="col-lg-6 text-center"> 
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 text-end">
                                        <button type="button" className={styles.transparentbuttonsuma} onClick={() => sumaORestaCantidad("S")} >+</button>
                                    </div>
                                    <div className="col-lg-4 text-center">
                                        <h5><strong> {cantidad} </strong></h5>
                                    </div>
                                    <div className="col-lg-4 text-start">
                                        <button type="button" className={styles.transparentbuttonresta} onClick={() => sumaORestaCantidad("R")}>-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (errorCantidadCero) && 
                        <div className="col-lg-12 text-center">
                            <span className={styles.validacionmensaje}> Cantidad no puede ser 0 </span>
                        </div>
                    }

                    <div className="col-lg-12 text-center">
                        <button type="submit" className="btn btn-primary">Confirmar </button>
                        <br/>
                        <br/>
                    </div>
                        <br/>
                    <div className="col-lg-8 text-center">
                        {
                            (cargando) && <Spinner mostrar={cargando} mensaje={`Espere un momento porfavor... procesando ${selectedValue?.value}`}></Spinner>
                        }
                        {
                            (mostrarAlertaIngresoEgreso) && <Alert mostrar={mostrarAlertaIngresoEgreso} type={tipoAlerta} mensaje={mensajeAlertaIngresoEgreso}></Alert>
                        }
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default FormularioRegistrarIngresoEgreso;