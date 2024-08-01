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
import marks from './pos.json'

const chart_init = ref(false)

const left_data = ref({
  width: "0px",
  info: []
})

const right_data = ref({
  width: "0px",
  info: ''
})

function getLineMarks(name: string) {
  for (const item of marks) {
    if (item.city == name) {
      const cityMarks = []
      for (const load of item.loads) {
        const lineMarks = load.info.map(info => info.coord);
        cityMarks.push({
          city: name,
          name: load.name,
          coords: lineMarks
        })
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
        for (const l of load.info) {
          cityMarks.push({
            name: l.name,
            value: l.coord
          })
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

  if (!chart_init.value) {
    chart = echarts.init(document.getElementById('mapContainer'));
    chart_init.value = true
  }


  // 设置地图的配置项和数据
  const option = {
    geo: [{
      map: Data_map.value.name,
      roam: true,
      z: 3,
      zoom: 1.2,
      aspectScale: 1.2,
      itemStyle: {
        borderColor: '#ff5500',
        areaColor: '#ddd'
      },
      emphasis: {
        itemStyle: {
          color: 'rgb(0, 251, 255)'
        }
      },
      label: {
        show: true,
        formatter: function (param: { name: any }) {
          return param.name;
        },
        opacity: 0.4,
      },
    }],
    series: [
      {
        geoIndex: 0,
        coordinateSystem: 'geo',
        type: 'lines',
        polyline: true,
        data: Data_map.value.linemarks,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(255, 255, 0, 0.8)' // 渐变色起始颜色
          }, {
            offset: 1,
            color: 'rgba(255, 0, 0, 0.8)' // 渐变色结束颜色
          }]),
          width: 4,
          opacity: 0.5,
          curveness: 0.8, // 增加线条的平滑度
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowOffsetX: 5,
          shadowOffsetY: 5
        },
        emphasis: {
          lineStyle: {
            width: 6,
            color: 'rgba(255, 255, 0, 1)',
          }
        },
        effect: {
          show: true,
          symbol: 'circle',
          symbolSize: 10,
          rippleEffect: {
            period: 7, // 动画时间
            scale: 4, // 波纹的缩放比例
            brushType: 'fill' // 波纹的绘制方式
          }
        },
      },
      {
        geoIndex: 0,
        coordinateSystem: 'geo',
        type: 'scatter',
        symbol: 'pin',
        symbolSize: 30,
        data: Data_map.value.pointmarks,
        label: {
          formatter: '{b}',
          position: 'right',
          show: true,
          fontSize: 8,
        }
      },
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

  chart.on('dblclick', (params: any) => {
    if (params.componentType === 'geo') {
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
      option.geo[0].map = Data_map.value.name
      option.series[0].data = Data_map.value.linemarks
      option.series[1].data = Data_map.value.pointmarks as never
      chart.setOption(option, true)
    }
  })

  chart.on('click', (params: any) => {
    if (params.componentType === 'series' && params.componentSubType === 'lines') {
      left_data.value.info = []
      left_data.value.width = "300px"
      const data = params.data
      for (const i of marks) {
        if (data.city == i.city) {
          for (const load of i.loads) {
            if (data.name == load.name) {
              load.info.map((n: any) => {
                left_data.value.info.push(n.name as never)
              })
            }
          }
          break
        }
      }
    }
    else if (params.componentType === 'series' && params.componentSubType === 'scatter') {
      const data = params.data
      if (right_data.value.width == '0px') {
        right_data.value.width = '300px'
      }
      right_data.value.info = data.name
    }
  })
  // 使用地图数据和配置项渲染地图
  chart.setOption(option)
}

function Back() {
  left_data.value.info = []
  left_data.value.width = '0px'
  right_data.value.info = ''
  right_data.value.width = '0px'
  Data_map.value.grade = 0
  Data_map.value.name = 'YUNNAN';
  (Data_map.value.pointmarks = []), (Data_map.value.linemarks = []), (Data_map.value.Data = mapData)
  CreateMap()
}

function cli1(key: any) {
  const s = left_data.value.info[key]
  if (right_data.value.width == '0px') {
    right_data.value.width = '300px'
  }
  right_data.value.info = s
}

onMounted(() => {

  CreateMap()
})
</script>

<template>
  <div id="mapContainer" style="width: 100%; height: 100%"></div>
  <el-aside class="left" :width="left_data.width">
    <el-scrollbar>
      <div class="info" v-for="(item, index) in left_data.info" :key="index" @click="cli1(index)">
        <span>{{ item }}</span>
      </div>
    </el-scrollbar>
  </el-aside>
  <el-aside class="right" :width="right_data.width">
    <div class="content">
      <span>{{ right_data.info }}</span>
    </div>

  </el-aside>
  <el-button type="primary" style="z-index: 10; position: absolute; top: 20%; left: 67%" v-if="Data_map.grade > 0"
    @click="Back()">
    返回<el-icon class="el-icon--right">
      <IEpBack />
    </el-icon>
  </el-button>
</template>

<style scoped>
.left {
  position: absolute;
  top: 75px;
  left: 0px;
  z-index: 10;
  height: calc(100vh - 75px);
  background-color: rgb(35, 159, 194);
  transition: width 1s ease;

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 55px;
    background-color: rgba(83, 125, 240, 0.7);
    color: aliceblue;
    margin-top: 20px;
    margin-left: 5%;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
  }

  .info:hover {
    background-color: antiquewhite;
    color: black;
  }

}

.right {
  position: absolute;
  top: 75px;
  right: 0px;
  z-index: 10;
  height: calc(100vh - 75px);
  background-color: rgb(35, 159, 194);
  transition: width 1s ease;

  .content {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    max-width: 300px;
    background-color: azure;
  }
}
</style>
