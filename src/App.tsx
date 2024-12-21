import "./App.css";

import { Route, Routes } from "react-router";
import { Layout } from "./app/layout/layout";
import { ChatPage } from "./features/chat/chat";
import { AboutPage } from "./features/about/about";
import { LoginPage } from "./features/login/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}

export default App;
