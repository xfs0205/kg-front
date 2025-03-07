<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { mapData } from '@/assets/Map_data/MapData_yun'
import { KunMing } from '@/assets/Map_data/kunming'
import { YvXi } from '@/assets/Map_data/yvxi'
import { ChuXiong } from '@/assets/Map_data/chuxiong'
import { ZhaoTong } from '@/assets/Map_data/zhaotong'
import { QvJing } from '@/assets/Map_data/qvjing'
import { HongHe } from '@/assets/Map_data/honghe'
import { WenShan } from '@/assets/Map_data/wenshan'
import { PuEr } from '@/assets/Map_data/puer'
import { XiShuang } from '@/assets/Map_data/xishuangbanna'
import { LinCang } from '@/assets/Map_data/lincang'
import { DaLi } from '@/assets/Map_data/dali'
import { LiJiang } from '@/assets/Map_data/lijiang'
import { DiQing } from '@/assets/Map_data/diqing'
import { NuJiang } from '@/assets/Map_data/nujiang'
import { BaoShan } from '@/assets/Map_data/baoshan'
import { DeHong } from '@/assets/Map_data/dehong'
import marks from '@/assets/pos.json'

const chart_init = ref(false)

function getLineMarks(name: string) {
  for (const item of marks) {
    if (item.city == name) {
      const cityMarks = []
      for (const load of item.loads) {
        cityMarks.push(load.info)
      }   
      return cityMarks
    }
  }
}


function getMarks(name: string) {
  for (const item of marks) {
    if (item.city == name) {
      const cityMarks = []
      for (const load of item.loads) {
        for (const l of load.info){
          cityMarks.push(l)
        }
      }   
      return cityMarks
    }
  }
}


const Data_map = ref({
  Data: mapData,
  name: 'YUNNAN',
  pointmarks: [],
  linemarks: [],
  grade: 0
})

let chart: echarts.ECharts

// 渲染地图
function CreateMap() {
  // 注册地图数据
  echarts.registerMap(Data_map.value.name, Data_map.value.Data as any)

  if (!chart_init.value){
    chart = echarts.init(document.getElementById('mapContainer'));
    chart_init.value = true
  }
  

  // 设置地图的配置项和数据
  const option = {
    series: [
      {
        zoom: 1.2,
        aspectScale: 1,
        type: 'map', // 类型必须为 'map'
        map: Data_map.value.name,
        roam: true,
        // 在以下属性中设置其他地图样式和行为
        itemStyle: {
          borderColor: '#ff5500',
          areaColor: '#ddd'
        },
        emphasis: {
          itemStyle: {
            color: '#ff5500'
          }
        },
        label: {
          show: false, // 显示省份标签
          formatter: '{b}' // 标签内容格式器，{b} 表示地区名称
        },
        // 标注的配置项
        markPoint: {
          symbol: 'pin', // 标注形状
          symbolSize: 30, // 标注大小
          label: {
            show: false,
            formatter: '{b}',
          },
          emphasis: {
            label: {
              show: true,
              formatter: function (param: { name: any }) {
                return param.name;
              },
              color: 'black'
            }
          },
          data: Data_map.value.pointmarks
        },
        // 飞线的配置项
        markLine: {
          symbol: ['none', 'none'], // 起点和终点的标记类型，这里表示起点无标记，终点有箭头
          // smooth: true, // 是否平滑曲线显示
          effect: {
            show: true, // 是否显示动画效果
            scaleSize: 3, // 动画大小
            period: 30, // 动画周期
            color: 'rgb(8, 138, 138)', // 动画颜色
            shadowColor: '#f4e925' // 动画阴影颜色
          },
          lineStyle: {
            color: '#f4e925', // 线的颜色
            width: 4, // 线的宽度
            curveness: 0.5, // 线的曲直度，0表示直线，0.5表示曲度较大
            opacity: 0.8 // 线的透明度
          },
          data: Data_map.value.linemarks
        }
      }
    ],
    title: {
      //text: '云南地图',
      left: 'center',
      textStyle: {
        color: '#000',
        fontSize: 18
      }
    }
  }

  chart.on('dblclick', (params: { componentType: string; name: any }) => {
    if (params.componentType === 'series') {
      const cityName = params.name

      if (cityName === '昆明市') {
        Data_map.value.Data = KunMing
        Data_map.value.name = 'KUNMING'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '楚雄彝族自治州') {
        Data_map.value.Data = ChuXiong
        Data_map.value.name = 'CHUXIONG'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '昭通市') {
        Data_map.value.Data = ZhaoTong
        Data_map.value.name = 'ZHAOTONG'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '曲靖市') {
        Data_map.value.Data = QvJing
        Data_map.value.name = 'QUJING'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '文山壮族苗族自治州') {
        Data_map.value.Data = WenShan
        Data_map.value.name = 'WENSHAN'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '红河哈尼族彝族自治州') {
        Data_map.value.Data = HongHe
        Data_map.value.name = 'HONGHE'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '玉溪市') {
        Data_map.value.Data = YvXi
        Data_map.value.name = 'YUXI'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '普洱市') {
        Data_map.value.Data = PuEr
        Data_map.value.name = 'PUER'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '西双版纳傣族自治州') {
        Data_map.value.Data = XiShuang
        Data_map.value.name = 'XISHUANG'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '临沧市') {
        Data_map.value.Data = LinCang
        Data_map.value.name = 'LINCANG'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '大理白族自治州') {
        Data_map.value.Data = DaLi
        Data_map.value.name = 'DALI'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '丽江市') {
        Data_map.value.Data = LiJiang as any
        Data_map.value.name = 'LIJIANG'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '保山市') {
        Data_map.value.Data = BaoShan
        Data_map.value.name = 'BAODING'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '德宏傣族景颇族自治州') {
        Data_map.value.Data = DeHong
        Data_map.value.name = 'HONGDE'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '怒江傈僳族自治州') {
        Data_map.value.Data = NuJiang
        Data_map.value.name = 'NUJIANG'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      } else if (cityName === '迪庆藏族自治州') {
        Data_map.value.Data = DiQing
        Data_map.value.name = 'DIQING'
        Data_map.value.pointmarks = getMarks(cityName) as never[]
        Data_map.value.linemarks = getLineMarks(cityName) as never[]
        Data_map.value.grade = 1
      }

      //更新地图
      echarts.registerMap(Data_map.value.name, Data_map.value.Data as any)
      option.series[0].map = Data_map.value.name
      option.series[0].markPoint.data = Data_map.value.pointmarks as never
      option.series[0].markLine.data = Data_map.value.linemarks as never
      chart.setOption(option, true)
    }
  })
  // 使用地图数据和配置项渲染地图
  chart.setOption(option)
}

function Back() {
  Data_map.value.grade = 0
  Data_map.value.name = 'YUNNAN';
  (Data_map.value.pointmarks = []),(Data_map.value.linemarks = []), (Data_map.value.Data = mapData)
  CreateMap()
}

onMounted(() => {
  
  CreateMap()
})
</script>

<template>
  <div id="mapContainer" style="width: 100%; height: 80%"></div>
  <el-button type="primary" style="z-index: 10; position: absolute; top: 25%; left: 67%" v-if="Data_map.grade > 0"
    @click="Back()">
    返回<el-icon class="el-icon--right">
      <IEpBack />
    </el-icon>
  </el-button>
</template>

<style scoped>
.kkk{
  background-color: rgb(8, 138, 138);
  height: calc(100);
}

</style>
