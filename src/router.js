import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/LlinkageChart',
      name: 'llinkagechart',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/LlinkageChart.vue')
    },
    {
      path:"/Temperature",
      name:"temperature",
      component:()=> import('./views/Temperature.vue')
    },
    {
      path:"/ColumnDefinition",
      name:"columndefinition",
      component:()=> import('./views/ColumnDefinition.vue')
    },
    {
      path:"/Score",
      name:"score",
      component:()=> import("./views/Score.vue")
    },
    {
      path:'/LogScale',
      name:"logscale",
      component: ()=> import("./views/LogScale.vue")
    },
    {
      path:"/CartColorMap",
      name:"cartcolormap",
      component: ()=> import("./views/CartColorMap.vue")
    },
    {
      path:'/LinearColorMap',
      name:'linearcolormap',
      component: ()=> import("./views/LinearColorMap.vue")
    },
    {
      path:'/Map1',
      name:'map1',
      component: ()=> import('./views/Map1.vue')
    },
    {
      path:'/Coord',
      name:'coord',
      component: ()=> import('./views/Coord.vue')
    },
    {
      path:'/Axis',
      name:'axis',
      component: ()=> import('./views/Axis.vue')
    },
    {
      path:'/CustomLabel',
      name:'customlabel',
      component: ()=> import('./views/CustomLabel.vue')
    },
    {
      path:'/Legend',
      name:'legend',
      component: ()=> import('./views/Legend.vue')
    },
    {
      path:'/Tooltip',
      name:'tooltip',
      component: ()=> import('./views/Tooltip.vue')
    },
    {
      path:'/Guide',
      name:'guide',
      component: ()=> import('./views/Guide.vue')
    },
    {
      path:'/Facet',
      name:'facet',
      component: ()=> import('./views/Facet.vue')
    },
    {
      path:'/Theme',
      name:'theme',
      component: ()=> import('./views/Theme.vue')
    },
    {
      path:'/Theme2',
      name:'theme2',
      component: ()=> import('./views/Theme2.vue')
    },
    {
      path:'/Label',
      name:'label',
      component: ()=> import('./views/Label.vue')
    },
    {
      path:'/ChartEvt',
      name:'chartevt',
      component: ()=> import('./views/ChartEvt.vue')
    },
    {
      path:'/Interaction',
      name:'interaction',
      component: ()=> import('./views/Interaction.vue')
    },
    {
      path:'/Slider',
      name:'slider',
      component: ()=> import('./views/Slider.vue')
    },
    {
      path:'/Synload',
      name:'synload',
      component: () => import("./views/Synload.vue")
    },
    {
      path:'/Shape',
      name:'shape',
      component: () => import("./views/Shape.vue")
    },
    {
      path:'/CustomAnimate',
      name:'customAnimate',
      component: () => import("./views/CustomAnimate.vue")
    }
  ]
})
