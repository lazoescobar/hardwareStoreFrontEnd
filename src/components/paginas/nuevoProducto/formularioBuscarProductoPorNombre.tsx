"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

import styles from './formularioBuscarProductoPorNombre.module.css'
import InputField from "@/components/common/inputField";
import Spinner from '@/components/common/spinner';
import Alert from '@/components/paginas/alert'

import { InfoProducto } from '@/services/producto/types/InterfacesProducto';
import cambiarNombreProducto from '@/services/producto/cambiarNombreProducto';

interface Props {
    contadorRecargas: number;
    recargarProductos: (value: number) => void;
    actualizaNombreBusqueda: (value: string) => void;
}

const FormularioBuscarProductoPorNombre : React.FC<Props> = ({ contadorRecargas, recargarProductos, actualizaNombreBusqueda }) => {

    const [nombre, setNombre] = useState<string>("");
    const [botonDesabilitado, setBotonDesabilitado] = useState<boolean>(true);
    const [cargando, setCargando] = useState<boolean>(false);
    const [mensajeCargando, setMensajeCargando] = useState<string>("");
    const [errorCambioNombre, setErrorCambioNombre] = useState<boolean>(false);
    const [mensajeErrorCambioNombre, setMensajeErrorCambioNombre] = useState<string>("");
    
    const [errorPreviosSubmit, setErrorPreviosSubmit] = useState<boolean>(false);

    const { data:session } = useSession();
    if(!session){
        return;
    }

    const handleInputChangeName = (value: string, error: boolean | undefined) => {
        setNombre(value);
        setBotonDesabilitado(value.trim().length === 0);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        recargarProductos(contadorRecargas + 1);
        actualizaNombreBusqueda(nombre);
    }

    const limpiarCampos = async () => {
       setNombre("");
       setBotonDesabilitado(true);
    }

  return (
    <div className={styles.border}>
        <div className="container-fluid">
            <form  onSubmit={handleSubmit}>
                <div className="row justify-content-end">
                    <div className="col-lg-12 text-center">
                        <h4> <strong> Formulario búsqueda coincidencia nombre de producto</strong></h4>
                        <br/>
                    </div>
                    <div className="col-lg-12 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-12 text-center">
                                <div className="row justify-content-center">
                                    <div className="col-lg-12 text-center"> <h6 className={styles.subrayado}> Nombre producto</h6></div>
                                    <div className="col-lg-12 text-center"> 
                                        <InputField
                                            disabled={false}
                                            className="text-center form-control custom-input-white" 
                                            placeholder="" 
                                            value={nombre}
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
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary" disabled={botonDesabilitado}>Buscar producto(s) </button>
                                </div>
                                <br/>
                            </div>
                            <div className="col-lg-6">
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-secondary" onClick={limpiarCampos}>Limpiar </button>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default FormularioBuscarProductoPorNombre;