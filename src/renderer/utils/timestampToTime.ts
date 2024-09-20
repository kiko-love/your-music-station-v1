/**
 * 
 * @param timestamp 
 * @author kikolove
 */
const timestampToTime = function (timestamp: any) {

    let date = new Date(timestamp)
    let Y = date.getFullYear()
    let M = (date.getMonth() + 1 )
    let D = date.getDate()
    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let s = date.getSeconds()
    let res = <any>{}
    res.Y = Y
    res.M = M
    res.D = D
    res.h = h
    res.mm = mm
    res.s = s
    return res
}

export { timestampToTime }