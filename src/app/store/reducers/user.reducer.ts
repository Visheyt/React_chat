import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../services/ws.types";

type Users = Record<string, boolean>;

interface UserState {
  login: string;
  password: string;
  contacts: Users;
}

const initialState: UserState = {
  login: "",
  password: "",
  contacts: {},
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
    addUsers: (state, action: PayloadAction<User[]>) => {
      action.payload.forEach((user) => {
        if (state.login !== user.login) {
          state.contacts[user.login] = user.isLogined;
        }
      });
    },
    toggleUser: (state, action: PayloadAction<User>) => {
      state.contacts[action.payload.login] = action.payload.isLogined;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { login, logout, addUsers, toggleUser } = userSlice.actions;
