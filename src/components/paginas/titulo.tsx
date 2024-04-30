"use client";

import styles from './titulo.module.css'

interface Props {
  utilizaDosPuntos: boolean
  titulo: string;
  complemento?: string | undefined
}

const Titulo : React.FC<Props> = ({ titulo, utilizaDosPuntos, complemento= "" }) => {

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12 text-center">
          <h3><strong><span className={styles.subrayo}>{titulo}</span> {(utilizaDosPuntos) && <span>:</span>} </strong>{ complemento}</h3>
        </div>
      </div>
    </div>
  );
};

export default Titulo;