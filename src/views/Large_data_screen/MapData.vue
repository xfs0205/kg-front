<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { mapData } from '../../assets/Map_data/MapData_yun'
import { KunMing } from '../../assets/Map_data/kunming'
import { YvXi } from '../../assets/Map_data/yvxi'
import { ChuXiong } from '../../assets/Map_data/chuxiong'
import { ZhaoTong } from '../../assets/Map_data/zhaotong'
import { QvJing } from '../../assets/Map_data/qvjing'
import { HongHe } from '../../assets/Map_data/honghe'
import { WenShan } from '../../assets/Map_data/wenshan'
import { PuEr } from '../../assets/Map_data/puer'
import { XiShuang } from '../../assets/Map_data/xishuangbanna'
import { LinCang } from '../../assets/Map_data/lincang'
import { DaLi } from '../../assets/Map_data/dali'
import { LiJiang } from '../../assets/Map_data/lijiang'
import { DiQing } from '../../assets/Map_data/diqing'
import { NuJiang } from '../../assets/Map_data/nujiang'
import { BaoShan } from '../../assets/Map_data/baoshan'
import { DeHong } from '../../assets/Map_data/dehong'

const marks = ref({
  昆明市: [
    { name: '特定位置1', coord: [102.7, 25.04], value: 50 },
    { name: '特定位置3', coord: [102.4, 25.04] }
  ],
  大理白族自治州: [{ name: '特定位置2', coord: [100.45, 25.04] }],
  楚雄彝族自治州: [],
  昭通市: [],
  曲靖市: [],
  文山壮族苗族自治州: [],
  红河哈尼族彝族自治州: [],
  玉溪市: [],
  普洱市: [],
  西双版纳傣族自治州: [],
  临沧市: [],
  丽江市: [],
  德宏傣族景颇族自治州: [],
  怒江傈僳族自治州: [],
  迪庆藏族自治州: [],
  保山市: []
})

const YunNan_data = ref([])
const YunNan_data_name = ref([])
for (const key in marks.value) {
  YunNan_data_name.value.push(key as never)
}
for (const i in YunNan_data_name.value) {
  for (const j in marks.value[YunNan_data_name.value[i]] as any)
    YunNan_data.value.push(marks.value[YunNan_data_name.value[i]][j] as never)
}

const Data_map = ref({
  Data: mapData,
  name: 'YUNNAN',
  marks: YunNan_data.value,
  grade: 0
})
console.log(Data_map.value.marks)
// 渲染地图
function CreateMap() {
  // 注册地图数据
  echarts.registerMap(Data_map.value.name, Data_map.value.Data as any)

  const chart = echarts.init(document.getElementById('mapContainer'))

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
          normal: {
            borderColor: 'black', // 边界线颜色
            areaColor: '#ddd' // 默认地区颜色
          },
          emphasis: {
            areaColor: '#ffdead' // 鼠标悬停高亮颜色
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
            normal: {
              show: false,
              position: 'right',
              formatter: function (param: { name: any }) {
                return param.name // 显示标注名称
              }
            },
            emphasis: {
              show: true,
              formatter: function (param: { name: any }) {
                return param.name // 显示标注名称
              },
              textStyle: {
                color: 'black' // 高亮时字体颜色
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#66b1ff' // 标注点颜色
            }
          },
          data: YunNan_data.value
          // data: [
          //   { value: '分类一', name: '标记点一',coord: [102.7, 25.04] },
          //   { value: '分类二', name: '标记点二',coord: [102.4, 25.04] },
          //   { value: '分类三', name: '标记点三', coord: [100.45, 25.04] }
          // ]
        }
      }
    ],
    visualMap: {
      show: true, // 隐藏视觉映射组件自身的显示
      dimension: 0, // 假设标注数据只有一个维度
      inRange: {
        color: ['red', 'blue', 'green'] // 设置颜色范围，对应分类一、二、三
      },
      outOfRange: {
        color: '#ccc' // 设置超出范围的标注颜色
      },
      seriesIndex: 0, // 控制哪个系列的标注受视觉映射控制，这里假设只有一个系列
      type: 'piecewise', // 设置为分段型视觉映射
      pieces: [
        { value: '分类一', label: '分类一' },
        { value: '分类二', label: '分类二' },
        { value: '分类三', label: '分类三' }
      ]
    },
    legend: {
      orient: 'vertical', // 图例的布局方式，垂直

      data: ['分类一', '分类二', '分类三'] // 图例的数据，需要根据实际情况填写
    },
    title: {
      //text: '云南地图',
      left: 'center',
      textStyle: {
        color: '#000',
        fontSize: 18
      }
    }
  }

  chart.on('dblclick', (params) => {
    if (params.componentType === 'series') {
      const cityName = params.name

      if (cityName === '昆明市') {
        Data_map.value.Data = KunMing
        Data_map.value.name = 'KUNMING'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '楚雄彝族自治州') {
        Data_map.value.Data = ChuXiong
        Data_map.value.name = 'CHUXIONG'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '昭通市') {
        Data_map.value.Data = ZhaoTong
        Data_map.value.name = 'ZHAOTONG'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '曲靖市') {
        Data_map.value.Data = QvJing
        Data_map.value.name = 'QUJING'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '文山壮族苗族自治州') {
        Data_map.value.Data = WenShan
        Data_map.value.name = 'WENSHAN'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '红河哈尼族彝族自治州') {
        Data_map.value.Data = HongHe
        Data_map.value.name = 'HONGHE'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '玉溪市') {
        Data_map.value.Data = YvXi
        Data_map.value.name = 'YUXI'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '普洱市') {
        Data_map.value.Data = PuEr
        Data_map.value.name = 'PUER'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '西双版纳傣族自治州') {
        Data_map.value.Data = XiShuang
        Data_map.value.name = 'XISHUANG'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '临沧市') {
        Data_map.value.Data = LinCang
        Data_map.value.name = 'LINCANG'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '大理白族自治州') {
        Data_map.value.Data = DaLi
        Data_map.value.name = 'DALI'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '丽江市') {
        Data_map.value.Data = LiJiang as any
        Data_map.value.name = 'LIJIANG'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '保山市') {
        Data_map.value.Data = BaoShan
        Data_map.value.name = 'BAODING'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '德宏傣族景颇族自治州') {
        Data_map.value.Data = DeHong
        Data_map.value.name = 'HONGDE'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '怒江傈僳族自治州') {
        Data_map.value.Data = NuJiang
        Data_map.value.name = 'NUJIANG'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      } else if (cityName === '迪庆藏族自治州') {
        Data_map.value.Data = DiQing
        Data_map.value.name = 'DIQING'
        Data_map.value.marks = marks.value[cityName] as never
        Data_map.value.grade = 1
      }

      //更新地图
      echarts.registerMap(Data_map.value.name, Data_map.value.Data as any)
      option.series[0].map = Data_map.value.name
      option.series[0].markPoint.data = Data_map.value.marks as never
      chart.setOption(option, true)
    }
  })
  // 使用地图数据和配置项渲染地图
  chart.setOption(option)
}

function Back() {
  Data_map.value.grade = 0
  Data_map.value.name = 'YUNNAN'
  ;(Data_map.value.marks = YunNan_data.value), (Data_map.value.Data = mapData)
  CreateMap()
}

onMounted(() => {
  CreateMap()
  Back()
})
</script>

<template>
  <div id="mapContainer" style="width: 100%; height: calc(100% - 100px)"></div>
  <el-button
    type="primary"
    style="z-index: 10; position: absolute; top: 25%; left: 67%"
    v-if="Data_map.grade > 0"
    @click="Back"
  >
    返回<el-icon class="el-icon--right"><IEpBack /></el-icon>
  </el-button>
</template>

<style scoped></style>
