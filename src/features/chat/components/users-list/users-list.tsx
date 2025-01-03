import { useGetUsers } from "../../hooks/useGetUsers";
import styles from "./users-list.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store/store";
import { User } from "../user/user";
import { openChat } from "../../../../app/store/reducers/chat.reducer";

export const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contextHolder } = useGetUsers();
  const { contacts: users } = useSelector(
    (state: RootState) => state.userReducer
  );

  const usersArray = Object.entries(users);

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.users}>
          {usersArray.map(([login, isLogined]) => (
            <User
              onClick={() => dispatch(openChat(login))}
              key={login}
              login={login}
              isLogined={isLogined}
            />
          ))}
        </div>
      </div>
    </>
  );
};
