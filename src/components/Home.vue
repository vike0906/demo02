<template>
 <a-layout id="home">
      <a-layout-header><Header/></a-layout-header>
      <a-layout id="home-body">
        <a-layout-sider :trigger="null" collapsible v-model="collapsed" class="ant-layout-sider-light"><Asidebar/></a-layout-sider>
        <a-layout-content>
          <a-layout style="height: 100%;">
          <a-layout-content>Content</a-layout-content>
          <a-layout-footer>
            <p style="text-align: center">create by <a href="#" class="text-dark" >Vike0906</a> © 2019</p>
          </a-layout-footer>
          </a-layout>
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>

<script>
import Header from "./layout/Header";
import Asidebar from "./layout/Asidebar";
// import Main from "./Main";

export default {
  components: {
    Header, Asidebar
    // ,Asidebar,Main
  },
  // data() {
  //     return {
  //       collapsed: false,
  //     };
  //   },
  computed:{
    collapsed:function(){
      return this.$store.getters.getAsidebarCollapse;
    }
  }
};
</script>

<style>
#home .ant-layout-header{
  height: 3.6rem;
  background-color: #fff;
  padding: 0 1px;
  box-shadow:0 0 5px #75797d;
  z-index: 1050;
}

#home-body {
  position: absolute;
  top: 3.6rem;
  bottom: 0;
  right: 0;
  left: 0;
}
#home .ant-layout-content {
  background-color: #f5f5f6;
  color: #333;
  text-align: center;
}

#home .ant-layout-footer {
  background-color: #f5f5f6;
  color: #333;
  text-align: center;
  height: 2rem;
  padding: .3rem .5rem
}
#home .wrapper{
    background-color: #fff;
    height: 100%;
    width: 100%;
}
@media only screen and (max-width:639px){
  #home .ant-layout-sider{
    display: none;
  }
}
</style>