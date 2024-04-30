import React, { useState } from 'react';

interface InputProps {
  disabled?: boolean;
  className: string;
  placeholder?: string | undefined;
  type: string;
  initialValue?: string;
  expresionRegular?: any | undefined;
  mensajeValidacion?: string | undefined;
  onChange?: (value: string, error: boolean | undefined) => void;
}


const InputField: React.FC<InputProps> = ({disabled = false, className, placeholder, type, initialValue = '', expresionRegular, mensajeValidacion, onChange }) => {
    
    const classNameNormal = className;
    const classNameValidacion = className+" is-invalid";

    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState<boolean>(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if(expresionRegular){
        const pattern = expresionRegular;
        if(pattern){
          if (pattern.test(newValue)) {
              setError(false);
              if(onChange){
                onChange(newValue, false);
              }
          } else {
            setError(true);
            if(onChange){
              onChange(newValue, true);
            }
          }
        }
      }

    };
  
    return (
      <div>
        <input placeholder={placeholder} className={ (error)? classNameValidacion : classNameNormal} type={type} value={value} onChange={handleChange} required disabled={disabled}/>
        {error && <div className="invalid-feedback">{mensajeValidacion}</div>}
      </div>
    );
  };

export default InputField;