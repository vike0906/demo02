<template>
  <div class="template">
    <div class="content">
      <a-row :gutter="{ xs: 8, sm: 16, md: 32, lg: 64, xl: 64}">
        <a-col class="home-card-warrpe" :xs="24">
          <div id="myChart" style="width:100%;height:500px"></div>
        </a-col>
      </a-row>
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
import * as api from "@/api/system";
import { formatDate } from "@/utils/util";
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data:function(){
    return {
      statistics:[]
    };
  },
  created(){
    //do nothing...
  },
  mounted(){
    this.getStatistics();
  },
  methods:{
    getStatistics(){
      api.getStatistics().then(response=>{
        if(response){
          this.statistics = response.content;
          this.drawLine();
        }
      }).catch(err=>{
        console.log(err);
      });
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        let data = this.statistics;

        let dateList = data.map(function (item) {
            return formatDate(item.date);
        });
        let valueList = data.map(function (item) {
            return item.count;
        });
        
        let option = {
            title: {
                left: 'center',
                text: '本月用户登录次数'
            },
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            }],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            legend: {
                    data:['访问量']
            },
            
            xAxis: {
                type: "category",
                data: dateList
            },
            yAxis: {
                type: "value",
                splitLine: {show: false}
            },
            
            series: {
                name: '访问次数',
                type: 'line',
                showSymbol: true,
                data: valueList
            }
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
  }
};
</script>
<style scoped>
.content {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 10px;
}
.home-card-warrpe {
  text-align: center;
}

.home-card {
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
.template {
  width: 100%;
  height: 100%;
}
</style>