import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userName: string;
}

const initialState: UserState = {
  userName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { addUser } = userSlice.actions;
