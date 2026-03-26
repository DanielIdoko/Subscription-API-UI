import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { authStore } from "../store/authStore";
import { useToast } from "../hooks/useToast";
// import { FaArrowRight } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = authStore();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      console.log(formData.email, formData.password);
      await login(formData.email, formData.password);

      // Show email verification reminder
      showToast(
        "User successfuly logged in!",
        "success",
        4000
      );

      navigate('/dashboard')
    } catch (err) {
      // Error is handled by store and displayed via error state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to manage your subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address*"
              type="email-address"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email || (error?.includes("email") ? error : "")}
            />

            <Input
              label="Password*"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={
                errors.password || (error?.includes("password") ? error : "")
              }
            />

            {error && !errors.email && !errors.password && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In <FiChevronRight size={15} color="#f1f1f1" />
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/auth/signup")}
                className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
