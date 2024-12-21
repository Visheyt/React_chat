import { useEffect } from "react";
import { socket } from "../services/ws.service";
import { MsgType, Message, SendMsgType } from "../services/ws.types";

export const useSocketSubscription = <T extends MsgType | SendMsgType>(
  messageType: T,
  onMessage: (message: Message<T, "response">) => void
) => {
  useEffect(() => {
    const subscription = socket.onMessage().subscribe((msg) => {
      if (msg.type === messageType) {
        onMessage(msg as Message<T, "response">);
      }
    });

    return () => subscription.unsubscribe();
  }, [messageType, onMessage]);
};
