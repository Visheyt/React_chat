import { useEffect } from "react";
import { useGetUsers } from "../../hooks/useGetUsers";
import styles from "./users-list.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";

export const UsersList = () => {
  useGetUsers();
  const { users } = useSelector((state: RootState) => state.usersReducer);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className={styles.container}>
      <h3>Users</h3>
    </div>
  );
};
