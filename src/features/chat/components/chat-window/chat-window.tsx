import { Button, Form, Input, InputRef } from "antd";
import styles from "./chat-window.module.scss";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useRef } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

export type ChatFormValues = {
  message: string;
};
export const ChatWindow = () => {
  const inputRef = useRef<InputRef | null>(null);
  const [form] = useForm();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onFinish = (values: ChatFormValues) => {
    console.log(values.message);
  };

  return (
    <div className={styles.container}>
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <FormItem<ChatFormValues>
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
