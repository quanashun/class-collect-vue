import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

let routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/console/class-collect"
    },
    {
        path: "/console",
        component: ()=>import("../views/console.vue"),
        children: [
            {
                path: "class-collect",
                name: "class-collect",
                component: () => import("../views/ClassCollect.vue")
            },
            {
                path: "publish-task",
                name: "publish-task",
                component: () => import("../views/PublishTask.vue")
            },
            {
                path: "task-result/:taskId",
                name: "task-result",
                component: () => import("../views/TaskResult.vue")
            },
            {
                path: "item2",
                name: "item2",
                component: () => import("../views/item2.vue")
            }
        ]
    },
    {
        path: "/task/:taskId",
        name: "task",
        component: ()=>import("../views/task.vue")
    },
    {
        path: "/login",
        name: "login",
        component: ()=>import("../views/login.vue")
    },
    {
        path: "/register",
        name: "register",
        component: ()=>import("../views/register.vue")
    }
]

const router = createRouter({history: createWebHashHistory(), routes})

export default router;
