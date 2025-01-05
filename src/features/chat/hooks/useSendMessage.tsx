import { useDispatch, useSelector } from "react-redux";
import { ChatFormValues } from "../components/chat-window/chat-window";
import { AppDispatch, RootState } from "../../../app/store/store";
import { socket } from "../../../services/ws.service";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import {
  addMessage,
  closeEditForm,
  editMessage,
} from "../../../app/store/reducers/chat.reducer";
import { FormInstance } from "antd";

export const useSendMessage = (form: FormInstance<ChatFormValues>) => {
  const contactName = useSelector(
    (state: RootState) => state.chatReducer.contact
  );

  const { isEditForm, msgId } = useSelector(
    (state: RootState) => state.chatReducer.form
  );

  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: ChatFormValues) => {
    if (isEditForm) {
      socket.editMessage(msgId, values.message);
    } else {
      socket.sendMessage(contactName.login, values.message);
    }

    form.resetFields();
  };

  useSocketSubscription("MSG_SEND", ({ payload: { message } }) => {
    dispatch(addMessage(message));
  });

  useSocketSubscription(
    "MSG_EDIT",
    ({
      payload: {
        message: { id, text },
      },
    }) => {
      dispatch(editMessage({ id, text }));
      dispatch(closeEditForm());
    }
  );
  return {
    onFinish,
  };
};
