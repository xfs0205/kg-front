<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const mainChart = ref<HTMLElement | null>(null)

let myChart: echarts.ECharts | undefined
let option: EChartsOption

onMounted(() => {
  if (mainChart.value) {
    // 初始化图表
    myChart = echarts.init(mainChart.value)
    // 配置图表选项
    option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Step Start', 'Step Middle', 'Step End']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: ['1980', '1990', '2000', '2010', '2020', '2020-']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '革命遗址',
          type: 'line',
          step: 'start',
          data: [10, 32, 51, 66, 84, 92,]
        },
        {
          name: '革命人物故居',
          type: 'line',
          step: 'middle',
          data: [8, 15, 21, 37, 54, 68, 81]
        },
        {
          name: '烈士陵园',
          type: 'line',
          step: 'end',
          data: [4, 9, 15, 22, 34, 47, 56]
        },
        {
          name: '革命纪念馆',
          type: 'line',
          step: 'end',
          data: [5, 12, 18, 23, 33, 46, 51]
        }
      ]
    }

    // 应用图表选项
    myChart.setOption(option)
  }
})
</script>

<template>
  <div ref="mainChart" style="width: 100%; height: 100%"></div>
</template>


<style scoped>

</style>