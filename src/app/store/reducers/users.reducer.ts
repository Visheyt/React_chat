import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../services/ws.types";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<User[]>) => {
      const newUsers = action.payload.filter(
        (user) =>
          !state.users.some((existingUser) => existingUser.login === user.login)
      );
      state.users.push(...newUsers);
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const { addUsers } = usersSlice.actions;
