import React from "react";

function Input({
  value,
  name,
  id,
  type,
  onChange,
  min,
  max,
  styles,
  checked,
  disabled,
}) {
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
      disabled={disabled}
    ></input>
  );
}

export default Input;
