<script setup lang="ts">
import AppAside from "./AppAside.vue"
import AppHear from "./AppHear.vue";

</script>

<template>
  <div class="common-layout">
    <el-container>
      <AppAside />
      <el-container class="header-and-main">
        <AppHear />
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