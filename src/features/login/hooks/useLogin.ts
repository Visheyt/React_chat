import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../../../app/store/reducers/user.reducer";
import { AppDispatch } from "../../../app/store/store";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import { socket } from "../../../services/ws.service";

export type FormValues = {
  login: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [form] = useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    socket.login(values.login, values.password);
    form.resetFields();
  };

  useSocketSubscription("USER_LOGIN", ({ payload: { user } }) => {
    dispatch(addUser(user.login));
    navigate("/chat");
  });

  return {
    form,
    onFinish,
  };
};
