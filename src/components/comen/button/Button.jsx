import React from 'react';

function Button({ icon, text, onClick, className = '' }) {
  return (
    <button onClick={onClick} className={`flex items-center border gap-2 px-4 rounded-lg py-2 text-white ${className}`}>
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
}

export default Button;
