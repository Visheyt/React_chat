import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store/store";
import { useEffect } from "react";
import { socket } from "../../../services/ws.service";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import {
  addUsers,
  toggleUser,
} from "../../../app/store/reducers/users.reducer";

export const useGetUsers = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.getUsers(true);
    socket.getUsers(false);
  }, []);

  useSocketSubscription("USER_EXTERNAL_LOGIN", ({ payload: { user } }) => {
    dispatch(toggleUser(user));
  });

  useSocketSubscription("USER_EXTERNAL_LOGOUT", ({ payload: { user } }) => {
    dispatch(toggleUser(user));
  });

  useSocketSubscription("USER_ACTIVE", ({ payload: { users } }) => {
    dispatch(addUsers(users));
  });

  useSocketSubscription("USER_INACTIVE", ({ payload: { users } }) => {
    dispatch(addUsers(users));
  });
};
