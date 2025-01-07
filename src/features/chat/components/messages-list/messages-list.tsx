import styles from "./messages-list.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";
import { useGetMessages } from "../../hooks/useGetMesssages";
import { Message } from "../message/message";

import { useReadMessages } from "../../hooks/useReadMessages";

export const MessagesList = () => {
  useGetMessages();
  useReadMessages();

  const contact = useSelector((state: RootState) => state.chatReducer.contact);

  const messages = useSelector(
    (state: RootState) => state.chatReducer.messages
  );

  const messagesValues = Object.values(messages);

  return (
    <div
      className={`${styles.container} ${contact ? styles.show : styles.hide}`}
    >
      {messagesValues.map((msg) => (
        <Message key={msg.id} {...msg} />
      ))}
    </div>
  );
};
