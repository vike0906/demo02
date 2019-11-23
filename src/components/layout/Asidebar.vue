<template>
<a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['sub1']"
      mode="inline"
      :inlineCollapsed="collapsed"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="stock" /><span>股票行情</span></span>
        <a-menu-item key="1">A股汇总</a-menu-item>
        <a-menu-item key="2">龙虎榜</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="setting"/><span>系统管理</span></span>
        <a-menu-item key="6">用户管理</a-menu-item>
        <a-menu-item key="7">角色管理</a-menu-item>
        <a-menu-item key="8">权限管理</a-menu-item>
      </a-sub-menu>
    </a-menu>
</template>

<script>
export default {
    computed:{
    collapsed:function(){
      return this.$store.getters.getAsidebarCollapse;
    }
  }
  }
</script>
<style>
.ant-menu{
  text-align: left;
  font-size: 1.5rem;
  z-index: 1055;
}
.a-icon{
  font-size: 1.5rem;
}
.ant-menu-submenu-title{
  font-size: 1.5rem;
}

</style>