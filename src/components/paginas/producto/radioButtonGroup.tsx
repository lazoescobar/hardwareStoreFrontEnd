import React from 'react';

interface Options {
  key: string;
  value: string
}


interface RadioButtonGroupProps {
  options: Array<Options>;
  selectedValue: string | null;
  onChange: (selectedValue: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, selectedValue, onChange }) => {
  const handleRadioChange = (value: string) => {
    if (value !== selectedValue) {
      onChange(value);
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
              onChange={() => handleRadioChange(option.key)}
            />
            <h5><strong> {option.value} </strong></h5>
          </label>
        </div>
      ))}
    </div>
  );
}

export default RadioButtonGroup;