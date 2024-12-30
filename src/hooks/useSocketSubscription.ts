import { useEffect } from "react";
import { socket } from "../services/ws.service";
import { MsgType, MsgAnswerPayloads } from "../services/ws.types";

export const useSocketSubscription = <T extends keyof MsgAnswerPayloads>(
  messageType: T,
  onMessage: (message: { payload: MsgAnswerPayloads[T] }) => void
) => {
  useEffect(() => {
    const subscription = socket
      .onMessage()
      .subscribe(
        (msg: {
          type: MsgType;
          payload: MsgAnswerPayloads[keyof MsgAnswerPayloads];
        }) => {
          if (msg.type === messageType) {
            onMessage({
              payload: msg.payload as MsgAnswerPayloads[T],
            });
          }
        }
      );

    return () => subscription.unsubscribe();
  }, [messageType, onMessage]);
};
