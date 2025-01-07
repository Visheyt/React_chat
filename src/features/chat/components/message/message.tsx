import { FC } from "react";
import styles from "./message.module.scss";
import { ChatMessage } from "../../../../services/ws.types";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteMessage } from "../../hooks/useDeleteMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store/store";
import { openEditForm } from "../../../../app/store/reducers/chat.reducer";

const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

const getStatus = ({
  isEdited,
  isReaded,
}: {
  isDelivered?: boolean;
  isReaded: boolean;
  isEdited: boolean;
}) => {
  if (isEdited) {
    return "Edited";
  }
  if (isReaded) {
    return "✓✓";
  }
  return "✓";
};
export const Message: FC<ChatMessage> = ({
  id,
  to,
  text,
  datetime,
  from,
  status,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = useDeleteMessage();

  const login = useSelector((state: RootState) => state.userReducer.login);

  return (
    <>
      <div
        className={`${styles.container} ${
          to === login ? styles.incoming : styles.outcoming
        }`}
      >
        <header>
          <span className={styles.date}>{formatTime(new Date(datetime))}</span>
          {login === from ? (
            <span className={styles.status}>{getStatus(status)}</span>
          ) : (
            ""
          )}
        </header>
        <p>{text}</p>
        <footer className={styles.footer}>
          <EditOutlined
            key="edit"
            onClick={() => dispatch(openEditForm({ text, id }))}
            style={{
              color: "gray",
            }}
          />
          <DeleteOutlined
            onClick={() => onDelete(id)}
            key="delete"
            style={{
              color: "gray",
            }}
          />
        </footer>
      </div>
    </>
  );
};
