"use client";
import { useSession } from "next-auth/react";

import styles from './formularioBusquedaUsuarios.module.css';
import InputField from "@/components/common/inputField";
import Checkbox from "@/components/common/checkBox";
import { useState } from "react";


interface Props {
    contadorRecargas: number;
    recargarProductos: (value: number) => void;
    actualizaNombreBusqueda: (value: string) => void;
    actualizaTodosBusqueda: (value: boolean) => void;
}

const FormularioBusquedaUsuario : React.FC<Props> = ({contadorRecargas, recargarProductos, actualizaNombreBusqueda, actualizaTodosBusqueda}) => {

    const [nombre, setNombre] = useState<string>("");
    const [isCheckedTodos, setIsCheckedTodos] = useState(false);

    const [botonDesabilitado, setBotonDesabilitado] = useState<boolean>(true);
    
    const { data:session } = useSession();
    if(!session){
        return;
    }

    const handleInputChangeNombre = (value: string, error: boolean | undefined) => {
        setNombre(value);
        setBotonDesabilitado(value.trim().length === 0);
    };

    const handleChangeChecked = (checked: boolean) => {
        setIsCheckedTodos(checked);
        if(nombre.trim.length === 0 && checked === false){
            setBotonDesabilitado(true);
        }

        if(checked === true){
            setBotonDesabilitado(false);
        }
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        recargarProductos(contadorRecargas + 1);
        actualizaNombreBusqueda(nombre);
        actualizaTodosBusqueda(isCheckedTodos);
    }

    return (
        <>
            <br/>
            <br/>
            <div className={styles.border}>
                <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                        <div className="row justify-content-center">
                            <div className="col-lg-10 text-center">
                                <h4> <strong> Formulario búsqueda usuario(s)</strong></h4>
                            </div>
                        </div>
                        <br/>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 text-center">
                                <div className="row justify-content-center">
                                    <div className="col-lg-12 text-center">
                                        <span className={styles.subrayado}> Nombre usuario </span>
                                    </div>
                                    <div className="col-lg-12 text-center">
                                        <InputField
                                        disabled={false}
                                        className="text-center form-control custom-input-white" 
                                        placeholder="" 
                                        value={nombre}
                                        type="text"
                                        expresionRegular={/[\s\S]*/}
                                        mensajeValidacion="" 
                                        onChange={handleInputChangeNombre} />
                                    </div>
                                </div>      
                            </div>
                            <div className="col-lg-4 text-center">
                                <Checkbox 
                                    label={"Todos los usuarios"}
                                    subrayadoLabel={true}  
                                    checked={isCheckedTodos}
                                    onChange={handleChangeChecked}>
                                </Checkbox>
                            </div>
                            <div className="col-lg-4 text-center">
                                <div className="row justify-content-center">
                                    <div className="col-lg-12 text-center">
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary" disabled={botonDesabilitado}>Buscar usuario(s) </button>
                                        </div>
                                        <br/>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-secondary">Limpiar </button>
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

export default FormularioBusquedaUsuario;