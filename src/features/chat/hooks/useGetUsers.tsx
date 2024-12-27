import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store/store";
import { useEffect } from "react";
import { socket } from "../../../services/ws.service";
import { useSocketSubscription } from "../../../hooks/useSocketSubscription";
import { addUsers } from "../../../app/store/reducers/users.reducer";

export const useGetUsers = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("useEffect called");
    socket.getUsers(true);
    socket.getUsers(false);
  }, []);

  useSocketSubscription("USER_ACTIVE", ({ payload: { users } }) => {
    dispatch(addUsers(users));
  });

  useSocketSubscription("USER_INACTIVE", ({ payload: { users } }) => {
    dispatch(addUsers(users));
  });
};
