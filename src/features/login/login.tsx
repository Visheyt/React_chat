import { Button, Form, Input, InputRef } from "antd";
import styles from "./login.module.scss";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useRef } from "react";
import { socket } from "../../socket/client";
import { useForm } from "antd/es/form/Form";
import Link from "antd/es/typography/Link";
import { Message, UserLoginResponse } from "../../socket/client.type";

type FormValues = {
  login: string;
  password: string;
};
export const LoginPage = () => {
  const loginInputRef = useRef<InputRef | null>(null);

  const [form] = useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    socket.login(values.login, values.password);
    form.resetFields();
  };

  useEffect(() => {
    loginInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const subscription = socket
      .onMessage<Message<UserLoginResponse>>()
      .subscribe((msg) => {
        if (msg.type === "USER_LOGIN") {
          console.log(msg);
        }
      });

    return () => subscription.unsubscribe();
  });

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form
          layout="vertical"
          className={styles.form}
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 368 }}
          form={form}
          onFinish={onFinish}
        >
          <FormItem<FormValues>
            label="Login"
            name="login"
            rules={[{ required: true, message: "Please input your login!" }]}
          >
            <Input ref={loginInputRef} autoComplete="off" />
          </FormItem>
          <FormItem<FormValues>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password autoComplete="off" />
          </FormItem>
          <FormItem>
            <Button type="default" htmlType="submit">
              Login
            </Button>
          </FormItem>
        </Form>
      </div>
      <Link href="/about">About app</Link>
    </div>
  );
};
