import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/game",
    children: [
      {
        path: "/game",
        name: "Game",
        component: () => import("@/views/game/index"),
        meta: { title: "游戏管理", icon: "table" },
      },
    ],
  },
  {
    path: "/gameType",
    component: Layout,
    children: [
      {
        path: "index",
        name: "GameType",
        component: () => import("@/views/gameType/index"),
        meta: { title: "游戏类型管理", icon: "nested" },
      },
    ],
  },
  {
    path: "/platform",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Platform",
        component: () => import("@/views/platform/index"),
        meta: { title: "平台管理", icon: "tree" },
      },
    ],
  },

  {
    path: "/size",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Sizes",
        component: () => import("@/views/sizes/index"),
        meta: { title: "容量管理", icon: "example" },
      },
    ],
  },
  {
    path: "/order",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Order",
        component: () => import("@/views/order/index"),
        meta: { title: "订单管理", icon: "form" },
      },
    ],
  },
  {
    path: "/setting",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Setting",
        component: () => import("@/views/sets/index"),
        meta: { title: "显示配置", icon: "link" },
      },
    ],
  },
  {
    path: "/orderDetail/:id",
    name: "OrderDetail",
    component: () => import("@/views/orderDetail/index"),
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
