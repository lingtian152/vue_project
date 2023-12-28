<template>
  <main>
    <el-row class="login mb-4">
      <el-text class="title">登录</el-text>
      <el-col class="input">
        <el-input v-model="account" placeholder="账号" class="Login-Account" />
        <el-input v-model="password" placeholder="密码" show-password class="Login-Password" />
      </el-col>
      <el-col class="btn mb-4">
        <el-button class="login-btn" @click="login">登录</el-button>
        <el-button class="register-btn" @click="register">注册</el-button>
      </el-col>
    </el-row>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import router from '@/router'

const account = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/login', {
      username: account.value,
      password: password.value
    })

    if (response.status === 200) {
      // success fetched password and username
      ElMessage({
        showClose: true,
        message: response.data.message,
        type: 'success'
      })
      // Use $router from the context
      router.push('/dashboard')
    } else {
      ElMessage({
        showClose: true,
        message: response.data.message,
        type: 'error'
      })
    }
  } catch (error) {
    console.error('Error during login:', error)
    ElMessage({
      showClose: true,
      message: error,
      type: 'error'
    })
  }
}

const register = async () => {
  router.push('/register')
}
</script>

<style scoped>
body {
  background-color: #bdbdbd;
}

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  height: auto;
  width: 25%;
  background-color: antiquewhite;
  padding: 25px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.256);
}

.login .title {
  text-align: center;
  justify-content: center;
  font-size: 25px;
}

.login .input .el-input {
  padding-top: 15px;
  border-radius: 25px;
}

.login .btn {
  justify-content: center;
  align-items: center;
  padding: 15px;
}

.login .btn .el-button {
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  margin-right: 5px;
  height: auto;
  width: 45%;
  font-size: 20px;
}
</style>
