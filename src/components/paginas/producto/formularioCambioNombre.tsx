"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

import styles from './formularioCambioNombre.module.css'
import InputField from "@/components/common/inputField";
import Spinner from '@/components/common/spinner';
import Alert from '@/components/paginas/alert'

import { InfoProducto } from '@/services/producto/types/InterfacesProducto';
import cambiarNombreProducto from '@/services/producto/cambiarNombreProducto';

interface Props {
    producto: InfoProducto;
    actualizarProducto: (value: InfoProducto | undefined) => void;
}

const FormularioCambioNombre : React.FC<Props> = ({ producto, actualizarProducto}) => {

    const [nuevoNombre, setNuevoNombre] = useState<string>("");
    const [botonDesabilitado, setBotonDesabilitado] = useState<boolean>(true);
    const [cargando, setCargando] = useState<boolean>(false);
    const [mensajeCargando, setMensajeCargando] = useState<string>("");
    const [errorCambioNombre, setErrorCambioNombre] = useState<boolean>(false);
    const [mensajeErrorCambioNombre, setMensajeErrorCambioNombre] = useState<string>("");
    const [inputNuevoNombreDesabilitado, setInputNuevoNombreDesabilitado] = useState<boolean>(false);
    const [errorPreviosSubmit, setErrorPreviosSubmit] = useState<boolean>(false);

    const { data:session } = useSession();
    if(!session){
        return;
    }

    const handleInputChangeName = (value: string, error: boolean | undefined) => {

        if(value === producto.nombre){
            setErrorCambioNombre(true);
            setMensajeErrorCambioNombre("Nombres deben ser diferences");
            setErrorPreviosSubmit(true);
        }
        else{
            setErrorCambioNombre(false);
            setMensajeErrorCambioNombre("");
            setErrorPreviosSubmit(false);
        }

        setBotonDesabilitado(value.length === 0);
        setNuevoNombre(value);
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!errorPreviosSubmit){
            setErrorCambioNombre(false);
            setMensajeErrorCambioNombre("")
            setInputNuevoNombreDesabilitado(true);
            setBotonDesabilitado(true)
            setCargando(true)
            setMensajeCargando("Espere un momento... Cambiando nombre producto");
            const {user} = session;

            setTimeout(() => {
                cambiarNombreProducto(user.id, producto.id, nuevoNombre)
                .then(response => {
                    setInputNuevoNombreDesabilitado(false);
                    setBotonDesabilitado(false)
                    setCargando(false);
                    setMensajeCargando("");
                    setErrorCambioNombre(false);
                    setMensajeErrorCambioNombre("")
                    setNuevoNombre("");
                    const productoActualizado: InfoProducto = response;
                    actualizarProducto(productoActualizado);
                })
                .catch(error => {
                    setInputNuevoNombreDesabilitado(false);
                    setBotonDesabilitado(false)
                    setCargando(false);
                    setMensajeCargando("");
                    setErrorCambioNombre(true);
                    setMensajeErrorCambioNombre("Error al modificar nombre de producto");
                })
            }, 3000);
        }
    }


  return (
    <div className={styles.border}>
        <div className="container-fluid">
            <form  onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-lg-12 text-center">
                        <h5>Formulario modificar nombre producto</h5>
                        <br/>
                    </div>
                    <div className="col-lg-12 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <div className="row justify-content-center">
                                    <div className="col-lg-12 text-center"> <h6 className={styles.subrayado}> Nombre actual </h6></div>
                                    <div className="col-lg-12 text-center"> 
                                        <div className={styles.inputlikediv}>  {producto.nombre} </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className="col-lg-6 text-center">
                                <div className="row justify-content-center">
                                    <div className="col-lg-12 text-center"> <h6 className={styles.subrayado}> Reemplazar por</h6></div>
                                    <div className="col-lg-12 text-center"> 
                                        <InputField
                                            id="formCambNombre-nuevoNombre" 
                                            disabled={inputNuevoNombreDesabilitado}
                                            className="text-center form-control custom-input-white" 
                                            placeholder="" 
                                            value={nuevoNombre}
                                            type="text"
                                            expresionRegular={/[\s\S]*/}
                                            mensajeValidacion="" 
                                            onChange={handleInputChangeName} 
                                            />
                                    </div>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 text-center">
                        <button type="submit" className="btn btn-primary" disabled={botonDesabilitado}>Confirmar </button>
                        
                    </div>
                        <br/>
                        <br/>
                    <div className="col-lg-8 text-center">
                        {
                            (cargando) && <Spinner mostrar={cargando} mensaje={mensajeCargando}></Spinner>
                        }
                        {
                            (errorCambioNombre) && <Alert mostrar={errorCambioNombre} mensaje={mensajeErrorCambioNombre}></Alert>
                        }
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default FormularioCambioNombre;