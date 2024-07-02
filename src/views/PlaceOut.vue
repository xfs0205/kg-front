<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { request_map } from '@/utils/request'
import pathArr from '../utils/map_yun'
import { useTokenStore } from '@/stores/loginToken'
import axios from 'axios'


const store = useTokenStore()
const info_is = ref({
  open: false,
  info_id: 0
})

let map: {
  on: (arg0: string, arg1: () => void) => void
  add: (arg0: any) => void
  remove: (arg0: any) => void
  addControl: (arg0: any) => void
  destroy: () => void
} | null = null

const labels = ref()
const aa = ref("0px")
const config = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${store.token.access_token}`
  }
}
const apiUrl = 'http://127.0.0.1:8017/backend/place'
axios
  .get(apiUrl, config)
  .then((response) => {
    console.log('Response:', response.data)
    labels.value = response.data
  })
  .catch((error) => {
    console.error('Error:', error)
    // 处理错误
  })



onMounted(() => {
  AMapLoader.load({
    key: '042300a5572900783dbffb75f2207852', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale', 'AMap.Geolocation', 'AMap.MapType', 'AMap.Polygon', 'AMap.LabelsLayer'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 6.2,
        center: [102.709372, 25.046432] // 初始化地图中心点位置为昆明市
      })

      if (map) {
        //比例尺插件
        let scale = new AMap.Scale({})
        map.addControl(scale)
        //定位功能
        let Geolocation = new AMap.Geolocation({})
        map.addControl(Geolocation)
        //地图样式
        let MapType = new AMap.MapType({})
        map.addControl(MapType)

        //多边形
        let polygon = new AMap.Polygon({
          path: pathArr.value, //多边形路径
          fillColor: 'rgb(0,0,0)', //多边形填充颜色
          strokeOpacity: 1, //线条透明度
          fillOpacity: 0.05, //填充透明度
          strokeColor: 'black', //线条颜色
          strokeWeight: 2, //线条宽度
          strokeStyle: 'dashed', //线样式
          strokeDasharray: [] //轮廓的虚线和间隙的样式
        })
        map.add(polygon)

        const labelsLayer = new AMap.LabelsLayer({
          zooms: [3, 20],
          zIndex: 1000,
          collision: true, //该层内标注是否避让
          allowCollision: true //设置 allowCollision：true，可以让标注避让用户的标注
        })
        //设置一个图标对象
        const icon_person = {
          type: 'image',
          image: '../../public/map/person.png',
          size: [30, 30],
          anchor: 'center'
        }
        const icon_event = {
          type: 'image',
          image: '../../public/map/event.png',
          size: [30, 30],
          anchor: 'center'
        }
        const icon_place = {
          type: 'image',
          image: '../../public/map/place.png',
          size: [30, 30],
          anchor: 'center'
        }

        //创建 LabelMarker
        for (var i = 0; i < labels.value.length; i++) {
          //设置文字对象
          const text = {
            content: labels.value[i].name,
            direction: 'right',
            offset: [-5, -3],
            style: {
              fontSize: 12,
              fillColor: '#22886f',
              strokeColor: '#fff',
              strokeWidth: 2
            }
          }

          let labelMarker = null as any
          if (labels.value[i].type == 'person') {
            labelMarker = new AMap.LabelMarker({
              position: labels.value[i].position,
              zIndex: 16,
              rank: 1,
              icon: icon_person,
              text: text
            })
          }
          else if (labels.value[i].type == 'event') {
            labelMarker = new AMap.LabelMarker({
              position: labels.value[i].position,
              zIndex: 16,
              rank: 3,
              icon: icon_event,
              text: text
            })
          }
          else {
            labelMarker = new AMap.LabelMarker({
              position: labels.value[i].position,
              zIndex: 16,
              rank: 3,
              icon: icon_place,
              text: text
            })
          }

          // 给 labelMarker 添加自定义属性 id
          labelMarker.setExtData({ id: i });

          labelMarker.on('click', function () {
            if (!info_is.value.open) {
              info_is.value.open = true
              aa.value = '300px'
            }
            info_is.value.info_id = labelMarker.getExtData().id
            // labelMarker.setOpacity(0.5)
          })

          //添加一个 labelMarker
          labelsLayer.add(labelMarker)
        }

        map.add(labelsLayer)
      }

      // 在 document 上添加点击事件监听器
      document.addEventListener('click', (event) => {
        // 检查点击的元素是否是地图容器或其子元素
        const isMapClick = event.composedPath().some(el => el.id === 'container');

        // 如果不是地图点击，则关闭信息窗口
        if (!isMapClick) {
          info_is.value.open = false;
          aa.value = '0px'
        }
      });
    })

    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<template>
  <div class="common-layout" style="margin-top: 15px;margin-left: 15px;">
    <el-container>
      <el-header id="header">&nbsp;&nbsp;&nbsp;&nbsp;地图</el-header>
      <el-main id="main">
        <el-container>
          <div id="container"></div>
          <el-aside :width="aa">
            <el-container v-if="info_is.open">
              <el-header style="display: flex;justify-content: center;align-items: center;">
                <h3 style="color: antiquewhite;">{{ labels[info_is.info_id].name }}</h3>
              </el-header>
              <el-scrollbar height="430px">
                <el-main>
                  <span style="color: aliceblue;">&emsp;&emsp;{{ labels[info_is.info_id].info }}</span>
                </el-main>
              </el-scrollbar>

            </el-container>
          </el-aside>
        </el-container>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<style scoped>
#container {
  margin-left: 0;
  width: 99%;
  height: calc(90vh - 98px);;
  border-radius: 5px;
}

#header {
  display: flex;
  background-color: #eee;
  align-items: center;
  margin-bottom: 15px;
  padding-left: 0;
  border-left: 4px solid black;
}

#main {
  background-color: #eee;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 0;

  /* padding-right: 600px; */
  .el-aside {
    height: calc(90vh - 98px);
    background-color: rgb(0, 0, 0, 0.3);
    transition: width 0.5s ease;
  }
}

.el-footer {
  background-color: #eee;
}

.amap-info-window {
  width: 150px;
  background: #fff;
  border-radius: 3px;
  padding: 3px 7px;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
  position: relative;
}

.amap-info-sharp {
  position: absolute;
  top: 21px;
  bottom: 0;
  left: 50%;
  margin-left: -8px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #fff;
}
</style>
