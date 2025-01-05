import { notification } from "antd";

export type showNotificationProps = {
  message: string;
  description: string;
  showProgress?: boolean;
  pauseOnHover?: boolean;
};
export class NotificationService {
  private api;
  private contextHolder;

  constructor() {
    const [api, contextHolder] = notification.useNotification();

    this.api = api;
    this.contextHolder = contextHolder;
  }

  public getContext() {
    return this.contextHolder;
  }

  public showNotification({
    message,
    description,
    showProgress = true,
    pauseOnHover = false,
  }: showNotificationProps) {
    this.api.open({
      message,
      description,
      showProgress,
      pauseOnHover,
    });
  }
}

export const notificationService = new NotificationService();
