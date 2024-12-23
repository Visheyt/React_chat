import { useSelector } from "react-redux";
import styles from "./header.module.scss";
import { RootState } from "../../store/store";
import { Button } from "antd";
import { useLogout } from "../../../hooks/useLogout";

export const Header = () => {
  const { handleLogout } = useLogout();

  const { login: userName } = useSelector(
    (state: RootState) => state.userReducer
  );

  return (
    <div className={styles.container}>
      <h2>{userName}</h2>
      {userName ? (
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
