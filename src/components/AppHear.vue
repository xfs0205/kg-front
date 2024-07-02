<script setup lang="ts">
import { isCollapse } from './isCollapse'
import { userinfo,logout,user_head_img } from '@/utils/users';
import { useTokenStore } from '@/stores/loginToken';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter();

const userInfo = ref({
    name: "",
    head_img: ""
})
const store = useTokenStore()
userinfo().then((res: { data: { username: string; }; })=>{
    // console.log(res.data)
    userInfo.value.name = res.data.username
})

user_head_img().then((res)=>{
    userInfo.value.head_img = res.data.path;
    // console.log(userInfo.value.head_img)
})

const goTologin = () =>{
    router.push({name:"login"})
}

const goToGraph = () =>{
    const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
        router.push('/large/data')
  }, 2000)
}

//退出事件处理
const handleLogout = async () => {
    //询问 
    await ElMessageBox.confirm("确认要退出吗？","退出询问",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:'warning'
    }).catch(()=>{
        ElMessage.info("取消退出操作")
        return new Promise(()=>{})
    })
    //执行
    await logout(store.token.ID).catch(()=>{})
    ElMessage.success("用户成功退出！")
    useTokenStore().saveToken("")
    // router.push({name:"login"})
    userInfo.value.name = ''
}  

</script>

<template>
  <el-header>
    <el-icon @click="isCollapse = !isCollapse">
        <IEpExpand v-show="isCollapse"/>
        <IEpFold  v-show="!isCollapse"/>
    </el-icon>

    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-divider direction="vertical" style="height: 100%;"/>
    <!-- <el-breadcrumb-item :to="{ path: '/large/data' }">数据可视化</el-breadcrumb-item> -->
    <el-breadcrumb-item @click=goToGraph>数据可视化</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
        <span class="el-dropdown-link">
            <!-- 用户 -->
        <el-avatar v-if="userInfo.name" :size="42" :src="userInfo.head_img"/>
        <el-avatar v-else :size="42" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"/> 
        <el-icon class="el-icon--right">
            <IEparrow-down />
        </el-icon>
        </span>
        <template #dropdown>
        <el-dropdown-menu v-if="userInfo.name">
            <el-dropdown-item>{{ userInfo.name }}</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu v-else>
            <el-dropdown-item divided @click="goTologin">登录</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header{
    display: flex;
    background-color: #eee;
    align-items: center;
    .el-icon{
        margin-right: 16px;
    }
}
.el-dropdown{
    margin-left: auto;
    .el-dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
        //部分浏览器不兼容，会出现自动添加outline，从而出现黑框，所以强制隐藏
        border: none;
        &:focus{
            outline: 0 ;
        }
    }
}

</style>