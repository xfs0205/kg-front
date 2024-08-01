<script setup lang="ts">
import { isCollapse } from './isCollapse'
import { ref } from 'vue'
import { useTokenStore } from '@/stores/loginToken'

const stores = useTokenStore()

const userID = ref('{ }')
if(stores.token.ID){
  userID.value = stores.token.ID
}

</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="../../public/logo.png" alt=""/>
          <div><h1>“智游”图谱</h1></div>
        </a>
        <el-menu-item :index="'/dashboard/'+userID">
          <el-icon><IEpStar /></el-icon>  <span>智能推荐</span>
        </el-menu-item>
        <el-menu-item :index="'/dashboard/'+userID+'/view'">
          <el-icon><IEpPromotion /></el-icon>  <span>总览图谱</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><IEpOperation /></el-icon>  <span>分类浏览</span>
          </template>
          <el-menu-item :index="'/dashboard/'+userID+'/person'">
            <el-icon><IEpUser /></el-icon>  <span>人物</span>
          </el-menu-item>
          <el-menu-item :index="'/dashboard/'+userID+'/place'">
            <el-icon><IEpLocationInformation /></el-icon> <span>地点</span>
          </el-menu-item>
          <el-menu-item :index="'/dashboard/'+userID+'/time'">
            <el-icon><IEpEleme /></el-icon>  <span>时间</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item :index="'/dashboard/'+userID+'/answer'">
          <el-icon><IEpChatLineRound /></el-icon>  <span>智能问答</span>
        </el-menu-item>
        <el-menu-item :index="'/changzheng'">
          <el-icon><IEpWindPower /></el-icon>  <span>红军长征</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>

.el-aside{
  background-color: #eee;
  height: 100vh;
  width: auto;
}
.el-menu{
  background-color: #eee;
  border-right: none;
  width: 200px;
  &.el-menu--collapse{
    & h1{
      display: none;
    }
    width: 60px;
  }
}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  text-decoration: none;
  color: black;
  img{
    width: 32px;
    height: 32px;
    border-radius: 2px;
  }
}

</style>