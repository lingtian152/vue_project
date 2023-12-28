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
  
}

const login = async () => {
  router.push('/')
}
</script>

<style>
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
