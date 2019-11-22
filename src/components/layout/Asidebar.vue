<template>
<el-menu default-active="1-4-1"  @open="handleOpen" @close="handleClose" :collapse="isCollapse"  :router=true>
  <el-submenu index="1">
    <template slot="title" class="title">
      <i class="el-icon-s-marketing"></i>
      <span slot="title">股票行情</span>
    </template>
    <el-menu-item index="1-1" route="/home/stock-base">A股汇总</el-menu-item>
    <el-menu-item index="1-2" route="/home/stock-focus">龙虎榜</el-menu-item>
  </el-submenu>
  <el-submenu index="2">
    <template slot="title" class="title">
      <i class="el-icon-s-tools"></i>
      <span slot="title">系统管理</span>
    </template>
    <el-menu-item index="2-1">用户管理</el-menu-item>
      <el-menu-item index="2-2">角色管理</el-menu-item>
      <el-menu-item index="2-3">权限管理</el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed:{
    isCollapse:function(){
      return this.$store.getters.getAsidebarIsCollapse;
    }
  }
  }
</script>
<style>
.el-menu{
    text-align: left;
}


</style>