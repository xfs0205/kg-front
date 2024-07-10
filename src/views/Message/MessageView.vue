<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const goBack = () => {
  console.log('go back')
}

import { reactive, toRefs } from 'vue'
const state = reactive({
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',

})

const { squareUrl } = toRefs(state)
</script>

<template>
  <h1>你好！</h1>

  <el-container class="message">
    <el-aside width="200px">
      <el-row class="tac">
        <el-col :span="12">
          <h5 class="mb-2">Default colors</h5>
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item one</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>Navigator Two</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <el-icon>
                <document />
              </el-icon>
              <span>Navigator Three</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <setting />
              </el-icon>
              <span>Navigator Four</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <!-- <Menu/> -->
    <el-container>
      <el-header>
        <el-page-header content="detail" @back="goBack" />
        <el-dropdown>
          <span class="el-dropdown-link">
            <div style="text-align: right;">
              <el-avatar shape="square" :size="40" :src="squareUrl" />
            </div>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>

</template>

<style scoped>
.message {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #3498db;
  padding: 10px;
}

.el-aside {
  background-color: #3498db;
  /* Blue background for Aside */
  color: #ffffff;
  /* White text color for Aside */
  padding: 10px;
  width: 200px;
}

.el-header {
  background-color: #3498db;
  /* Blue background for Header */
  color: #ffffff;
  /* White text color for Header */
  padding: 10px;
}

.el-main {
  background-color: #ffffff;
  /* White background for Main */
  color: #000000;
  /* Black text color for Main */
  padding: 10px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
