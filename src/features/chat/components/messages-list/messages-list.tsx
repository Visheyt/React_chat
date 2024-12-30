import styles from "./messages-list.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";

export const MessagesList = () => {
  const messages = useSelector(
    (state: RootState) => state.chatReducer.messages
  );

  const messagesValues = Object.values(messages);

  return (
    <div className={styles.container}>
      {messagesValues.map((msg) => (
        <div>{msg.text}</div>
      ))}
    </div>
  );
};
