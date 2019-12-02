<template>
<a-menu
      mode="inline"
      :inlineCollapsed="collapsedSide"
    >
      <a-sub-menu v-for="firstMenu in menu" :key="firstMenu.icon">
        <span slot="title"><a-icon :type="firstMenu.icon" /><span>{{firstMenu.name}}</span></span>
        <a-menu-item v-for="secondMenu in firstMenu.subAction" :key="secondMenu.id" >
          <router-link :to="secondMenu.url">{{secondMenu.name}}</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
</template>

<script>
import * as api from "@/api/system";
export default {
  data(){
    return {
      menu:[]
    }
  },
  computed:{
      collapsedSide:function(){
        return this.$store.getters.getAsidebarCollapse;
      }
  },
  methods:{
    getMenu(){
      api.getMenu().then(response => {
          if (response) {
            if (response.code == 0) {
              this.menu = response.content;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted(){
    this.getMenu();
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