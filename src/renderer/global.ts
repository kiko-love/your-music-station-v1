import { createStore } from 'vuex'

const playMode = [
    {
        mode: 0,
        name: '列表循环'
    },
    {
        mode: 1,
        name: '单曲循环'
    },
    {
        mode: 2,
        name: '随机播放'
    }
]

const nowPlayMode = {
    mode: 2,
    name: '随机播放'
}

const onChange = (page: number, pageSize: number) => {
    searchInfo.state.paginationSetting.current = page
};

const onChange_rank = (page: number, pageSize: number) => {
    rankInfo.state.paginationSetting.current = page
};

const wycomments = createStore({
    state() {
        return {
            id: '0',
            loading: true,
            commentList: []
        }
    }
})

const rankInfo = createStore({
    state() {
        return {
            paginationSetting: {
                size: 'small',
                pageSizeOptions: [],
                hideOnSinglePage: true,
                showSizeChanger: false,
                defaultCurrent: 1, // 默认的当前页数
                current: 1, // 当前页数
                onChange: onChange_rank,
            }
        }
    }
})

const searchInfo = createStore({
    state() {
        return {
            keyword: '',
            keyword_tmp: '',
            pageHeaderSubtitle:'',
            pageHeadertitle:'搜索结果',
            radioValue:'0',
            mv_list:[],
            inputing:false,
            mv_searching:false,
            video_list:[],
            res_list: [],
            rank_list: [],
            firstSearch: false,
            searchTableshowv2: false,
            r_loading: true,
            loading: false,
            historyData: Array.from([]),
            paginationSetting: {
                size: 'small',
                pageSizeOptions: [],
                hideOnSinglePage: true,
                showSizeChanger: false,
                defaultCurrent: 1, // 默认的当前页数
                current: 1, // 当前页数
                onChange,
            }
        }
    },
    mutations: {
        setStatus(state: any, list: any) {
            state.res_list = list
            state.loading = false
        },
        setRankList(state: any, list: any) {
            state.rank_list = list
            state.r_loading = false
        },
        setHistoryData(state: any, list: any) {
            state.historyData = list
        }
    }
})

const nowPlayList = createStore({
    state() {
        return {
            list: []
        }
    },
    mutations: {
        setList(state: any, list: any) {
            state.list = list
        }
    }
})

const sideRoute = createStore({
    state() {
        return {
            current: ['homeIndex_0'],
            collapsed: false,
            skin: {
                id: 0,
                rgb: '171, 84, 90'
            }
        }
    },
    mutations: {
        setPath(state: any, path: any) {
            state.current = path
        },
    }
})

const nowMusicInfo = createStore({
    state() {
        return {
            playBtn: {
                isPlay: false,
                playIcon: "CaretRightOutlined",
                pauseIcon: "PauseOutlined"
            },
            currentLyric: '',
            m_playPage: null,
            m_contronl: null,
            m_canvas: null,
            mv_playing: false,
            mv_id: 0,
            mv_url: null,
            mv_getting: false,
            music_id: 0,
            music_name: '你的点歌台',
            music_singger: ['悦享每一刻'],
            music_album: null,
            music_tns: null,
            music_picUrl: '',
            music_cover_picUrl: '',
            music_under_picUrl: '',
            music_small_picUrl: '',//打包时需要修改此处为./logo.png才能正确显示logo
            music_alia: null,
            music_lrc: [],
            bool_tlrc: false,
            show_tlrc: false,
            music_allTime: null,
            music_nowTime: null,
            currentRow: -1,
            playLocation: 0,
            music_process: 0,
            music_process_lastValue: 0,
            music_volume: 80,
            record_volume: 80,
            totalSeconds: 0,
            foot_info: '',
            haveInfo: false,
            ischanging: false,
            loadingAudioInfo: false,
            isWheeling: false,
            realIP: '116.25.146.177',
            isInit: true,
            atx:{
                ctx:null,
                source:null,
                isConnect:false,
                analyser:null,
            },
            showPP:true,
        }
    },
    mutations: {
        setAll(state: any, newMusicInfo: any) {
            state.mv_id = newMusicInfo.mv_id
            state.music_id = newMusicInfo.music_id
            state.music_name = newMusicInfo.music_name
            state.music_singger = newMusicInfo.music_singger
            state.music_album = newMusicInfo.music_album
            state.music_tns = newMusicInfo.music_tns
            state.music_picUrl = newMusicInfo.music_picUrl
            state.music_cover_picUrl = newMusicInfo.music_cover_picUrl
            state.music_small_picUrl = newMusicInfo.music_small_picUrl
            state.music_alia = newMusicInfo.music_alia
            state.music_lrc = newMusicInfo.music_lrc
            state.music_nowTime = newMusicInfo.music_nowTime
            state.haveInfo = newMusicInfo.haveInfo
            state.currentRow = newMusicInfo.currentRow
            state.loadingAudioInfo = false
        },
        setLrc(state, lrc) {
            state.music_lrc = lrc
        },
        setAllTime(state, time) {
            state.music_nowTime = '00:00'
            state.music_allTime = time
        },
        setUnderImgUrl(state) {
            state.music_under_picUrl = state.music_picUrl
        },
    }
})

const globalConfig = {
    //个人打赏码
    rewardImage: 'https://pic.imgdb.cn/item/619b52cc2ab3f51d918357a3.jpg',
}

const nowSound = {
    axt: null,
    //当前播放的sound资源
    sound: null,
    //加载成功标志
    flag: true,

    istry: false,
    //当前播放的soundId
    currentMusicId: -110,
    music_interval: null,
    //循环监听时间间隔
    music_interval_step: 800,
    //试听歌曲截取信息，用于同步歌词
    freeTrialInfo: {
        start: 0,
        end: 0
    },
}

//默认musicInfo模板对象
const defaultMusicInfo = {
    music_name: '',
    music_singger: [],
    music_album: null,
    music_picUrl: '',
    music_small_picUrl: '',
    music_alia: null,
    music_lrc: [],
    music_allTime: '00:00',
    music_nowTime: '00:00',
    currentRow: 0,
    playLocation: 0,
    haveInfo: false,
    ischanging: false,
}

export { wycomments, playMode, nowPlayMode, nowMusicInfo, defaultMusicInfo, nowSound, globalConfig, searchInfo, sideRoute, rankInfo, nowPlayList }