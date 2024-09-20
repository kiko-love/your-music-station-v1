import { isEmpty } from "./getMusicUtils_wy";
const Store = require("electron-store");
const store = new Store()
/**
 * 
 * @param player 
 * @author kikolove
 */
const setPlayerConfig = function (player: any) {
    // 存储信息
    store.set("mplayerConfig", player);
    return player
}

/**
 * @author kikolove
 */
const getPlayerConfig = function(){
    return store.get("mplayerConfig")
}


export {setPlayerConfig, getPlayerConfig}