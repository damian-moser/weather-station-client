<template>
  <div class="container mt-4">
    <h1 class="text-primary">MQTT Live Dashboard</h1>
    <p>Empfängt MQTT-Daten in Echtzeit über WebSockets.</p>
    <ol class="list-group">
      <li v-for="(msg, index) in messages" :key="index" class="list-group-item">
        {{ msg }}
      </li>
    </ol>
    <section>
      <h2>API Section</h2>
      <Chart />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useWebSocket } from "./services/WebSocketService";
import api from "./api";
import Chart from "./components/Chart.vue";

const { messages, connect } = useWebSocket("ws://localhost:8080/mqtt");

onMounted(async () => {
  connect();
  await api.data.getAll()
});
</script>
