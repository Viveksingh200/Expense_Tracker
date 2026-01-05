import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { loginUser } from "../services/users/authApi";
import { useAuth } from "../context/AuthContext.jsx";

const schema = yup.object({
  phone: yup
  .string()
  .matches(/^[0-9]+$/, "Phone must contain only numbers")
  .min(10, "Phone number must be at least 10 digits")
  .max(10, "Phone number must be exactly 10 digits")
  .required("This is a required field"),
  
  password: yup
    .string()
    .min(6, "Minimum 6 charaters are required")
    .required("This a is required field"),
});

const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {setUser, setUserToken,  navigate} = useAuth();

  const handleLogin = async (data) => {
  await loginUser(data, reset, setUser, setUserToken, navigate);
};

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login Account
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div className="flex flex-col gap-2">

            <label
              htmlFor="phone"
              className="text-sm text-gray-600 font-medium"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              {...register("phone")}
              className="focus:outline-none focus:ring-blue-500 border focus:ring-2 rounded-md px-4 py-2"
            />

            {errors.phone && (
              <span className="text-sm text-red-600">
                {errors?.phone?.message}
              </span>
            )}
             
             <label
              htmlFor="password"
              className="text-sm text-gray-600 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password")}
              className="focus:outline-none focus:ring-blue-500 border focus:ring-2 rounded-md px-4 py-2"
            />

            {errors.password && (
              <span className="text-sm text-red-600">
                {errors?.password?.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-4 w-full text-white font-medium transition"
          >
            Login
          </button>

          <p className="flex justify-center items-center gap-2">
            Don&apos;t have account ?{" "}
            <Link to="/signup" className="underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
