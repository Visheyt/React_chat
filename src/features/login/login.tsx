import { Button, Form, Input } from "antd";
import styles from "./login.module.scss";
import FormItem from "antd/es/form/FormItem";

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form
          layout="vertical"
          className={styles.form}
          autoComplete="off"
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
        >
          <FormItem
            label="Login"
            name="login"
            rules={[{ required: true, message: "Please input your login!" }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </FormItem>
          <FormItem>
            <Button type="default" htmlType="submit">
              Login
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
