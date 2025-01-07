import { WebSocketSubject } from "rxjs/webSocket";

import { BehaviorSubject, Observable } from "rxjs";

import {
  FetchMessageHistory,
  Message,
  MsgDelete,
  MsgEdit,
  MsgRead,
  MsgSend,
  MsgType,
  ToggleUser,
  ToggleUserFunc,
} from "./ws.types";

function createMessage<T>(type: MsgType, payload: T) {
  return { id: "", type, payload };
}

export class SocketService {
  private socket: WebSocketSubject<Message<"response" | "send">>;

  private errorSubject = new BehaviorSubject<string | null>(null);

  constructor(url: string) {
    this.socket = new WebSocketSubject(url);
    this.socket.subscribe({
      next: (msg) => {
        this.errorSubject.next(null);
        if (msg.type === "ERROR") {
          console.log(msg.payload);
        }
      },
      error: () => {
        this.errorSubject.next(
          "Websocket server doesn`t work please open it and reload page"
        );
      },
    });
  }

  public toggleUser({ login, password, isLogin = false }: ToggleUserFunc) {
    const message = createMessage<ToggleUser>(
      isLogin ? "USER_LOGIN" : "USER_LOGOUT",
      {
        user: { login, password },
      }
    );

    this.socket.next(message);
  }

  public getUsers(isActive: boolean) {
    const message = createMessage<null>(
      isActive ? "USER_ACTIVE" : "USER_INACTIVE",
      null
    );

    this.socket.next(message);
  }

  public sendMessage(to: string, text: string) {
    const message = createMessage<MsgSend>("MSG_SEND", {
      message: {
        to,
        text,
      },
    });

    this.socket.next(message);
  }

  public fetchMessageHistory(login: string) {
    const message = createMessage<FetchMessageHistory>("MSG_FROM_USER", {
      user: {
        login,
      },
    });

    this.socket.next(message);
  }

  public deleteMessage(id: string) {
    const message = createMessage<MsgDelete>("MSG_DELETE", {
      message: {
        id,
      },
    });

    this.socket.next(message);
  }

  public readMessage(id: string) {
    const message = createMessage<MsgRead>("MSG_READ", {
      message: {
        id,
      },
    });

    this.socket.next(message);
  }

  public editMessage(id: string, text: string) {
    const message = createMessage<MsgEdit>("MSG_EDIT", {
      message: {
        id,
        text,
      },
    });

    this.socket.next(message);
  }

  public getErrorMessage() {
    return this.errorSubject.asObservable();
  }

  public onMessage() {
    return this.socket.asObservable() as unknown as Observable<
      Message<"response">
    >;
  }
}

export const socket = new SocketService("http://localhost:4000");
