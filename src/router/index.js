import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import CustomTree from '@/pages/CustomTree'
import TreeCompactBox from '@/pages/TreeCompactBox'
import demo1 from '@/pages/demo1'
import demo2 from '@/pages/demo2'
import demo3 from '@/pages/demo3'
 
 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/customTree',
      name: 'customTree',
      component: CustomTree
    },
    {
      path: '/treeCompactBox',
      name: 'treeCompactBox',
      component: TreeCompactBox
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: demo1
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: demo2
    },
    {
      path: '/demo3',
      name: 'demo3',
      component: demo3
    }
  ]
})
