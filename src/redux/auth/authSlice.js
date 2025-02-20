import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "../../firebase/firebase";
import { AuthStatus } from "../types";
// Initial state
const initialState = {
  user: null,
  token: null,
  status: AuthStatus.IDLE,
  error: null,
};

// Async Thunk for Sign Up
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return { user, token: user.refreshToken }; // Store refresh token
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for Sign In
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return { user, token: user.refreshToken }; // Store refresh token
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.status = AuthStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = AuthStatus.LOADING;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = AuthStatus.SUCCEEDED;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = AuthStatus.FAILED;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.status = AuthStatus.LOADING;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = AuthStatus.SUCCEEDED;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = AuthStatus.FAILED;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = AuthStatus.LOADING;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = AuthStatus.IDLE;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = AuthStatus.FAILED;
        state.error = action.payload;
      });
  },
});

// Persist config
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"], // Persist user and token
  blacklist: ["status", "error"], // Don't persist loading/error states
};

// Wrap reducer with persistReducer
const authReducer = persistReducer(persistConfig, authSlice.reducer);

// Export actions
export const { clearAuthState } = authSlice.actions;

// Export persisted reducer
export default authReducer;
