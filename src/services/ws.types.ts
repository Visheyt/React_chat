export type ToggleUser = {
  user: {
    login: string;
    password: string;
  };
};

export type ToggleUserResponse = {
  user: {
    login: string;
    isLogined: boolean;
  };
};

export type User = { login: string; isLogined: boolean };

export type UsersResponse = {
  users: User[];
};

export type MsgSend = {
  message: {
    to: string;
    text: string;
  };
};

export type MsgSendAnswer = {
  message: ChatMessage;
};

export type ChatMessage = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
};

export type FetchMessageHistory = {
  user: {
    login: string;
  };
};

export type MsgDeliver = {
  message: {
    id: string;
    status: {
      isDelivered: boolean;
    };
  };
};

export type MsgRead = {
  message: {
    id: string;
  };
};

export type MsgReadAnswer = {
  message: {
    id: string;
    status: {
      isReaded: boolean;
    };
  };
};

export type MsgDelete = { message: { id: string } };

export type MsgDeleteAnswer = {
  message: {
    id: string;
    status: {
      isDeleted: boolean;
    };
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
  USER_LOGIN: ToggleUser;
  USER_LOGOUT: ToggleUser;
  USER_ACTIVE: null;
  USER_INACTIVE: null;
  MSG_SEND: MsgSend;
  MSG_FROM_USER: FetchMessageHistory;
  MSG_READ: MsgRead;
  MSG_DELETE: MsgDelete;
  MSG_EDIT: { messageId: string; newContent: string };
};

export type MsgAnswerPayloads = {
  USER_LOGIN: ToggleUserResponse;
  USER_LOGOUT: ToggleUserResponse;
  USER_ACTIVE: UsersResponse;
  USER_INACTIVE: UsersResponse;
  USER_EXTERNAL_LOGIN: ToggleUserResponse;
  USER_EXTERNAL_LOGOUT: ToggleUserResponse;
  MSG_SEND: MsgSendAnswer;
  MSG_FROM_USER: { messages: ChatMessage[] };
  MSG_DELIVER: MsgDeliver;
  MSG_READ: MsgReadAnswer;
  MSG_DELETE: MsgDeleteAnswer;
  MSG_EDIT: { messageId: string; newContent: string };
  ERROR: { error: string };
};

export interface Message<U extends "send" | "response"> {
  id: string | null;
  type: U extends "send" ? SendMsgType : MsgType; // Тип зависит от "send" или "response"
  payload: U extends "send"
    ? MsgPayloads[SendMsgType] // Для "send" используем MsgPayloads с типом T
    : MsgAnswerPayloads[MsgType]; // Для "response" используем MsgResponsePayloads с типом T
}
