import React from "react";
import { FaEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";

const PasswordInput = ({
  passwordVisible,
  onClick,
  passwordValue
}: {
  passwordVisible: boolean;
  onClick: () => boolean;
  passwordValue: string
}) => {
  return (
    <div>
      {passwordVisible ? (
        <FaEye onClick={onClick} />
      ) : (
        <GoEyeClosed onClick={onClick} />
      )}
      <input type={passwordVisible ? 'text' : 'password'} value={passwordValue} />
    </div>
  );
};

export default PasswordInput;
