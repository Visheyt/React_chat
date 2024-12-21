import { WebSocketSubject } from "rxjs/webSocket";
import { Message, MsgType, SendMsgType, UserLogin } from "./ws.types";
import { Observable } from "rxjs";

export class SocketService {
  private socket: WebSocketSubject<Message<MsgType | SendMsgType, "response">>;

  constructor(url: string) {
    this.socket = new WebSocketSubject(url);
    this.socket.subscribe({
      next: (msg) => {
        if (msg.type === "ERROR") {
          console.error(msg.payload);
        }
      },
    });
  }

  public login(login: string, password: string) {
    const message = createMessage<UserLogin>("USER_LOGIN", {
      user: { login, password },
    });

    this.socket.next(message);
  }

  public onMessage<T extends MsgType | SendMsgType>() {
    return this.socket.asObservable() as unknown as Observable<
      Message<T, "response">
    >;
  }
}

export const socket = new SocketService("http://localhost:4000");

function createMessage<T>(type: MsgType, payload: T) {
  return { id: "", type, payload };
}
