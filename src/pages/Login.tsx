import React, { useState } from "react";
import { User } from "../types/types";
import PasswordInput from "../components/PasswordInput";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="w-full relative">
        <img
          src="https://th.bing.com/th/id/OIP.0iYVKqROXvsbvvzdHJlziQHaEK?w=279&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
          alt="onboarding image"
          className="w-full h-60 md:h-50 object-cover rounded-b-3xl"
        />
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
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="johndoe@gmail.com"
          value={user.email}
        />

        <label htmlFor="email">Password</label>
        <PasswordInput
          passwordVisible={passwordVisible}
          onClick={() => setPasswordVisible(!pass)}
        />
      </form>
    </section>
  );
};

export default Login;
