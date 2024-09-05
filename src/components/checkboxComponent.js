import { useState } from "react";
import styles from "./HomePage.module.css";

const CheckboxComponent = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isChecked}
        onChange={handleCheckboxChange} // Handles the click event
      />
      {label}
    </label>
  );
};

export default CheckboxComponent;
