<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

const option: EChartsOption = {
  title: {
    text: ''
  },
  legend: {
    data: ['优势占比'],
    left:'left',
  },
  radar: {
    // shape: 'circle',
    radius: '60%',
    indicator: [
      { name: '文化', max: 100 },
      { name: '宣传', max: 100 },
      { name: '科技', max: 100 },
      { name: '设施', max: 100 },
      { name: '宣讲', max: 100 }
    ],
    name: {
      textStyle: {
        color: 'black' 
      }
    },
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [85, 60, 42.02, 77.68, 89],
          name: '优势占比'
        }
      ],
    }
  ]
}as unknown as EChartsOption;

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value)
    myChart.setOption(option)
  }
})

onUnmounted(() => {
  if (myChart) {
    myChart.dispose()
    myChart = null
  }
})
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 100%;"></div>
</template>

<style scoped>
/* 可以在这里添加全局CSS样式 */
</style>
