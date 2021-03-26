import Vue from 'vue';

import VueRouter from 'vue-router';

import Home from './Home.vue';

Vue.use(VueRouter);

// 1. 라우트 컴포넌트 정의
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

// 2. 라우트 정의 (component는 Vue.extend()를 통해 만들어진 )
// 실제 컴포넌트 생성자이거나 컴포넌트 옵션 객체
const routes = [
  {
    path: '/foo',
    component: Foo,
  },
  {
    path: '/bar',
    component: Bar,
  },
];

// 3. `routes`옵션과 함께 router 인스턴스를 만듦
const router = new VueRouter({
  routes,
});

new Vue({
  router,
}).$mount('#app');
