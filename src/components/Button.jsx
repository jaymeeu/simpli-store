import React from 'react';

const Button = ({onClick, icon, bgColor,padding, color, bgHoverColor, size, text, borderRadius, width }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-${padding ? padding : '3'} w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
