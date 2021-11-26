import React from "react";

function Input({ value, name, id, type, onChange, min, max, styles, checked }) {
  return (
    <input
      className={styles}
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      checked={checked}
    ></input>
  );
}

export default Input;
