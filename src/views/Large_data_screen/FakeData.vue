<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

// 创建响应式的图表选项对象
const option: EChartsOption = {
  title: {
    text: '',
    subtext: '云南各区域红色景点占比图',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '45%',
      center: ['55%', '50%'],
      data: [
        { value: 15, name: '昆明' },
        { value: 54, name: '昭通' },
        { value: 17, name: '曲靖' },
        { value: 4, name: '楚雄' },
        { value: 3, name: '大理' },
        { value: 10, name: '丽江' },
        { value: 24, name: '迪庆' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

onMounted(() => {
  // 确保 DOM 元素已经被渲染
  if (chartRef.value) {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(chartRef.value)

    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option)
  }
})

onUnmounted(() => {
  // 在组件卸载的时候销毁 echart 实例，释放内存
  if (myChart !== null) {
    myChart.dispose()
    myChart = null
  }
})
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<style scoped>
/* 你可以在这里添加一些样式，如果需要的话 */
</style>
