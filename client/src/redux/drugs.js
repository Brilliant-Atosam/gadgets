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
  },
});

export const { drugsStart, drugsSuccess, drugsFailure } = drugsSlice.actions;
export default drugsSlice.reducer;
