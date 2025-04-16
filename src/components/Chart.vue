<template>
  <VueApexCharts
    type="line"
    height="350"
    :options="chartOptions"
    :series="series"
  />
</template>

<script lang="ts" setup>
import VueApexCharts from "vue3-apexcharts";
import { ref } from "vue";

const series = ref([
  {
    name: "Temperatur",
    data: [21, 22, 20, 21, 22, 30, 25, 15, 10, 55, 23, 24, 26],
  },
]);

const chartOptions = ref({
  chart: {
    type: "line",
    height: 350,
  },
  title: {
    text: "Temperaturverlauf",
  },
  xaxis: {
    categories: ["12:00", "12:05", "12:10", "12:15", "12:20"],
  },
  stroke: {
    curve: "smooth",
  },
});
</script>
