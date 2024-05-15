import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  fetchProductsByFilters,
  updateProduct,
} from "./ProductAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (update) => {
    console.log(update);
    const response = await createProduct(update);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (update) => {
    console.log(update);
    const response = await updateProduct(update);
    console.log(response.data);
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById", // This is a action name
  async (id) => {
    const response = await fetchProductById(id);
    // console.log(response.data);
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters", // In the createAsyncThunk function, the first parameter is the type string, which is a unique identifier for the action. It helps the Redux Toolkit manage the asynchronous action creators and reducers. The type string is typically written in the format "sliceName/actionName.". "product" is the name of your slice and after the slash "fetchProductsByFilters" is the name of your asynchronous action. So, when you dispatch fetchProductsByFiltersAsync, it will internally dispatch actions like "product/fetchProductsByFilters/pending," "product/fetchProductsByFilters/fulfilled," or "product/fetchProductsByFilters/rejected," based on the status of the asynchronous operation.
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination, admin);
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload; // isse products wale main page per "product deleted" ka flag dikhayi deta hai.
        state.selectedProduct = action.payload; // isse edit button per click karte time Admin route per jakar to waha per jo uss perticular item ka data form ke andar available hota hai wo isi selectedProduct ke through milta hai, to jab hum ise Delete button per click kara kar isme deleted=true ka flag set kar denge to wo instantly iss state me jakar set hona chiye aur hamare deleted button per click karte hi wo product per "This product is deleted" ka flag aa jana chiye aur wo delete button hat jana chiye.
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products; // ye products state ko client side per available karata hai jise useSelector hook se import kiya jata hai. aur fir usme map lagaya jata hai taki products state ke andar ka data use kiya ja sake.
export const selectCategories = (state) => state.product.categories; // ye category state ko client side per available karata hai jise useSelector hook se import kiya jata hai. aur fir usme map lagaya jata hai taki category state ke andar ka data use kiya ja sake.
export const selectBrands = (state) => state.product.brands; // ye brands state ko client side per available karata hai jise useSelector hook se import kiya jata hai. aur fir usme map lagaya jata hai taki brands state ke andar ka data use kiya ja sake.
export const selectedProductById = (state) => state.product.selectedProduct; // ye selectedProduct state ko client side per available karata hai jise useSelector hook se import kiya jata hai. aur fir usme map lagaya jata hai taki selectedProduct state ke andar ka data use kiya ja sake.
export const selectProductListStatus = (state) => state.product.status;
export const selectTotalItems = (state) => state.product.totalItems; // ye totalItems state ko client side per available karata hai jise useSelector hook se import kiya jata hai. aur fir usme map lagaya jata hai taki totalItems state ke andar ka data use kiya ja sake.

export default productSlice.reducer;
