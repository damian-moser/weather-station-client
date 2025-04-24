<template>
  <div>
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"
        />
      </svg>
    </span>
    <VueApexCharts :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import VueApexCharts from "vue3-apexcharts";
import { ref, watch } from "vue";
import type { Data } from "../models/data.model";

const props = defineProps<{
  data: Data[];
  topic: string;
  color: string;
}>();

const series = ref([
  {
    name: "value",
    data: props.data.map((data) => data.value),
  },
]);

const getTopicName = (topic: string) => {
  const index = topic.lastIndexOf("/");
  const name = topic.substring(index + 1);
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const chartOptions = ref({
  chart: {
    type: "area",
    height: 320,
    zoom: {
      enabled: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  markers: {
    size: 0,
  },
  title: {
    text: getTopicName(props.topic),
    offsetX: 20,
    offsetY: 20,
    style: {
      fontSize: "24px",
      cssClass: "maybe-class-here",
    },
  },
  subtitle: {
    text: props.topic,
    offsetX: 20,
    offsetY: 50,
    style: {
      fontSize: "14px",
      cssClass: "maybe-class-here",
    },
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: props.data.map((data) => data.timestamp),
    type: "datetime",
  },
  colors: [props.color],
});

watch(
  () => props.data,
  () => {
    series.value[0].data = props.data.map((data) => data.value);

    chartOptions.value = {
      ...chartOptions.value,
      xaxis: {
        categories: props.data.map((data) => data.timestamp),
        type: "datetime",
      },
    };
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style scoped>
div {
  position: relative;
}

span {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  width: 36px;
  height: 36px;
  border-radius: 999px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  z-index: 10;

  background-color: #eee;
  transition: background-color 0.25s ease;
}

span:hover {
  background-color: #ddd;
}

span:active {
  outline: 2px black solid;
}

span svg {
  width: 12px;
  height: 12px;
  fill: #000;
}
</style>
