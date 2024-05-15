import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/ProductSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/CartSlice";
import orderReducer from "../features/order/orderSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer, // product slice
    auth: authReducer, // auth slice
    cart: cartReducer, // cart slice
    order: orderReducer, // orderSlice
    user: userReducer,
  },
});
