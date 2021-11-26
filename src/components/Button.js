import React from "react";

function Button({ title, disabled, onClick, text, type, styles }) {
  return (
    <button
      type={type}
      className={styles}
      title={title}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
