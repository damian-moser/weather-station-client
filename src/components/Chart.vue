<template>
  <VueApexCharts :options="chartOptions" :series="series" />
</template>

<script lang="ts" setup>
import VueApexCharts from "vue3-apexcharts";
import { ref, watch } from "vue";
import type { Data } from "../models/data.model";

const props = defineProps<{
  data: Data[];
  topic: string;
}>();

const series = ref([
  {
    name: "value",
    data: props.data.map((data) => data.value),
  },
]);

const chartOptions = ref({
  chart: {
    type: "area",
    height: 350,
  },
  markers: {
    size: 0,
  },
  title: {
    text: props.topic,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: props.data.map((data) => data.timestamp),
    type: "datetime",
  },
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
