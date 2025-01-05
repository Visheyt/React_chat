import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store/store";
import { useEffect } from "react";
import { socket } from "../../../services/ws.service";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import { addUsers, toggleUser } from "../../../app/store/reducers/user.reducer";

import { useNotification } from "../../../hooks/useNotification";
import { toggleContact } from "../../../app/store/reducers/chat.reducer";

export const useGetUsers = () => {
  const login = useSelector(
    (state: RootState) => state.chatReducer.contact.login
  );
  const { showNotification } = useNotification();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.getUsers(true);
    socket.getUsers(false);
  }, []);

  useSocketSubscription("USER_EXTERNAL_LOGIN", ({ payload: { user } }) => {
    dispatch(toggleUser(user));
    showNotification({
      message: "",
      description: `${user.login} enter to chat`,
    });
    if (user.login === login) {
      dispatch(toggleContact(user.isLogined));
    }
  });

  useSocketSubscription("USER_EXTERNAL_LOGOUT", ({ payload: { user } }) => {
    dispatch(toggleUser(user));
    showNotification({
      message: "",
      description: `${user.login} leaves chat`,
    });
    if (user.login === login) {
      dispatch(toggleContact(user.isLogined));
    }
  });

  useSocketSubscription("USER_ACTIVE", ({ payload: { users } }) => {
    dispatch(addUsers(users));
  });

  useSocketSubscription("USER_INACTIVE", ({ payload: { users } }) => {
    dispatch(addUsers(users));
  });
};
