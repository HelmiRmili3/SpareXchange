import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase"; // Ensure you have Firebase initialized
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

// Generalized slice creation for different categories
const createCategorySlice = (categoryName) => {
  return createSlice({
    name: categoryName,
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchItems.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchItems.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addItem.fulfilled, (state, action) => {
          state.items.push(action.payload); // Ensure correct data structure
        })
        .addCase(updateItem.fulfilled, (state, action) => {
          const index = state.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) state.items[index] = action.payload;
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        });
    },
  });
};

// Fetch items from Firestore based on categoryName
export const fetchItems = createAsyncThunk(
  "fetchItems",
  async (categoryName) => {
    const snapshot = await getDocs(collection(db, categoryName));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

// Add item to Firestore and return with id
export const addItem = createAsyncThunk(
  "addItem",
  async ({ categoryName, data }) => {
    const docRef = await addDoc(collection(db, categoryName), data);
    console.log("Document written with ID: ", docRef.id);
    return { id: docRef.id, ...data }; // Return item with id
  }
);

// Update item in Firestore
export const updateItem = createAsyncThunk(
  "updateItem",
  async ({ categoryName, id, data }) => {
    const docRef = doc(db, categoryName, id);
    await updateDoc(docRef, data);
    return { id, ...data }; // Return updated item with id
  }
);

// Delete item from Firestore
export const deleteItem = createAsyncThunk(
  "deleteItem",
  async ({ categoryName, id }) => {
    const docRef = doc(db, categoryName, id);
    await deleteDoc(docRef);
    return id; // Return id to remove from state
  }
);

// Create slices dynamically for each category
export const productsSlice = createCategorySlice("Products");
export const exchangeSlice = createCategorySlice("Exchange");
export const doneSlice = createCategorySlice("Done");
export const freelanceSlice = createCategorySlice("Freelance");
export const transportSlice = createCategorySlice("Transport");

export default {
  products: productsSlice.reducer,
  exchange: exchangeSlice.reducer,
  done: doneSlice.reducer,
  freelance: freelanceSlice.reducer,
  transport: transportSlice.reducer,
};
