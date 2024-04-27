"use client";
import { useSession } from "next-auth/react";
import LayoutPages from '../../layout/LayoutPages';

const NuevoProducto = () => {
  const { data:session } = useSession();
  if(!session){
    return;
  }

  return ( 
    <div>
      <LayoutPages>
      <h1>Nuevo Producto</h1>
      </LayoutPages>

    </div>
  );
};
export default NuevoProducto;