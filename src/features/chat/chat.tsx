import { RootState } from "../../app/store/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import styles from "./chat.module.scss";
import { UsersList } from "./components/users-list/users-list";
import { ChatWindow } from "./components/chat-window/chat-window";

export const ChatPage: FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.login);
  return (
    <div className={styles.container}>
      <UsersList />
      <ChatWindow />
    </div>
  );
};
