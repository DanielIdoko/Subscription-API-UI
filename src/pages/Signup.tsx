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
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    await register(user.name, user.email, user.password);

    if (!error) {
      <Navigate to="/" />;
    }
  };

  return (
    <section className="h-dvh flex flex-col justify-center items-center">
      <div className="my-10 mb-8 flex flex-col items-center justify-center">
        <a href="/" className="font-inter logo">
          Managel
        </a>
        <h2 className="text-xx-medium font-bold text-dark font-inter py-2">
          Create your account.
        </h2>
      </div>
      <form
        className="w-full h-115 md:w-100 p-3 bg-white my-8 flex flex-col justify-center rounded-lg"
        onSubmit={handleRegisterOnSubmit}
      >
        <label htmlFor="email" className="font-inter login-label">
          Full name*
        </label>
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          value={user.name}
          onChange={handleChange}
          className="input-box"
        />

        <label htmlFor="email" className="font-inter login-label">
          Email Address*
        </label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={handleChange}
          className="input-box"
        />

        <label htmlFor="email" className="font-inter login-label">
          Password*
        </label>
        <PasswordInput
          passwordValue={user.password}
          passwordVisible={passwordVisible}
          onClick={handlePasswordVisibilityToggle}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <CustomButton
          textValue="Create your Managel account"
          otherStyles="font-inter mt-6 bg-dark border border-dark hover:bg-transparent hover:text-dark transition ease-in duration-400"
          disabled={isLoading}
          type="submit"
        />
        {error && (
          <div className="w-full h-13 p-2 rounded-md bg-error my-5 flex justify-center items-center">
            <p className="text-small text-white font-inter">
              {error && error}
            </p>
          </div>
        )}
        <p className="text-text-muted text-small text-center">
          Got an account?{" "}
          <Link to="/auth/login" className="link">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
