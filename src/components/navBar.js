import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from 'next/link';

const Navbar = () => {

  const { data: session, status } = useSession();

  console.log(JSON.stringify(session, null, 2));

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/perfil">Perfil</Link>
        </li>
        <li>
          <Link href="/logout">Cerrar Sesión</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;