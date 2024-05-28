"use client";

import { useState } from 'react';
import styles from './formularioCambioPassword.module.css'
import InputField from "@/components/common/inputField";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';

import Spinner from '@/components/common/spinner';
import Alert from '@/components/paginas/alert';

import cambiarPasswordUsuario from '@/services/usuario/cambiarPassword';
import { General } from '@/services/usuario/types/InterfacesUsuario';

interface Props {
    idUsuario: number;
    idUsuarioAModificar: number;
}

const FormularioCambioPassword : React.FC<Props> = ({ idUsuario, idUsuarioAModificar }) => {

    const [nuevaPassword, setNuevaPassword] = useState<string>("");
    const [mostrarPaasword1, setMostrarPaasword1] = useState<boolean>(false);
    const [typePassword1, setTypePassword1] = useState<string>("password");

    const [bloqueoConfirmarPassword, setBloqueoConfirmarPassword] = useState<boolean>(true);
    const [confirmarPassword, setConfirmarPassword] = useState<string>("");
    const [mostrarPaasword2, setMostrarPaasword2] = useState<boolean>(false);
    const [typePassword2, setTypePassword2] = useState<string>("password");

    const mensajeValida = "Password deben ser iguales";
    const [mostrarMensajeValidacion, setMostrarMensajeValidacion] = useState<boolean>(false);

    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

    const [cargando, setCargando] = useState<boolean>(false);
    const [mensajeCargando, setMensajeCargando] = useState<string>("");
    const [mostrarMensajeFinal, setMostrarMensajeFinal] = useState<boolean>(false);
    const [mensajeFinal, setMensajeFinal] = useState<string>("");
    const [tipoAlerta, setTipoAlerta] = useState<string>("SUC");


    const btnPasword1 = () => {
        if(nuevaPassword.trim().length === 0){
            return;
        }
       const value  = !(mostrarPaasword1);
       setMostrarPaasword1(value);
       const valueType = (typePassword1 === "password") ? "text" : "password";
       setTypePassword1(valueType);

    };

    const handleInputChangeNuevaPassword = (value: string, error: boolean | undefined) => {
        setNuevaPassword(value.trim());

        if(nuevaPassword.trim().length < 5){
            setBloqueoConfirmarPassword(true);
            setConfirmarPassword("");
        }
        else{
            setBloqueoConfirmarPassword(false);
            setMostrarMensajeValidacion(true)
        }

    };

    const btnPasword2 = () => {
        if(confirmarPassword.trim().length === 0){
            return;
        }
        const value  = !(mostrarPaasword2);
        setMostrarPaasword2(value);
        const valueType = (typePassword2 === "password") ? "text" : "password";
        setTypePassword2(valueType);
 
    };
 
     const handleInputConfirmarNuevaPassword = (value: string, error: boolean | undefined) => {
        setConfirmarPassword(value.trim());
        if(confirmarPassword.trim().length < 5){
            setBtnDisabled(true);
        }
        else{
            setBtnDisabled(false);
        }
    };
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(nuevaPassword.trim() !== confirmarPassword.trim()){
            setMostrarMensajeValidacion(true)
            return;
        }

        setMostrarMensajeFinal(false);
        setMostrarMensajeValidacion(false);
        setCargando(true);
        setMensajeCargando("Espere un momento... Cambiando password de usuario");

        setTimeout(() => {
            cambiarPasswordUsuario(idUsuario, idUsuarioAModificar, nuevaPassword)
            .then(response => {
                setCargando(false);
                setMostrarMensajeFinal(true);
                setTipoAlerta("SUC");
               const mensaje: General = response;
               setMensajeFinal(mensaje.mensaje);
               setNuevaPassword("");
               setConfirmarPassword("");
               setMostrarPaasword1(false);
               setMostrarPaasword2(false);
               setTypePassword1("password");
               setTypePassword2("password");
               setBloqueoConfirmarPassword(true);
            })
            .catch(error => {
                setCargando(false);
                setMostrarMensajeFinal(true);
                setTipoAlerta("ERR");
                setMensajeFinal("Problemas al actualizar password");
            })
        }, 3000);
    }

  return (
    <div className={styles.border}>
        <div className="container-fluid">
            <form  onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-lg-12 text-center">
                        <h4> <strong> Formulario actualizar contraseña</strong></h4>
                        <br/>
                    </div>
                    <div className="col-lg-12 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-3 text-center">
                                <div className="col-lg-12 text-center"> <h6 className={styles.subrayado}> Nueva contraseña </h6></div>
                            </div>
                            <div className="col-lg-6 text-center">
                                <div className="row justify-content-center">
                                    <div className="col-lg-9 text-center">
                                        <InputField
                                            disabled={false}
                                            className="text-center form-control custom-input-white" 
                                            placeholder="*****" 
                                            value={nuevaPassword}
                                            type={typePassword1}
                                            expresionRegular={/^.{6,}$/}
                                            mensajeValidacion="password debe ser amyor a 5 caracteres" 
                                            onChange={handleInputChangeNuevaPassword} 
                                        />
                                    </div>
                                    <div className="col-lg-3 text-center">
                                        <button className="btn" type="button" onClick={() => btnPasword1()}>
                                            {
                                            (mostrarPaasword1) 
                                            ? 
                                                <strong className={styles.textgreen}> Ocultar 
                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                </strong>
                                            :
                                                <strong className={styles.textred}> Mostrar  
                                                     <FontAwesomeIcon icon={faEye} />
                                                </strong>
                                            }    
                                        </button>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className="col-lg-3 text-center">
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary" disabled={btnDisabled}>Actualizar contraseña </button>
                                </div>
                                <br/>
                                <br/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-3 text-center">
                                <div className="col-lg-12 text-center"> <h6 className={styles.subrayado}> Confirmar contraseña </h6></div>
                            </div>
                            <div className="col-lg-6 text-center">
                                <div className="row justify-content-center">
                                    <div className="col-lg-9 text-center">
                                        <InputField
                                            disabled={bloqueoConfirmarPassword}
                                            className="text-center form-control custom-input-white" 
                                            placeholder="*****" 
                                            value={confirmarPassword}
                                            type={typePassword2}
                                            expresionRegular={/[\s\S]*/}
                                            mensajeValidacion={""} 
                                            onChange={handleInputConfirmarNuevaPassword} 
                                        />
                                        {
                                            (mostrarMensajeValidacion) &&
                                            <div className="col-lg-12 text-center">
                                                <span className={styles.validacionmensaje}>{mensajeValida} </span>
                                            </div>

                                        }
                                    </div>
                                    <div className="col-lg-3 text-center">
                                        <button className="btn" type="button" onClick={() => btnPasword2()}>
                                            {
                                            (mostrarPaasword2) 
                                            ? 
                                                <strong className={styles.textgreen}> Ocultar 
                                                    <FontAwesomeIcon icon={faEyeSlash} />
                                                </strong>
                                            :
                                                <strong className={styles.textred}> Mostrar  
                                                     <FontAwesomeIcon icon={faEye} />
                                                </strong>
                                            }    
                                        </button>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className="col-lg-3 text-center">
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-secondary" disabled={false}> Limpiar </button>
                                </div>
                                <br/>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                {
                                    (cargando) &&
                                    <div>
                                        <br/>
                                        <Spinner mostrar={cargando} mensaje={mensajeCargando}></Spinner>
                                    </div> 
                                }
                                {
                                    (mostrarMensajeFinal) && 
                                    <div>
                                        <br/>
                                        <Alert mostrar={mostrarMensajeFinal} type={tipoAlerta} mensaje={mensajeFinal}></Alert>
                                    </div> 
                                }
    
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default FormularioCambioPassword;