import { useDispatch, useSelector } from "react-redux";
import styles from "./chat-header.module.scss";
import { AppDispatch, RootState } from "../../../../app/store/store";
import { Button } from "antd";
import { closeChat } from "../../../../app/store/reducers/chat.reducer";

export const ChatHeader = () => {
  const { contact } = useSelector((state: RootState) => state.chatReducer);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={styles.container}>
      <h5>{contact.login}</h5>
      <span>{contact.isLogined ? "Online" : "Offline"}</span>
      <Button onClick={() => dispatch(closeChat())}>Close</Button>
    </div>
  );
};
