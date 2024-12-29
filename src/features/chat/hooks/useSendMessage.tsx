import { useSelector } from "react-redux";
import { ChatFormValues } from "../components/chat-window/chat-window";
import { RootState } from "../../../app/store/store";
import { socket } from "../../../services/ws.service";

export const useSendMessage = () => {
  const user = useSelector((state: RootState) => state.userReducer.login);

  const onFinish = (values: ChatFormValues) => {
    socket.sendMessage(user, values.message);
  };

  return {
    onFinish,
  };
};
