import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import styles from './header.module.css'

import LinksHeader from './linksHeader';

const Header = () => {

  const { data: session } = useSession();
  const { accesos:listaAceesos } = session?.user as any;
  const pathname = usePathname()
  //console.log(pathname);

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
            <h5 className={styles.espacioNombreUsuario}> Usuario xxxxxxxxxxxxxxxxxxxx</h5><button type="button" className="btn btn-danger">Danger</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
