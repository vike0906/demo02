<template>
  <div class="login-body">
    <a-row>
      <a-col
        :xs="{span: 20, offset:2}"
        :sm="{span: 16, offset:4}"
        :md="{span: 14, offset:5}"
        :lg="{span: 12, offset:6}"
        :xl="{span: 10, offset:7}"
      >
        <div class="login-content">
          <div style="display:inline">
            <a-avatar :size="25" src="../../../static/logo.png" style="vertical-align: middle;" />
            <span style="font-size:1.5rem;vertical-align: middle;">Market Information Platform</span>
          </div>
          <h1 style="margin-top: 1.5rem;text-align: center;font-size: 2rem;">欢迎登陆</h1>
          <p style="margin-top: .5rem;font-size:1rem;color:#5e7d8a;">在下方输入登录名和密码</p>
          <a-row>
            <a-col
              :xs="{span: 22, offset:1}"
              :sm="{span: 16, offset:4}"
              :md="{span: 14, offset:5}"
              :lg="{span: 12, offset:6}"
              :xl="{span: 10, offset:7}"
            >
              <a-input
                class="login-name"
                v-model="loginName"
                @keyup.enter.native="login"
                placeholder="登陆名"
              />
              <a-input-password
                class="login-password"
                v-model="password"
                @keyup.enter.native="login"
                placeholder="密码"
              />
              <a-button type="primary" class="login-summit" :loading="loading" @click="login">登陆</a-button>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import * as api from "@/api/api";
export default {
  data: function() {
    return {
      loading: false,
      loginName: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      const that = this;
      let name = this.loginName;
      let password = this.password;
      if (name.length == 0) {
        this.$message.error("请输入登陆名");
        return;
      }
      if (password.length == 0) {
        this.$message.error("请输入密码");
        return;
      }
      this.loading = true;
      //访问后台，获取登录信息
      // let params = { name: name, password: password };
      // api.login(params)
      //   .then(response => {
      //     this.loading = false;
      //     if (response) {
      //       sessionStorage.setItem("user", JSON.stringify(response.data));
      //       this.$router.push({ path: "/home" });
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false; //请求失败后的处理函数
      //     console.log(err);
      //   });
      
        if (name == "admin" && password == "123456") {
          this.loading = false;
          let user = { name: "vike0906", token: "token" };
          sessionStorage.setItem("user", JSON.stringify(user));
          this.$router.push({ path: "/home" });
        }else{
            this.loading = false;
            this.$message.error("用户名或密码错误");
        }
    }
  }
};
</script>
<style scoped>
.login-name {
  margin-top: 2rem;
}
.login-password {
  margin-top: 1rem;
  text-align: left;
}
.login-summit {
  margin-top: 1rem;
  width: 100%;
}
.login-body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f6;
  /* background-color: #e8e8f0; */
}
.login-content {
  margin-top: 10rem;
  height: 20rem;
  color: #324148;
  /* background-color: #fff; */
}

@media only screen and (max-width: 639px) {
  .login-content {
    margin-top: 3rem;
  }
}
</style>