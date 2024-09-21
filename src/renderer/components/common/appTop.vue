<template>
  <div class="app-top-container">
    <div class="app-top-action">
      <a-row style="width: 100%">
        <a-col :span="6" class="app-top-logo">
          <div class="appTitle">
            <svg
              t="1639987321571"
              class="logo-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11830"
            >
              <path
                d="M430.08 291.84c166.8352 0 302.08 135.2448 302.08 302.08s-135.2448 302.08-302.08 302.08-302.08-135.2448-302.08-302.08 135.2448-302.08 302.08-302.08z m0 112.64c-104.6272 0-189.44 84.8128-189.44 189.44s84.8128 189.44 189.44 189.44 189.44-84.8128 189.44-189.44-84.8128-189.44-189.44-189.44z"
                fill="#ffffff"
                p-id="11831"
              />
              <path
                d="M538.19392 128h114.35008l78.94016 447.48288-110.92992 19.5584z"
                fill="#ffffff"
                p-id="11832"
              />
              <path
                d="M596.224 225.54624l56.32-97.54624 239.44192 138.24-56.32 97.54624z"
                fill="#ffffff"
                p-id="11833"
              />

              <path
                d="M573.45536 327.96672c69.51936 37.5552 122.63936 101.57056 145.8688 178.54976l12.16 68.9664-110.92992 19.5584-1.10592-6.2976a188.9792 188.9792 0 0 0-9.71776-55.09632l-36.2752-205.68064zM652.544 128l25.5488 144.80896-127.31904-73.50784L538.19392 128h114.34496z"
                fill="#ffffff"
                p-id="11834"
              />
            </svg>
            <span class="appTitle-text">
              <span @click="back">MUSIC</span>
            </span>
          </div>
        </a-col>
        <a-col :span="13" style="margin-left: -25px">
          <div class="search-area">
            <a-input
              v-model:value="$searchInfo.state.keyword"
              ref="searchInput"
              :placeholder="realkeyword ? realkeyword : '搜索你想听的'"
              spellcheck="false"
              allow-clear
              @focus="$searchInfo.state.inputing = true"
              @blur="s_getDefault"
              @keyup.enter.native="searchSongs($searchInfo.state.keyword)"
            >
              <template #suffix>
                <SearchOutlined />
              </template>
            </a-input>
          </div>
        </a-col>
        <a-col :span="5" class="app-top-btns">
          <div class="btns-container">
            <!-- 主题按钮 -->
            <a-tooltip
              placement="bottom"
              :mouseEnterDelay="0"
              :mouseLeaveDelay="0.01"
            >
              <template #title>主题切换</template>
              <button class="btn-changeSkin" @click="visible = !visible">
                <SkinOutlined style="fontsize: 16px" />
              </button>
              <a-modal
                id="skin"
                v-model:visible="visible"
                :mask="false"
                title="主题切换"
              >
                <template #footer>
                  <div></div>
                </template>
                <div class="color-container">
                  <div
                    :class="[
                      'color-pick',
                      'color-red',
                      { 'color-picked': checkedColor === 0 },
                    ]"
                    @click.stop="changeTheme('171, 84, 90', 0)"
                  >
                    默认主题
                  </div>
                  <div
                    :class="[
                      'color-pick',
                      'color-2',
                      { 'color-picked': checkedColor === 1 },
                    ]"
                    @click.stop="changeTheme('0,147,115', 1)"
                  ></div>
                  <div
                    :class="[
                      'color-pick',
                      'color-3',
                      { 'color-picked': checkedColor === 2 },
                    ]"
                    @click.stop="changeTheme('104,103,137', 2)"
                  ></div>
                  <div
                    :class="[
                      'color-pick',
                      'color-4',
                      { 'color-picked': checkedColor === 3 },
                    ]"
                    @click.stop="changeTheme('50, 113, 174', 3)"
                  ></div>
                  <div
                    :class="[
                      'color-pick',
                      'color-5',
                      { 'color-picked': checkedColor === 4 },
                    ]"
                    @click.stop="changeTheme('82,131,129', 4)"
                  ></div>
                  <div
                    :class="[
                      'color-pick',
                      'color-6',
                      { 'color-picked': checkedColor === 5 },
                    ]"
                    @click.stop="changeTheme('220, 107, 130', 5)"
                  ></div>
                  <div
                    :class="[
                      'color-pick',
                      'color-7',
                      { 'color-picked': checkedColor === 6 },
                    ]"
                    @click.stop="changeTheme('95, 120, 140', 6)"
                  ></div>
                  <div
                    :class="[
                      'color-pick',
                      'color-8',
                      { 'color-picked': checkedColor === 7 },
                    ]"
                    @click.stop="changeTheme('144, 110, 65', 7)"
                  ></div>
                  <div
                    :class="[
                      'color-pick',
                      'color-9',
                      { 'color-picked': checkedColor === 8 },
                    ]"
                    @click.stop="changeTheme('104,56,97', 8)"
                  ></div>
                  <div
                    :class="[
                      'color-pick',
                      'color-10',
                      { 'color-picked': checkedColor === 9 },
                    ]"
                    @click.stop="changeTheme('108, 136, 140', 9)"
                  ></div>
                </div>
              </a-modal>
            </a-tooltip>
            <!-- 最小化按钮 -->
            <a-tooltip
              v-model:visible="min_visible"
              placement="bottom"
              :mouseEnterDelay="0"
              :mouseLeaveDelay="0.01"
              arrowPointAtCenter
            >
              <template #title>最小化</template>
              <button class="btn-minimize" @click="minimizeWin">
                <MinusOutlined />
              </button>
            </a-tooltip>
            <!-- 最大化按钮 -->
            <a-tooltip
              v-model:visible="max_visible"
              placement="bottom"
              :mouseEnterDelay="0"
              :mouseLeaveDelay="0.01"
              arrowPointAtCenter
            >
              <template #title>{{ maxText }}</template>
              <button class="btn-minimize" @click="maximizeWin">
                <BorderOutlined />
              </button>
            </a-tooltip>
            <!-- 关闭按钮 -->
            <a-tooltip
              placement="bottomRight"
              :mouseEnterDelay="0"
              :mouseLeaveDelay="0.01"
              arrowPointAtCenter
            >
              <template #title>关闭</template>
              <button class="btn-close" @click="closeWin">
                <CloseOutlined />
              </button>
            </a-tooltip>
          </div>
        </a-col>
      </a-row>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
const { shell } = require("electron");
import { notification } from "ant-design-vue";
import config from "@renderer/config/config";
import { getUpdateInfo } from "@renderer/utils/checkUpdate";
import getSongs from "@renderer/utils/getSongs_wy";
import { isEmpty, getDefaultWord } from "@renderer/utils/getMusicUtils_wy";
import { setHistoryKey } from "@renderer/utils/historySearch";
import { setPlayerConfig, getPlayerConfig } from "@renderer/utils/playerConfig";
import { ref } from "vue";
import {
  SearchOutlined,
  InfoCircleOutlined,
  SkinOutlined,
  MinusOutlined,
  CloseOutlined,
  BorderOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    SearchOutlined,
    InfoCircleOutlined,
    SkinOutlined,
    MinusOutlined,
    CloseOutlined,
    BorderOutlined,
  },
  setup() {
    const min_visible = ref(false);
    const max_visible = ref(false);
    const checkedColor = ref(0);
    const visible = ref(false);
    const searchOrigin = ref("wyy");
    const realkeyword = ref("");
    const maxText = ref("最大化");
    return {
      searchOrigin,
      visible,
      checkedColor,
      min_visible,
      max_visible,
      realkeyword,
      maxText,
    };
  },
  data() {
    return {
      isOnline: true, // 默认为在线状态
      r: document.querySelector(":root"),
      audioDevice: [],
      DeviceChangeTImer: null,
      DeviceChangeTipNum: 0,
    };
  },
  beforeDestroy() {
    // navigator.connection.addEventListener('change', this.handleNetworkChange);
    // 在组件销毁前移除监听器
    navigator.mediaDevices.removeEventListener(
      "devicechange",
      this.handleDeviceChange
    );
  },
  created() {
    // navigator.connection.addEventListener('change', this.handleNetworkChange);
    const player = getPlayerConfig();
    if (player) {
      this.$nowMusicInfo.state.showPP = player.showPP;
      this.$sideRoute.state.skin = player.skin;
      this.$nowMusicInfo.state.music_volume = player.volume;
      this.changeTheme(
        this.$sideRoute.state.skin.rgb,
        this.$sideRoute.state.skin.id
      );
    }
  },
  async mounted() {
    this.init();
    this.s_getDefault();
    // 在组件创建时添加监听器
    navigator.mediaDevices.addEventListener(
      "devicechange",
      this.handleDeviceChange
    );
    // navigator.connection.addEventListener('change', this.updateOnlineStatus);
  },
  methods: {
    async handleDeviceChange() {
      // 检查设备列表是否发生变化
      const that = this;
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        if (this.DeviceChangeTImer) {
          clearTimeout(this.DeviceChangeTImer);
        }
        this.DeviceChangeTImer = setTimeout(() => {
          if (that.DeviceChangeTipNum == 0) {
            that.DeviceChangeTipNum = 1;
            clearTimeout(this.DeviceChangeTImer);
          } else {
            const audioDevices = devices.filter(
              (device) => device.kind === "audioinput"
            );
            // 重新获取音频输入设备并更新状态
            this.audioDevice = audioDevices[0]; // 这里示例只获取第一个设备
            console.log("Audio device changed:", this.audioDevice);
            that.DeviceChangeTipNum = 1;
            notification.info({
              message: "提示",
              description:
                "检测到音频设备变化，当前音频设备为：\n" +
                this.audioDevice.label,
              style: {
                //width: '600px',
                whiteSpace: "pre-wrap",
                webkitAppRegion: "no-drag",
              },
            });
          }
        }, 1000);
      });
    },
    async s_getDefault() {
      const res = await getDefaultWord();
      if (res) {
        this.realkeyword = res.realkeyword;
        this.$searchInfo.state.inputing = false;
      }
    },
    minEnter() {
      this.min_visible = true;
    },
    minLeave() {
      this.min_visible = false;
    },
    async init() {
      try {
        const updateInfo = await getUpdateInfo();
        if (!updateInfo) return;
        if (updateInfo.authorConfig.rewardImage !== "") {
          this.$globalConfig.rewardImage = updateInfo.authorConfig.rewardImage;
        }
      } catch (error) {
        // console.log(error);
      }
    },
    updateOnlineStatus(e) {
      const netWorkDownlink = navigator.connection.downlink; // 预估下载速度m/s
      if (navigator.connection && navigator.connection.onchange === null) {
        navigator.connection.onchange = () => {
          if (
            netWorkDownlink !== navigator.connection.downlink ||
            navigator.connection.rtt === 0
          ) {
            //网络断开
            // console.log("网络断开");
          } else if (
            netWorkDownlink === navigator.connection.downlink ||
            navigator.connection.rtt !== 0
          ) {
            // console.log("网络连接");
            //连接到网络
          }
        };
      }
    },
    back() {
      // console.log(this.$route.name);
    },
    changeTheme(rgbColor, index) {
      if (rgbColor === "" || rgbColor === undefined) return;
      this.$sideRoute.state.skin.id = index;
      this.$sideRoute.state.skin.rgb = rgbColor;
      this.checkedColor = index;
      let rgb = "rgb(" + rgbColor;
      let rgba = "rgba(" + rgbColor;
      this.r.style.setProperty("--defaultPrimaryColor", rgb + ")");
      this.r.style.setProperty("--defaultPrimaryColor-1", rgba + ", 0.1)");
      this.r.style.setProperty("--defaultPrimaryColor-2", rgba + ", 0.2)");
      this.r.style.setProperty("--defaultPrimaryColor-3", rgba + ", 0.3)");
      this.r.style.setProperty("--defaultPrimaryColor-4", rgba + ", 0.4)");
      this.r.style.setProperty("--defaultPrimaryColor-5", rgba + ", 0.5)");
      this.r.style.setProperty("--defaultPrimaryColor-6", rgba + ", 0.6)");
      this.r.style.setProperty("--defaultPrimaryColor-7", rgba + ", 0.7)");
      this.r.style.setProperty("--defaultPrimaryColor-8", rgba + ", 0.8)");
      this.r.style.setProperty("--defaultPrimaryColor-9", rgba + ", 0.9)");
      this.r.style.setProperty(
        "--defaultPrimaryColorBackground",
        rgba + ", 0.15)"
      );
      // this.visible = false;
    },
    originSelect(value) {
      this.$refs.origin.blur();
    },
    async searchSongs(q) {
      if (
        (isEmpty(q) && this.realkeyword === "") ||
        this.$searchInfo.state.loading
      ) {
        this.$searchInfo.state.searchTableshowv2 = false;
        this.$sideRoute.state.current[0] = "search_0";
        this.$router.push("/home/search");
        this.$refs.searchInput.blur();
        return;
      }
      if (this.realkeyword !== "" && q === "") {
        q = this.realkeyword;
        this.$searchInfo.state.keyword = this.realkeyword;
        this.realkeyword = "";
      }
      this.$searchInfo.state.pageHeadertitle = "搜索结果";
      this.$searchInfo.state.pageHeaderSubtitle = "正在搜索...";
      this.$searchInfo.state.searchTableshowv2 = true;
      this.$searchInfo.state.keyword_tmp = this.$searchInfo.state.keyword;
      this.$searchInfo.state.historyData = setHistoryKey(q);
      this.$sideRoute.state.current[0] = "search_0";
      this.$searchInfo.state.res_list = Array.from([]);
      this.$searchInfo.state.loading = true;
      this.$searchInfo.state.firstSearch = true;
      this.$router.push("/home/search");
      this.$searchInfo.state.res_list = await getSongs(encodeURI(q));
      this.$searchInfo.state.pageHeadertitle = "‘" + q + "’" + "搜索结果";
      this.$searchInfo.state.pageHeaderSubtitle =
        "共为您找到" + this.$searchInfo.state.res_list.length + "条单曲记录";
      this.$refs.searchInput.blur();
      this.$searchInfo.state.paginationSetting.current = 1;
      this.$searchInfo.state.loading = false;
    },
    minimizeWin() {
      ipcRenderer.invoke("windows-mini").then(() => {
        this.min_visible = false;
      }); // 通知主进程我要进行窗口最小化操作
    },
    maximizeWin() {
      const that = this;
      ipcRenderer.invoke("window-max").then((res) => {
        that.maxText = res.status ? "还原窗口" : "最大化";
        let app = document.querySelector("#app");
        app.style.width = res.status ? "100%" : "99%";
        app.style.height = res.status ? "100%" : "99%";
      });
    },
    closeWin() {
      const that = this;
      this.$confirm({
        title: "关闭提示",
        centered: true,
        mask: false,
        content: "是否退出你的点歌台?",
        okText: "是",
        okType: "danger",
        cancelText: "否",
        maskClosable: true,
        onOk() {
          let player = {};
          player.volume = that.$nowMusicInfo.state.music_volume;
          player.collapsed = that.$sideRoute.state.collapsed;
          player.skin = that.$sideRoute.state.skin;
          player.showPP = that.$nowMusicInfo.state.showPP;
          const setPlayer = setPlayerConfig(player);
          // console.log(setPlayer);
          ipcRenderer.invoke("window-close");
        },
        onCancel() {
          //nothing
        },
      });
    },
  },
};
</script>

<style>
/* 重写全局样式 */
::selection {
  color: #fff;
  background-color: var(--defaultPrimaryColor);
}

.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  background-color: var(--defaultPrimaryColorBackground);
}

.ant-modal-footer {
  padding: 0;
}

.ant-modal-close-x {
  color: rgb(218, 218, 218);
  line-height: 43px;
  transition: 0.2s;
}

.ant-modal-close-x:hover {
  color: #fff;
  transition: 0.25s;
}

.ant-modal-header {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 10px 18px;
  background: var(--defaultPrimaryColor);
}
.ant-modal-title {
  color: #fff;
}
.ant-modal-content {
  box-shadow: 0 4px 12px rgb(0 0 0 / 30%);
}

.ant-btn-primary {
  border: none;
  background-color: var(--defaultPrimaryColor);
}

.ant-btn-primary:hover,
.ant-btn-primary:focus {
  color: rgb(255, 255, 255) !important;
}

.ant-btn:hover,
.ant-btn:focus,
.ant-btn:active {
  color: var(--defaultPrimaryColor);
}

.ant-btn-primary:hover,
.ant-btn-primary:focus {
  background-color: var(--defaultPrimaryColor-7);
}

.ant-modal-confirm-title {
  color: var(--defaultPrimaryColor) !important;
  user-select: none;
}

.ant-modal-confirm-content {
  user-select: none;
}

.ant-btn-dangerous {
  border-color: var(--defaultPrimaryColor-7);
  color: var(--defaultPrimaryColor-7);
}

.ant-btn-dangerous:hover {
  color: #fff;
  border-color: var(--defaultPrimaryColor-7);
  background: var(--defaultPrimaryColor);
}

.ant-btn-dangerous:focus {
  border-color: var(--defaultPrimaryColor-7);
}
</style>

<style lang='less' scoped>
// @import "@renderer/styles/theme/theme.less";
/deep/ .ant-input-suffix {
  color: var(--defaultPrimaryColor);
}

/deep/ .ant-input::selection {
  background: var(--defaultPrimaryColor);
  color: #ffffff;
}

/deep/ .ant-input {
  color: var(--defaultPrimaryColor);
}

/deep/ .ant-input-affix-wrapper:focus {
  border: none;
  box-shadow: 0 0 0 2px rgb(0 0 0 / 20%);
}

/deep/ .ant-input-affix-wrapper:hover {
  border: 1px solid rgb(194, 194, 194);
}

/deep/ .ant-input-affix-wrapper-focused {
  border: 1px solid rgb(194, 194, 194);
}

.color-container {
  position: relative;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.color-picked:after {
  bottom: 0px;
  right: 0px;
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 21px solid #202020;
  border-left: 21px solid transparent;
}

.color-picked:before {
  content: "";
  position: absolute;
  width: 8px;
  height: 4px;
  background: transparent;
  bottom: 6px;
  right: 1px;
  border: 2px solid white;
  border-top: none;
  border-right: none;
  -webkit-transform: rotate(-55deg);
  -ms-transform: rotate(-55deg);
  transform: rotate(-55deg);
  z-index: 9;
}

.color-pick {
  user-select: none;
  position: relative;
  margin: 10px 0;
  width: 64px;
  height: 64px;
  cursor: pointer;
  transition: 0.1s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: 0.1s;
}

.color-pick:hover {
}

.color-red {
  background-color: rgb(171, 84, 90);
  color: #eeeaea;
  font-size: 12px;
}

.color-2 {
  background-color: rgb(0, 147, 115);
}

.color-3 {
  background-color: rgb(104, 103, 137);
}

.color-4 {
  background-color: rgb(50, 113, 174);
}

.color-5 {
  background-color: rgb(82, 131, 129);
}

.color-6 {
  background-color: rgb(220, 107, 130);
}

.color-7 {
  background-color: rgb(95, 120, 140);
}

.color-8 {
  background-color: rgb(144, 110, 65);
}

.color-9 {
  background-color: rgb(104, 56, 97);
}

.color-10 {
  background-color: rgb(108, 136, 140);
}

/deep/ .ant-btn-primary {
  background-color: var(--defaultPrimaryColor);
  border: none;
}

/deep/ .ant-btn-primary:hover {
  background-color: var(--defaultPrimaryColor-7);
  border: none;
}

.icon {
  fill: @primary-color;
  width: 1.5em;
  height: 1.5em;
}

.img-origin {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.app-top-container {
  /* background-color:#34443f; */
  height: 100%;
  user-select: none;
}

.ant-input-affix-wrapper {
  border-radius: 20px;
}

.search-area {
  display: flex;
  align-items: center;
  width: 40%;
  -webkit-app-region: no-drag;
}

.app-top-logo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  -webkit-app-region: no-drag;
}

.app-top-btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 20px;
}

.app-top-action {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 60px;
  width: 100%;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--defaultPrimaryColor);
}

.app-top-action button {
  background-color: transparent;
  -webkit-app-region: no-drag;
  margin: 0 15px 0 5px;
  outline: none;
  cursor: pointer;
  /* height: 70%; */
}

.appTitle {
  display: flex;
  align-items: flex-start;
  margin: 0 0 0 15px;
  font-size: 22px;
  font-weight: 600;
  // color: #f45d5d;
}

.logo-icon {
  width: 30px;
  height: 30px;
}

.appTitle-text {
  font-family: Helvetica;
  letter-spacing: 2px;
  color: rgb(240, 240, 240);
}

.appTitle-logo {
  display: flex;
  flex-direction: column;
}

.btns-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.btn-close {
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: rgb(255, 225, 221) !important;
  // box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
  border: none;
  color: rgb(230, 230, 230);
  border-radius: 50%;
  height: 15px;
  width: 15px;
}

.btn-close:hover {
  text-shadow: 0 0 0.25px #ffffff;
  color: rgb(255, 255, 255) !important;
}

.btn-changeSkin {
  border: 0px;
  height: 15px;
  width: 25px;
  border-radius: 50%;
  color: #d3d3d3;
}

.btn-changeSkin:hover span {
  color: #ffffff;
}

.btn-minimize {
  font-size: 13px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border: none;
  color: #d3d3d3;
  border-radius: 50%;
  height: 15px;
  width: 15px;
}

.btn-minimize:hover {
  text-shadow: 0 0 0.25px #ffffff;
  color: #ffffff;
}

.btn-minimize:active {
  border: none;
  color: #ffffff;
}
</style>