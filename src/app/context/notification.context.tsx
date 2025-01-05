import { notification } from "antd";

import {
  ShowNotificationProps,
  NotificationContext,
} from "./notification.types";

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = ({
    message,
    description,
    showProgress = true,
    pauseOnHover = false,
  }: ShowNotificationProps) => {
    api.open({
      message,
      description,
      showProgress,
      pauseOnHover,
    });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
