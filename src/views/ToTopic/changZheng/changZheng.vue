<script lang="ts" setup>
import Map from "./MapData.vue"
import KG from "@/views/KG/KgNode.vue"

</script>

<template>
    <div class="common-layout">
    <el-container>
      <el-header  class="header">Header</el-header>
      <el-main class="main-div">
        <!-- <Map/> -->
         <KG/>
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
    background-color: rgb(255, 255, 255)
}
</style>

