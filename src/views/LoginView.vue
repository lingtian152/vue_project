<template>
  <main>
    <div class="login">
      <el-text class="mx-1 login-title" size="large">登录</el-text>
      <el-input v-model="account" placeholder="账号" class="Login-Account" />
      <el-input
        v-model="password"
        type="password"
        placeholder="密码"
        show-password
        class="Login-Password"
      />
      <el-button class="login-btn">
        <RouterLink to="/dashboard" @click="handleLogoutClick">登录</RouterLink>
      </el-button>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const account = ref('')
const password = ref('')
const handleLogoutClick = () => {
  ElMessage({
    showClose: true,
    message: '成功登录',
    type: 'success'
  })
  // Add additional logout logic if needed
  dashboard()
}
const dashboard = () => {
  // Use the router from the setup context
  this.$router.push('/dashboard')
}
</script>

<style>
.login {
  justify-content: center;
  height: 40%;
  width: 30%;
  margin: auto;
  display: flex;
  flex-flow: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: antiquewhite;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.241);
  border-radius: 25px;
}

.login .login-title {
  font-size: 25px;
  position: absolute;
  top: 0px;
  margin: 25px;
  text-align: center;
}

.login .el-input {
  width: 100%;
  padding: 20px 20px;
  border-radius: 15px;
}

.login .login-btn {
  width: 20%;
  height: 15%;
  align-self: center;
  justify-self: center;
  border-radius: 15px;
}
</style>
