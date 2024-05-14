"use client";

import styles from './spinner.module.css'

interface Props {
  mostrar: boolean
  mensaje: string;
}

const Spinner : React.FC<Props> = ({ mostrar, mensaje }) => {
  if(mostrar){
    return (
      <div className="row justify-content-center">
          <div className="col-lg-2 text-center">
              <div className={styles.spinner}></div>
          </div>
          <div className="col-lg-10 text-start">
              <strong> {mensaje} </strong>
          </div>
      </div>
    );
  }
};

export default Spinner;