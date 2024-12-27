import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../services/ws.types";

type Users = Record<string, boolean>;

interface UsersState {
  users: Users;
}

const initialState: UsersState = {
  users: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<User[]>) => {
      action.payload.forEach((user) => {
        state.users[user.login] = user.isLogined;
      });
    },
    toggleUser: (state, action: PayloadAction<User>) => {
      state.users[action.payload.login] = action.payload.isLogined;
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const { addUsers, toggleUser } = usersSlice.actions;
