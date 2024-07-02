<script setup lang="ts">
import BarGraph from '@/views/Large_data_screen/BarGraph.vue'
import BarRace from '@/views/Large_data_screen/BarRace.vue'
import WordCloud from '@/views/Large_data_screen/WordCloud.vue'
import StepLine from '@/views/Large_data_screen/StepLine.vue'
import FakeData from '@/views/Large_data_screen/FakeData.vue'
import BasicRead from '@/views/Large_data_screen/BasicRead.vue'
import ThreeMap from '../ThreeMapOut/ThreeMap.vue'
import MapData from '@/views/Large_data_screen/MapData.vue'
import {ref} from 'vue'

const comd = ref('a')
const title = ref({
  "b": "2D地图",
  "a": "3D地图"
})
const handleCommand = (command: string | number | object) => {
  if (command == 'a') {
    comd.value = 'a'
  }
  else {
    comd.value = 'b'
  }
}
</script>

<template>
    <el-container id="el-back">
        <el-aside id="el-aside-left">
            <div class="in-data">
                <dv-border-box12 ref="borderRef" backgroundColor="rgb(255, 255, 255, 1)">
                    <BarGraph></BarGraph>
                </dv-border-box12>
            </div>
            <div class="in-data">
                <dv-border-box12 ref="borderRef" backgroundColor="rgba(255, 255, 255, 1)">
                    <WordCloud></WordCloud>
                </dv-border-box12>
            </div>
            <div class="in-data">
                <dv-border-box12 ref="borderRef" backgroundColor="rgba(255, 255, 255, 1)">
                    <FakeData></FakeData>
                </dv-border-box12>
            </div>
        </el-aside>
        <el-main>
            <div class="header-box">
                <el-dropdown @command="handleCommand" trigger="click" style="padding: auto;top: 60%;">
                    <span class="el-dropdown-link">
                        {{ title[comd as keyof typeof title] }}<el-icon
                            class="el-icon--right"><IEparrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="a">{{ title['a'] }}</el-dropdown-item>
                            <el-dropdown-item command="b">{{ title['b'] }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <ThreeMap v-if="comd == 'a'"></ThreeMap>
            <MapData v-else></MapData>
        </el-main>
        <el-aside id="el-aside-right">
            <div class="in-data">
                <dv-border-box12 ref="borderRef" backgroundColor="rgba(255, 255, 255, 1)">
                    <BarRace></BarRace>
                </dv-border-box12>
            </div>
            <div class="in-data">
                <dv-border-box12 ref="borderRef" backgroundColor="rgba(255, 255, 255, 1)">
                    <StepLine></StepLine>
                </dv-border-box12>
            </div>
            <div class="in-data">
                <dv-border-box12 ref="borderRef" backgroundColor="rgba(255, 255, 255, 1)">
                    <BasicRead></BasicRead>
                </dv-border-box12>
            </div>
        </el-aside>
    </el-container>
</template>

<style scoped>
#el-back {
  background-image: url(../../public/largeDataScreen/back_2.png);
  background-repeat: no-repeat;
  background-size: cover;
}

.el-header {
  height: 50px;
  background: linear-gradient(to bottom, rgb(24, 27, 89), rgb(48, 43, 123));
  color: aliceblue;
  background-image: url(../../public/largeDataScreen/header.png);
  background-size: cover;
  background-repeat: no-repeat;
}

.el-main {
  background-color: rgb(107, 117, 205, 0);
  height: 638px;
  z-index: 1;
  padding-top: 0px;

  .header-box {
    position: relative;
    width: 100%;
    height: 80px;
    background-color: rgb(253, 171, 180, 0);
    background-image: url("../../public/largeDataScreen/name.png");
    background-size: cover;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
}

.el-aside {
  height: 638px;
  width: 340px;
  z-index: 4;

  .in-data {
    width: 330px;
    margin-left: 5px;
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    height: 200px;
    border-radius: 3px;
    padding: 0;
  }
}

#el-aside-left {
  background-color: rgb(230, 2, 2, 0);
}

#el-aside-right {
  background-color: rgba(213, 72, 72, 0);
}
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  height: 120%;
}

</style>