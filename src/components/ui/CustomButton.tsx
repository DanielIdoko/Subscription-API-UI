import React, { type ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

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
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void;
}) => {
  return (
    <button
      className={`
        bg-dark p-2 rounded-lg text-white text-small ${otherStyles} cursor-pointer
         ${disabled && "opacity-50 cursor-not-allowed"}
    `}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {leftIcon}
      {disabled ? <Spinner /> : textValue}
      {rightIcon}
    </button>
  );
};

export default CustomButton;
