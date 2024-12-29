import { useGetUsers } from "../../hooks/useGetUsers";
import styles from "./users-list.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";
import { User } from "../user/user";

export const UsersList = () => {
  useGetUsers();
  const { contacts: users } = useSelector(
    (state: RootState) => state.userReducer
  );

  const usersArray = Object.entries(users);

  return (
    <div className={styles.container}>
      <div className={styles.users}>
        <h3>Users</h3>
        {usersArray.map(([login, isLogined]) => (
          <User key={login} login={login} isLogined={isLogined} />
        ))}
      </div>
    </div>
  );
};
