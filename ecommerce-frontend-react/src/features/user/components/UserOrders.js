import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserOrders,
  selectUserInfoStatus,
} from "../userSlice";
import { updateOrderAsync } from "../../order/orderSlice";
import { Grid } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);
  const [removeOrderId, setRemoveOrderId] = useState(null);

  // console.log(orders);

  const handleRemove = (e, order) => {
    console.log("Remove button called");

    let updatedOrder = { ...order, deleted: true };
    console.log(updatedOrder);

    dispatch(updateOrderAsync(updatedOrder))
      .then(() => setRemoveOrderId(order.id))
      .catch((err) => {
        console.error("Error updating order:--> ", err.message);
      });
  };

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch, removeOrderId]);

  return (
    <>
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
      ) : null}
      <div>
        {orders &&
          orders.map((order) => {
            // console.log(order);
            return (
              <div key={order.id}>
                <div>
                  <div className="mx-auto bg-white mt-12 max-w-7xl px-4  sm:px-6 lg:px-8">
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <h1 className="text-4xl my-6 font-bold tracking-tight text-gray-900">
                        Order # {order.id}
                      </h1>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl my-6 font-bold tracking-tight text-red-900">
                          Order Status : {order.status}
                        </h3>
                        <button
                          type="button"
                          onClick={(e) => handleRemove(e, order)}
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {order?.items?.map((item) => {
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
                                        $ {item.product.discountPrice}
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
                                        Qty: {item.quantity}
                                      </label>
                                    </div>
                                    <div className="flex"></div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$ {order.totalAmount}</p>
                      </div>

                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Total Items in cart: </p>
                        <p>{order.totalItems} items</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping Address:
                      </p>
                      <div className="flex justify-between gap-x-6 px-5 py-4 mt-2 border-solid border-2 border-gray-200">
                        <div className="flex min-w-0 gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {order.selectedAddress.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order.selectedAddress.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order.selectedAddress.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-500">
                            phone: {order.selectedAddress.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {order.selectedAddress.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
