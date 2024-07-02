<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | undefined

onMounted(() => {
  if (chartRef.value) {
    // 创建 ECharts 实例
    myChart = echarts.init(chartRef.value)

    // 用 `setOption` 配置您的图表
    myChart.setOption({
      series: [
        {
          type: 'wordCloud',
          shape: 'circle',
          keepAspect: false,
          maskImage: undefined, // 设置 maskImage
          left: 'center',
          top: 'center',
          width: '90%',
          height: '80%',
          right: null,
          bottom: null,
          sizeRange: [15, 30],
          rotationRange: [-90, 90],
          rotationStep: 45,
          gridSize: 8,
          drawOutOfBound: false,
          shrinkToFit: false,
          layoutAnimation: true,
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function () {
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') +
                ')'
              )
            }
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              textShadowBlur: 10,
              textShadowColor: '#333'
            }
          },
          data: [
            {
              name: '毛泽东',
              value: 300
            },
            {
              name: '周恩来',
              value: 200
            },
            {
              name: '朱德',
              value: 300
            },
            {
              name: '邓小平',
              value: 100
            },
            {
              name: '李大钊',
              value: 150
            },
            {
              name: '蒋介石',
              value: 100
            },
            {
              name: '卢汉',
              value: 300
            },
            {
              name: '贺龙',
              value: 100
            },
            {
              name: '彭德怀',
              value: 100
            },
            {
              name: '赵祚传',
              value: 200
            },
            {
              name: '聂耳',
              value: 300
            },
            {
              name: '陆军讲武堂',
              value: 300
            },
            {
              name: '扎西会议纪念馆',
              value: 300
            },
            {
              name: '皎平渡',
              value: 300
            },
            {
              name: '松山战役遗址',
              value: 100
            },
            {
              name: '红军长征柯渡纪念馆',
              value: 200
            }
          ]
          // 继续添加更多数据 ...
        }
      ]
    })
  }
})
</script>

<template>
    <div ref="chartRef" style="width: 100%; height: 100%"></div>
  
</template>

<style scoped>

</style>
