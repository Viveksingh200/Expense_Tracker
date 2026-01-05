import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { registerUser } from "../services/users/authApi";
import { useAuth } from "../context/AuthContext.jsx";

const schema = yup.object({
  name: yup
    .string()
    .max(20, "Maximum 20 characters allowed")
    .required("Name is required"),

  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must contain only numbers")
    .length(10, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { navigate } = useAuth();

  const handleRegister = async (data) => {
    await registerUser(data, reset, navigate);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-4"
          noValidate
        >
        
          <div>
            <label className="text-sm text-gray-600 font-medium">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          
          <div>
            <label className="text-sm text-gray-600 font-medium">Phone</label>
            <input
              type="text"
              {...register("phone")}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              autoComplete="email"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              autoComplete="new-password"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition disabled:opacity-60"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
