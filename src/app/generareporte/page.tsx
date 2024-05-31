"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'

import LayoutPages from '../../layout/LayoutPages';
import Titulo from '../../components/paginas/titulo';
import Mensaje from '../../components/paginas/mensaje';

import FormularioGenerarReporte from '@/components/paginas/reporte/formularioGeneaReporte';

const GeneraReporte  = () => {

  const params = useParams();

  const handleDownload = async () => {
    const response = await fetch('/api/reporte');
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.xlsx');
        document.body.appendChild(link);
        link.click();
    } else {
      console.error('Error downloading report');
    }
  };

  return (
    <div>
       <LayoutPages>
          <Titulo titulo="Generar reporte Excel" utilizaDosPuntos={true} ></Titulo>
          <br/>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                {
                  /*
                   <button onClick={handleDownload}>Download Report</button>
                  */
                }
                <FormularioGenerarReporte/>
              </div>
            </div>
          </div>
      </LayoutPages>
    </div>
  );

  
};

export default GeneraReporte;