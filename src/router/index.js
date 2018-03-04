import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Orders from '@/components/Orders'
import OrderFeedback from '@/components/OrderFeedback'
Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Orders
    },
    {
      path: '/orders/:order_id/feedbacks',
      name: 'OrderFeedback',
      component: OrderFeedback
    },

  ]
})
