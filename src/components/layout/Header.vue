<template>
  <div>
    <a-row>
      <a-col :xs="20" :sm="18" :md="12" :lg="7" :xl="5">
        <div class="head-logo">
          <a-icon
            class="head-trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="changeAsidebar()"
          ></a-icon>
          <a-avatar :size="25" src="./static/logo.png" />
          <span class="head-title">后台管理系统</span>
        </div>
      </a-col>
      <a-col
        :xs="{span: 4, offset:0}"
        :sm="{span: 6, offset:0}"
        :md="{span: 4, offset:8}"
        :lg="{span: 3, offset:14}"
        :xl="{span: 2, offset:17}"
      >
        <div class="head-info" @click="changeHeadMenu()">
          <a-avatar style="backgroundColor:#87d068" icon="user" />
          <span style="font-size:1.1rem; margin:0 .5rem 0 .5rem;">admin</span>
          <a-icon type="down" />
        </div>
        <transition name="bounce" >
        <div class="head-menu" v-if="showHeadMenu">
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </div>
        </transition>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHeadMenu:false
    };
  },
  computed: {
    collapsed: function() {
      return this.$store.getters.getAsidebarCollapse;
    }
  },
  methods: {
    changeAsidebar: function() {
      this.$store.commit("ASIDEBAR_COLLAPSE");
    },
    changeHeadMenu: function(){
      this.showHeadMenu = this.showHeadMenu?false:true;
    }
  }
};
</script>
<style scoped>
@import '../../assets/style/fade.css';
.head-trigger {
  font-size: 1.3rem;
  line-height: 3.6rem;
  padding: 0.3rem 0.8rem 0 1rem;
  cursor: pointer;
  transition: color 0.3s;
}
.head-trigger:hover {
  color: #000;
}

.head-logo {
  height: 3.6rem;
  text-align: center;
  display: flex;
  margin: 0 auto;
  align-items: center;
}
.head-title {
  font-size: 1.4rem;
  margin: 0 0.5rem;
  font-weight: 400;
}
.head-info {
  height: 3.6rem;
  font-size: 0.1rem;
  display: flex;
  float: right;
  align-items: center;
  padding-right: 1rem;
}
.head-info:hover {
  color: #000;
}
.head-menu {
  position: absolute;
  top: 4rem;
  right: 1.5rem;
  width: 8rem;
  height: 9rem;
  background-color: #fff;
  box-shadow: 0 0 3px #75797d;
  z-index: 1050;
}
.ant-menu-item:hover{
  background-color: #eae3e3;
}
.bounce-enter-active {
  animation: flipInX .5s;
}
.bounce-leave-active {
  animation: flipInX .5s reverse;
}

</style>