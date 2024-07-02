<script setup lang="ts">
import mone from '@/views/Large_data_screen/mainOne.vue'

import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useTokenStore } from '@/stores/loginToken'

const stores = useTokenStore()

const userID = ref('{ }')
if (stores.token.ID) {
  userID.value = stores.token.ID
}

const router = useRouter()

const goToDashboard = () => {
  router.push(`/dashboard/${userID.value}`)
}

const currentTime = ref('')

// 更新当前时间
const updateCurrentTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString()
}

// 每秒更新一次时间
setInterval(updateCurrentTime, 1000)

onMounted(updateCurrentTime)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row style="width: 100%; height: 100%">
          <el-col :span="8" style="display: flex; justify-content: left; align-items: center">
            <span>当前时间：{{ currentTime }}</span>
          </el-col>
          <el-col :span="8" style="display: flex; justify-content: center; align-items: center">
            <h2 style="font-family: '宋体'">云南红色文化数据可视化</h2>
          </el-col>
          <el-col :span="8" style="display: flex; justify-content: right; align-items: center">
            <dv-button :bg="false" @click="goToDashboard">前往首页</dv-button>
          </el-col>
        </el-row>
      </el-header>
      <mone></mone>
    </el-container>
  </div>
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
