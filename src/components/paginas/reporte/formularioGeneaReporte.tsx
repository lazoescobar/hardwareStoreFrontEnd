"use client";

import { useState } from 'react';
import styles from './formularioGeneaReporte.module.css'
import InputField from "@/components/common/inputField";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';

import Spinner from '@/components/common/spinner';
import Alert from '@/components/paginas/alert';


const FormularioGenerarReporte : React.FC = () => {

    const [fechaDesde, setFechaDesde] = useState<string>("");
    const [fechaHasta, setFechaHasta] = useState<string>("");

    const [fechaDesdeValida, setFechaDesdeValida] = useState<boolean>(true);
    const [fechaHastaValida, setFechaHastaValida] = useState<boolean>(true);

    const [mensajeFechaHasta, setMensajeFechaHasta] = useState<string>("");

    const [cargando, setCargando] = useState<boolean>(false);
    const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);

    const handleInputFechaDesde = (value: string, error: boolean | undefined) => {
        setFechaDesde(value)
    };
    const handleInputFechaHasta = (value: string, error: boolean | undefined) => {
        setFechaHasta(value);
    };

    const handleDownloadReporte = async () => {

        if(fechaDesde.trim().length === 0){
            setFechaDesdeValida(false);
            return;
        }
        setFechaDesdeValida(true);

        if(fechaHasta.trim().length === 0){
            setFechaHastaValida(false);
            setMensajeFechaHasta("Seleccione fecha");
            return;
        }
        setFechaHastaValida(true);
        setMensajeFechaHasta("");

        const fechaDateDesde = new Date(fechaDesde);
        const fechaDateHasta = new Date(fechaHasta);

        if(fechaDateHasta < fechaDateDesde){
            setFechaHastaValida(false);
            setMensajeFechaHasta("Fecha hasta no puede ser menor");
            return;
        }

        setCargando(true);
        setMostrarAlerta(false);
        setTimeout( async () => {
            const response = await fetch('/api/reporte',{
                method: 'POST',
                body: JSON.stringify({ 
                    fechaDesde,
                    fechaHasta
                 }),
            });
            if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'report.xlsx');
                document.body.appendChild(link);
                link.click();
                setCargando(false);
            } else {
                setCargando(false);
                setMostrarAlerta(true);
            console.error('Error downloading report');
            }
        }, 3000);
    
    };

  return (
    <div className={styles.border}>
        <div className="container-fluid">
            <form>
                <div className="row justify-content-center">
                    <div className="col-lg-12 text-center">
                        <h4> <strong> Formulario generar reporte movimiento productos</strong></h4>
                        <br/>
                    </div>
                    <div className="col-lg-12 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-2 text-center"></div>
                            <div className="col-lg-4 text-center">
                                <strong>Fecha desde</strong>
                                <InputField
                                    disabled={false}
                                    className="text-center form-control custom-input-white" 
                                    value={fechaDesde}
                                    type="date"
                                    expresionRegular={/[\s\S]*/}
                                    mensajeValidacion={""} 
                                    onChange={handleInputFechaDesde} 
                                />
                                {
                                    (!fechaDesdeValida) &&
                                    <div className="col-lg-12 text-center">
                                        <span className={styles.validacionmensaje}>Seleccione fecha </span>
                                    </div>
                                }
                            </div>
                            <div className="col-lg-4 text-center">
                                <strong>Fecha hasta</strong>
                                <InputField
                                    disabled={false}
                                    className="text-center form-control custom-input-white" 
                                    placeholder="*****" 
                                    value={fechaHasta}
                                    type="date"
                                    expresionRegular={/[\s\S]*/}
                                    mensajeValidacion={""} 
                                    onChange={handleInputFechaHasta} 
                                />
                                {
                                    (!fechaHastaValida) &&
                                    <div className="col-lg-12 text-center">
                                        <span className={styles.validacionmensaje}>{mensajeFechaHasta} </span>
                                    </div>
                                }
                            </div>
                            <div className="col-lg-2 text-center">  </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="row justify-content-center">
                            <div className="col-lg-3 text-center">  </div>
                            <div className="col-lg-3 text-center">
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-primary" onClick={handleDownloadReporte}> Generar reporte </button>        
                                </div>
                            </div>
                            <div className="col-lg-3 text-center"> 
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-secondary"> Limpiar </button>        
                                </div>
                            </div>
                            <div className="col-lg-3 text-center"> </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-4 text-center">  </div>
                            <div className="col-lg-4 text-center">  
                            {
                                (cargando) &&
                                <div>
                                    <br/>
                                    <Spinner mostrar={true} mensaje={"Espere un momento... generando reporte"}></Spinner>
                                </div>
                            }
                            {
                                (mostrarAlerta) && 
                                    <Alert mostrar={mostrarAlerta} type="ERR" mensaje={"No se pudo generar reporte"}></Alert>
                            }
                            </div>
                            <div className="col-lg-4 text-center">  </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default FormularioGenerarReporte;