import { useDispatch, useSelector } from "react-redux";
import { ChatFormValues } from "../components/chat-window/chat-window";
import { AppDispatch, RootState } from "../../../app/store/store";
import { socket } from "../../../services/ws.service";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import { addMessage } from "../../../app/store/reducers/chat.reducer";

export const useSendMessage = () => {
  const contactName = useSelector(
    (state: RootState) => state.chatReducer.contactName
  );
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: ChatFormValues) => {
    socket.sendMessage(contactName, values.message);
  };

  useSocketSubscription("MSG_SEND", (msg) => {
    dispatch(addMessage(msg));
  });

  return {
    onFinish,
  };
};
