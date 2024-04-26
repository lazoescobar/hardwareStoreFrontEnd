import { signOut, useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import styles from './header.module.css'

import LinksHeader from './linksHeader';

const Header = () => {

  const { data:session } = useSession();
  const { nombreUsuario, accesos:listaAceesos } = session?.user as any;
  const pathname = usePathname()
  console.log(session);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4">
          <LinksHeader listadoLinks={listaAceesos}></LinksHeader>
        </div>
        <div className="col-lg-4">
          <div className={styles.contenidoCentro}>
              <h1> HardwareStore</h1>
          </div>
        </div>
        <div className="col-lg-4">
          <div className={styles.contenidoFinal}>
            <h5 className={styles.espacioNombreUsuario}> <strong className={styles.colorligthblue}>Usuario {nombreUsuario}</strong></h5>
            <button type="button" className="btn btn-danger"  onClick={() => signOut()}>SALIR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
