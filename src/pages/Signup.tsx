import React, { useState } from "react";
// import type { User } from "../types/types";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/ui/CustomButton";
import { Link, Navigate } from "react-router";
import { authStore } from "../store/authStore";
import Footer from "../components/ui/Footer";

const Signup = () => {
  const { isLoading, error, register } = authStore();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisibilityToggle = () =>
    setPasswordVisible(!passwordVisible);

  // Handle Change inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Call the register function from authStore
  const handleRegisterOnSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await register(user.name, user.email, user.password);
  
    if (!error) {
      <Navigate to="/" />;
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="w-full relative">
        <div className="w-full h-60 bg-primary"></div>
        <div className="absolute top-[50%] right-[22%] md:right-[41%]">
          <div className="w-full flex flex-col justify-center items-center">
            <a href="/home" className="logo open-sans-font-bold">
              SUBUI
            </a>
            <h3 className="text-5xl text-base">Get Started</h3>
          </div>
        </div>
      </div>
      <form
        className="w-full md:w-100 p-3 h-full flex flex-col justify-center"
        onSubmit={handleRegisterOnSubmit}
      >
        <label htmlFor="email" className="login-label">
          Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="John doe"
          value={user.name}
          onChange={handleChange}
          className="w-full text-dark text-small outline-0 p-1 border-b border-b-dark"
        />

        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="johndoe@gmail.com"
          value={user.email}
          onChange={handleChange}
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
          textValue="Get started"
          otherStyles="my-5 bg-primary border border-primary hover:bg-transparent hover:text-primary transition ease-in duration-300"
          disabled={isLoading}
          type="submit"
        />
        <p className="text-small text-red-600 text-center py-1">
          {error && error}
        </p>
        <p className="text-text-muted text-x-small text-center">
          Got an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </form>

      <Footer />
    </section>
  );
};

export default Signup;
