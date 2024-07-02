<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | undefined

const data: number[] = []
let sum: number = 0; // 用于存储随机生成的数据之和
for (let i = 0; i < 6; ++i) {
  const randomValue = Math.round(Math.random() * 200);
  data.push(randomValue);
  sum += randomValue;
}

const option: EChartsOption = {
  grid:{
    left:'20%',
    right:'15%',
    top:'25%',
    bottom:'15%'
  },
  xAxis: {
    max: 'dataMax',
  },
  yAxis: {
    type: 'category',
    data: ['长征', '毛泽东', '皎平渡', '朱德', '陆军讲武堂','昆明'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 5,
    axisLabel:{
      fontSize:10
    }
  },
  series: [
    {
      realtimeSort: true,
      name: '搜索热度词',
      type: 'bar',
      data: data,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true,
        formatter: function (params: any) {
          const value = params.value; // 柱子的原始值
          const percentage = ((value / sum) * 100).toFixed(2) + '%'; // 计算百分比
          return percentage;
        }
      }
    }
  ],
  legend: {
    show: true,
    
  },
  animationDuration: 0,
  animationDurationUpdate: 5000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
}

function run() {
  for (let i = 0; i < data.length; ++i) {
    const randomValue = Math.random() > 0.9 ? Math.round(Math.random() * 2000) : Math.round(Math.random() * 200);
    data[i] += randomValue;
    sum += randomValue - (randomValue > 200 ? 200 : 0);
  }
  myChart?.setOption({
    series: [
      {
        type: 'bar',
        data: data
      }
    ]
  })
}
  myChart?.setOption({
    series: [
      {
        type: 'bar',
        data: data
      }
    ]
  })

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value)
    myChart.setOption(option)
    run() // 立即运行一次来填充初始数据
    setInterval(run, 3000)
  }
})
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 100%" ></div>
</template>

<style scoped>
/* 确保图表填充父容器 */
div {
  width: 100%;
  height: 100%;
}
</style>
