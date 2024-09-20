import { isEmpty } from "./getMusicUtils_wy";
const Store = require("electron-store");

let option={
    name:"historyKeys",//文件名称,默认 config
    fileExtension:"json",//文件后缀,默认json
//    encryptionKey:"aes-256-cbc" ,//对配置文件进行加密
    clearInvalidConfig:true, // 发生 SyntaxError  则清空配置,
}
const store = new Store(option)
/**
 * 
 * @param q 
 * @author kikolove
 */
const setHistoryKey = function (q: any) {
    q = q.replace(/^\s*|\s*$/g,"")
    q = encodeURI(q)
    let historyTmp = []
    let originData = store.get("searchHistory");
    if (!isEmpty(originData)) {
        historyTmp.push.apply(historyTmp, originData);
    }
    //存入本次搜索记录
    if (historyTmp.length >= 10) {
        historyTmp.unshift(q)
        historyTmp.pop()
    } else {
        historyTmp.unshift(q);
    }

    const historyTmp_set = Array.from(new Set(historyTmp))

    // 存储信息
    store.set("searchHistory", historyTmp_set);
    //返回存储处理后的搜索记录数组
    let res = historyTmp_set
    for (let i = 0; i < res.length; i++) {
        res[i] = decodeURI(res[i])
    }
    // 显示存储的信息
    // console.log(getHistoryKey())
    return res
}

const getHistoryKey = function () {
    let resKey = store.get('searchHistory')
    if (isEmpty(resKey)) { resKey = Array.from([]) }
    const len = resKey?.length ? resKey?.length : 0
    for (let i = 0; i < len; i++) {
        resKey[i] = decodeURI(resKey[i])
    }
    return resKey
}

const deleteHistoryKey = function (q: any) {
    let resKey = store.get('searchHistory')
    if (isEmpty(resKey)) { resKey = Array.from([]) }
    if (resKey.length > 0) {
        resKey.splice(resKey.indexOf(encodeURI(q)), 1)
        store.set("searchHistory", resKey);
    } else {
        resKey = Array.from([])
    }
    for (let i = 0; i < resKey.length; i++) {
        resKey[i] = decodeURI(resKey[i])
    }
    return resKey
}

const clearAllHistory = function () {
    return store.delete('searchHistory')
}

export { setHistoryKey, getHistoryKey, deleteHistoryKey, clearAllHistory }