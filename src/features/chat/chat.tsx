import { RootState } from "../../app/store/store";
import { FC } from "react";
import { useSelector } from "react-redux";

export const ChatPage: FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.userName);
  return <div>{user}</div>;
};
