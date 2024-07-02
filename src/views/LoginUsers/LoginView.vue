<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { login } from '@/utils/users';
import { useTokenStore } from '@/stores/loginToken';
import { useRouter,useRoute } from 'vue-router';

const router = useRouter();

const route = useRoute()

const store = useTokenStore()

const form = reactive({
  number: '',
  password: '',
});

const isLoading = ref(false);

const rules = reactive<FormRules>({
  number: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '手机号必须是11位数字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度需要6~18位', trigger: 'blur' },
  ],
});

const formRef = ref<FormInstance>();

const onSubmit = async () => {
  isLoading.value = true;

  await formRef.value?.validate().catch((err) => {
    ElMessage.error('表单校验失败...');
    isLoading.value = false;
    throw err;
  });

  const data = await login(form).then((res) => {
    if (!res.data.access_token) {
      ElMessage.error('登录信息有误！');
      isLoading.value = false;
      throw new Error('登录信息有误！');
    }
    return res.data;
  });

  store.saveToken(JSON.stringify(data))
  isLoading.value = false;

  ElMessage({
    message: '登陆成功',
    type: 'success',
    duration: 1000,
  });
  // router.push(route.query.redirect as string || route.query.previous as string || '/')
  router.go(-1)
};
</script>

<template>
  <div class="login">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="auto"
      style="max-width: 600px"
      label-position="top"
      size="large"
    >
      <h2>登录</h2>
      <el-form-item label="手机号" prop="number">
        <el-input v-model="form.number" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">
          登录
        </el-button>
      </el-form-item>
      <el-link href="http://localhost:5173/enroll">
        没有账号->去注册
      </el-link>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background-color: #ccc;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 300px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;

    .el-form-item {
      margin-top: 20px;
    }

    .el-button {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>