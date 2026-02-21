import React, { type ButtonHTMLAttributes } from "react";

const CustomButton = ({
  textValue,
  leftIcon,
  rightIcon,
  otherStyles,
  disabled,
  disabledStyle,
  type,
  onClick,
}: {
  textValue: string;
  leftIcon?: any;
  rightIcon?: any;
  otherStyles?: string;
  disabled?: boolean;
  disabledStyle?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
  ) => void;
}) => {
  return (
    <button
      className={`
        bg-dark p-2 rounded-full text-white inter-font-normal text-small ${otherStyles} cursor-pointer flex items-center justify-center
         ${disabled && "bg-dark/20 border-dark/20 cursor-not-allowed"}
    `}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {leftIcon}
      {disabled ? ('Loading...') : textValue}
      {rightIcon}
    </button>
  );
};

export default CustomButton;
