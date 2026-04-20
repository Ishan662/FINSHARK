import React from 'react';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { useAuth } from '../../../Context/UseAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type LoginFormsInputs = {
    userName: string;
    password: string;
}

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required."),
})

const LoginPage = () => {
  const { loginUser } = useAuth();
  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormsInputs>({ resolver: yupResolver(validation )});

  const handleLogin = ( form: LoginFormsInputs) => {
    loginUser(form.userName, form.password);
  };
  return(
    <section className="min-h-screen flex items-center justify-center gradient-primary px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-accent opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-lightGreen opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-md w-full relative z-10 animate-fade-in-up">
        <div className="card">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gradient mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your financial dashboard</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-lightGreen focus:outline-none transition-colors"
                {...register("userName")}
              />
              {errors.userName && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <span className="mr-2">⚠️</span> {errors.userName.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-lightGreen focus:outline-none transition-colors"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <span className="mr-2">⚠️</span> {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-2 border-gray-300" />
                <span className="text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-lightGreen hover:text-darkGreen font-semibold">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full btn-primary py-3 text-lg mt-8"
            >
              Sign In
            </button>

            {/* Signup Link */}
            <div className="text-center border-t pt-6">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-lightGreen hover:text-darkGreen font-bold">
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
