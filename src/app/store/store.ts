import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.reducer";
import { chatReducer } from "./reducers/chat.reducer";

export const store = configureStore({
  reducer: {
    userReducer,
    chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
