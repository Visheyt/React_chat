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
  form: {
    isEditForm: boolean;
    text: string;
    msgId: string;
  };
};

const initialState: ChatState = {
  contact: { login: "", isLogined: false },
  messages: {},
  form: {
    isEditForm: false,
    text: "",
    msgId: "",
  },
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
    editMessage: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      state.messages[action.payload.id].text = action.payload.text;
      state.messages[action.payload.id].status.isEdited = true;
    },
    openEditForm: (
      state,
      action: PayloadAction<{ text: string; id: string }>
    ) => {
      state.form.isEditForm = true;
      state.form.text = action.payload.text;
      state.form.msgId = action.payload.id;
    },
    closeEditForm: (state) => {
      state.form = {
        isEditForm: false,
        text: "",
        msgId: "",
      };
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
  editMessage,
  openEditForm,
  closeEditForm,
} = chatSlice.actions;
