import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readMessage } from "../../../app/store/reducers/chat.reducer";
import { AppDispatch, RootState } from "../../../app/store/store";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import { socket } from "../../../services/ws.service";

export const useReadMessages = () => {
  const login = useSelector((state: RootState) => state.userReducer.login);

  const messages = useSelector(
    (state: RootState) => state.chatReducer.messages
  );

  const dispatch = useDispatch<AppDispatch>();

  const messagesValues = Object.values(messages);

  useEffect(() => {
    messagesValues.forEach((msg) => {
      if (login === msg.to && !msg.status.isReaded) socket.readMessage(msg.id);
    });
  }, [login, messagesValues]);

  useSocketSubscription(
    "MSG_READ",
    ({
      payload: {
        message: { id },
      },
    }) => {
      dispatch(readMessage(id));
    }
  );
};
