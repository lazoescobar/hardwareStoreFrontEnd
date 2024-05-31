"use client";
import { useSession } from "next-auth/react";
import { useState } from 'react';

import LayoutPages from '../../layout/LayoutPages';
import Titulo from '../../components/paginas/titulo';

import FormularioBusquedaUsuario from '@/components/paginas/listadoUsuarios/formularioBusquedaUsuarios'
import GrillaUsuarios from '@/components/paginas/listadoUsuarios/grillaUsuarios'


const CestaProductos  = () => {

  const [contador, setContador] = useState<number>(0);
  const [nombreBusqueda, setNombreBusqueda] = useState<string>("");
  const [todosBusqueda, setTodosBusqueda] = useState<boolean>(true);

  const { data:session } = useSession();
  if(!session){
      return;
  }

  return (
    <div>
       <LayoutPages>
        <br/>
        <Titulo titulo="Listado usuarios" utilizaDosPuntos={false}></Titulo>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <FormularioBusquedaUsuario contadorRecargas={contador} recargarProductos={setContador} actualizaNombreBusqueda={setNombreBusqueda} actualizaTodosBusqueda={setTodosBusqueda}></FormularioBusquedaUsuario>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <br/>
              <br/>
              <GrillaUsuarios nombreUsuario={session.user.nombreUsuario} idUsuario={session.user.id} contador={contador} nombreBusquedaProducto={nombreBusqueda} todos={todosBusqueda}></GrillaUsuarios>
            </div>
          </div>
        </div>
      </LayoutPages>
    </div>
  );
};

export default CestaProductos;