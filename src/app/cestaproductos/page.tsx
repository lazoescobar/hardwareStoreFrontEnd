"use client";
import { useSession } from "next-auth/react";
import LayoutPages from '../../layout/LayoutPages';

const CestaProductos = () => {
  const { data:session } = useSession();
  if(!session){
    return;
  }

  return (
    <div>
      <LayoutPages nombreUsuario={session.user.nombreUsuario} listadoLinks={session.user.accesos}>
      Cesta productos
      </LayoutPages>
    </div>
  );
};
export default CestaProductos;
