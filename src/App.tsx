import "./App.css";
import { Route, Routes } from "react-router";
import { Layout } from "./app/layout/layout";
import { ChatPage } from "./features/chat/chat";
import { AboutPage } from "./features/about/about";
import { LoginPage } from "./features/login/login";
import { NotificationProvider } from "./app/context/notification.context";

function App() {
  return (
    <>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </NotificationProvider>
    </>
  );
}

export default App;
