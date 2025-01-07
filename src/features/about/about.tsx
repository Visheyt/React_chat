import { Button } from "antd";
import styles from "./about.module.scss";
import { useNavigate } from "react-router";

export const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <p>
        This is my test tutorial chat app on React, there is a similar app on
        angular. You can exchange messages, edit and delete them, thanks to Rs
        School for the server and its implementation. Good luck in communicating
        with friends and thanks for using my app.
      </p>
      <Button onClick={() => navigate("/login")}>Go to login page</Button>
    </div>
  );
};
