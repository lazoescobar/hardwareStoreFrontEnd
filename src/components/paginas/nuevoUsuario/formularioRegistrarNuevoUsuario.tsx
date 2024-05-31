"use client";
import React, { useState } from 'react';

import styles from './formularioRegistrarNuevoUsuario.module.css';
import Spinner from '@/components/common/spinner';
import Alert from '@/components/paginas/alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';

import InputField from "@/components/common/inputField";
import InputFieldSimple from "@/components/common/inputFileSimple";
import InputSelectTipoUsuario from '@/components/common/inputSelectTipoUsuario';
import InputSelectTipoDocumento from '@/components/common/inputSelectTipoDocumento';

import validarRut from '@/services/common/validarRut';
import validarNombre from '@/services/common/validaNombres';
import validarNombreUsuario from '@/services/common/validarNombreUsuario';

import registrarNuevoUsuario from '@/services/usuario/registrarNuevoUsuario';
import {InterfaceNuevoUsuario} from '@/services/usuario/types/InterfacesUsuario';

interface Props {
    idUsuario: number;
}

const FormularioRegistrarNuevoUsuario : React.FC<Props> = ({ idUsuario }) => {

    const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
    const [validoTipoUsuario, setValidoTipoUsuario] = useState<boolean> (true);
    const [errorTipoUsuario, setErrorTipoUsuario] = useState<boolean>(false);

    const [tipoDocumento, setTipoDocumento] = useState<string | null>(null);
    const [validoTipoDocumento, setValidoTipoDocumento] = useState<boolean> (true);
    const [errorTipoDocumento, setErrorTipoDocumento] = useState<boolean>(false);


    const [documentoIdentidad, setDocumentoIdentidad] = useState<string>("");
    const [placeholderDocumentoIdentidad, setPlaceholderDocumentoIdentidad] = useState<string>("");
    const [documentoIndentidadValido, setDocumentoIndentidadValido] = useState<boolean>(true);

    const [nombres, setNombres] = useState<string>("");
    const [nombresValido, setNombresValido] = useState<boolean>(true)

    const [apellidoPaterno, setApellidoPaterno] = useState<string>("");
    const [apellidoMaterno, setApellidoMaterno] = useState<string>("");

    const [nombreUsuario, setNombreUsuario] = useState<string>("");
    const [nombreUsuarioValido, setNombreUsuarioValido] = useState<boolean>(true);
    const [mensajeValidacionNombreUsuario, setMensajeValidacionNombreUsuario] = useState<string>("");
    
    
    const [nuevaPassword, setNuevaPassword] = useState<string>("");
    const [mostrarPaasword1, setMostrarPaasword1] = useState<boolean>(false);
    const [typePassword1, setTypePassword1] = useState<string>("password");

    const [bloqueoConfirmarPassword, setBloqueoConfirmarPassword] = useState<boolean>(true);
    const [confirmarPassword, setConfirmarPassword] = useState<string>("");
    const [mostrarPaasword2, setMostrarPaasword2] = useState<boolean>(false);
    const [typePassword2, setTypePassword2] = useState<string>("password");

    const mensajeValida = "Password deben ser iguales";
    const [mostrarMensajeValidacion, setMostrarMensajeValidacion] = useState<boolean>(false);

    const [cargando, setCargando] = useState<boolean>(false);   
    const [mostrarAlertaFinal, setMostrarAlertaFinal] = useState<boolean>(false);
    const [mensajeAlertaFinal, setMensajeAlertaFinal]= useState<string>("");
    const [tipoAlerta, setTipoAlerta] = useState<string>("SUC");

    const classValid = "text-center form-control custom-input-white";
    const classInvalid = "text-center form-control custom-input-white is-invalid";

    const [classValidPassword, setClassValidPassword] = useState<string>(classValid);


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

        setClassValidPassword(classValid);

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
    };
    
    const handleSelectTipoUsuario = (value: string) => {
        const valueLengthZero = (value.trim().length === 0);
        setTipoUsuario( (valueLengthZero) ? null : value );
        if(!valueLengthZero){
            setErrorTipoUsuario(false);
            setValidoTipoUsuario(true);
        }
    };

    const handleSelectTipoDocumento = (value: string) => {
        const valueLengthZero = (value.trim().length === 0);
        setTipoDocumento( (valueLengthZero) ? null : value );
        if(!valueLengthZero){
            setErrorTipoDocumento(false);
            setValidoTipoDocumento(true);
            if(value === "R"){
                setPlaceholderDocumentoIdentidad("ejemplo xx.xxx.xxx-x")
            }
        }
    };

    const handleInputDocumentoIdentidad = (value: string) => {
        setDocumentoIdentidad(value);
    };


    const handleInputNombres = (value: string) => {
        setNombres(value);
        if((nombres.trim().length  + value.trim().length) > 0){
            setNombresValido(false);
        }else{
            setNombresValido(true);
        }
    };

    const handleInputApellidoPaterno = (value: string) => {
        console.log(value);
        setApellidoPaterno(value);

    };
    const handleInputApellidoMaterno = (value: string) => {
        setApellidoMaterno(value);
    };

    const handleInputNombreUsuario = (value: string) => {
        setNombreUsuario(value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(tipoUsuario === null){
            setErrorTipoUsuario(true);
            setValidoTipoUsuario(false)
            return;
        }
        setErrorTipoUsuario(false);
        setValidoTipoUsuario(true);

        if(tipoDocumento === null){
            setErrorTipoDocumento(true);
            setValidoTipoDocumento(false)
            return;
        }
        setErrorTipoDocumento(false);
        setValidoTipoDocumento(true);

        if(tipoDocumento === "R"){
            const rutValido = validarRut(documentoIdentidad)
            setDocumentoIndentidadValido(rutValido);
            if(!rutValido) return;
        }
        setDocumentoIndentidadValido(true);

        if(nombres.trim().length === 0){
            setNombresValido(false);
            return;
        }
        if(!validarNombre(nombres)){
            setNombresValido(false);
            return;
        }
        setNombresValido(true);

        if(nombreUsuario.trim().length === 0){
            setNombreUsuarioValido(false);
            setMensajeValidacionNombreUsuario("Complete nombre de usuario");
            return;
        }
        if(!validarNombreUsuario(nombreUsuario)){
            setNombreUsuarioValido(false);
            setMensajeValidacionNombreUsuario("Usuario debe comenzar con @");
            return;
        }
        setNombreUsuarioValido(true);
        setMensajeValidacionNombreUsuario("");

        if(nuevaPassword.trim().length === 0){
            setClassValidPassword(classInvalid);
            return;
        }
        setClassValidPassword(classValid)

        if(bloqueoConfirmarPassword === false && nuevaPassword.trim() === confirmarPassword.trim()){
            setMostrarMensajeValidacion(false);
        }else{
            setMostrarMensajeValidacion(true);
            return;
        }

        setCargando(true);
        setTimeout(() => {
            registrarNuevoUsuario(idUsuario, tipoUsuario, tipoDocumento, documentoIdentidad, nombres, apellidoPaterno, apellidoMaterno, nombreUsuario, nuevaPassword)
            .then(response => {
                const registroNuevoUsuario : InterfaceNuevoUsuario = response;
                setCargando(false);
                setMostrarAlertaFinal(true);
                setTipoAlerta( (registroNuevoUsuario.status == 200) ? "SUC" :"ERR" );
                setMensajeAlertaFinal(registroNuevoUsuario.data.mensaje);
            })
            .catch(error => {
                setCargando(false);
                setMostrarAlertaFinal(true);
                setTipoAlerta( "ERR" );
                setMensajeAlertaFinal("Problemas al registrar nuevo usuario");
            })
        }, 5000);

        setMostrarAlertaFinal(false);
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
                                <div className="col-lg-12 text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 text-start">
                                            <h5 className={styles.subrayado}><strong> Tipo usuario: </strong></h5>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                            {
                                                (errorTipoUsuario) && <span className={styles.validacionmensaje}> Seleccionar un tipo usuario </span>
                                            }
                                            <InputSelectTipoUsuario
                                                valido={validoTipoUsuario}
                                                onSelect={handleSelectTipoUsuario} 
                                            />  
                                        </div>
                                        <div className="col-lg-4 text-center"> </div>
                                    </div>  
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-12 text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 text-start">
                                            <h5 className={styles.subrayado}><strong> Tipo documento: </strong></h5>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                            {
                                                (errorTipoDocumento) && <span className={styles.validacionmensaje}> Seleccionar un tipo documento </span>
                                            }
                                            <InputSelectTipoDocumento
                                                valido={validoTipoDocumento}
                                                onSelect={handleSelectTipoDocumento} 
                                            />
                                        </div>
                                        <div className="col-lg-4 text-center"></div>
                                    </div>  
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-12 text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 text-start">
                                            <h5 className={styles.subrayado}><strong> Documento Identidad: </strong></h5>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                            {
                                                (!documentoIndentidadValido) && <span className={styles.validacionmensaje}> Documento identidad invalido </span>
                                            }
                                            <InputFieldSimple
                                                valido={documentoIndentidadValido}
                                                placeholder={placeholderDocumentoIdentidad}
                                                value={documentoIdentidad}
                                                type="text"
                                                onChange={handleInputDocumentoIdentidad} 
                                            /> 
                                        </div>
                                        <div className="col-lg-1 text-center"></div>
                                        <div className="col-lg-2 text-center">
                                            <div className="d-grid gap-2">
                                                <button type="submit" className="btn btn-primary" disabled={false}> Registrar usuario </button>
                                            </div>
                                        </div>
                                        <div className="col-lg-1 text-center"></div>
                                    </div>  
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-12 text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 text-start">
                                            <h5 className={styles.subrayado}><strong> Nombres: </strong></h5>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                            {
                                                (!nombresValido) && <span className={styles.validacionmensaje}> Nombres invalidos </span>
                                            }
                                            <InputFieldSimple
                                                valido={nombresValido}
                                                placeholder="Nombre(s)"
                                                value={nombres}
                                                type="text"
                                                onChange={handleInputNombres} 
                                            /> 
                                        </div>
                                        <div className="col-lg-1 text-center"></div>
                                        <div className="col-lg-2 text-center">
                                            <div className="d-grid gap-2">
                                                <button type="button" className="btn btn-secondary" onClick={ () => {}}> Limpiar </button>
                                            </div>
                                        </div>
                                        <div className="col-lg-1 text-center"></div>
                                    </div>  
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-12 text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-2 text-start">
                                            <h5 className={styles.subrayado}><strong> Apellidos: </strong></h5>
                                        </div>
                                        <div className="col-lg-3 text-start">
                                            <InputFieldSimple
                                                valido={true}
                                                placeholder="Paterno"
                                                value={apellidoPaterno}
                                                type="text"
                                                onChange={handleInputApellidoPaterno} 
                                            /> 
                                        </div>
                                        <div className="col-lg-3 text-center">
                                            <InputFieldSimple
                                                valido={true}
                                                placeholder="Materno"
                                                value={apellidoMaterno}
                                                type="text"
                                                onChange={handleInputApellidoMaterno}
                                            /> 
                                        </div>
                                        <div className="col-lg-4 text-center"></div>
                                    </div>  
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-12 text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 text-start">
                                            <h5 className={styles.subrayado}><strong> Nombre usuario: </strong></h5>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                            {
                                                (!nombreUsuarioValido) && <span className={styles.validacionmensaje}> {mensajeValidacionNombreUsuario} </span>
                                            }
                                            <InputFieldSimple
                                                valido={nombreUsuarioValido}
                                                placeholder="@user"
                                                value={nombreUsuario}
                                                type="text"
                                                onChange={handleInputNombreUsuario} 
                                            /> 
                                        </div>
                                        <div className="col-lg-4 text-center">
                                            <div className="d-grid gap-2">
                                                {
                                                    (cargando) &&
                                                    <div>
                                                        <br/>
                                                        <Spinner mostrar={true} mensaje={"Espere un momento... Registrando nuevo usuario"}></Spinner>
                                                    </div>
                                                }
                                                {
                                                    (mostrarAlertaFinal) && 
                                                        <Alert mostrar={mostrarAlertaFinal} type={tipoAlerta} mensaje={mensajeAlertaFinal}></Alert>
                                                }
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-12 text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 text-start">
                                            <h5 className={styles.subrayado}><strong> Contraseña: </strong></h5>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-10 text-center">
                                                    <InputField
                                                        disabled={false}
                                                        className={classValidPassword} 
                                                        placeholder="*****" 
                                                        value={nuevaPassword}
                                                        type={typePassword1}
                                                        expresionRegular={/^.{6,}$/}
                                                        mensajeValidacion="password debe ser amyor a 5 caracteres" 
                                                        onChange={handleInputChangeNuevaPassword} 
                                                    />
                                                </div>
                                                    <div className="col-lg-2 text-center">
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
                                            </div>
                                        <div className="col-lg-4 text-center"></div>
                                    </div>  
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-12 text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 text-start">
                                            <h5 className={styles.subrayado}><strong> Confirmar contraseña: </strong></h5>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                            <div className="row justify-content-center">
                                                    <div className="col-lg-10 text-center">
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
                                                    <div className="col-lg-2 text-center">
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
                                            </div>
                                        <div className="col-lg-4 text-center"></div>
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

export default FormularioRegistrarNuevoUsuario;