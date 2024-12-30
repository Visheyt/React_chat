import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage } from "../../../services/ws.types";

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

const chatSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openChat: (state, action: PayloadAction<string>) => {
      state.contactName = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages[action.payload.id] = action.payload;
    },
    addMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      action.payload.forEach((msg) => {
        state.messages[msg.id] = msg;
      });
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { openChat, addMessage, addMessages } = chatSlice.actions;
