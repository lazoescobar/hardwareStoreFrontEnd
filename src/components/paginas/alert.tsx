"use client";
import React, { useState } from 'react';
import { Interface } from 'readline';

interface Props {
    mostrar : boolean;
    mensaje : string;
}

const Alert: React.FC<Props> = ({ mostrar, mensaje }) => {

  const [alertVisible, setAlertVisible] = useState(mostrar);

  const hideAlert = () => {
    setAlertVisible(false);
  };

  return (
    <div>
      {alertVisible && (
        <div className="row alert alert-danger" role="alert">
          <div className="col-lg-10 text-center">
            <span>{mensaje}</span>
          </div>
          <div className="col-lg-2">
          <button type="button" className="btn-close" aria-label="Close" onClick={hideAlert}></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alert;