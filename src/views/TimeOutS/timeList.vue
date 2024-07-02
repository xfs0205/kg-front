<script setup lang="ts">
import { ref } from 'vue'
import { request_time } from "../../utils/request"
import { useTokenStore } from '@/stores/loginToken';
import axios from 'axios';

const store = useTokenStore()
// 获取时间

const drawer = ref(false)
const selectedButton = ref({name:"",time:"",value:""})
const buttons = ref([
    {name:"",time:"",value:""}
])


const config = {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${store.token.access_token}`
  }
};
const apiUrl = 'http://127.0.0.1:8017/backend/timeline';
axios.get(apiUrl, config)
  .then(response => {
    console.log('Response:', response.data);
    buttons.value = response.data
  })
  .catch(error => {
    console.error('Error:', error);
    // 处理错误
  });

// 在 openDrawer 中使用响应式的 selectedButton
function openDrawer(button: typeof buttons.value[number]) {
  selectedButton.value = button
  drawer.value = true
}
</script>

<template>
    <div class="common-layout">
    <el-container>
      <el-main>
        <el-timeline>
            <el-timeline-item center :timestamp="button.time" placement="top" color="red" v-for="(button,index) in buttons" :key="index">
                <el-card>
                    <div class="flex justify-space-between mb-4 flex-wrap gap-4">
                        <el-button type="" link @click="openDrawer(button)">
                            <h3 style="color: black;font-family: '宋体';">
                                {{ button.name }}
                            </h3>
                        </el-button>
                    </div>
                </el-card>
            </el-timeline-item>
            <el-drawer v-model="drawer" :with-header="true" size="50%">
                <template #header="{ titleId, titleClass }">
                    <h3 :id="titleId" :class="titleClass">
                        <span>{{ selectedButton?.name }}</span>
                    </h3>
                </template>
                <el-scrollbar>
                    <span>
                        &emsp;&emsp;{{ selectedButton?.value }}
                    </span>
                </el-scrollbar>
            </el-drawer>
        </el-timeline>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-container{
    margin: 0;
}
.el-header{
    display: flex;
    background-color: #eee;
    align-items: center;
    margin-bottom: 18px;
    padding-left: 0;
    border-left: 4px solid black;
}
.el-main{
    background-color: rgb(237, 242, 240);
    
}
.el-timeline{
    --el-timeline-node-color: black;
}
.el-drawer{
    .el-drawer__title{
    color: black;
    font-size: 1.5rem;
        span{
            background: linear-gradient(to right, #ec695c, #b0e2b5) no-repeat right bottom;
            background-size: 100% 100%;
            transition: background-size 900ms;
        }
        span:hover{
            background-position-x: left;
            background-size: 100% 100%;
        }
    }
}

.el-scrollbar{
    font-size: large;
    line-height: 1.5;
}
::v-deep .el-drawer {
  background-image: url('../../public/dr_back.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

</style>