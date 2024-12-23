import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../../app/store/reducers/user.reducer";
import { AppDispatch } from "../../../app/store/store";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import { socket } from "../../../services/ws.service";
import { useState } from "react";

export type FormValues = {
  login: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [password, setPassword] = useState<string>("");

  const [form] = useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    socket.toggleUser({
      login: values.login,
      password: values.password,
      isLogin: true,
    });
    setPassword(values.password);
  };

  useSocketSubscription("USER_LOGIN", ({ payload: { user } }) => {
    dispatch(login({ login: user.login, password }));
    navigate("/chat");
  });

  return {
    form,
    onFinish,
  };
};
