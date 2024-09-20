import { createPinia } from 'pinia'
import { createStore, createLogger } from 'vuex'
import nowMusicInfo from './modules/nowMusicInfo'
const debug = process.env.NODE_ENV !== 'production'
const store = createPinia()

export default createStore({
    modules: {
        nowMusicInfo,
    },
    
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
