"use client";
import { useSession } from "next-auth/react";
import LayoutPages from '../../layout/LayoutPages';

const CestaProductos = () => {
  return (
    <div>
      <LayoutPages>
      Cesta productos
      </LayoutPages>
    </div>
  );
};
export default CestaProductos;
