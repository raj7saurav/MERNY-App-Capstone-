import { useSelector, useDispatch } from "react-redux";
import { createUserAsync, selectLoggedInUser } from "../authSlice";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState(null);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // useForm hook ek React hook hai jo react-hook-form library ke hisaab se banaya gaya hai. Iska use form handling ke liye hota hai, jisse aap apne React forms ko easily manage kar sakte hain.

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleConfirmPsswordChange = (event) => {
    setConfirmPasswordValue(event.target.value);
  };

  const handlePasswordShow = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleConfirmPasswordShow = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/ecommerce.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: "user",
                })
              );
              // console.log(data);
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })} // The register method is part of the react-hook-form library, which is a popular library for managing form state and validation in React applications. register function form state ko manage karta hai, input field ke value aur validation status ko track karta hai. Spread operator se, jo bhi chizein register function wapas karta hai, wo <input> ke sath jud jaati hain, jisse wo form ke saath sahi se integrate ho sake. Spread operator ka use wahi properties ko <input> element ke andar "spread" karne ke liye kiya jata hai. Matlab, jo bhi properties register function se aayi hain, wo <input> ke andar fit ho jayein.
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="relative mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  onChange={handlePasswordChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {passwordValue && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-4 text-gray-600"
                    onClick={handlePasswordShow}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-4 h-5 cursor-pointer" />
                    ) : (
                      <EyeIcon className="w-4 h-5 cursor-pointer" />
                    )}
                  </button>
                )}

                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="relative mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "confirm password is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "password not matching",
                  })} // The validation checks whether the value of the confirmPassword field matches the value of the password field. If it doesn't match, an error message is returned ('password not matching'), which will be displayed in the <p> element with the class text-red-500 if there is an error.
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={handleConfirmPsswordChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {confirmPasswordValue && (
                  <button
                    type="button"
                    className="absolute right-0 inset-y-1 px-4 text-gray-600"
                    onClick={handleConfirmPasswordShow}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-4 h-5 cursor-pointer" />
                    ) : (
                      <EyeIcon className="w-4 h-5 cursor-pointer" />
                    )}
                  </button>
                )}
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
