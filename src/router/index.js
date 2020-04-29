import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import RenderRouterView from "../components/RenderRouterView.vue";

// import { Button } from 'ant-design-vue';
import "ant-design-vue/dist/antd.less";
import antd from "ant-design-vue";

Vue.use(antd);
Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    // component: RenderRouterView,
    // 这个下面不一样是有单独的布局， 然后将router-view 放在 UserLayout 挂载了
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue")
      }
    ]
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"
              )
          }
        ]
      }
    ]
  },
  {
    path: "/form",
    name: "form",
    component: { render: h => h("router-view") },
    children: [
      // {
      // 	path: "/form/basic-form",
      // 	redirect: "/dashboard/analysis"
      // },
      {
        path: "/form/basic-form",
        name: "basicform",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm.vue")
        // children: [
        // 	{
        // 		path: "/dashboard/analysis",
        // 		name: "analysis",
        // 		component: () =>
        // 			import(/* webpackChunkName: "form" */ "../views/Dashboard/Analysis.vue")
        // 	}
        // ]
        //
      }
    ]
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
