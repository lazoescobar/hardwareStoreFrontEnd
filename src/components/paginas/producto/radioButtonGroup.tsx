import React from 'react';

import { Options } from  './types/Interface';

interface RadioButtonGroupProps {
  options: Array<Options>;
  selectedValue: string | null;
  onChange: (selectedValue: string, label: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, selectedValue, onChange }) => {
  const handleRadioChange = (key: string, value: string) => {
    if (key !== selectedValue) {
      onChange(key, value);
    }
  };

  return (
    <div className='row'>
      {options.map((option, index) => (
        <div key={index+"RadioButtonGroupPropsContainer"} className="col-lg-6 text-center">
          <label key={option.key}>
            <input id={index+"RadioButtonGroupPropsLabel"}
              type="radio"
              value={option.key}
              checked={option.key === selectedValue}
              onChange={() => handleRadioChange(option.key, option.value)}
            />
            <h5><strong> {option.value} </strong></h5>
          </label>
        </div>
      ))}
    </div>
  );
}

export default RadioButtonGroup;