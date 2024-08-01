<script lang="ts" setup>
import Map from "./MapData.vue"

</script>

<template>
    <div class="common-layout">
    <el-container>
      <el-header  class="header">Header</el-header>
      <el-main class="main-div">
        <Map/>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.header{
    background-color: antiquewhite;
    height: 75px;
    width: 100%;
}
.main-div{
    height: calc(100vh - 75px);
    width: 100vw;
    background-color: rgb(0, 0, 0)
}
</style>

