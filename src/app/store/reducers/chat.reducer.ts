import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage } from "../../../services/ws.types";

type message = {
  id: string;
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

type Contact = { login: string; isLogined: boolean };

type ChatState = {
  contact: Contact;
  messages: ChatMessageObj;
};

const initialState: ChatState = {
  contact: { login: "", isLogined: false },
  messages: {},
};

const chatSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openChat: (state, action: PayloadAction<Contact>) => {
      if (state.contact.login !== action.payload.login) {
        state.contact = action.payload;
        state.messages = {};
      }
    },
    closeChat: (state) => {
      state.contact = { login: "", isLogined: false };
      state.messages = {};
    },
    toggleContact: (state, action: PayloadAction<boolean>) => {
      state.contact.isLogined = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      if (
        state.contact.login &&
        (state.contact.login === action.payload.from ||
          state.contact.login === action.payload.to)
      ) {
        state.messages[action.payload.id] = action.payload;
      }
    },
    addMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      action.payload.forEach((msg) => {
        state.messages[msg.id] = msg;
      });
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      delete state.messages[action.payload];
    },
    readMessage: (state, action: PayloadAction<string>) => {
      state.messages[action.payload].status.isReaded = true;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const {
  openChat,
  closeChat,
  toggleContact,
  addMessage,
  addMessages,
  deleteMessage,
  readMessage,
} = chatSlice.actions;
