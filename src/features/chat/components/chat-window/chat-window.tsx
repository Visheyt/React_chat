import { Button, Form, Input, InputRef } from "antd";
import styles from "./chat-window.module.scss";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useRef } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";
import { MessagesList } from "../messages-list/messages-list";
import { ChatHeader } from "../chat-header/chat-header";

export type ChatFormValues = {
  message: string;
};
export const ChatWindow = () => {
  const inputRef = useRef<InputRef | null>(null);

  const contact = useSelector((state: RootState) => state.chatReducer.contact);

  const text = useSelector((state: RootState) => state.chatReducer.form.text);

  const [form] = useForm();

  const { onFinish } = useSendMessage(form);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (text) {
      form.setFieldValue("message", text);
    }
  }, [form, text]);

  if (!contact.login) return;

  return (
    <div className={styles.container}>
      <ChatHeader />
      <MessagesList />
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "20px",
          paddingInline: "8px",
        }}
      >
        <FormItem<ChatFormValues>
          style={{
            width: "100%",
          }}
          name="message"
          rules={[{ required: true, message: "Please write a message" }]}
        >
          <Input
            ref={inputRef}
            autoComplete="off"
            placeholder="Write a message"
          />
        </FormItem>
        <FormItem>
          <Button
            type="default"
            htmlType="submit"
            icon={<ArrowRightOutlined />}
          ></Button>
        </FormItem>
      </Form>
    </div>
  );
};
