/**
 * 
 * @param secends 
 * @author kikolove
 */
export default function convertSec(secends: number, v: any) {
    try {
        secends = parseInt(secends.toFixed(0)) ? parseInt(secends.toFixed(0)) : 0
        let minute = Math.floor(secends / 60)
        let sec = secends - 60 * minute
        let minute_s = ""
        let sec_s = ""
        let res_time = null
        if (minute < 10) {
            minute_s = '0' + minute
        } else {
            minute_s = minute + ''
        }
        if (sec < 10) {
            sec_s = '0' + sec
        } else {
            sec_s = sec + ''
        }
        res_time = minute_s + ':' + sec_s
        return res_time
    } catch (e) {
        console.log(e)
        return v ? v.$nowMusicInfo.state.music_nowTime : '00:00'
    }
}