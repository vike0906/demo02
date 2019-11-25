<template>
<!-- :defaultOpenKeys="[defaultKeys[0]]" -->
<!-- :defaultSelectedKeys="[defaultKeys[1]]" -->
<!-- :inlineCollapsed="collapsedHome" -->
<a-menu
      mode="inline"
      :inlineCollapsed="collapsedSide"
    >
      <a-sub-menu key="stock">
        <span slot="title"><a-icon type="stock" /><span>股票行情</span></span>
        <a-menu-item key="base" ><router-link to="/home/stock-base">A股汇总</router-link></a-menu-item>
        <a-menu-item key="focus"><router-link to="/home/stock-focus">龙虎榜</router-link></a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="system">
        <span slot="title"><a-icon type="setting"/><span>系统管理</span></span>
        <a-menu-item key="user"><router-link to="/home/system-user">用户管理</router-link></a-menu-item>
        <a-menu-item key="role"><router-link to="/home/system-role">角色管理</router-link></a-menu-item>
        <a-menu-item key="permission"><router-link to="/home/system-permission">权限管理</router-link></a-menu-item>
      </a-sub-menu>
    </a-menu>
</template>

<script>
export default {
    computed:{
      collapsedSide:function(){
        return this.$store.getters.getAsidebarCollapse;
      }
  }
  }
</script>
<style>
.ant-menu{
  text-align: left;
}
.ant-menu-inline .ant-menu-submenu-title {
  font-size: 1rem;
}
.ant-menu-submenu-title .anticon{
  font-size: 1.2rem;
}
.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon{
  font-size: 1.2rem;
}


</style>