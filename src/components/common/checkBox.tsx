import React, { useState, PropsWithChildren } from 'react';

import styles from './checkBox.module.css';

interface CheckBoxProps {
  label: string;
  subrayadoLabel: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<PropsWithChildren<CheckBoxProps>> = ({ label, subrayadoLabel, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
    onChange(checked);
  };

  return (

    <div className="row justify-content-center">
        <div className="col-lg-12 text-center">
            <label className={ (subrayadoLabel) ? styles.subrayado: "" }> 
                {label}
            </label>
        </div>
        <div className="col-lg-12 text-center">
            <input
            className="form-check-input"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange} />
        </div>
    </div>
  );
};

export default Checkbox;