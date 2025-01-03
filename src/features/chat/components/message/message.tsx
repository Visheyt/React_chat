import { FC } from "react";
import styles from "./message.module.scss";
import { ChatMessage } from "../../../../services/ws.types";
import Card from "antd/es/card/Card";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteMessage } from "../../hooks/useDeleteMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";

export const Message: FC<ChatMessage> = ({ id, to, text, datetime, from }) => {
  const onDelete = useDeleteMessage();
  const login = useSelector((state: RootState) => state.userReducer.login);

  return (
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
    </Card>
  );
};
