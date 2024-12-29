import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type message = {
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
};

type ChatMessageObj = Record<string, message>;

type ChatState = {
  contactName: string;
  messages: ChatMessageObj;
};

const initialState: ChatState = {
  contactName: "",
  messages: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openChat: (state, action: PayloadAction<string>) => {
      state.contactName = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { openChat } = userSlice.actions;
