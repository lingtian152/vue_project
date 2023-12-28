<template>
  <nav>
    <p class="title">后台管理</p>
  </nav>
  <el-menu class="el-menu-vertical">
    <el-menu-item index="1">
      <template #title> <router-link to="/">首页</router-link></template>
    </el-menu-item>
    <el-menu-item class="setting">
      <template #title><router-link to="/setting">设置</router-link></template>
    </el-menu-item>
    <el-menu-item class="logout">
      <template #title
        ><router-link to="/logout" :plain="true" @click="handleLogoutClick"
          >退出</router-link
        ></template
      >
    </el-menu-item>
  </el-menu>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  methods: {
    handleLogoutClick() {
      ElMessage({
        showClose: true,
        message: '退出成功',
        type: 'success'
      })
      // Add additional logout logic if needed
      this.logout()
    },
    logout() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
nav {
  margin: 5px;
  padding: 5px;
}

.title {
  margin: auto 5px;
  margin-left: 25px;
  padding: 5px;
  align-items: center;
}

.setting {
  position: fixed;
  bottom: 50px;
  width: 150px;
}

.logout {
  position: fixed;
  bottom: 0px;
  width: 150px;
}

.el-menu-vertical {
  margin: 5px;
  width: 150px;
  min-height: 400px;
}
</style>
