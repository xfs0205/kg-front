<script setup lang="ts">
import {ref,reactive}from 'vue'
import type{FormInstance,FormRules}from"element-plus"
import { ElMessage } from 'element-plus'
import { enroll } from '@/utils/users';

const form = reactive({
    name: "",
    phone:"",
    password:"",
})

const userData = ref(
    {}
)

const onSubmit=async()=>{
    isLoading.value=true
  await formRef.value?.validate().catch((err) => {
    ElMessage.error("表单校验失败...")
    throw err
  })
  enroll(form).then((res) =>{
        userData.value = res.data
    })

    isLoading.value=false
ElMessage({
    message: "注册成功-请重新登陆",
    type: "success",
    duration: 1000
    })
    setTimeout(() => {  
    window.location.href = 'http://localhost:5173/login';  
    }, 1000);
}
const isLoading=ref(false)
isLoading.value=false
const rules = reactive<FormRules>({
    name: [
        {min:2,max:9,message:"密码长度需要2~9位",trigger:"blur"},
    ],
    phone:[
        {required:true,message:"请输入电话号码",trigger:"blur"},
        {pattern:/^1\d{10}$/,message:"手机号必须是11位数字",trigger:"blur"},
    ],
    password:[
        {required:true,message:"密码不能为空",trigger:"blur"},
        {min:6,max:18,message:"密码长度需要6~18位",trigger:"blur"},
    ]
})
const formRef=ref<FormInstance>()
</script>

<template>
    <div class="enroll">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="auto" style="max-width: 600px" label-position="top" size="large">
            <h2>注册</h2>
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="isLoading">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.enroll{
  background-color:#ccc;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .el-form{
        width:300px;
        background-color:#fff;
        padding:30px;
        border-radius:10px;
        .el-form-item{
            margin-top:20px;
        }
        .el-button{
        width:100%;
         margin-top:30px;
        }
    }
}
</style>