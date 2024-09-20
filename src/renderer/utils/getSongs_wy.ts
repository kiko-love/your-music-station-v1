import convertSec from './convertSecends'
import { isEmpty } from './getMusicUtils_wy'
import { message } from "ant-design-vue";
import request from '@renderer/utils/request'
const wyapi = 'https://service-kz3zzust-1303884741.cd.apigw.tencentcs.com/'
/**
 * 
 * @param q 
 * @author kikolove
 */
export default async function getSongs(q: any, type: string = '') {
  if (isEmpty(q)) return []
  try {
    const response = await
      request({
        url: wyapi + "/cloudsearch?keywords=" + q + "&limit=100" + "&type=" + type,
        method: 'post'
      })
    let data = {
      result: null,
      code: 0
    }
    data = response.data
    const tmp_songs = new Array();
    if (data.code !== 200 || data?.result?.songCount === 0) {
      return [];
    } else {
      const res_map = data.result.songs;
      for (let i in res_map) {
        let song = <any>{};
        song.id = parseInt(i);
        song.songid = res_map[i].id;
        song.alias = res_map[i].alia;
        song.transNames = res_map[i].tns;
        song.songName = res_map[i].name;
        song.singger = [];
        for (let j in res_map[i].ar) {
          let tmp_singger = <any>{};
          tmp_singger.id = res_map[i].ar[j].id;
          tmp_singger.name = res_map[i].ar[j].name;
          song.singger.push(tmp_singger);
        }
        song.album = res_map[i].al;
        song.time = convertSec(res_map[i].dt / 1000, null);
        song.fee = res_map[i].fee;
        song.mvid = res_map[i].mv;
        song.privilege = res_map[i].privilege;
        song.allName = '';
        tmp_songs.push(song);
      }
      return tmp_songs;
    }
  } catch (error) {
    console.log(error);
    message.error("搜索失败，请稍后再试")
    throw new Error('搜索失败，')
  }
}