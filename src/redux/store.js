import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import authReducer from "./auth/authSlice";
import productsReducer from "./slices/productsSlice";
import exchangeReducer from "./slices/exchangeSlice";
import doneReducer from "./slices/doneSlice";
import freelanceReducer from "./slices/freelanceSlice";
import transportReducer from "./slices/transportSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"], // Only persist necessary fields
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: productsReducer,
    exchange: exchangeReducer,
    done: doneReducer,
    freelance: freelanceReducer,
    transport: transportReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevent circular structure issues
      immutableCheck: false, // Disable immutable state check
    }),
});

export const persistor = persistStore(store);
