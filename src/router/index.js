import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/Home";
import Main from "@/components/Main"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[{
        path:'',
        component:Main
      },{
        path:'stock-base',
        component:HelloWorld
      },{
        path:'stock-focus',
        component:HelloWorld
      }]
    }
  ]
})
