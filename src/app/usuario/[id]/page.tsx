"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'

import LayoutPages from '../../../layout/LayoutPages';
import Titulo from '../../../components/paginas/titulo';
import Mensaje from '../../../components/paginas/mensaje';

import FormularioCambioPassword from '@/components/paginas/usuario/formularioCambioPassword';

import consultaUsuario from '@/services/usuario/consultaUsuarioPorId';
import { UsuarioPorId} from '@/services/usuario/types/InterfacesUsuario';

const CambioPasswordUsuario = () => {

  const params = useParams();
  const {id} = params;

  const [usuario, setUsuario] = useState<UsuarioPorId | undefined>(undefined);
  const [errorUsuario, setErrorUsuario] = useState<boolean | undefined >(undefined);

  const convertToNumber = (input: string | string[]): number => {
    const str = Array.isArray(input) ? input[0] : input;
    const num = Number(str);
    if (isNaN(num)) {
        throw new Error(`Invalid number: ${str}`);
    }

    return num;
  }

  useEffect(() => {
    consultaUsuario(id)
    .then(response => {
      setUsuario(response);
      setErrorUsuario(false);
    })
    .catch(error => {
      setErrorUsuario(true);
    })
  }, []);

  const { data:session } = useSession();
  if(!session){
    return;
  }

  const idUsuario = session.user.id

  return ( 
    <div>
      <LayoutPages>
        {
          (errorUsuario === true ) &&
            <Mensaje titulo='Usuario no encontrado' mensaje='No fue posible obtener usuareio desde los registros base' tipoMensaje='NOTFOUND' footerMensaje=''></Mensaje>
        }    
        {
          (errorUsuario === false && usuario !== undefined ) &&
          <>
             <Titulo titulo="Usuario" utilizaDosPuntos={true} complemento={usuario?.nombre}></Titulo>
            <br/>    
            <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-lg-8 text-center"> 
                      <FormularioCambioPassword idUsuario={idUsuario} idUsuarioAModificar={convertToNumber(id)}></FormularioCambioPassword>
                  </div>
                </div>
            </div>
          </>
        
        }
       
      </LayoutPages>

    </div>
  );
};
export default CambioPasswordUsuario;