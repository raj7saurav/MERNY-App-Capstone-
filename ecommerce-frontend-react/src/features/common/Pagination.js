import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../app/constants";

export default function Pagination({ page, setPage, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* This downside first div is for mobile layout */}
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      {/* This downside div is for desktop or upper mobile sizes. */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {/* This creates an array with a length equal to the number of pages needed to display all items based on the totalItems(which is comes from the json-server in ProductAPI file and creates the totalItems variable and send to the redux and then we are fetching the totalItems state from the fetchProductsByFiltersAsync function in the ProductSlice file) and ITEMS_PER_PAGE. Array create krke usper loop karne ka ek tareeka ye v haii --> [...Array(Math.ceil(totalItems / ITEMS_PER_PAGE)).keys()]...isme v array hi create kiya ja ra hai aur fir usme loop kiya ja ra hai */}
            {/* kyuki mujhe 1 se lekar 10 tak ke pages dikhane hain to array ki jarurat to padegi. Array.from() method ke pehle ek iterable object ya array-like object chahiye hota hai. Iske liye aapne { length: Math.ceil(totalItems / ITEMS_PER_PAGE) } diya hai. Yeh ek object hai jiska ek property length hai, aur uski value Math.ceil(totalItems / ITEMS_PER_PAGE) hai. Ismen object ki zarurat isliye padti hai kyun ki Array.from() method ek iterable object ya array-like object se seedha array create karta hai. Jab aap { length: Math.ceil(totalItems / ITEMS_PER_PAGE) } dete hain, toh Array.from() method is object ko dekhta hai, uske length property ko extract karta hai, aur phir uske basis pe ek array create karta hai. */}
            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                key={index}
                onClick={() => handlePage(index + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center cursor-pointer ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400"
                } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}{" "}
                {/* humne yaha per iss array ki indexing use ki hai kyuki create kiya gaya array to empty hai. array empty isliye hai kyuki hum khali array jiski length 10 hai uss per loop chala rahe hain. aur uske index ki value undefined hai kyuki humne uss array me koi element push kiya hi nahi aur na hi humne existing array per loop chalaya hai, humne to ek naya 10 size ke array per loop chalaya hai. */}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
