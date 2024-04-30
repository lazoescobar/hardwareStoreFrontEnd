"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

import styles from './formularioCambioNombre.module.css'
import InputField from "@/components/common/inputField";

interface Props {
    nombreActual : string;
}

const FormularioCambioNombre : React.FC<Props> = ({ nombreActual }) => {

    const [nuevoNombre, setNuevoNombre] = useState<string>("");
    const [botonDesabilitado, setBotonDesabilitado] = useState<boolean>(true);

    const { data:session } = useSession();
    if(!session){
        return;
    }

    const reloadPage = () => {
        window.location.reload();
    };

    const handleInputChangeName = (value: string, error: boolean | undefined) => {
        setBotonDesabilitado(value.length === 0);
        setNuevoNombre(value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {user} = session;
        console.log(user);
        console.log(nuevoNombre);
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
                                        <InputField 
                                            disabled={true}
                                            initialValue={nombreActual}
                                            className="text-center form-control custom-input-white" 
                                            placeholder="" 
                                            type="text"
                                            mensajeValidacion="" />
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className="col-lg-6 text-center">
                                <div className="row justify-content-center">
                                    <div className="col-lg-12 text-center"> <h6 className={styles.subrayado}> Reemplazar por</h6></div>
                                    <div className="col-lg-12 text-center"> 
                                        <InputField 
                                            className="text-center form-control custom-input-white" 
                                            placeholder="" 
                                            type="text"
                                            expresionRegular={/[\s\S]*/}
                                            mensajeValidacion="" 
                                            onChange={handleInputChangeName} />
                                    </div>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 text-center">
                        <button type="submit" className="btn btn-primary" disabled={botonDesabilitado}>Confirmar </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default FormularioCambioNombre;