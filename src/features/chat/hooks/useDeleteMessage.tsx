import { useDispatch } from "react-redux";
import { socket } from "../../../services/ws.service";
import { AppDispatch } from "../../../app/store/store";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import { deleteMessage } from "../../../app/store/reducers/chat.reducer";

export const useDeleteMessage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = (id: string) => {
    socket.deleteMessage(id);
  };

  useSocketSubscription(
    "MSG_DELETE",
    ({
      payload: {
        message: { id },
      },
    }) => {
      dispatch(deleteMessage(id));
    }
  );
  return onDelete;
};
