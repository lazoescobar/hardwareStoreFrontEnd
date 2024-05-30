"use client";
import { useSession } from "next-auth/react";

import LayoutPages from '../../layout/LayoutPages';
import Titulo from '../../components/paginas/titulo';

import FormularioRegistrarNuevoUsuario from '@/components/paginas/nuevoUsuario/formularioRegistrarNuevoUsuario';

const NuevoUsuario = () => {

  const { data:session } = useSession();
  if(!session){
    return;
  }

  const{ id } = session.user;

  return ( 
    <div>
      <LayoutPages>    
        <Titulo titulo="Registrar nuevo usuario" utilizaDosPuntos={false}></Titulo> 
        <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center"> 
                <FormularioRegistrarNuevoUsuario idUsuario={id}></FormularioRegistrarNuevoUsuario>
              </div>
            </div>
        </div>
      </LayoutPages>

    </div>
  );
};

export default NuevoUsuario;