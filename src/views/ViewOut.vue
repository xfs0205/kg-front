<script setup lang="ts">
import { ref, onMounted } from 'vue';
import nod from './NodeGroup.vue';
import { Search } from '@element-plus/icons-vue'

const info = ref({
    open: false
})
const aa = ref("10px")
const input = ref<string>('')

const handlInfo = (data: any) => {
    info.value = data
    if (info.value.open) {
        aa.value = "350px"
    }
    else {
        info.value = { open: false }
        aa.value = "10px"
    }
}

const comd = ref('zh')
const title = ref({
    "b": "ລາວ",
    "a": "中文",
    "c": "Tiếng Việt",
    "d": "ภาษาไทย",
    "e": "မြန်မာစာ",
    "f": "Bahasa Indonesia"
})

const zhuan = (s: any) => {
    if (s == "lao") {
        return "b"
    }
    else if (s == "zh") {
        return "a"
    }
    else if (s == "yue") {
        return "c"
    }
    else if (s == "tai") {
        return "d"
    }
    else if (s == "mian") {
        return "e"
    }
    else if (s == "yin") {
        return "f"
    }
}


const handleCommand = (command: string | number | object) => {
    if (command == 'a') {
        comd.value = 'zh'
    }
    else if (command == 'b') {
        comd.value = 'lao'
    }
    else if (command == 'c') {
        comd.value = 'yue'
    }
    else if (command == 'd') {
        comd.value = 'tai'
    }
    else if (command == 'e') {
        comd.value = 'mian'
    }
    else if (command == 'f') {
        comd.value = 'yin'
    }
}

onMounted(() => {

})
const handleKeydown = async (event: KeyboardEvent) => {
    // 如果用户按下了 Enter 并且没有按下 Shift 键
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        if (input.value) {
            let a
        }
    }
}
</script>

<template>
    <el-container>
        <el-main style="padding-bottom:0 ;padding-top: 0;padding-left: 0;">
            <el-header style="align-items: center;display: flex;">
                <el-row style="width: 100%; height: 100%">
                    <el-col :span="12" style="align-items: center;display: flex;">
                        <el-input v-model="input" style="width: 97%;" placeholder="输入搜索内容" :suffix-icon="Search"
                            @keyup="handleKeydown" />
                    </el-col>
                    <el-col :span="12" style="align-items: center;display: flex;">
                        <el-dropdown @command="handleCommand" trigger="click" style="margin-left: 70%;padding: auto;">
                            <span class="el-dropdown-link">
                                {{ title[zhuan(comd) as keyof typeof title] }}<el-icon
                                    class="el-icon--right"><IEparrow-down /></el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="a">{{ title['a'] }}</el-dropdown-item>
                                    <el-dropdown-item command="b">{{ title['b'] }}</el-dropdown-item>
                                    <el-dropdown-item command="c">{{ title['c'] }}</el-dropdown-item>
                                    <el-dropdown-item command="d">{{ title['d'] }}</el-dropdown-item>
                                    <el-dropdown-item command="e">{{ title['e'] }}</el-dropdown-item>
                                    <el-dropdown-item command="f">{{ title['f'] }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-col>

                </el-row>

            </el-header>
            <nod :lang="comd" @info="handlInfo"></nod>
        </el-main>
        <el-aside :width="aa">
            <el-container v-if="info.open">
                <el-header style="display: flex;justify-content: center;align-items: center;">
                    <h3 style="color: antiquewhite;">{{ info.mess.name }}</h3>
                </el-header>
                <el-main>
                    <span style="color: aliceblue;">&emsp;&emsp;{{ info.mess.info }}</span>
                </el-main>
            </el-container>
        </el-aside>
    </el-container>
</template>

<style scoped>
.el-aside {
    height: calc(100vh - 60px);
    background-color: rgb(0, 0, 0, 0.4);
    transition: width 0.5s ease;
}

.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    height: 120%;
    width: 100px;
}
</style>