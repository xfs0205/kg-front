<script setup lang="ts">
import { reactive, toRefs } from 'vue'

const state = reactive({
    circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
const { circleUrl } = toRefs(state)
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
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                    <span style="font-size: 20px; font-weight: bold; color: #ffffff;">管理系统</span>
                </div>
                <div class="block">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-avatar :size="40" :src="circleUrl" />
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
                    
                </div>
            </el-header>
            <el-container class="message">
                <el-aside width="200px">
                    <el-row class="tac">
                        <el-col :span="12">
                            <h5 class="mb-2">菜单</h5>
                            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                                @close="handleClose" :style="{ width: '200px' }">
                                <el-sub-menu index="1">
                                    <template #title>
                                        <el-icon>
                                            <location />
                                        </el-icon>
                                        <span>Navigator One</span>
                                    </template>
                                    <el-menu-item index="1-1">item one</el-menu-item>
                                    <el-menu-item index="1-2">item one</el-menu-item>
                                </el-sub-menu>
                            </el-menu>
                            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                                @close="handleClose" :style="{ width: '200px' }">
                                <el-sub-menu index="1">
                                    <template #title>
                                        <el-icon>
                                            <location />
                                        </el-icon>
                                        <span>Navigator One</span>
                                    </template>
                                    <el-menu-item index="1-1">item one</el-menu-item>
                                    <el-menu-item index="1-2">item one</el-menu-item>
                                </el-sub-menu>
                            </el-menu>
                            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                                @close="handleClose" :style="{ width: '200px' }">
                                <el-sub-menu index="1">
                                    <template #title>
                                        <el-icon>
                                            <location />
                                        </el-icon>
                                        <span>Navigator One</span>
                                    </template>
                                    <el-menu-item index="1-1">item one</el-menu-item>
                                    <el-menu-item index="1-2">item one</el-menu-item>
                                </el-sub-menu>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <div class="common-layout">
                        <el-container>
                            <el-header class="lheader"><el-page-header content="detail" @back="goBack" /></el-header>
                            <el-main>Main</el-main>
                        </el-container>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
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

.custom-aside {
    background-color: #3498db;
    color: #ffffff;
    padding: 10px;
    width: 200px;
}

.el-main {
    background-color: #ffffff;
    color: #000000;
    padding: 10px;
    height: 680px;
}

.el-header {
    background-color: #3498db;
    color: #ffffff;
    padding: 10px;
}

.lheader {
    background-color: #d0d0d0;
    color: #ffffff;
    padding: 10px;
    height:45px;
}
</style>
