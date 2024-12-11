export interface Message<T> {
  id: string | null;
  type: MsgType;
  payload: T;
}

export type MsgType =
  | "USER_LOGIN"
  | "ERROR"
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
  | "MSG_EDIT";

export type UserLogin = {
  user: {
    login: string;
    password: string;
  };
};

export type UserLoginResponse = {
  user: {
    login: string;
    isLogin: boolean;
  };
};
