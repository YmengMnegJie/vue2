<template>
  <div class="user">
    <div class="left">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        unique-opened
        router
      >
        <el-menu-item>
          <el-icon><HomeFilled /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-sub-menu :index="item" v-for="item in list" :key="item">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group
            :index="item.children.path"
            v-for="(item, index) in item.children"
            :key="index"
          >
            <el-menu-item>{{ item.title }}</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="right">
      <div class="top"></div>
      <div class="min"></div>
    </div>
  </div>
</template>

<script setup>
import { HomeFilled } from '@element-plus/icons-vue'
import { nav } from '../api/user'
import { ref } from 'vue'
const list = ref()
nav().then((res) => {
  list.value = res.data.data.nav
  console.log(res.data.data.nav)
})
</script>
<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 220px;
    height: 100vh;
    background: rgb(192, 228, 176);
  }
  .right {
    width: 100%;
    height: 91vh;
    .top {
      width: 100%;
      height: 72px;
      background: #17b3a316;
    }
    .min {
      width: 100%;
      height: 100%;
      background: rgba(139, 162, 246, 0.405);
    }
  }
}
</style>
