<template>
  <div class="template">
    
    <div class="content">
      <a-row :gutter="{ xs: 8, sm: 16, md: 32, lg: 64, xl: 64}">
        <a-col class="home-card-warrpe" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <a-card class="home-card" title="本月访问次数" :bordered="false">
            <p>32</p>
          </a-card>
        </a-col>
        <a-col class="home-card-warrpe" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <a-card class="home-card" title="上月访问次数" :bordered="false">
            <p>123</p>
          </a-card>
        </a-col>
        <a-col class="home-card-warrpe" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <a-card class="home-card" title="当前任务数量" :bordered="false">
            <p>3</p>
          </a-card>
        </a-col>
        <a-col class="home-card-warrpe" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <a-card class="home-card" title="全部任务数量" :bordered="false">
            <p>12</p>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.content {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 10px;
}
.home-card-warrpe{
  text-align: center;
}

.home-card{
  padding-top: 10px;
  font-size: 1.2rem;
  text-align: left;
  box-shadow: 3px 3px 5px #7f8183;
  /* width: 300px; */
  /* background-color: aquamarine */
}
/* .home-card .ant-card-head{
  font-size: 1.2rem;
  text-align: left;
} */
.template{
    width: 100%;
    height: 100%;
}
</style>