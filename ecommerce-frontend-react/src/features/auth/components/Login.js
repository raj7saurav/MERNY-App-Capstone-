import { useSelector, useDispatch } from "react-redux";
import { loginUserAsync, selectError, selectLoggedInUser } from "../authSlice";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(null);
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log(user);

  const handleChange = (event) => {
    setValue(event.target.value);   
  };

  const handleShow = () => {
    setShowPassword((prevState) => !prevState);
  }

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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                loginUserAsync({ email: data.email, password: data.password })
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
                  name="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
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
                <div className="text-sm">
                  {/* <Link
                    to=""
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link> */}
                </div>
              </div>
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {value && <button
                  type="button"
                  className="absolute inset-y-0 right-1 flex items-center px-2 focus:outline-none"
                  onClick={handleShow}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-4 h-6 cursor-pointer text-gray-500" />
                  ) : (
                    <EyeIcon className="w-4 h-6 cursor-pointer text-gray-500"></EyeIcon>
                  )}
                </button>}
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && (
                <p className="text-red-500">{error || error.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
