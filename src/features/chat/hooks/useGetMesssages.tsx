import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store/store";
import { useEffect } from "react";
import { socket } from "../../../services/ws.service";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import {
  addMessage,
  addMessages,
} from "../../../app/store/reducers/chat.reducer";

export const useGetMessages = () => {
  const contact = useSelector((state: RootState) => state.chatReducer.contact);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.fetchMessageHistory(contact.login);
  }, [contact.login]);

  useSocketSubscription("MSG_FROM_USER", ({ payload: { messages } }) => {
    dispatch(addMessages(messages));
  });

  useSocketSubscription("MSG_SEND", ({ payload: { message } }) => {
    dispatch(addMessage(message));
  });
};
