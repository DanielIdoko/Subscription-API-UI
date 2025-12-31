import React, { use, useState } from "react";
import type { User } from "../types/types";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/ui/CustomButton";
import { Link } from "react-router";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibilityToggle = () =>
    setPasswordVisible(!passwordVisible);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="w-full relative">
        <div className="w-full h-60 bg-primary"></div>
        <div className="absolute top-[50%] right-[29%] md:right-[42%]">
          <div className="w-full flex flex-col justify-center items-center">
            <a href="/home" className="logo open-sans-font-bold">
              SUBUI
            </a>
            <h3 className="text-md md:text-xl text-base">
              Login in to your account
            </h3>
          </div>
        </div>
      </div>
      <form className="w-full md:w-100 p-3 h-full mt-10 md:mt-0 flex flex-col justify-center">
        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          value={user.email}
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="johndoe@gmail.com"
          className="w-full text-dark text-small outline-0 p-1 border-b border-b-dark"
        />

        <label htmlFor="email" className="login-label">
          Password
        </label>
        <PasswordInput
          passwordValue={user.password}
          passwordVisible={passwordVisible}
          onClick={handlePasswordVisibilityToggle}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <CustomButton
          textValue="Login"
          otherStyles="my-5 bg-primary border border-primary hover:bg-transparent hover:text-primary transition ease-in duration-300"
          disabled={true}
        />
        <p className="text-text-muted text-x-small text-center">
          New User?{" "}
          <Link to="/signup" className="link">
            Signup
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
