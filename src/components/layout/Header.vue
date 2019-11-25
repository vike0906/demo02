<template>
  <div>
    <a-row>
      <a-col :xs="20" :sm="18" :md="12" :lg="7" :xl="5">
        <div class="head-logo">
          <a-icon
            class="head-trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            style="z-index:1051"
            @click="changeAsidebar()"
          ></a-icon>
          <a-avatar :size="25" src="../../../static/logo.png" />
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
          <div class="draw-down">
            <span style="font-size:1.1rem; margin:0 .5rem 0 .5rem;">{{userName}}</span>
            <a-icon type="down" />
          </div>
        </div>
        <div class="mask" v-if="showHeadMenu" @click="changeHeadMenu()"></div>
        <transition name="bounce">
          <div class="head-menu" v-if="showHeadMenu" @click="changeHeadMenu()">
            <a-menu slot="overlay">
              <a-menu-item>
                <router-link to="/home">
                <a-icon type="user" />
                <span>首页</span>
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <a-icon type="edit" />
                <span>修改密码</span>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/logout">
                <a-icon type="poweroff" />
                <span>退出登录</span>
                </router-link>
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
      showHeadMenu: false
    };
  },
  computed: {
    userName: function(){
      return JSON.parse(sessionStorage.getItem('user')).name;
    },
    collapsed: function() {
      let screenSize = this.$store.getters.getScreenSize;
      if(screenSize<=639){
        return this.$store.getters.getSiderShow;
      }else{
        return this.$store.getters.getAsidebarCollapse;
      }
    }
  },
  methods: {
    changeAsidebar: function() {
      let screenSize = this.$store.getters.getScreenSize;
      let asidebarCollapse = this.$store.getters.getAsidebarCollapse;
      if (screenSize <= 639) {
        if(asidebarCollapse){
          this.$store.commit("ASIDEBAR_COLLAPSE");
        }
        this.$store.commit("SIDER_SHOW");
      } else {
        this.$store.commit("ASIDEBAR_COLLAPSE");
      }
    },
    changeHeadMenu: function() {
      this.showHeadMenu = this.showHeadMenu ? false : true;
    }
  }
};
</script>
<style scoped>
@import "../../assets/style/fade.css";
.head-trigger {
  font-size: 1.1rem;
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
.ant-menu-item {
  text-align: left;
  margin-bottom: 0;
}
.ant-menu-item:hover {
  background-color: #eae3e3;
}
.bounce-enter-active {
  animation: flipInX 0.2s;
}
.bounce-leave-active {
  animation: flipInX 0.2s reverse;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1049;
}
.draw-down {
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 639px) {
  .draw-down {
    display: none;
  }
}
</style>