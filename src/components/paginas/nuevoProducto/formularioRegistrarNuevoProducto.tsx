"use client";
import React, { useState } from 'react';
import Image from 'next/image'
import { useSession } from "next-auth/react";

import InputField from "@/components/common/inputField";
import styles from './formularioRegistrarNuevoProducto.module.css';
import Spinner from '@/components/common/spinner';
import Alert from '@/components/paginas/alert'

import InputSelect from '@/components/common/inputSelect'

import registrarNuevoProducto from '@/services/producto/registrarNuevoProducto';
import {InterfaceNuevoProducto} from '@/services/producto/types/InterfacesProducto';


const FormularioRegistrarNuevoProducto : React.FC = () => {

    const [cargando, setCargando] = useState<boolean>(false);
    const [botonDesabilitado, setBotonDesabilitado] = useState<boolean>(true);
    const [nombreProducto, setNombreProducto] = useState<string>("");
    const [cantidad, setCantidad] = useState<number>(0);
    const [tipoProducto, setTipoProducto] = useState<string>("");

    const [errorTipoProducto, setErrorTipoProducto] = useState<boolean>(false);
    const [errorCantidad, setErrorCantidad] = useState<boolean>(false);
    const [mensajeErrorCantidad, setMensajeErrorCantidad] = useState<string>("");

    const [mostrarAlertaRegistroNuevoProducto, setMostrarAlertaRegistroNuevoProducto] = useState<boolean>(false);
    const [tipoAlerta, setTipoAlerta] = useState<string>("");
    const [mensajeAlertaIngresoEgreso, setMensajeAlertaIngresoEgreso] = useState<string>("");

    const { data:session } = useSession();
    if(!session){
        return;
    }

    const handleInputChangeName = (value: string, error: boolean | undefined) => {
        setNombreProducto(value);
        setBotonDesabilitado(value.trim().length === 0);
        
    };

    const handleSelect = (value: string) => {
        if(value == null || value.trim().length === 0){
            setErrorTipoProducto(true);
        }
        else{
            setErrorTipoProducto(false);
        }
        setTipoProducto(value);
    };

    const accionAgregar = () => {
        setCantidad(cantidad + 1);
        setErrorCantidad(false);
        setMensajeErrorCantidad("");
    }

    const accionRestar = () => {
        if(cantidad === 0){
            setErrorCantidad(true);
            setMensajeErrorCantidad("Cantidad de producto no puede menor o igual 0");
            return;
        }
        setCantidad(cantidad - 1);
        setErrorCantidad(false);
        setMensajeErrorCantidad("");
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(cantidad === 0){
            setErrorCantidad(true);
            setMensajeErrorCantidad("Cantidad de producto no puede ser 0");
            return;
        }
        setErrorCantidad(false);
        setMensajeErrorCantidad("");

        if(tipoProducto == null || tipoProducto.trim().length === 0){
            setErrorTipoProducto(true);
            return;
        }

        setErrorTipoProducto(false);
        const {user} = session;
        setCargando(true);
        setMostrarAlertaRegistroNuevoProducto(false);
        setTipoAlerta("");

        setTimeout(() => {
            registrarNuevoProducto(user.id, nombreProducto, cantidad, tipoProducto)
            .then(response => {
                const registroNuevoProducto : InterfaceNuevoProducto = response;
                setCargando(false);
                setMostrarAlertaRegistroNuevoProducto(true)
                setTipoAlerta( (registroNuevoProducto.status == 200) ? "SUC" :"ERR" );
                setMensajeAlertaIngresoEgreso(registroNuevoProducto.data.mensaje);
            })
            .catch(error => {
                setCargando(false);
                setMostrarAlertaRegistroNuevoProducto(true)
                setTipoAlerta( "ERR" );
                setMensajeAlertaIngresoEgreso("Problemas al registrar nuevo producto");
                console.log(error);
            })
        }, 5000);
    }

    const limpiar = () => {
        setBotonDesabilitado(true);
        setNombreProducto("");
        setCantidad(0)
    }

  return (
    <>
        <br/>
        <div className={styles.border}>
            <div className="container-fluid">
                <form  onSubmit={handleSubmit}>
                    <div className="row justify-content-center">
                        <div className="col-lg-12 text-center">
                            <h4> <strong> Formulario registrar nuevo producto </strong></h4>
                            <br/>
                        </div>
                        <div className="col-lg-12 text-center">
                            <div className="row justify-content-center">
                                <div className="col-lg-8 text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 text-center">
                                            <h5 className={styles.subrayado}><strong> Nombre producto: </strong></h5>
                                        </div>
                                        <div className="col-lg-6 text-center">
                                        <InputField
                                                disabled={false}
                                                className="text-center form-control custom-input-white-with-margin" 
                                                placeholder="" 
                                                value={nombreProducto}
                                                type="text"
                                                expresionRegular={/[\s\S]*/}
                                                mensajeValidacion="Nombre de producto no puede ser vacio" 
                                                onChange={handleInputChangeName} 
                                                />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-12 text-center">
                                            <div className="row justify-content-center">
                                                <div className="col-lg-6 text-center">
                                                    <h5 className={styles.subrayado}><strong> Nueva cantidad: </strong></h5>
                                                </div>
                                                <div className="col-lg-6 text-center"> 
                                                    <div className="row justify-content-center">
                                                        <div className="col-lg-4 text-end">
                                                            <button type="button" className={styles.transparentbuttonsuma} onClick={() => accionAgregar() } >+</button>
                                                        </div>
                                                        <div className="col-lg-4 text-center">
                                                            <h5><strong> {cantidad} </strong></h5>
                                                        </div>
                                                        <div className="col-lg-4 text-start">
                                                            <button type="button" className={styles.transparentbuttonresta} onClick={() => accionRestar()}>-</button>
                                                        </div>
                                                    </div>
                                                    {
                                                        (errorCantidad) && 
                                                        <>
                                                            <div className="row justify-content-center">
                                                                <div className="col-lg-12 text-center">
                                                                    <span className={styles.validacionmensaje}> {mensajeErrorCantidad} </span>
                                                                </div>
                                                            </div>
                                                            <br/>
                                                        </> 
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 text-center">
                                            <h5 className={styles.subrayado}><strong> Tipo producto: </strong></h5>
                                        </div>
                                        <div className="col-lg-6 text-center">
                                            <InputSelect
                                                onSelect={handleSelect}
                                            />
                                            {
                                                (errorTipoProducto) && 
                                                <div className="row justify-content-center">
                                                    <div className="col-lg-12 text-center">
                                                        <span className={styles.validacionmensaje}> Seleccionar un tipo producto </span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="row justify-content-end">
                                        <div className="col-lg-6 text-center">
                                            {
                                                (tipoProducto === "CAJ") &&
                                                <Image
                                                    src="/images/caja.png"
                                                    width={70}
                                                    height={70}
                                                    alt="Picture of the author"
                                                />
                                            }

                                            {
                                                (tipoProducto === "UNI") &&
                                                <Image
                                                    src="/images/unidad.png"
                                                    width={70}
                                                    height={70}
                                                    alt="Picture of the author"
                                                />
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-center">
                                    <div className="row">
                                        <div className="col-lg-12 text-center">
                                            <div className="d-grid gap-2">
                                                <button type="submit" className="btn btn-primary" disabled={botonDesabilitado}>Registrar producto </button>
                                            </div>
                                            <br/>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="d-grid gap-2">
                                                <button type="button" className="btn btn-secondary" onClick={() => limpiar()}>Limpiar </button>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <br/>
                                            {
                                                (cargando) && 
                                                <Spinner mostrar={cargando} mensaje={`Espere un momento porfavor... registrando nuevo producto con nombre ${nombreProducto}`}></Spinner>
                                            }
                                            {
                                                (mostrarAlertaRegistroNuevoProducto) && 
                                                <Alert mostrar={mostrarAlertaRegistroNuevoProducto} type={tipoAlerta} mensaje={mensajeAlertaIngresoEgreso}></Alert>
                                            }
                                        </div>
                                    </div>  
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
    
  );
};

export default FormularioRegistrarNuevoProducto;