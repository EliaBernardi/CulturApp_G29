const routes = [
  { path: '/', component: home },
  { path: '/employee', component: employee },
  { path: '/ticket', component: ticket }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')