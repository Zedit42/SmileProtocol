import React, { MouseEventHandler } from 'react';

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isSelected?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, isSelected }) => {
  return (
    <button
      className={`${
        isSelected
          ? 'bg-black text-[#FFF9ED]'
          : 'bg-[#FFF9ED] text-black hover:bg-black hover:text-[#FFF9ED] hover:animate-jelly'
      } duration-200 ease-linear border-4 border-black font-bold py-2 px-4 custom-pointer text-xl`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
