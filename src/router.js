import Vue from 'vue'
import Router from 'vue-router'
import Ordering from './views/Ordering'
import Startpage from "./views/Startpage";
import Checkout from "./views/Checkout";

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: "/",
            meta: {
                title: 'Startpage'
            },
            name: 'Krafty Burgers',
            component: Startpage
        },
        {
            path: '/ordering',
            meta: {
                title: 'Kraft Burgers',
            },
            name: 'ordering',
            component: Ordering
        },
        {
            path: "/checkout",
            meta: {
                title: "Checkout"
            },
            name: "Checkout",
            component: Checkout
        },
        {
            path: '/kitchen',
            meta: {
                title: 'Kitchen',
            },
            name: 'kitchen',
            // route level code-splitting
            // this generates a separate chunk (read.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "read" */ './views/Kitchen.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next()
});

export default router;