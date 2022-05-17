import { createSlice } from "@reduxjs/toolkit";

const drugsSlice = createSlice({
  name: "drugs",
  initialState: {
    Drugs: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    drugsStart: (state) => {
      state.isFetching = true;
    },
    drugsSuccess: (state, action) => {
      state.isFetching = false;
      state.Drugs = action.payload;
    },
    drugsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearDrugs: (state) => {
      state.Drugs = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const { drugsStart, drugsSuccess, drugsFailure, clearDrugs } =
  drugsSlice.actions;
export default drugsSlice.reducer;
