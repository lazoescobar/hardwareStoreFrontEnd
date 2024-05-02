"use client";
import React, { useState } from 'react';

interface Props {
    mostrar : boolean;
    type?: string;
    mensaje : string;
}

const Alert: React.FC<Props> = ({ mostrar, type, mensaje }) => {

  const [alertVisible, setAlertVisible] = useState(mostrar);

  let tipoAlerta = "row alert alert-danger";
  if(type && type === "SUC") tipoAlerta = "row alert alert-success";

  const hideAlert = () => {
    setAlertVisible(false);
  };

  return (
    <div>
      {alertVisible && (
        <div className={tipoAlerta} role="alert">
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