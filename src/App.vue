<template>
  <section>
    <DataChart v-for="topic of topics" :topic="topic" />
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useWebSocket } from "./services/WebSocketService";
import DataChart from "./components/DataChart.vue";
import api from "./api";

const { connect } = useWebSocket("ws://localhost:8080/mqtt");

const topics = ref<string[]>([]);

onMounted(async () => {
  topics.value = await api.getAllTopics();
  connect();
});
</script>
