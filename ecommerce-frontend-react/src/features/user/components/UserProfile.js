import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { selectLoggedInUser } from "../../auth/authSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo); //
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1); // initially index ki value -1 rahegi means ki koi value select nhi hai.
  const [showAddAddressForm, setshowAddAddressForm] = useState(false);

  // console.log(userInfo);

  const {
    register,
    handleSubmit,
    reset,
    setValue, // setValue se form ke elements ki initial value set kar sakte hain.
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate); // yaha se wo element hat jayega jise hum edit karna chahte hain aur naya updated address database me jakar add ho jayega. ye same remove wala logic lagaya gaya hai yaha per, existing address ko hata rahe hain uss index per aur fir uski jagah naya updated address put kiya ja ra hai.
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (event, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // kyuki shallow copy karte time hame nested objects ya fir arrays ki bhi copy karni padti hai kyuki shallow copy karte time kewal top-level elements hi copy hote hain aur nested elements uss real object ko hi point kar rahe hote hain jinki avi shallow copy nahi bani hui hai, isiliye yaha per addresses filed alag se copy kiya gaya hai.  Shallow copy ka istemal generally modification se bachne ke liye hota hai. Agar aap original object ko preserve karna chahte hain aur kisi operation ke baad bhi usmein changes nahi chahte hain, to shallow copy ka istemal kiya jata hai. Delete operation ke liye direct operation bhi kiya ja sakta hai, agar wahi desired behavior hai.
    console.log(newUser);
    newUser.addresses.splice(index, 1); // usi address ko delete karo jiska index value address ke index value se match karta ho ..
    dispatch(updateUserAsync(newUser));
    // setSelectedEditIndex(-1);
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };

  const handleAddAddressForm = (address) => {
    const newAddress = {
      ...userInfo,
      addresses: [...userInfo.addresses, address],
    };
    // console.log(newAddress);
    dispatch(updateUserAsync(newAddress));
    setshowAddAddressForm(false);
  };

  const handleCancelAddressForm = (event) => {
    setshowAddAddressForm(false);
    setValue("name", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("street", "");
    setValue("city", "");
    setValue("state", "");
    setValue("pinCode", "");
  };

  return (
    <div>
      <div className="mx-auto bg-white mt-12 max-w-7xl px-4  sm:px-6 lg:px-8">
        {Object.keys(userInfo).length && (
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-6 font-bold tracking-tight text-gray-900">
              Name: {userInfo.name ? userInfo.name : "New User"}
            </h1>
            <h3 className="text-xl my-6 font-bold tracking-tight text-red-900">
              email address: {userInfo.email}
            </h3>
            {userInfo.role === "admin" && (
              <h3 className="text-xl my-6 font-bold tracking-tight text-red-900">
                role: {userInfo.role}
              </h3>
            )}
          </div>
        )}
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            type="submit"
            onClick={(e) => {
              setshowAddAddressForm(true);
              setSelectedEditIndex(-1); // koi edit wala form na open ho.
            }}
            className="rounded-md my-5 bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add new address
          </button>

          {showAddAddressForm ? (
            <form
              className="bg-white px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit((address) => {
                console.log(address);
                handleAddAddressForm(address);
                reset(); // form jaise hi submit ho jata hai ye form field ko reset kar dega usi time.
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="name"
                          {...register("name", {
                            required: "name is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          type="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is is required",
                          })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="state"
                          {...register("state", {
                            required: "state is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="pinCode"
                          {...register("pinCode", {
                            required: "pinCode is is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    onClick={(e) => handleCancelAddressForm(e)}
                    className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          <p className="mt-0.5 text-md text-gray-900">Your Address:</p>
          {userInfo?.addresses?.map((address, index) => {
            // console.log(address);
            return (
              <div key={index}>
                {selectedEditIndex === index ? (
                  <form
                    className="bg-white px-5 py-12 mt-8"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      // console.log(data);
                      handleEdit(data, index);
                      reset(); // form jaise hi submit ho jata hai ye form field ko reset kar dega usi time.
                    })}
                  >
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="name"
                                {...register("name", {
                                  required: "name is required",
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.name && (
                                <p className="text-red-500">
                                  {errors.name.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                type="email"
                                {...register("email", {
                                  required: "email is required",
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.email && (
                                <p className="text-red-500">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone
                            </label>
                            <div className="mt-2">
                              <input
                                id="phone"
                                {...register("phone", {
                                  required: "phone is required",
                                })}
                                type="tel"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                              />
                              {errors.phone && (
                                <p className="text-red-500">
                                  {errors.phone.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("street", {
                                  required: "street is is required",
                                })}
                                id="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.street && (
                                <p className="text-red-500">
                                  {errors.street.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "city is is required",
                                })}
                                id="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.city && (
                                <p className="text-red-500">
                                  {errors.city.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="state"
                                {...register("state", {
                                  required: "state is required",
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.state && (
                                <p className="text-red-500">
                                  {errors.state.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="pinCode"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="pinCode"
                                {...register("pinCode", {
                                  required: "pinCode is is required",
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.pinCode && (
                                <p className="text-red-500">
                                  {errors.pinCode.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          onClick={(e) => setSelectedEditIndex(-1)}
                          type="submit"
                          className="rounded-md px-3 py-2 text-sm font-semibold text-grey hover:bg-gray-100 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </form>
                ) : null}
                <div className="flex justify-between gap-x-6 px-5 py-4 mt-2 border-solid border-2 border-gray-200">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-500">
                      phone: {address.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <button
                      onClick={(e) => handleEditForm(index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleRemove(e, index)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
