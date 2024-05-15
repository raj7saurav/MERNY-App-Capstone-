import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemFromCart,
  fetchItemsByUserId,
  resetCart,
  updateCart,
} from "./CartAPI";

const initialState = {
  status: "idle",
  items: [],
  cartLoaded: false,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ item, alert }) => {
    const response = await addToCart(item);
    alert.success("Item added to your cart.");

    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    const response = await fetchItemsByUserId();
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    // console.log(response.data);
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  const response = await resetCart();
  console.log(response);
  return response;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // increment : (state) => {
    //   state.value += 1;
    // }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload; // state.items ke array me ab ye wala item rakh denge jo payload me aaya hai. purana wale ko override karke.
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

// export const { increment } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
