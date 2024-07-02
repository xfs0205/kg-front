<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue'
import timeList from './TimeOutS/timeList.vue';
import timeTree from './TimeOutS/timeTree.vue';

const comd = ref('a')
const title = ref({
  "b": "时间列表",
  "a": "时间树"
})

const handleCommand = (command: string | number | object) => {
  if(command == 'a') {
    comd.value = 'a'
  }
  else{
    comd.value = 'b'
  }
}

</script>

<template>
  <div class="common-layout" style="margin-top: 15px;margin-left: 15px;">
    <el-container>
      <el-header>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;历史中的红色！！！</p>
        <el-dropdown @command="handleCommand" trigger="click" style="margin-left: 70%;padding: auto;">
          <span class="el-dropdown-link">
            {{ title[comd as keyof typeof title] }}<el-icon class="el-icon--right"><IEparrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">{{ title['a'] }}</el-dropdown-item>
              <el-dropdown-item command="b">{{ title['b'] }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <timeTree v-if="comd == 'a'"></timeTree>
        <timeList v-else></timeList>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-container {
  margin: 0;
}

.el-header {
  display: flex;
  background-color: #eee;
  align-items: center;
  margin-bottom: 18px;
  padding-left: 0;
  border-left: 4px solid black;
}

.el-main {
  background-color: rgb(237, 242, 240);
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  height: 120%;
}
</style>