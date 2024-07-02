<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

var myChart!: echarts.ECharts
var option: EChartsOption

interface DataItem {
  value: number
  groupId: string
}

onMounted(() => {
  var chartDom = document.getElementById('main')!
  myChart = echarts.init(chartDom)

  option = {
    grid:{
      top:'15%',
      bottom:'35%'
    },
    xAxis: {
      data: ['革命遗址', '革命人物故居', '烈士陵园', '革命纪念馆'],
      axisLabel: {
      rotate: 45, // 将标签旋转 45 度
      interval: 'auto', // 根据需要自动计算是否显示
      fontSize: 10 // 可以适当调小字号
    },
    },
    yAxis: {},
    dataGroupId: '',
    animationDurationUpdate: 500,
    series: {
      type: 'bar',
      id: 'spots',
      data: [
        {
          value: 10,
          groupId: '革命遗址'
        },
        {
          value: 8,
          groupId: '革命人物故居'
        },
        {
          value: 4,
          groupId: '烈士陵园'
        },
        {
          value: 9,
          groupId: '革命纪念馆'
        }
      ],
      universalTransition: {
        enabled: true,
        divideShape: 'clone'
      }
    }
  }
  const drilldownData = [
    {
      dataGroupId: '革命遗址',
      data: [
        ['昆明', 4],
        ['曲靖', 2],
        ['玉溪', 1],
        ['昭通', 1],
        ['保山', 1]
      ]
    },
    {
      dataGroupId: '革命人物故居',
      data: [
        ['昆明', 4],
        ['曲靖', 2],
        ['昭通', 1],
        ['保山', 1]
      ]
    },
    {
      dataGroupId: '烈士陵园',
      data: [
        ['昆明', 2],
        ['昭通', 2]
      ]
    },
    {
      dataGroupId: '革命纪念馆',
      data: [
        ['昆明', 3],
        ['曲靖', 2],
        ['玉溪', 1],
        ['昭通', 1],
        ['保山', 1],
        ['丽江', 1]
      ]
    }
  ]

  myChart.on('click', function (event) {
    if (event.data) {
      var subData = drilldownData.find(function (data) {
        return data.dataGroupId === (event.data as DataItem).groupId
      })
      if (!subData) {
        return
      }
      myChart.setOption<echarts.EChartsOption>({
        xAxis: {
          data: subData.data.map(function (item) {
            return item[0]
          })
        },
        series: {
          type: 'bar',
          id: 'spots',
          dataGroupId: subData.dataGroupId,
          data: subData.data.map(function (item) {
            return item[1]
          }),
          universalTransition: {
            enabled: true,
            divideShape: 'clone'
          }
        },
        graphic: [
          {
            type: 'text',
            left: 50,
            top: 20,
            style: {
              text: 'Back',
              fontSize: 18
            },
            onclick: function () {
              myChart.setOption<echarts.EChartsOption>(option)
            }
          }
        ]
      })
    }
  })

  option && myChart.setOption(option)
})
</script>

<template>

    <div id="main" style="width: 100%; height: 100%"></div>

</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
