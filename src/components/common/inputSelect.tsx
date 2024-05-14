import React, { useState } from 'react';

interface SelectProps {
  onSelect: (value: string) => void;
}

const InputSelect: React.FC<SelectProps> = ({ onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const options= [
    { value: '', label: 'Seleccione' },
    { value: 'CAJ', label: 'Caja' },
    { value: 'UNI', label: 'Unidad' }
    ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <select className="form-select custom-input-white-with-margin" value={selectedValue} onChange={handleChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;