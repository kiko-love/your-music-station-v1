import { isEmpty } from "./getMusicUtils_wy";
const Store = require("electron-store");

let option={
    name:"playSong",//文件名称,默认 config
    fileExtension:"json",//文件后缀,默认json
//    encryptionKey:"aes-256-cbc" ,//对配置文件进行加密
    clearInvalidConfig:true, // 发生 SyntaxError  则清空配置,
}

const store = new Store(option)

const setRecord = (rec: any)=>{
    rec = rec ? rec : null
    if(!rec) return rec
    let record = <any>{}
    record.playBtn = rec.playBtn
    record.playBtn.isPlay = false 
    record.mv_id = rec.mv_id
    record.music_id = rec.music_id
    record.music_name = rec.music_name
    record.music_singger = rec.music_singger
    record.music_album = rec.music_album
    record.music_tns = rec.music_tns
    record.music_alia = rec.music_alia
    record.music_lrc = rec.music_lrc
    record.bool_tlrc = rec.bool_tlrc
    record.show_tlrc = rec.show_tlrc
    record.music_allTime = rec.music_allTime
    record.music_nowTime = '00:00'
    record.totalSeconds = rec.totalSeconds
    record.haveInfo = rec.haveInfo
    record.music_picUrl = rec.music_picUrl
    record.music_cover_picUrl = rec.music_cover_picUrl
    record.music_under_picUrl = rec.music_under_picUrl
    record.music_small_picUrl = rec.music_small_picUrl
    store.set('songRecord', record)
    return record
}

const getRecord = ()=>{
    let record = store.get('songRecord')
    record = isEmpty(record) ? null : record
    return record
}

export {setRecord, getRecord}