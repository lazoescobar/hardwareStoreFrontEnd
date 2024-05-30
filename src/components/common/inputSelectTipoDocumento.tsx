import React, { useState } from 'react';

interface SelectProps {
  valido: boolean
  onSelect: (value: string) => void;
}

const InputSelectTipoDocumento: React.FC<SelectProps> = ({ valido, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const options= [
    { value: '', label: 'Seleccione' },
    { value: 'P', label: 'Pasaporte' },
    { value: 'R', label: 'Rut' }
    ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  const classNameBase = "form-select custom-input-white-with-margin";
  const classNameSelect = (valido) ? classNameBase : classNameBase + " is-invalid"

  return (
    <select className={classNameSelect} value={selectedValue} onChange={handleChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default InputSelectTipoDocumento;