import { Howl, Howler } from "howler"
import convertSec from "@renderer/utils/convertSecends";
import { timestampToTime } from "@renderer/utils/timestampToTime";
import contronl from "@renderer/components/contronl.vue"
import { setRecord } from '@renderer/utils/playSongRecord'
import { message } from "ant-design-vue";
import request from '@renderer/utils/request'
const wyapi = ''
/**
 * 
 * @param strIn
 * @author kikolove
 */
const isEmpty = function (strIn: any) {
  if (strIn === undefined) {
    return true
  } else if (strIn == null) {
    return true
  } else if (strIn == "") {
    return true
  } else {
    return false
  }
}
/**
 * 
 * @param a 
 * @param b 
 * @author kikolove
 */
const sortRule = function (a, b) {
  //设置排序规则
  return a.time - b.time
}
/**
 * 
 * @param text 
 * @param trans_text
 * @author kikolove 
 */
const formatLyric = function (text: any, trans_text: any) {
  let istrans = false
  let t_lyric = []
  let lyric = []
  if (!isEmpty(trans_text)) {
    istrans = true
  }
  //处理翻译歌词
  if (istrans) {
    let t_arr = trans_text.split("\n") //原歌词文本已经换好行了方便很多，直接通过换行符“\n”进行切割
    let t_row = t_arr.length; //获取歌词行数
    for (let i = 0; i < t_row; i++) {
      let temp_t_row = t_arr[i] //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world"
      let temp_t_arr = temp_t_row.split("]") //可以通过“]”对时间和文本进行分离
      let t_text = temp_t_arr.pop() //把歌词文本从数组中剔除出来，获取到歌词文本了！
      // if (t_text === "") {
      //   continue
      // }
      //再对剩下的歌词时间进行处理
      temp_t_arr.forEach(element => {
        let obj = <any>{}
        let time_arr = element.substr(1, element.length - 1).split(":") //先把多余的“[”去掉，再分离出分、秒
        let s =
          Number(Number(time_arr[0]) * 60 - 0 + parseFloat(parseFloat(time_arr[1].substr(0, 6)).toFixed(3))) //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
        obj.time = s
        obj.text = t_text
        // if(obj.text !== ''){
        //   t_lyric.push(obj)
        // } //每一行歌词对象存到组件的lyric歌词属性里
        t_lyric.push(obj)
      })
    }
    t_lyric.sort(sortRule) //由于不同时间的相同歌词给排到一起了，所以这里要以时间顺序重新排列一下
  }
  //处理原歌词
  let arr = text.split("\n") //原歌词文本已经换好行了方便很多，直接通过换行符“\n”进行切割
  let row = arr.length //获取歌词行数
  let t_start = istrans ? Number.isNaN(t_lyric[0].time) ? 1 : 0 : 0
  for (let i = 0; i < row; i++) {
    let temp_row = arr[i] //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world"
    let temp_arr = temp_row.split("]") //可以通过“]”对时间和文本进行分离
    let text = temp_arr.pop() //把歌词文本从数组中剔除出来，获取到歌词文本了！

    // if (text === "") {
    //   continue
    // }
    //再对剩下的歌词时间进行处理
    temp_arr.forEach(element => {
      let obj = <any>{}
      let time_arr = element.substr(1, element.length - 1).split(":") //先把多余的“[”去掉，再分离出分、秒
      let s =
        Number(Number(time_arr[0]) * 60.0 - 0 + parseFloat(parseFloat(time_arr[1].substr(0, 6)).toFixed(3)))//把时间转换成与currentTime相同的类型，方便待会实现滚动效果
      obj.time = s
      obj.text = text
      // if (obj.text !== "") {
      //   lyric.push(obj) //每一行歌词对象存到组件的lyric歌词属性里
      // }
      lyric.push(obj)
    })
  }
  //以时间顺序重新排列
  lyric.sort(sortRule)

  //匹配原歌词和翻译歌词（针对网易云无规律的歌词源需要采用此算法）
  return matchTransLric(istrans, lyric, t_lyric, t_start);
}

/**
 * 
 * @param istrans 
 * @param lyric 
 * @param t_lyric 
 * @param t_start 
 * @author kikolove
 */
const matchTransLric = function (istrans: boolean, lyric: any, t_lyric: any, t_start: number) {
  let res_lyric = []
  let lastLocaltion = 0
  let resLrcInfo = <any>{}
  let count = 0
  let m_step = 0
  t_start = t_start ? t_start : 0
  if (istrans) {
    //找出翻译歌词第一句出现的位置，便于后续匹配算法的优化
    for (let k = 0; k < lyric.length; k++) {
      if (Math.abs(lyric[k].time - t_lyric[t_start].time) < Number.EPSILON) {
        m_step = k
        break
      }
    }
    for (let i = 0; i < lyric.length; i++) {
      let obj = <any>{}
      obj.time = lyric[i].time
      obj.text = lyric[i].text
      for (let j = lastLocaltion; j < t_lyric.length; j++) {
        if (i < m_step || lyric[i].text === ''
          || lyric[i].text.indexOf("作词") !== -1
          || lyric[i].text.indexOf("作曲") !== -1
          || lyric[i].text.indexOf("编曲") !== -1) break
        count++
        if (Math.abs(lyric[i].time - t_lyric[j].time) < Number.EPSILON) {
          obj.t_text = t_lyric[j].text
          lastLocaltion = j
          if (obj.t_text === '') {
            obj.diff = false
          } else {
            obj.diff = true
          }
          break
        } else {
          obj.t_text = ''
        }
      }
      res_lyric.push(obj)
    }
  } else {
    res_lyric = lyric
  }

  if (res_lyric.length === 0) {
    istrans = false
  }
  //过滤空白歌词
  const filtered = res_lyric.filter((value, index, arr) => {
    return value.text !== '';
  })

  resLrcInfo.res_lyric = filtered
  resLrcInfo.haveTrans = istrans
  console.log('count(翻译歌词匹配次数):', count)
  return resLrcInfo
}

/**
 * 
 * @param songid 
 * @author kikolove
 */
const getMusicLrc = async function (songid: any) {
  try {
    const response = await
      request({
        url: wyapi + "/lyric?id=" + songid,
        method: 'post'
      })
    let data = {
      lrc: null,
      tlyric: null
    };
    data = response.data
    const lyric = data.lrc.lyric ? data.lrc.lyric : []
    const tlyric = data.tlyric ? data.tlyric : null
    const m_tlyric = tlyric ? tlyric.lyric : null
    return formatLyric(lyric, m_tlyric);
  } catch (error) {
    console.log(error);
  }
}

/**
 * 
 * @param songid 
 * @param defaultMusicInfo
 * @author kikolove 
 */
const getMusicInfo = async function (songid: any, defaultMusicInfo: any) {
  if (isEmpty(songid)) return null
  try {
    const response = await
      request({
        url: wyapi + "/song/detail?ids=" + songid,
        method: 'post'
      })
    let data = {
      songs: []
    }
    data = response.data
    const m_lyricInfo = await getMusicLrc(songid);
    const m_lyric = m_lyricInfo.res_lyric
    const bool_t_lyric = m_lyricInfo.haveTrans
    let newMusicInfo = JSON.parse(JSON.stringify(defaultMusicInfo));
    newMusicInfo.music_picUrl = data.songs[0].al.picUrl + '?param=650x650';
    newMusicInfo.music_small_picUrl = data.songs[0].al.picUrl + '?param=65x65';
    newMusicInfo.music_cover_picUrl = data.songs[0].al.picUrl + '?param=260x260';
    newMusicInfo.music_album = data.songs[0].al.name;
    newMusicInfo.music_name = data.songs[0].name;
    newMusicInfo.music_tns = data.songs[0].tns;
    newMusicInfo.mv_id = data.songs[0].mv;
    newMusicInfo.music_id = songid;
    newMusicInfo.music_alia = data.songs[0].alia[0];
    newMusicInfo.music_lrc = m_lyric;
    newMusicInfo.haveInfo = true;
    newMusicInfo.bool_t_lyric = bool_t_lyric;
    newMusicInfo.currentRow = 0;

    for (let i in data.songs[0].ar) {
      newMusicInfo.music_singger.push(data.songs[0].ar[i].name);
    }
    return newMusicInfo
  } catch (error) {
    console.log(error);
    message.error("歌曲信息获取失败" + error)
    throw new Error('歌曲信息获取失败')
  }
}
//截取歌词片段，没写完，主要现在不知道拿来干嘛
const cutSongLrc = async function (lrcArray: any, start: number, end: number) {
  let startIndex = 0
  let endIndex = 0
}


/**
 * 使用该接口需要先将服务器版本更新至最新（暂时没适配，无效方法）
 * @param songid 
 * @param volume 
 * @author kikolove
 */
const getMusicaudio_bak = async function (songid: any, volume: any) {
  try {
    const response = await fetch("wyapi/song/download/url?id=" + songid);
    const data = await response.json();
    let songUrl = data.data.url;
    let freeTrialInfo = data.data.freeTrialInfo;

    if (songUrl === null) {
      return Promise.resolve(null);
    }
    let soundInfo = <any>{}
    const sound = new Howl({
      src: [songUrl],
      volume: volume / 100.0,
      html5: true,
      format: ['mp3', 'm4a'],
    });

    soundInfo.sound = sound
    soundInfo.freeTrialInfo = freeTrialInfo
    return Promise.resolve(soundInfo);
  } catch (error) {
    console.log(error);
  }
}

/**获取歌曲评论默认99条
 * sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 * @param songid 
 * @param sortType 
 */
const getComment = async (songid: any, sortType: number = 2, realIP: any) => {
  if (isEmpty(songid)) {
    return null
  } else {
    try {
      const response = await
        request({
          url: wyapi + "/comment/new?type=0&id=" + songid + '&pageSize=99' + '&realIP=' + realIP,
          method: 'post'
        })
      let data = {
        data: null
      }
      data = response.data
      let comments = data?.data.comments
      comments.forEach(element => {
        const date = timestampToTime(element.time)
        const newDate = date.Y + '年' + date.M + '月' + date.D + '日' + ' ' + date.h + ':' + date.mm
        element.time = newDate
      });
      return Promise.resolve(comments)
    } catch (error) {
      console.log(error)
      message.error('评论获取失败：' + error)
      throw new Error('评论获取失败')

    }
  }
}

/**
 * 
 * @param rec 
 * @author kikolove
 */
const getsongAllName = function (rec: any) {
  if (!isEmpty(rec.alias)) {
    return rec.songName + '（' + rec.alias[0] + '）'
  } else if (!isEmpty(rec.transNames)) {
    return rec.songName + '（' + rec.transNames[0] + '）'
  } else {
    return rec.songName
  }
}

/**
 * 
 * @param songid 
 * @param volume 
 * @param vue 
 * @param tnum 
 * @param istry 
 * @author kikolove
 */
const getMusicaudio = async function (songid: any, volume: any, vue: any, tnum: number, istry: boolean = false) {
  if (isEmpty(songid)) return null
  try {
    const response = await
      request({
        url: wyapi + "/song/url?id=" + songid + '&timestamp=' + Date.now()
          + '&realIP=' + vue.$nowMusicInfo.state.realIP,
        method: 'post',
        withCredentials: true
      })
    let data = {
      data: []
    }
    data = response.data
    const fee = data.data[0].fee
    let tryNum = tnum ? tnum : 1
    let songUrl = data.data[0].url ? data.data[0].url : ''
    let freeTrialInfo = data.data[0].freeTrialInfo ? data.data[0].freeTrialInfo : null
    if (tryNum > 3) {
      vue.$nowMusicInfo.state.foot_info = '😥歌曲资源失效或平台无版权，请重新尝试'
      vue.$nowMusicInfo.state.ischanging = false;
      return Promise.resolve(null)
    }
    if (songUrl === null) {
      tryNum += 1
      vue.$nowMusicInfo.state.foot_info = tryNum > 1 ? '歌曲URL过期，正在刷新...（' + tryNum + '）' : '歌曲URL过期，正在刷新...'
      return Promise.resolve(getMusicaudio(songid, volume, vue, tryNum, true))

    }

    if (vue.$nowSound.sound) {
      vue.$nowSound.sound.unload()
    }
    const mformat = ["mp3", "MP3", "mpeg", "opus", "ogg", "oga", "wav", "aac", "caf", "m4a", "m4b", "mp4", "weba", "webm", "dolby", "flac"]
    let soundInfo = <any>{}
    let sound = <any>{}
    if (songUrl === '') {
      songUrl = 'https://music.163.com/song/media/outer/url?id=' + songid + '.mp3'
    }
    if (vue.$nowSound.sound !== null) {
      sound = vue.$nowSound.sound
      sound.unload()
    }

    sound = new Howl({
      src: [songUrl],
      volume: volume / 100.0,
      html5: true,
      preload: 'metadata',
      loop: true,
      format: mformat,
    })
    // 如果存在source，重新设置src
    if (vue.$nowMusicInfo.state.atx.source) {
      vue.$nowMusicInfo.state.atx.source.mediaElement.src = songUrl;
    } else {
      // 创建 AnalyserNode
      vue.$nowMusicInfo.state.atx.ctx = new AudioContext();
      vue.$nowMusicInfo.state.atx.analyser = vue.$nowMusicInfo.state.atx.ctx.createAnalyser();
      vue.$nowMusicInfo.state.atx.isConnect = false;// 判断是否已经连接
      vue.$nowMusicInfo.state.atx.analyser.fftSize = 2048;
      if (!vue.$nowMusicInfo.state.atx.isConnect) {
        vue.$nowMusicInfo.state.atx.source = vue.$nowMusicInfo.state.atx.ctx.createMediaElementSource(sound._sounds[0]._node);
        vue.$nowMusicInfo.state.atx.source.connect(vue.$nowMusicInfo.state.atx.analyser);
        vue.$nowMusicInfo.state.atx.analyser.connect(vue.$nowMusicInfo.state.atx.ctx.destination);
        vue.$nowMusicInfo.state.atx.isConnect = true;
      }
    }

    // 绘制频谱图
    const canvas = vue.$nowMusicInfo.state.m_canvas;
    const bufferLength = vue.$nowMusicInfo.state.atx.analyser.frequencyBinCount;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const canvasContext = canvas.getContext('2d');
    const dataArray = new Uint8Array(vue.$nowMusicInfo.state.atx.analyser.frequencyBinCount);
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--defaultPrimaryColor');
    // 获取频率数据并绘制频谱图
    function draw() {
      requestAnimationFrame(draw);
      vue.$nowMusicInfo.state.atx.analyser.getByteFrequencyData(dataArray);
      // 清空 Canvas。
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      // 计算每个条形的宽度。
      const barWidth = canvas.width / bufferLength * 15;
      const primaryColor = rootStyles.getPropertyValue('--defaultPrimaryColor-8');
      // 绘制频谱图。
      for (let i = 0; i < bufferLength / 15; i++) {
        // 计算当前条形的高度。
        const barHeight = dataArray[i] * canvas.height / 255 / 2;
        // 计算当前条形的颜色（从中间往两边渐变）。
        // const red = Math.sin(i * Math.PI / bufferLength) * 255;
        // const green = Math.cos(i * Math.PI / bufferLength) * 255;
        // const blue = 255;
        // 设置当前条形的样式（白色填充、模糊边缘）。

        canvasContext.fillStyle = primaryColor;
        canvasContext.shadowBlur = 5;
        canvasContext.shadowColor = primaryColor;
        // 绘制当前条形。
        canvasContext.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
      }
    }
    // 开始播放音频并开始绘制频谱图
    draw();



    let atx = <any>{}
    soundInfo.songUrl = songUrl
    soundInfo.atx = atx
    soundInfo.sound = sound
    soundInfo.freeTrialInfo = freeTrialInfo ? freeTrialInfo : null
    soundInfo.flag = true
    //注册音频流失败事件
    sound.on("loaderror", function () {
      soundInfo.flag = false
      console.log("----加载失败---", sound.state(), tryNum);
      clearInterval(vue.$nowSound.music_interval);
      vue.$nowMusicInfo.state.playBtn.isPlay = false;
      vue.$nowMusicInfo.state.ischanging = false;
      sound.unload()
      vue.$nowMusicInfo.state.foot_info = tryNum > 1 ? '歌曲URL过期，正在刷新...（' + tryNum + '）' : '歌曲URL过期，正在刷新...'
      tryNum += 1
      getMusicaudio(songid,
        vue.$nowMusicInfo.state.music_volume,
        vue, tryNum, true)
    });
    //注册加载流成功事件
    sound.on("load", function () {
      soundInfo.flag = true
      console.log("----加载成功---", sound.state(), tryNum);
      //判断当前歌曲源是否成功返回
      if (soundInfo !== null && soundInfo.sound !== null) {
        vue.$nowSound.sound = soundInfo.sound;
        vue.$nowSound.flag = soundInfo.flag;
        vue.$nowSound.freeTrialInfo = soundInfo.freeTrialInfo;
      } else {
        vue.$nowMusicInfo.state.foot_info = "获取歌曲资源失败，请重新尝试...";
        return Promise.resolve(soundInfo);
      }
      //计算音频总长度
      if (soundInfo.freeTrialInfo !== null) {
        vue.$nowMusicInfo.commit("setAllTime", convertSec(
          vue.$nowSound.sound.duration(vue.$nowSound.currentMusicId) +
          vue.$nowSound.freeTrialInfo.start, vue
        ))
      } else {
        vue.$nowMusicInfo.commit("setAllTime", convertSec(
          soundInfo.sound.duration(vue.$nowSound.currentMusicId), vue
        ))
      }
      if (istry) {
        const cistry = istry
        tryNum = 1
        istry = false
        vue.$nowSound.sound = soundInfo.sound;
        vue.$nowSound.flag = soundInfo.flag;
        vue.$nowSound.freeTrialInfo = soundInfo.freeTrialInfo;
      }
      //判断当前歌曲源是否为试听片段
      if (!isEmpty(vue.$nowSound.freeTrialInfo)) {
        vue.$nowMusicInfo.state.foot_info = "📀正在试听VIP歌曲片段";
      } else {
        vue.$nowMusicInfo.state.foot_info = "";
      }
      //若歌曲源加载成功则调用播放组件，否则不做操作
      if (soundInfo.flag) {
        vue.$nowMusicInfo.state.ischanging = false;
        vue.$nowMusicInfo.state.haveInfo = true;
        vue.$nowSound.currentMusicId = -110
        //二次调整歌曲音量为当前用户音量
        vue.$nowSound.sound.volume(vue.$nowMusicInfo.state.music_volume / 100);
        setRecord(vue.$nowMusicInfo.state)

        if (vue.$nowMusicInfo.state.isInit) {
          vue.$nowMusicInfo.state.isInit = false
          vue.$nowMusicInfo.state.ischanging = false;
        }
        contronl.methods.changePlayStatus(vue);

      }

    });
    return Promise.resolve(soundInfo)
  } catch (error) {
    console.log(error)
    vue.$nowMusicInfo.state.ischanging = false;
    message.error('歌曲源加载失败' + error)
    throw new Error('歌曲源加载失败')
  }
}

/**
 * 获取mv数据
 * @param mvid 
 * @author kikolove
 */
const getMv = async function (mvid: any) {
  try {
    const response = await request({
      url: wyapi + "/mv/url?id=" + mvid,
      method: 'post'
    })
    let data = { data: null }
    data = response.data
    let mvInfo = <any>{}
    mvInfo = data?.data
    return Promise.resolve(mvInfo)

  } catch (error) {
    console.log(error)
    message.error('MV加载失败' + error)
    throw new Error('MV加载失败')
  }
}
/**
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 
 * 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * @param q 
 */
const searchMv = async function (q: any) {
  try {
    const response = await
      request({
        url: wyapi + "/cloudsearch?keywords=" + q + "&type=1004",
        method: 'post'
      })
    let data = {
      result: null
    }
    data = response.data
    let mvInfo = <any>{}
    mvInfo = data?.result
    return Promise.resolve(mvInfo)
  } catch (error) {
    console.log(error)
    message.error('MV数据集异常' + error)
    throw new Error('MV数据集异常')
  }
}

/**
 * 热搜关键词
 * @author kikolove
 */
const getHotDetail = async function () {
  try {
    const response = await request({
      url: wyapi + "/search/hot/detail",
      method: 'post'
    })
    let data = {
      data: null
    }
    data = response.data
    let data_detail = data?.data
    return Promise.resolve(data_detail)
  } catch (error) {
    console.log(error)
    message.error('热搜关键词获取失败' + error)
    throw new Error('热搜关键词获取失败')
  }
}

/**
 * 获取网易云排行榜数据
 * @param rankid 
 * @author kikolove
 */
const getRanking = async function (rankid: any) {
  try {
    const response = await request({
      url: wyapi + "/playlist/detail?id=" + rankid,
      method: 'post'
    })
    let data = {
      playlist: null
    }
    data = response.data
    let tracks = data?.playlist?.tracks
    let rankInfo = <any>[]
    let res = <any>{}
    for (let i in tracks) {
      let id = tracks[i].id
      let name = tracks[i].name
      let singger = tracks[i].ar
      let alia = tracks[i].alia
      let fee = tracks[i].fee
      let album = tracks[i].al
      let tns = tracks[i].tns
      let mvid = tracks[i].mv
      let obj = <any>{}
      obj.id = parseInt(i) + 1
      obj.songid = id
      obj.songName = name
      obj.singger = singger
      obj.alias = alia
      obj.fee = fee
      obj.album = album
      obj.transNames = tns
      obj.mvid = mvid
      rankInfo.push(obj)
    }
    res.rankInfo = rankInfo
    res.trackNumberUpdateTime = data?.playlist?.trackNumberUpdateTime

    return Promise.resolve(res)

  } catch (error) {
    console.log(error)
    message.error('排行榜数据异常[wyy]' + error)
    throw new Error('排行榜数据异常[wyy]')
  }
}

/**
 * 默认搜索关键词
 * @author kikolove
 */
const getDefaultWord = async function () {
  try {
    const response = await request({
      url: wyapi + "/search/default",
      method: 'post'
    })
    let data = {
      data: null
    }
    data = response.data
    let data_detail = data?.data
    return Promise.resolve(data_detail)
  } catch (error) {
    console.log(error)
    message.error('默认搜索关键词获取失败：' + error)
    throw new Error('默认搜索关键词获取失败')
  }
}

export { getDefaultWord, getMusicLrc, getMusicInfo, getMusicaudio, getRanking, isEmpty, getsongAllName, getMv, getHotDetail, getComment, searchMv }