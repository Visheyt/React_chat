import { FC } from "react";
import styles from "./message.module.scss";
import { ChatMessage } from "../../../../services/ws.types";
import Card from "antd/es/card/Card";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteMessage } from "../../hooks/useDeleteMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";

const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

const getStatus = ({
  isDelivered,
  isEdited,
  isReaded,
}: {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
}) => {
  if (isEdited) {
    return "Edited";
  }
  if (isDelivered) {
    return "Delivered";
  }

  return "Readed";
};
export const Message: FC<ChatMessage> = ({
  id,
  to,
  text,
  datetime,
  from,
  status,
}) => {
  const onDelete = useDeleteMessage();
  const login = useSelector((state: RootState) => state.userReducer.login);

  return (
    <>
      <Card
        style={{
          width: "100%",
          maxWidth: 350,
          alignSelf: `${login === to ? "flex-start" : "flex-end"}`,
        }}
        actions={
          login === from
            ? [
                <EditOutlined key="edit" />,
                <DeleteOutlined onClick={() => onDelete(id)} key="delete" />,
              ]
            : []
        }
      >
        <p>{text}</p>
        <span className={styles.date}>{formatTime(new Date(datetime))}</span>
        {login === from ? (
          <span className={styles.status}>{getStatus(status)}</span>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};
