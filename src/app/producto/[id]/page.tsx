"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'

import LayoutPages from '../../../layout/LayoutPages';
import Titulo from '../../../components/paginas/titulo';
import Mensaje from '../../../components/paginas/mensaje';

import FormularioCambioNombre from '../../../components/paginas/producto/formularioCambioNombre';

import obtenerinfoProducto, {InformacionProducto} from '@/services/producto/obtenerInformacionProducto';

const DetalleProducto  = () => {

  const params = useParams();
  const {id} = params;
  
  const [errorProducto, setErrorProducto] = useState<boolean | undefined >(undefined);
  const [producto, setProducto] = useState<InformacionProducto | undefined>(undefined);

  useEffect(() => {
    obtenerinfoProducto(id)
    .then(response => {
      setProducto(response);
      setErrorProducto(false);
    })
    .catch(error => {
      setErrorProducto(true);
    })
  }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div>
       <LayoutPages>
          {
          (errorProducto === true ) &&
            <Mensaje titulo='Producto no encontrado' mensaje='No fue posible obtener producto desde los registros base' tipoMensaje='NOTFOUND' footerMensaje=''></Mensaje>
          }

          {
          (errorProducto === false &&  producto !== undefined) &&
            <>
            <Titulo titulo="Producto" utilizaDosPuntos={true} complemento={producto.producto.nombre}></Titulo>
            <br/>
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-lg-6 text-center">
                  <h3>f</h3>
                </div>
                <div className="col-lg-6 text-center">
                  <FormularioCambioNombre nombreActual={producto.producto.nombre}></FormularioCambioNombre>
                </div>
              </div>
            </div>
            </>
          }
      </LayoutPages>
    </div>
  );
};

export default DetalleProducto;