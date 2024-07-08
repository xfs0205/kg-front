<script setup lang="ts">

</script>

<template>
    <h1>你好！</h1>
    
    <el-container class="message">
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
        
</template>

<style scoped>
.message{
    position:relative;
    width:100%;
    height:100%;
    background-color: #ffffff; 
    color: #000000; 
    border: 1px solid #3498db;
    padding: 10px;
}
.el-aside {
    background-color: #3498db; /* Blue background for Aside */
    color: #ffffff; /* White text color for Aside */
    padding: 10px;
    width: 200px;
}

.el-header {
    background-color: #3498db; /* Blue background for Header */
    color: #ffffff; /* White text color for Header */
    padding: 10px;
}

.el-main {
    background-color: #ffffff; /* White background for Main */
    color: #000000; /* Black text color for Main */
    padding: 10px;
}
</style>
