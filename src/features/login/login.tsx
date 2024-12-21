import { Button, Form, Input, InputRef } from "antd";
import styles from "./login.module.scss";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useRef } from "react";
import Link from "antd/es/typography/Link";
import { FormValues, useLogin } from "./hooks/useLogin";

export const LoginPage = () => {
  const { form, onFinish } = useLogin();
  const loginInputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    loginInputRef.current?.focus();
  }, []);

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
