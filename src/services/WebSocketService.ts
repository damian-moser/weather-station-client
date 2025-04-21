import { eventBus } from "../utils/event-bus";
import type { Data } from "../models/data.model";

export const useWebSocket = (url: string) => {
  const connect = () => {
    const socket = new WebSocket(url);

    socket.onmessage = ({ data }) => {
      try {
        const parsed = JSON.parse(data) as Data;
        eventBus.emit(parsed.type, parsed);
      } catch (e) {
        console.error("parse error:", e);
      }
    };

    socket.onopen = () => console.log(`connected to ${url}`);
    socket.onerror = (err) => console.error(`WebSocket error:`, err);
    socket.onclose = () => console.log(`disconnected from ${url}`);
  };

  return {
    connect,
  };
};
