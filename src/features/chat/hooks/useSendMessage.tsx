import { useDispatch, useSelector } from "react-redux";
import { ChatFormValues } from "../components/chat-window/chat-window";
import { AppDispatch, RootState } from "../../../app/store/store";
import { socket } from "../../../services/ws.service";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import { addMessage } from "../../../app/store/reducers/chat.reducer";
import { FormInstance } from "antd";

export const useSendMessage = (form: FormInstance<ChatFormValues>) => {
  const contactName = useSelector(
    (state: RootState) => state.chatReducer.contact
  );
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: ChatFormValues) => {
    socket.sendMessage(contactName.login, values.message);
    form.resetFields();
  };

  useSocketSubscription("MSG_SEND", ({ payload: { message } }) => {
    dispatch(addMessage(message));
  });

  return {
    onFinish,
  };
};
