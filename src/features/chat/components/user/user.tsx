import { FC } from "react";
import styles from "./user.module.scss";

interface UserProps extends React.HTMLAttributes<HTMLDivElement> {
  login: string;
  isLogined: boolean;
}
export const User: FC<UserProps> = ({ login, isLogined, ...props }) => {
  return (
    <div className={styles.container} {...props}>
      <h4>{login}</h4>
      <h4 className={`${isLogined ? styles.online : styles.offline}`}></h4>
    </div>
  );
};
