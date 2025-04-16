import { ref } from "vue";

const messages = ref([]);

let socket;

export function useWebSocket(url: string) {
  function connect() {
    socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("✅ WebSocket verbunden!");
    };

    socket.onmessage = (event: any) => {
      console.log("📡 Neue MQTT-Nachricht:", event.data);
      messages.value.unshift(event.data);
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket Fehler:", error);
    };

    socket.onclose = () => {
      console.log("⚠️ WebSocket Verbindung geschlossen.");
    };
  }

  return {
    messages,
    connect,
  };
}
