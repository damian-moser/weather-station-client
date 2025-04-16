<template>
  <Chart :data="data" :topic="topic" />
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import api from "../api";
import Chart from "./Chart.vue";
import type { Data } from "../models/data.model";
import { eventBus } from "../utils/event-bus";

const props = defineProps<{
  topic: string;
}>();

const data = ref<Data[]>([]);

function handleIncoming(newData: Data) {
  data.value.push(newData);
}

onMounted(async () => {
  data.value = await api.getAllByType(props.topic);
  eventBus.on(props.topic, handleIncoming);
});

onBeforeUnmount(() => {
  eventBus.off(props.topic, handleIncoming);
});
</script>
