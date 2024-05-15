import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/CartSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectStatus,
} from "../features/order/orderSlice";
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";
import { Grid } from "react-loader-spinner";

export default function Checkout() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder);
  const status = useSelector(selectStatus);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // console.log(user);
  // console.log(items);
  // console.log(currentOrder);

  const totalAmount = items.reduce(
    (amount, item) => amount + item.product.discountPrice * item.quantity,
    0
  ); // accumulator: har iteration mein update hota hai... currentValue: Current element of the array jo ki item hai.

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuatity = (event, item) => {
    event.preventDefault();
    dispatch(updateCartAsync({ id: item.id, quantity: +event.target.value }));
  };

  const handleRemove = (e, itemId) => {
    e.preventDefault();
    dispatch(deleteItemFromCartAsync(itemId));
  };

  const handleAddress = (event) => {
    // console.log(event.target.value);
    setSelectedAddress(user.addresses[event.target.value]);
  };

  const handlePayment = (event) => {
    // console.log(event.target.value);
    setPaymentMethod(event.target.value);
  };

  const handleOrder = (event) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user: user.id,
        paymentMethod,
        selectedAddress,
        status: "pending",
      };
      // console.log(order);
      dispatch(createOrderAsync(order));
    } else {
      alert("Enter Address or Payment method");
    }
  };

  return (
    <>
      {items.length < 0 ? (
        <Navigate to="/" replace={true} />
      ) : (
        <div>
          {currentOrder && currentOrder.paymentMethod === "cash" && (
            <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
          )}

          {currentOrder && currentOrder?.paymentMethod === "card" && (
            <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
          )}

          {status === "loading" ? (
            <Grid
              height="80"
              width=""
              color="rgb(79, 70, 229)"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  {/* This form is for address */}
                  <form
                    className="bg-white px-5 py-12 mt-12"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      console.log(data);
                      dispatch(
                        updateUserAsync({
                          ...user,
                          addresses: [...user.addresses, data],
                        })
                      );
                      reset();
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
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Reset
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

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Addresses
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from Existing addresses
                    </p>

                    <ul>
                      {user?.addresses?.map((address, index) => {
                        // console.log(user);
                        return (
                          <li
                            key={index}
                            className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                          >
                            <div className="flex min-w-0 gap-x-4">
                              <input
                                onClick={handleAddress}
                                name="address"
                                type="radio"
                                value={index}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
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
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment Methods
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose One
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="cash"
                              name="payments"
                              type="radio"
                              onChange={handlePayment}
                              value="cash"
                              checked={paymentMethod === "cash"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="card"
                              name="payments"
                              type="radio"
                              onClick={handlePayment}
                              value="card"
                              checked={paymentMethod === "card"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="mx-auto bg-white mt-12 max-w-7xl px-4 sm:px-4 lg:px-4">
                    <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                      <h2 className="text-4xl my-6 font-bold tracking-tight text-gray-900">
                        Cart
                      </h2>

                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {items.map((item) => {
                            // console.log(item);
                            return (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.product.thumbnail}
                                    alt={item.product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={item.product.id}>
                                          {item.product.title}
                                        </a>
                                      </h3>
                                      <p className="ml-4">
                                        ${item.product.discountPrice}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.product.brand}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm mb-2">
                                    <div className="text-gray-500">
                                      <label
                                        htmlFor="quantity"
                                        className="inline mr-5 text-sm font-medium loading-6 text-gray-900"
                                      >
                                        Qty
                                      </label>
                                      <select
                                        value={item.quantity}
                                        onChange={(e) => handleQuatity(e, item)}
                                      >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                      </select>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={(e) =>
                                          handleRemove(e, item.id)
                                        } // item.id se usi item ki id jayegi jis item per ye Remove button hoga...
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$ {totalAmount}</p>
                      </div>

                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Total Items in cart: </p>
                        <p>{totalItems} items</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <div
                          onClick={handleOrder}
                          className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Order Now
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or {"  "}
                          <Link to="/">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
