import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  login: string;
  password: string;
}

const initialState: UserState = {
  login: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ login: string; password: string }>
    ) => {
      state.login = action.payload.login;
      state.password = action.payload.password;
    },

    logout: (state) => {
      state.login = "";
      state.password = "";
    },
  },
});

export const userReducer = userSlice.reducer;
export const { login, logout } = userSlice.actions;
