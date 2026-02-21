import React, { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/ui/CustomButton";
import { Link, Navigate } from "react-router";
import { authStore } from "../store/authStore";
// import Footer from "../components/ui/Footer";

const Login = () => {
  const { isLoading, error, login } = authStore();

  const [user, setUser] = useState({
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
    await login(user.email, user.password);

    if (!error) {
      <Navigate to="/" />;
    }
  };

  return (
    <section className="h-dvh flex flex-col justify-center items-center">
      <div className="my-10 mb-8 flex flex-col items-center justify-center">
        <a href="/" className="inter-font-normal logo">
          Managel
        </a>
        <h2 className="text-xx-medium font-bold text-dark inter-font-normal py-2">
          Sign In.
        </h2>
        <p className="text-text-muted text-x-small md:text-small text-center py-1">
          Manage your subscriptions and payments seamlessly by signing in.
        </p>
      </div>
      <form
        className="w-full h-115 md:w-100 p-3 bg-white flex flex-col justify-center rounded-lg"
        onSubmit={handleRegisterOnSubmit}
      >
        <label htmlFor="email" className="inter-font-normal login-label">
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

        <label htmlFor="email" className="inter-font-normal login-label">
          Password*
        </label>
        <PasswordInput
          passwordValue={user.password}
          passwordVisible={passwordVisible}
          onClick={handlePasswordVisibilityToggle}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <CustomButton
          textValue="Login"
          otherStyles="inter-font-normal mt-6 bg-dark border border-dark hover:bg-transparent hover:text-dark transition ease-in duration-400"
          disabled={isLoading}
          type="submit"
        />
        {error && (
          <div className="w-full h-13 p-2 rounded-md bg-error my-5 flex justify-center items-center">
            <p className="text-small text-white inter-font-normal">
              {error && error}
            </p>
          </div>
        )}
        <p className="text-text-muted text-small pt-2 text-center">
          New user?{" "}
          <Link to="/auth/signup" className="link">
            Sign up here
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
