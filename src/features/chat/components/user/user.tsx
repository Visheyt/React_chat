import { FC } from "react";
import styles from "./user.module.scss";

type UserProps = {
  login: string;
  isLogined: boolean;
};
export const User: FC<UserProps> = ({ login, isLogined }) => {
  return (
    <div className={styles.container}>
      <h4>{login}</h4>
      <h4 className={`${isLogined ? styles.online : styles.offline}`}></h4>
    </div>
  );
};
