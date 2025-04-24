<template>
  <h1>Weather Station Dashboard</h1>
  <p>Weather station station located in Düdingen 3186, Switzerland</p>
  <section>
    <div v-for="(topic, i) of topics" :key="topic" class="chart">
      <DataChart :topic="topic" :color="colors[i]" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useWebSocket } from "./services/WebSocketService";
import DataChart from "./components/DataChart.vue";
import api from "./api";

const { connect } = useWebSocket("ws://localhost:8080/mqtt");

const topics = ref<string[]>([]);
const colors = ["#FF6B6B", "#4D96FF", "#FFA500"];

onMounted(async () => {
  topics.value = await api.getAllTopics();
  connect();
});
</script>
<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 2rem;
  background-color: #f0f0f0;
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  text-align: center;
  font-weight: 1000;
}

p {
  text-align: center;
}

section {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.chart {
  background-color: #fff;
  border-radius: 1rem;
  flex: 1;
}
</style>
