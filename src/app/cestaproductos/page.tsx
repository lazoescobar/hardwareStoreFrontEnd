"use client";
import { useState } from 'react';

import LayoutPages from '../../layout/LayoutPages';
import Titulo from '../../components/paginas/titulo';

import FormularioBusquedaProducto from '@/components/paginas/cestaProductos/formularioBusquedaProductos';
import GrillaProductos from '@/components/paginas/cestaProductos/grillaProductos';

const CestaProductos  = () => {

  const [contador, setContador] = useState<number>(0);
  const [nombreBusqueda, setNombreBusqueda] = useState<string>("");
  const [todosBusqueda, setTodosBusqueda] = useState<boolean>(true);

  return (
    <div>
       <LayoutPages>
        <br/>
        <Titulo titulo="Cesta Productos" utilizaDosPuntos={false}></Titulo>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <FormularioBusquedaProducto contadorRecargas={contador} recargarProductos={setContador} actualizaNombreBusqueda={setNombreBusqueda} actualizaTodosBusqueda={setTodosBusqueda}></FormularioBusquedaProducto>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <br/>
              <br/>
              <GrillaProductos contador={contador} nombreBusquedaProducto={nombreBusqueda} todos={todosBusqueda}></GrillaProductos>
            </div>
          </div>
        </div>
      </LayoutPages>
    </div>
  );
};

export default CestaProductos;