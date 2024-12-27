import { FC } from "react";

import styles from "./chat.module.scss";
import { UsersList } from "./components/users-list/users-list";
import { ChatWindow } from "./components/chat-window/chat-window";

export const ChatPage: FC = () => {
  return (
    <div className={styles.container}>
      <UsersList />
      <ChatWindow />
    </div>
  );
};
