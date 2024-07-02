<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useTokenStore } from '@/stores/loginToken'

const stores = useTokenStore()

const router = useRouter();

const goToDashboard = () => {
  const loading = ElLoading.service({
    lock: true,
    text: '',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
    if (stores.token.ID){
    router.push({ path: `/dashboard/${stores.token.ID}`})
    }
    else{
      router.push({ path: '/dashboard/{ }'})
    }
  }, 1500)
  
};

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h3>“智游”知识图谱</h3>
      </el-header>
      <el-main>
        <el-main>
          <el-main></el-main>
          <div class="cont">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;红色文化知识图谱是一种集成和展现
            中国革命历史文化资源的知识体系，其核心在于系统化地整合与红色文化相关的丰富历史素材、人物
            、事件、地点和相关文献记录。它运用现代信息技术，特别是人工智能、大数据分析和知识图谱构建
            技术，将红色文化的知识点进行逻辑连接和结构化表达，使得信息不仅被动态联合起来，还能够进行
            深入的语义检索和智能推理。
          </div>
          <el-button type="info" style="position: absolute;bottom: 27%;
            left: 44%; background-color: rgb(0,0,0,0);border: 0;
            font-size: 30px;font-family: '宋体';" @click="goToDashboard">进入首页</el-button>
        </el-main>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  height: 55px;
  background-color: #2d2d2d;
  color: #ffffff;
  display: flex;
  align-items: center;
}

.el-main {
  width: 100%;
  height: calc(100vh - 55px);
  background-color: #141414;
  padding-top: 25px;
  padding-left: 45px;
  padding-right: 45px;
  padding-bottom: 0;
  background-image: url("../../public/yun_map.png");
  background-size: 100% 115%, cover;
  background-repeat: no-repeat;

  .el-main {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(104, 103, 101, .5), #141414);
    border-radius: 10px;

    .el-main {
      margin: auto;
      background-image: url("../../public/智游.png");
      background-size: 450% 400%;
      background-position: center center;
      width: 260px;
      height: 170px;
      background-color: rgb(0, 0, 0, 0);
    }

    .cont {
      margin: auto;
      background-color: rgba(208, 97, 97, 0);
      color: #ffffff;
      font-family: "宋体";
      font-size: 17px;
      width: 80%;
      line-height: 1.8;
    }
  }
}
</style>