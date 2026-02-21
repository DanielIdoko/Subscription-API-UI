import React, { type SetStateAction } from "react";
import { FaEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";

const PasswordInput = ({
  passwordVisible,
  onClick,
  passwordValue,
  onChange,
}: {
  passwordVisible: boolean;
  onClick: () => any;
  passwordValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center gap-2 px-1 cursor-pointer">
      <input
        type={passwordVisible ? "text" : "password"}
        value={passwordValue}
        placeholder="Enter your password"
        className="input-box"
        onChange={onChange}
      />
      <div className="w-12 h-10 flex justify-center items-center border border-dark rounded-full hover:bg-text-muted/30">
        {passwordVisible ? (
          <FaEye onClick={onClick} className="icon"/>
        ) : (
          <GoEyeClosed onClick={onClick} className="icon" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
