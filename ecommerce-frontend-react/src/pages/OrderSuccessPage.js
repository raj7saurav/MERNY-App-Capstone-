import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync, selectItems } from "../features/cart/CartSlice";
import { resetOrder, selectCurrentOrder } from "../features/order/orderSlice";

const OrderSuccessPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const params = useParams();


  useEffect(() => {
    const resetState = () => {
      dispatch(resetCartAsync()); //reset cart
      dispatch(resetOrder()); // reset order
    };

    let timeoutId;
    timeoutId = setTimeout(resetState, 2000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  // useEffect(() => {
  //   // Reload the page after a short delay (e.g., 2000 milliseconds or 2 seconds)
  //   const reloadTimeout = setTimeout(() => {
  //     location.reload();
  //   }, 2000);

  //   // Clear the timeout if the component is unmounted before the timeout completes
  //   return () => clearTimeout(reloadTimeout);
  // }, []);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true} />}

      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number #{params.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in My Account > My Orders.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {items.length === 0 && (
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSuccessPage;
