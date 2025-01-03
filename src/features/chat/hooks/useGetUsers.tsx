import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store/store";
import { useEffect } from "react";
import { socket } from "../../../services/ws.service";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import { addUsers, toggleUser } from "../../../app/store/reducers/user.reducer";
import notification from "antd/es/notification";

export const useGetUsers = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (description: string, message: string) => () => {
    api.open({
      message,
      description,
      showProgress: true,
      pauseOnHover: false,
    });
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.getUsers(true);
    socket.getUsers(false);
  }, []);

  useSocketSubscription("USER_EXTERNAL_LOGIN", ({ payload: { user } }) => {
    dispatch(toggleUser(user));
    openNotification("", `${user.login} enter to chat`)();
  });

  useSocketSubscription("USER_EXTERNAL_LOGOUT", ({ payload: { user } }) => {
    dispatch(toggleUser(user));
    openNotification("", `${user.login} leaves chat`)();
  });

  useSocketSubscription("USER_ACTIVE", ({ payload: { users } }) => {
    dispatch(addUsers(users));
  });

  useSocketSubscription("USER_INACTIVE", ({ payload: { users } }) => {
    dispatch(addUsers(users));
  });
  return {
    contextHolder,
  };
};
