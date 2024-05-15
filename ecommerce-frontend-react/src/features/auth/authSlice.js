import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  createUser,
  signOut,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
} from "./authAPI";

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id', 'email', 'role'... user se related loggedInUser me nahi rahengi...
  status: "idle",
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false,
};

// Thunk middleware ko use karke, aap async actions ko dispatch kar sakte hain, jaise ki API calls, aur phir jab tak response nahi milta, tab tak reducers ko update nahi karta hai.
export const createUserAsync = createAsyncThunk(
  "user/createUser", // <-- This is the slice name
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/checkUser", // <-- This is the slice name
  async (loginInfo, { rejectWithValue }) => {
    // rejectWithValue asyncThunk ka hi ek prop hai jo ki iske andar error ko action ke state me set kar deta hai.
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async (password, { rejectWithValue }) => {
    try {
      const response = await resetPassword(password);
      return response.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err);
    }
  }
);

export const checkAuthAsync = createAsyncThunk("user/checkAuth", async () => {
  try {
    const response = await checkAuth();
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
});

export const signOutAsync = createAsyncThunk("user/sigOut", async () => {
  const response = await signOut();
  console.log("sign out -> ", response.data);
  return response.data;
});

export const authSlice = createSlice({
  name: "user", // <-- This is the slice name
  initialState: initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },

  extraReducers: (builder) => {
    // extraReducers ek mechanism hai jo Redux Toolkit ke sath aata hai aur ye asyncThunk actions ko monitor karta hai. extraReducers object mein aap specify kar sakte hain ki jab bhi koi particular action (asyncThunk ya koi aur) dispatch hoti hai, to uske baad kya karna hai. Iske through, aap success (fulfilled), pending (pending), aur failure (rejected) states ke liye reducers ko define kar sakte hain. Ye states asyncThunk actions ke lifecycle ke hisab se hote hain. extraReducers ka istemal in states ke liye reducers ko define karne mein hota hai, aur ye asyncThunk actions ke sath achhe se kaam karta hai, unke lifecycle events pe focus karke.
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state) => {
        state.status = "idle";
        state.mailSent = true;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = "idle";
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;

export default authSlice.reducer;
