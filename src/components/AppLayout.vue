<script setup lang="ts">
import AppAside from "./AppAside.vue"
import AppHear from "./AppHear.vue";
import userfo from '@/views/LoginUsers/userInfo.vue'
import { ref } from 'vue'

const showUserInfo = ref(false); 
const userInfo = ref({
    name: "",
    userID: "",
    head_img: ""
})
  
const handleInfoUpdate = (newValue: boolean) => {  
  showUserInfo.value = newValue; // 将接收到的 true 赋值给 info 
}; 

const handleUserInfo = (newValue: { name: string; userID: string; head_img: string; }) => {
  if (showUserInfo.value){
    userInfo.value = newValue;
  }
  console.log("layout:", userInfo.value)
}

const handleChangeUrl = (newValue: string) => {  
  userInfo.value.head_img = newValue;
  console.log("layout:",userInfo.value.head_img) 
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <AppAside />
      <el-container class="header-and-main">
        <AppHear @updateInfo="handleInfoUpdate" @userInfo="handleUserInfo" />
        <userfo v-if="showUserInfo" @updateInfo="handleInfoUpdate" @changUrl="handleChangeUrl" :headUrl="userInfo.head_img" 
        :userId="userInfo.userID" :userNickname="userInfo.name" />
        <el-main style="padding-top: 0;padding-left: 0;">
          <el-scrollbar>
            <router-view v-slot="{ Component, route }">
              <transition :name="route.meta.transition as string || 'fade'">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.header-and-main {
  flex-direction: column;
  height: 100vh;
}

.el-main {
  background-color: #d8d8d8;
  padding-right: 0;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 0;
}
</style>