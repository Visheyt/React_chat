import { createContext } from "react";

export type ShowNotificationProps = {
  message: string;
  description: string;
  showProgress?: boolean;
  pauseOnHover?: boolean;
};

export type NotificationContextType = {
  showNotification: (props: ShowNotificationProps) => void;
};

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
