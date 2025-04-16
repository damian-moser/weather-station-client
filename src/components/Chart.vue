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
import { ref, watch } from "vue";
import type { Data } from "../data";
import util from "../util";

const props = defineProps<{
  data: Data[];
}>();

const series = ref([
  {
    name: "Wert",
    data: props.data.map((data) => data.value),
  },
]);

const chartOptions = ref({
  chart: {
    type: "line",
    height: 350,
  },
  title: {
    text: `Werte angezeigt in ${props.data[0] && props.data[0].unit}`,
  },
  xaxis: {
    categories: props.data.map((data) => util.getTime(data.timestamp)),
  },
  stroke: {
    curve: "smooth",
  },
});

watch(
  () => props.data,
  () => {
    series.value[0].data = props.data.map((data) => data.value);

    chartOptions.value = {
      ...chartOptions.value,
      xaxis: {
        categories: props.data.map((data) => util.getTime(data.timestamp)),
      },
      title: {
        text: `Werte angezeigt in ${props.data[0] && props.data[0].unit}`,
      },
    };
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
