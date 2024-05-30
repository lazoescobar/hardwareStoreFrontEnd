import React, { useState } from 'react';

interface InputProps {
    valido: boolean;
    placeholder?: string | undefined;
    type: string;
    value: string;
    onChange?: (value: string) => void;
}


const InputFieldSimple : React.FC<InputProps> = ({ valido, placeholder, type, value, onChange}) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if(onChange){
        onChange(newValue);
      }
    };

    const classNameBase = "text-center form-control custom-input-white-with-margin";
    const classNameInput = (valido) ? classNameBase : classNameBase + " is-invalid"
  
    return (
      <input
          disabled={false}
          className={classNameInput}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={handleChange} /> 
      );
  };

export default InputFieldSimple;