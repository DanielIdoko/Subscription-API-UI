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
    <div className="flex items-center gap-2 px-1">
      {passwordVisible ? (
        <FaEye onClick={onClick} className="icon"/>
      ) : (
        <GoEyeClosed onClick={onClick} className="icon"/>
      )}
      <input
        type={passwordVisible ? "text" : "password"}
        value={passwordValue}
        className="w-full text-dark text-small outline-0 p-1 border-b border-b-dark"
        onChange={onChange}
      />
    </div>
  );
};

export default PasswordInput;
