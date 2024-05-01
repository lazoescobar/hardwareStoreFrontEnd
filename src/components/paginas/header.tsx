"use client";
import { signOut, useSession } from "next-auth/react";
import styles from './header.module.css'
import LinksHeader from './linksHeader';

const Header : React.FC = () => {

  const { data:session } = useSession();
  if(!session){
    return;
  }

  const { nombreUsuario, accesos } = session.user;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4">
          <LinksHeader listadoLinks={accesos}></LinksHeader>
        </div>
        <div className="col-lg-4">
          <div className={styles.contenidoCentro}>
              <h1> <strong> HardwareStore </strong></h1>
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
