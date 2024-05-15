import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./CartSlice";
import { Link, Navigate } from "react-router-dom";
import Modal from "../common/Modal";
import { Grid } from "react-loader-spinner";

export default function Cart() {
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);
  const dispatch = useDispatch();
  const status = useSelector(selectCartStatus);
  const [openModal, setOpenModal] = useState(null);

  // console.log(items);
  // console.log(cartLoaded);

  const totalAmount = items.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  ); // accumulator: Accumulator variable jo ki yaha per amount hai, ye har iteration mein update hota hai... currentValue: Current element of the array jo ki yaha per item hai.

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuatity = (event, item) => {
    event.preventDefault();
    dispatch(updateCartAsync({ id: item.id, quantity: +event.target.value }));
  };

  const handleRemove = (e, itemId) => {
    // console.log("Remove button clicked");
    dispatch(deleteItemFromCartAsync(itemId));
  };

  return (
    <>
      {!items.length && cartLoaded && <Navigate to="/" replace={true} />}

      {items.length > 0 && (
        <div>
          <div className="mx-auto bg-white mt-12 max-w-7xl px-4  sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h2 className="text-4xl my-6 font-bold tracking-tight text-gray-900">
                Cart
              </h2>

              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
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
                    <div>
                      {items.map((item) => {
                        // console.log(item);
                        return (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item?.product?.thumbnail}
                                alt={item?.product?.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item?.product?.title}>
                                      {item?.product?.title}
                                    </a>
                                  </h3>
                                  <p className="ml-4">
                                    $
                                    {item.product.discountPrice * item.quantity}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item?.product?.brand}
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
                                  <Modal
                                    title={`Delete ${item?.product?.title}`}
                                    message="Are you sure you want to delete this cart item ?"
                                    dangerOption="Delete"
                                    cancelOption="Cancel"
                                    dangerAction={(e) =>
                                      handleRemove(e, item.id)
                                    }
                                    cancelAction={() => setOpenModal(null)}
                                    showModal={openModal === item.id}
                                  />
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={(e) => {
                                      setOpenModal(item.id);
                                    }} // item.id se usi item ki id jayegi jis item per ye Remove button hoga...
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </div>
                  )}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
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
      )}
    </>
  );
}
