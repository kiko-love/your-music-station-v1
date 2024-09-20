import { createApp } from 'vue'
import { Howl, Howler } from 'howler'
import './styles/index.less'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import {
    wycomments,
    playMode, nowPlayMode, nowMusicInfo, defaultMusicInfo, nowSound,
    globalConfig, searchInfo, sideRoute, rankInfo, nowPlayList
} from './global'
const app = createApp(App)
app.use(nowMusicInfo)
app.config.globalProperties.$playMode = playMode
app.config.globalProperties.$nowMusicInfo = nowMusicInfo
app.config.globalProperties.$defaultMusicInfo = defaultMusicInfo
app.config.globalProperties.$nowPlayMode = nowPlayMode
app.config.globalProperties.$nowSound = nowSound
app.config.globalProperties.$globalConfig = globalConfig
app.config.globalProperties.$searchInfo = searchInfo
app.config.globalProperties.$rankInfo = rankInfo
app.config.globalProperties.$sideRoute = sideRoute
app.config.globalProperties.$nowPlayList = nowPlayList
app.config.globalProperties.$wycomments = wycomments
app.use(router)
app.use(Antd)
// errorHandler(app)
app.mount("#app")