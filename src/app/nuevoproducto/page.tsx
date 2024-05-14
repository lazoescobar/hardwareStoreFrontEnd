"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

import LayoutPages from '../../layout/LayoutPages';
import Titulo from '../../components/paginas/titulo';
import FormularioBuscarProductoPorNombre from '@/components/paginas/nuevoProducto/formularioBuscarProductoPorNombre'
import GrillaProductos from '@/components/paginas/nuevoProducto/grillaProductos';
import FormularioRegistrarNuevoProducto from '@/components/paginas/nuevoProducto/formularioRegistrarNuevoProducto'

const NuevoProducto = () => {

  const [contador, setContador] = useState<number>(0);
  const [nombreBusqueda, setNombreBusqueda] = useState<string>("");

  const { data:session } = useSession();
  if(!session){
    return;
  }

  return ( 
    <div>
      <LayoutPages>    
        <Titulo titulo="Registrar nuevo producto" utilizaDosPuntos={false}></Titulo>
        <br/>    
        <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-4 text-center"> 
                <FormularioBuscarProductoPorNombre contadorRecargas={contador} recargarProductos={setContador} actualizaNombreBusqueda={setNombreBusqueda} ></FormularioBuscarProductoPorNombre>
              </div>
              <div className="col-lg-6 text-center"> 
                <GrillaProductos contador={contador} nombre={nombreBusqueda}></GrillaProductos>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center"> 
                <FormularioRegistrarNuevoProducto></FormularioRegistrarNuevoProducto>
              </div>
            </div>
        </div>
      </LayoutPages>

    </div>
  );
};
export default NuevoProducto;