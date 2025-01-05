import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store/store";
import { logout } from "../app/store/reducers/user.reducer";
import { useNavigate } from "react-router";
import { socket } from "../services/ws.service";
import { useSocketSubscription } from "./useSocketSubscription";
import { closeChat } from "../app/store/reducers/chat.reducer";

export const useLogout = () => {
  const { login, password } = useSelector(
    (state: RootState) => state.userReducer
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    socket.toggleUser({ login, password });
  };

  useSocketSubscription("USER_LOGOUT", () => {
    dispatch(logout());
    navigate("/login");
    dispatch(closeChat());
  });

  return {
    handleLogout,
  };
};
