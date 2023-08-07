import React, { MouseEventHandler } from 'react';

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-[#FFF9ED] text-black hover:bg-black hover:text-[#FFF9ED] duration-200 ease-linear border-4 border-black font-bold py-2 px-4"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
