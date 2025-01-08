import { FC } from "react";
import styles from "./message.module.scss";
import { ChatMessage } from "../../../../services/ws.types";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteMessage } from "../../hooks/useDeleteMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store/store";
import { openEditForm } from "../../../../app/store/reducers/chat.reducer";
import { formatTime } from "../../utils/formatTime";
import { getStatus } from "../../utils/getStatus";

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
              color: "rgb(186, 186, 186)",
            }}
          />
          <DeleteOutlined
            onClick={() => onDelete(id)}
            key="delete"
            style={{
              color: "rgb(186, 186, 186)",
            }}
          />
        </footer>
      </div>
    </>
  );
};
