<template>
  <main>
    <el-row class="login mb-4">
      <el-text class="title">注册</el-text>
      <el-col class="input">
        <el-input v-model="account" placeholder="账号" class="Login-Account" />
        <el-input v-model="password" placeholder="密码" show-password class="Login-Password" />
      </el-col>
      <el-col class="btn mb-4">
        <el-button class="register-btn" @click="register">注册</el-button>
        <el-button class="login-btn" @click="login">登录</el-button>
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

const register = async () => {
  try {
    if (!account.value && !password.value)
      return ElMessage({
        showClose: true,
        message: '请输入账号和密码',
        type: 'error'
      })

    // Make a POST request to the registration endpoint
    const response = await axios.post('http://127.0.0.1:3000/register', {
      username: account.value,
      password: password.value
    })

    const message = response.data.message

    ElMessage({
      showClose: true,
      message,
      type: message === '注册成功' ? 'success' : 'error'
    })

    if (message === '注册成功') {
      router.push('/')
    }
  } catch (error) {
    // Handle any errors that occurred during the HTTP request
    console.error('Error during registration:', error)
    ElMessage({
      showClose: true,
      message: '注册失败',
      type: 'error'
    })
  }
}

const login = async () => {
  router.push('/')
}
</script>

<style src="../assets/css/login.css" scoped></style>
