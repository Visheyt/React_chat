import { WebSocketSubject } from "rxjs/webSocket";
import { Message, MsgType, UserLogin } from "./client.type";
import { Observable } from "rxjs";

export class SocketService {
  private socket: WebSocketSubject<Message<unknown>>;

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

  public onMessage<T>(): Observable<Message<T>> {
    return this.socket.asObservable() as Observable<Message<T>>;
  }
}

export const socket = new SocketService("http://localhost:4000");

function createMessage<T>(type: MsgType, payload: T) {
  return { id: "", type, payload };
}
