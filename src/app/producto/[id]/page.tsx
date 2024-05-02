"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'

import LayoutPages from '../../../layout/LayoutPages';
import Titulo from '../../../components/paginas/titulo';
import Mensaje from '../../../components/paginas/mensaje';

import FormularioCambioNombre from '../../../components/paginas/producto/formularioCambioNombre';
import FormularioRegistrarIngresoEgreso from '@/components/paginas/producto/formularioRegistrarIngresoEgreso';

import obtenerinfoProducto from '@/services/producto/obtenerInformacionProducto';
import { InfoProducto } from '@/services/producto/types/InterfacesProducto';

const DetalleProducto  = () => {

  const params = useParams();
  const {id} = params;
  
  const [errorProducto, setErrorProducto] = useState<boolean | undefined >(undefined);
  const [producto, setProducto] = useState<InfoProducto | undefined>(undefined);

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
                <Titulo titulo="Producto" utilizaDosPuntos={true} complemento={producto.nombre}></Titulo>
                <br/>
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                      <FormularioRegistrarIngresoEgreso producto={producto}></FormularioRegistrarIngresoEgreso>
                    </div>
                    <div className="col-lg-6 text-center">
                      <FormularioCambioNombre producto={producto} actualizarProducto={setProducto}></FormularioCambioNombre>
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