import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  resetPasswordAsync,
  selectError,
  selectPasswordReset,
} from "../authSlice";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState(null);
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const passwordReset = useSelector(selectPasswordReset);

  // ye humne url me se query string and unki values extract ki hain.. client side me url se kucch bhi nikalne ka kaam URLSearchParams kar sakta hai ,,,
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   console.log(errors);
  //   console.log(email);
  //   console.log(token);

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
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
      {email && token ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/ecommerce.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Please enter your new password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              noValidate
              onSubmit={handleSubmit((data) => {
                // console.log(data);
                dispatch(
                  resetPasswordAsync({ email, token, password: data.password })
                );
              })}
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
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
                    Confirm New Password
                  </label>
                </div>
                <div className="relative mt-2">
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "confirm password is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "password not matching",
                    })} // The validation checks whether the value of the confirmPassword field matches the value of the password field. If it doesn't match, an error message is returned ('password not matching'), which will be displayed in the <p> element with the class text-red-500 if there is an error.
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleConfirmPasswordChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {confirmPasswordValue && (
                    <button
                      type="button"
                      className="absolute right-0 inset-y-0 px-4 text-gray-600"
                      onClick={handleConfirmPasswordShow}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="w-4 h-5 cursor-pointer" />
                      ) : (
                        <EyeIcon className="w-4 h-5 cursor-pointer" />
                      )}
                    </button>
                  )}
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}

                {passwordReset && (
                  <p className="text-green-500">
                    Your password successfully reset
                  </p>
                )}

                {error && <p className="text-red-500">Something went wrong!</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Send me back to{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <p>Link was expired</p>
      )}
    </>
  );
}

export default ResetPassword;
