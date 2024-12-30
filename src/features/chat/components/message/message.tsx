import { FC } from "react";
import styles from "./message.module.scss";
import { ChatMessage } from "../../../../services/ws.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";
import Card from "antd/es/card/Card";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type MessageProps = Omit<ChatMessage, "id">;
export const Message: FC<MessageProps> = ({ to, text, datetime, from }) => {
  const login = useSelector((state: RootState) => state.userReducer.login);

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 500,
        alignSelf: `${login === to ? "flex-start" : "flex-end"}`,
      }}
      actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
    >
      <p>{text}</p>
    </Card>
  );
};
