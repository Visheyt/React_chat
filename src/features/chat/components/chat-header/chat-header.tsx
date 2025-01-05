import { useSelector } from "react-redux";
import styles from "./chat-header.module.scss";
import { RootState } from "../../../../app/store/store";

export const ChatHeader = () => {
  const { contact } = useSelector((state: RootState) => state.chatReducer);
  return (
    <div className={styles.container}>
      <h5>{contact.login}</h5>
      <span>{contact.isLogined ? "Online" : "Offline"}</span>
    </div>
  );
};
