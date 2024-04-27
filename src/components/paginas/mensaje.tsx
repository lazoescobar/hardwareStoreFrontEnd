"use client";

import styles from './mensaje.module.css'

interface Props {
  titulo: string;
  mensaje: string;
  tipoMensaje: string;
  footerMensaje: string
}

const Mensaje : React.FC<Props> = ({ titulo, mensaje, footerMensaje, tipoMensaje }) => {

  if(tipoMensaje === "NOTFOUND"){
    return (
      <div className={styles.centeredalert}>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">{titulo}</h4>
          <p>{mensaje}</p>
          <hr/>
          <p className="mb-0">{footerMensaje}</p>
        </div>
      </div>
      
    );
  }
  
};

export default Mensaje;

