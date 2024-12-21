export type UserLogin = {
  user: {
    login: string;
    password: string;
  };
};

export type UserLoginResponse = {
  user: {
    login: string;
    isLogined: boolean;
  };
};

export type SendMsgType = Exclude<
  MsgType,
  "USER_EXTERNAL_LOGIN" | "USER_EXTERNAL_LOGOUT" | "MSG_DELIVER" | "ERROR"
>;

export type MsgType =
  | "USER_LOGIN"
  | "USER_LOGOUT"
  | "USER_EXTERNAL_LOGIN"
  | "USER_EXTERNAL_LOGOUT"
  | "USER_ACTIVE"
  | "USER_INACTIVE"
  | "MSG_SEND"
  | "MSG_FROM_USER"
  | "MSG_DELIVER"
  | "MSG_READ"
  | "MSG_DELETE"
  | "MSG_EDIT"
  | "ERROR";

export type MsgPayloads = {
  USER_LOGIN: UserLogin;
  USER_LOGOUT: { user: string };
  USER_EXTERNAL_LOGIN: { user: string; provider: string };
  USER_EXTERNAL_LOGOUT: { user: string };
  USER_ACTIVE: { user: string };
  USER_INACTIVE: { user: string };
  MSG_SEND: { content: string };
  MSG_FROM_USER: { content: string };
  MSG_DELIVER: { messageId: string };
  MSG_READ: { messageId: string };
  MSG_DELETE: { messageId: string };
  MSG_EDIT: { messageId: string; newContent: string };
  ERROR: { messageId: string; newContent: string };
};

export type MsgResponsePayloads = {
  USER_LOGIN: UserLoginResponse;
};

export interface Message<
  T extends MsgType | SendMsgType,
  U extends "send" | "response" = "send"
> {
  id: string | null;
  type: U extends "send" ? SendMsgType : MsgType; // Тип зависит от "send" или "response"
  payload: U extends "send"
    ? MsgPayloads[T] // Для "send" используем MsgPayloads с типом T
    : MsgResponsePayloads[T]; // Для "response" используем MsgResponsePayloads с типом T
}
