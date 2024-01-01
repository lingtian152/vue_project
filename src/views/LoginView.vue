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
    if (!account.value && !password.value)
      return ElMessage({
        showClose: true,
        message: '请输入账号和密码',
        type: 'error'
      })

    const response = await axios.post('http://127.0.0.1:3000/login', {
      username: account.value,
      password: password.value
    })

    const message = response.data.message

    ElMessage({
      showClose: true,
      message,
      type: message === '登录成功' ? 'success' : 'error'
    })

    if (message === '登录成功') {
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Error during login:', error)
    ElMessage({
      showClose: true,
      message: '登录失败',
      type: 'error'
    })
  }
}

const register = async () => {
  try {
    router.push('/register')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style src="../assets/css/login.css" scoped></style>
