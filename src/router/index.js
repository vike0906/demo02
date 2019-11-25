import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/Home";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[{
        path:'',
        component:()=>import('@/components/Index')
      },{
        path:'stock-base',
        component:()=>import('@/components/stock/StockBase')
      },{
        path:'stock-focus',
        component:()=>import('@/components/stock/StockFocus')
      },{
        path:'system-user',
        component:()=>import('@/components/system/User')
      },{
        path:'system-role',
        component:()=>import('@/components/system/Role')
      },{
        path:'system-permission',
        component:()=>import('@/components/system/Permission')
      },]
    }
  ]
})
