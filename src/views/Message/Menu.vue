<script setup>
import { menuList } from '@/Message/menu'
import { ref } from 'vue'
const menusList = ref([])
const initMenusList = async() => {
    console.value = await menuList()
}
initMenusList()
</script>

<template> 
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-sub-menu : index="item.id" v-for="item in menusList" :key="item.id">
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
    </el-menu>

</template>

<style lang="scss" scoped></style>
