import "./App.css";
import { Route, Routes } from "react-router";
import { Layout } from "./app/layout/layout";
import { ChatPage } from "./features/chat/chat";
import { AboutPage } from "./features/about/about";
import { LoginPage } from "./features/login/login";
import { NotificationProvider } from "./app/context/notification.context";
import { useEffect, useState } from "react";
import { socket } from "./services/ws.service";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "./app/store/store";
import { Navigate } from "react-router";
import { useSocketSubscription } from "./hooks/useSocketSubscription";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const login = useSelector((state: RootState) => state.userReducer.login);
  if (!login) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [error, setError] = useState<string | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const subscription = socket.getErrorMessage().subscribe((errorMessage) => {
      setError(errorMessage);
      if (errorMessage) {
        setIsModalOpen(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useSocketSubscription("ERROR", ({ payload: { error } }) => {
    setErrorMsg(
      `${error.slice(0, 1).toUpperCase() + error.slice(1, error.length)}`
    );
    setModalOpen(true);
  });

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <NotificationProvider>
        {errorMsg ? (
          <Modal
            title={errorMsg}
            open={isErrorModalOpen}
            closable={false}
            footer={[
              <Button key="submit" type="primary" onClick={onClose}>
                Ok
              </Button>,
            ]}
          />
        ) : (
          ""
        )}
        {isModalOpen ? (
          <Modal
            title="Something goes wrong"
            open={isModalOpen}
            closable={false}
            footer={null}
          >
            <p>{error}</p>
          </Modal>
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ChatPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        )}
      </NotificationProvider>
    </>
  );
}

export default App;
