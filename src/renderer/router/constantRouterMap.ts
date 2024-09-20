import { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import("@renderer/components/common/appTop.vue"),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'appSide',
                component: () => import("@renderer/components/AppSider.vue"),
                redirect: '/home/index',
                children: [
                    {
                        path: '/home/index',
                        name: 'homeIndex',
                        component: () => import('@renderer/components/playPage.vue'),
                        meta: {
                            keepAlive: true // 需要缓存页面
                        }
                    },
                    {
                        path: '/home/search',
                        name: 'search',
                        component: () => import('@renderer/components/searchTable/searchTablev2.vue'),
                        meta: {
                            keepAlive: true // 需要缓存页面
                        }
                    },
                    {
                        path: '/home/rank',
                        name: 'rank',
                        component: () => import('@renderer/components/rank/rankv2.vue'),
                        meta: {
                            keepAlive: true // 需要缓存页面
                        }
                    },
                    {
                        path: '/home/mvideo',
                        name: 'mvideo',
                        component: () => import('@renderer/components/mvideo/index.vue'),
                        meta: {
                            keepAlive: false // 需要缓存页面
                        }
                    },
                    {
                        path: '/home/playlist',
                        name: 'playlist',
                        component: () => import('@renderer/components/playList/index.vue'),
                        meta: {
                            keepAlive: true // 需要缓存页面
                        }
                    },
                    {
                        path: '/home/history',
                        name: 'history',
                        component: () => import('@renderer/components/history/index.vue'),
                        meta: {
                            keepAlive: true // 需要缓存页面
                        }
                    },
                    {
                        path: '/home/like',
                        name: 'like',
                        component: () => import('@renderer/components/like/index.vue'),
                        meta: {
                            keepAlive: true // 需要缓存页面
                        }
                    },
                    {
                        path: '/home/about',
                        name: 'about',
                        component: () => import('@renderer/components/about/about.vue'),
                        meta: {
                            keepAlive: true // 需要缓存页面
                        }
                    }
                ]
            }
        ]
    }
]

export default routes