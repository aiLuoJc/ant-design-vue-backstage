import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
// 引入loading之类的动画
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
// import Home from "../views/Home";
import NotFound from "../views/404";
import Forbidden from "../views/403";
// import RenderRouterView from "../components/RenderRouterView";

// import { Button } from 'ant-design-vue';
import "ant-design-vue/dist/antd.less";
import antd from "ant-design-vue";
import { check, isLogin } from "../utils/auth";
// import { TabPane } from "ant-design-vue/types/tabs/tab-pane";

Vue.use(antd);
Vue.use(VueRouter);
Vue.use(Nprogress);
const routes = [
  {
    path: "/user",
    hideInMenu: true, // 在菜单数据递归的时候，不希望个别的信息显示在上面，根据这个字段递归生成要显示的数据
    // component: RenderRouterView,
    // 这个下面不一样是有单独的布局， 然后将router-view 放在 UserLayout 挂载了
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register")
      }
    ]
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        // 添加信息  我们还需要显示对应菜单图标、名称等
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              )
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenInMenu: true, //不希望下面的路由渲染到菜单上，添加这个字段(子路由隐藏后，如果在访问下面的时候依然希望我的菜单能够选中父路由，后期还需要做些配置)
            meta: { title: "分步表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // 页面切换添加的加载条
  if (to.path !== from.path) {
    Nprogress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && Touch.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      this.$notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。"
      });
      next({
        path: "/403"
      });
    }
    Nprogress.done();
  }
  next();
});

router.afterEach(() => {
  Nprogress.done();
});
export default router;
