!
<template>
  <!-- 底部控制块 -->
  <a-layout-footer class="layout-footer">
    <!-- <img
    class="background-img"
      src="http://p2.music.126.net/QD_pdnqzF0ix1KaQcPfZWA==/109951166503956880.jpg?param=500y500"
      />-->
    <a-row>
      <a-col :span="8" class="col-contronl-info">
        <div class="music-pic">
          <div class="music-left">
            <div style="position: relative">
              <a-avatar :size="60" :src="$nowMusicInfo.state.music_small_picUrl" style="
                    user-select: none;
                    verticalalign: middle;
                    background-color: transparent;
                  " @click="songDetail" :class="[
                    { 'music-small-avatar': $nowMusicInfo.state.haveInfo },
                  ]">
                <span v-if="!$nowMusicInfo.state.haveInfo" style="color: var(--defaultPrimaryColor)">MUSIC</span>
              </a-avatar>
              <div class="avatar-cover">
                <div class="icon-container">
                  <Icon class="myAction">
                    <template #component>
                      <svg t="1638450281145" class="myIcon" style="fill: #e0e0e0" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5051" width="48" height="48">
                        <path
                          d="M512 246.464l-348.416 319.36L64 474.496 512 64l448 410.56-99.584 91.2L512 246.464z m0 394.24L163.584 960 64 868.736 512 458.24l448 410.496L860.416 960 512 640.64z"
                          p-id="5052" />
                      </svg>
                    </template>
                  </Icon>
                </div>
              </div>
            </div>
            <div class="music-simple-info">
              <div style="display: flex; width: 130px">
                <a-tooltip arrowPointAtCenter :mouseEnterDelay="0">
                  <template #title v-if="$nowMusicInfo.state.haveInfo">
                    <a-typography-paragraph :copyable="{ tooltips: false }"
                      style="color: #fff; margin: 0 0 -5px 0; font-size: 13px">
                      <template #copyableTooltip="{ copied }">{{
                        copied ? "复制成功" : "复制歌名"
                      }}</template>
                      <span>
                        {{
                          isEmpty($nowMusicInfo.state.music_alia)
                          ? isEmpty($nowMusicInfo.state.music_tns)
                            ? $nowMusicInfo.state.music_name
                            : $nowMusicInfo.state.music_name +
                            "（" +
                            $nowMusicInfo.state.music_tns +
                            "）"
                          : $nowMusicInfo.state.music_name +
                          "（" +
                          $nowMusicInfo.state.music_alia +
                          "）"
                        }}
                      </span>
                    </a-typography-paragraph>
                  </template>
                  <span class="music-name">
                    {{
                      isEmpty($nowMusicInfo.state.music_alia)
                      ? isEmpty($nowMusicInfo.state.music_tns)
                        ? $nowMusicInfo.state.music_name
                        : $nowMusicInfo.state.music_name +
                        "（" +
                        $nowMusicInfo.state.music_tns +
                        "）"
                      : $nowMusicInfo.state.music_name +
                      "（" +
                      $nowMusicInfo.state.music_alia +
                      "）"
                    }}
                  </span>
                </a-tooltip>
                <span class="action-music-info-right">
                  <!-- <HeartOutlined /> -->
                  <Icon class="action-like">
                    <template #component>
                      <svg class="icon-like" width="1.3em" height="1.3em" fill="currentColor" viewBox="0 0 1024 1024">
                        <path
                          d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
                      </svg>
                    </template>
                  </Icon>
                  <Icon v-if="$nowMusicInfo.state.mv_id != 0" class="action-like"
                    @click="getmv($nowMusicInfo.state.mv_id)">
                    <template #component>
                      <svg class="icon-mv" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        p-id="13428">
                        <path
                          d="M384 256v448l320-224L384 256z m64 121.6l150.144 102.4L448 582.4V377.6zM0 64v832h1024V64H0z m960 768H64V128h896v704z"
                          p-id="13429" />
                      </svg>
                    </template>
                  </Icon>
                </span>
              </div>

              <span class="music-singer">
                <a-tooltip arrowPointAtCenter :mouseEnterDelay="0">
                  <template #title>
                    <span style="font-size: 13px">
                      {{ getAllSinggers($nowMusicInfo.state.music_singger) }}
                    </span>
                  </template>
                  {{ getAllSinggers($nowMusicInfo.state.music_singger) }}
                </a-tooltip>
              </span>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="8" class="col-contronl-btns">
        <div style="padding-left: 0px">
          <a-button type="primary" :disabled="!$nowMusicInfo.state.haveInfo" shape="circle" @click="lastMusic">
            <template #icon>
              <StepBackwardOutlined />
            </template>
          </a-button>
          <a-button type="primary" :disabled="!$nowMusicInfo.state.haveInfo" shape="circle"
            @click="changePlayStatus(this)">
            <template #icon>
              <mIcon :icon="$nowMusicInfo.state.playBtn.playIcon" v-if="!$nowMusicInfo.state.playBtn.isPlay" />
              <mIcon :icon="$nowMusicInfo.state.playBtn.pauseIcon" v-else />
            </template>
          </a-button>
          <a-button type="primary" shape="circle" :disabled="!$nowMusicInfo.state.haveInfo" @click="nextMusic">
            <template #icon>
              <StepForwardOutlined />
            </template>
          </a-button>
        </div>
      </a-col>
      <a-col :span="8" class="col-contronl-btns2">
        <div style="display: flex; align-items: center; width: 100%; gap: 25px">
          <!-- 播放模式 -->
          <div class="playMode-icons">
            <a-tooltip :mouseEnterDelay="0" :mouseLeaveDelay="0">
              <template #title>单曲循环</template>
              <Icon>
                <template #component>
                  <svg t="1639211746492" class="playMode-icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4567" width="48" height="48">
                    <path
                      d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40zM938.2 396.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115z"
                      p-id="4568" />
                    <path
                      d="M512.8 660.6c22.1-0.1 39.9-18.1 39.8-40.2l-1.2-214.1c-0.1-22-18-39.8-40-39.8h-0.2c-22.1 0.1-39.9 18.1-39.8 40.2l1.2 214.1c0.1 22 18 39.8 40 39.8h0.2z"
                      p-id="4569" />
                  </svg>
                </template>
              </Icon>
            </a-tooltip>
          </div>
          <div>
            <a-popover autoAdjustOverflow arrowPointAtCenter :mouseEnterDelay="0" :mouseLeaveDelay="0.01">
              <template #title>
                <div style="text-align: center">
                  {{ "音量（" + this.$nowMusicInfo.state.music_volume + "%）" }}
                </div>
              </template>
              <template #content>
                <div ref="volumeSlider" style="width: 100%; display: inline" v-show="!view_volume">
                  <a-slider v-model:value="$nowMusicInfo.state.music_volume" class="vprocess" ref="vprocess"
                    :tipFormatter="null" @afterChange="afterChangeVolume" @change="changeVolume"
                    @blur="view_volume = false" />
                </div>
              </template>

              <!-- 音量按钮 -->
              <div class="volume-icons" @click="muteVlolume">
                <Icon v-if="$nowMusicInfo.state.music_volume >= 70 &&
                  $nowMusicInfo.state.music_volume <= 100
                  ">
                  <template #component>
                    <svg t="1637232354162" class="volume-icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="2226">
                      <path
                        d="M251.264 682.666667H85.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V384a42.666667 42.666667 0 0 1 42.666666-42.666667h165.930667l225.877333-184.832a21.333333 21.333333 0 0 1 34.858667 16.512v677.973334a21.333333 21.333333 0 0 1-34.858667 16.512L251.306667 682.666667z m576.725333 176.384l-60.416-60.416A383.061333 383.061333 0 0 0 896 512a383.232 383.232 0 0 0-140.970667-297.301333l60.586667-60.586667A468.309333 468.309333 0 0 1 981.333333 512c0 137.514667-59.136 261.205333-153.344 347.050667z m-151.168-151.168l-60.672-60.672A170.368 170.368 0 0 0 682.666667 512c0-61.013333-32-114.56-80.213334-144.725333l61.397334-61.397334A255.616 255.616 0 0 1 768 512c0 78.592-35.413333 148.906667-91.178667 195.882667z"
                        p-id="2227" />
                    </svg>
                  </template>
                </Icon>

                <Icon v-if="$nowMusicInfo.state.music_volume > 0 &&
                  $nowMusicInfo.state.music_volume < 70
                  ">
                  <template #component>
                    <svg t="1637232890627" class="volume-icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="2501">
                      <path
                        d="M379.264 682.666667H213.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V384a42.666667 42.666667 0 0 1 42.666666-42.666667h165.930667l225.877333-184.832a21.333333 21.333333 0 0 1 34.858667 16.512v677.973334a21.333333 21.333333 0 0 1-34.858667 16.512L379.306667 682.666667z m425.557333 25.216l-60.672-60.672A170.368 170.368 0 0 0 810.666667 512c0-61.013333-32-114.56-80.213334-144.725333l61.397334-61.397334A255.616 255.616 0 0 1 896 512c0 78.592-35.413333 148.906667-91.178667 195.882667z"
                        p-id="2502" />
                    </svg>
                  </template>
                </Icon>

                <Icon v-if="$nowMusicInfo.state.music_volume === 0">
                  <template #component>
                    <svg t="1637233061837" class="volume-icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="2688">
                      <path
                        d="M251.264 682.666667H85.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V384a42.666667 42.666667 0 0 1 42.666666-42.666667h165.930667l225.877333-184.832a21.333333 21.333333 0 0 1 34.858667 16.512v677.973334a21.333333 21.333333 0 0 1-34.858667 16.512L251.306667 682.666667z m619.733333-170.666667l150.869334 150.869333-60.330667 60.330667L810.666667 572.330667l-150.869334 150.869333-60.330666-60.330667L750.336 512 599.466667 361.130667l60.330666-60.330667L810.666667 451.669333l150.869333-150.869333 60.330667 60.330667L870.997333 512z"
                        p-id="2689" />
                    </svg>
                  </template>
                </Icon>
              </div>
            </a-popover>
          </div>
          <div :class="['pp-icons', { 'pp-active': $nowMusicInfo.state.showPP }]" @click="changePP">
            <a-tooltip :mouseEnterDelay="0" :mouseLeaveDelay="0">
              <template #title>音乐频谱</template>
              <Icon>
                <template #component>
                  <svg class="pp-icon" width="24" height="24" viewBox="0 0 48 48" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 3.99976V43.9998" stroke="#333" stroke-width="4" stroke-linecap="round" />
                    <path d="M34 11.9998V35.9998" stroke="#333" stroke-width="4" stroke-linecap="round" />
                    <path d="M4 17.9998V29.9998" stroke="#333" stroke-width="4" stroke-linecap="round" />
                    <path d="M44 17.9998V29.9998" stroke="#333" stroke-width="4" stroke-linecap="round" />
                    <path d="M14 11.9998V35.9998" stroke="#333" stroke-width="4" stroke-linecap="round" />
                  </svg>
                </template>
              </Icon>
            </a-tooltip>
          </div>
        </div>
      </a-col>
    </a-row>

    <a-row style="width: 100%; margin-top: 4px">
      <a-col :span="2" class="tip-nowProcess">
        <span>
          {{ $nowMusicInfo.state.music_nowTime }}
        </span>
      </a-col>
      <a-col :span="20">
        <div class="music-process">
          <a-slider v-model:value="$nowMusicInfo.state.music_process" ref="mprocess"
            :disabled="!$nowMusicInfo.state.haveInfo" :max="max" :tip-formatter="null" @change="processChange"
            @afterChange="afterProcessChange" />
        </div>
      </a-col>
      <a-col :span="2" class="tip-allProcess">
        <span>
          {{ $nowMusicInfo.state.music_allTime }}
        </span>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" class="tip-foot-info">
        <span>
          <!-- {{
            $nowMusicInfo.state.foot_info ?? $nowMusicInfo.state.currentLyric
          }} -->
          {{
            $nowMusicInfo.state.foot_info
          }}
        </span>
      </a-col>
    </a-row>
    <!-- {{ $route.name }} -->
  </a-layout-footer>
</template>

<script>
import { mIcon } from "./ICON.ts";
import { message } from "ant-design-vue";
import convertSec from "../utils/convertSecends";
import { ref } from "vue";
import { getMusicInfo, getMusicaudio, getMv } from "../utils/getMusicUtils_wy";
import Icon from "@ant-design/icons-vue";
import {
  CaretRightOutlined,
  StepForwardOutlined,
  StepBackwardOutlined,
  SoundOutlined,
  HeartOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "YourMusicStationContronl",
  components: {
    Icon,
    SoundOutlined,
    CaretRightOutlined,
    StepForwardOutlined,
    StepBackwardOutlined,
    mIcon,
    HeartOutlined,
  },
  setup() {
    const marks = ref({});
    return {
      marks,
    };
  },
  data() {
    return {
      max: 200,
      view_volume: false,
      playLocation: 0,
      soundPool: [],
      lastMusicId: -1,
      nextMusicId: -1,
      nowMusicUrl: [],
      canvasElement: null,
    };
  },
  created() {
    // hotKey()
    this.ckey();
  },
  mounted() {
    this.$nowMusicInfo.state.m_contronl = this;
  },
  methods: {
    changePP() {
      this.$nowMusicInfo.state.showPP = !this.$nowMusicInfo.state.showPP;
    },
    ckey() {
      let that = this;
      document.addEventListener("keyup", function (e) {
        // message.info("当前按键的keyCode为：" + e.keyCode);
        if (e.keyCode === 32 && !that.$searchInfo.state.inputing) {
          that.changePlayStatus(that);
          e.preventDefault(); // 屏蔽默认事件
          e.stopPropagation(); // 停止事件冒泡
        }
      });
    },
    songDetail() {
      if (!this.$nowMusicInfo.state.haveInfo) return;
      if (this.$route.path === "/home/index") return;
      this.$router.push("/home/index");
      this.$sideRoute.state.current[0] = "homeIndex_0";
    },
    async getmv(mvid) {
      if (this.$route.path === "/home/mvideo") return;
      this.$router.push("/home/mvideo");
      if (this.$nowMusicInfo.state.mv_getting) {
        return false;
      }
      this.$nowMusicInfo.state.mv_getting = true;
      const mvInfo = await getMv(mvid);
      this.$nowMusicInfo.state.mv_url = mvInfo.url;
      this.$nowMusicInfo.state.mv_getting = false;
    },
    muteVlolume() {
      if (this.$nowMusicInfo.state.music_volume !== 0) {
        this.$nowMusicInfo.state.record_volume =
          this.$nowMusicInfo.state.music_volume;
        this.$nowMusicInfo.state.music_volume = 0;
      } else {
        this.$nowMusicInfo.state.music_volume =
          this.$nowMusicInfo.state.record_volume;
      }
      this.changeVolume(this.$nowMusicInfo.state.music_volume);
    },
    afterChangeVolume(value) {
      this.$refs.vprocess.blur();
    },
    changeVolume(value) {
      if (this.$nowSound.sound !== undefined && this.$nowSound.sound !== null) {
        this.$nowSound.sound.volume(
          value / 100.0,
          this.$nowSound.currentMusicId
        );
      } else {
        this.$nowMusicInfo.state.music_volume = value;
      }
    },
    getAllSinggers(s_array) {
      if (!s_array.length) {
        return null;
      }
      let allSingger = "";
      for (let i in s_array) {
        if (i < s_array.length - 1) {
          allSingger = allSingger + s_array[i] + " / ";
        } else {
          allSingger = allSingger + s_array[i];
        }
      }
      return allSingger;
    },
    isEmpty(strIn) {
      if (strIn === undefined) {
        return true;
      } else if (strIn == null) {
        return true;
      } else if (strIn == "") {
        return true;
      } else {
        return false;
      }
    },
    async handleMusic(songid, vue, istry, isInit) {
      istry = !this.isEmpty(istry) ? istry : false;
      // console.log("istry", istry);
      vue = vue ? vue : this;
      vue.$nowMusicInfo.state.foot_info = !istry
        ? "正在连接歌曲资源，请稍候..."
        : vue.$nowMusicInfo.state.foot_info;
      if (vue.$nowMusicInfo.state.ischanging) {
        message.warning("正在切换歌曲中，请稍后");
        return;
      } else {
        vue.$nowMusicInfo.state.ischanging = true;
        //若当前已有sound对象存在且播放过那么执行清除
        if (
          vue.$nowSound.currentMusicId !== -110 ||
          vue.$nowSound.music_interval !== null
        ) {
          clearInterval(vue.$nowSound.music_interval);
          vue.$nowMusicInfo.state.playBtn.isPlay = false;
          vue.$nowSound.currentMusicId = -110;
          vue.$nowSound.sound.unload();
        }

        //获取当前歌曲信息（歌词，封面，歌名，歌手等）
        let newMusicInfo = null;
        if (!istry) {
          // console.log(vue.$nowMusicInfo.state.loadingAudioInfo);
          if (vue.$nowMusicInfo.state.music_id !== songid) {
            vue.$nowMusicInfo.state.loadingAudioInfo = true;
            newMusicInfo = await getMusicInfo(songid, vue.$defaultMusicInfo);
            vue.$nowMusicInfo.commit("setAll", newMusicInfo);
            //进度条置0
            vue.$nowMusicInfo.state.music_process = 0;
            document.title =
              newMusicInfo.music_name +
              " - " +
              this.getAllSinggers(newMusicInfo.music_singger);

            //赋值当前歌曲歌词对象
            if (!this.isEmpty(newMusicInfo.music_lrc)) {
              if (newMusicInfo.bool_t_lyric) {
                vue.$nowMusicInfo.state.bool_tlrc = true;
                vue.$nowMusicInfo.state.show_tlrc = true;
              } else {
                vue.$nowMusicInfo.state.bool_tlrc = false;
                vue.$nowMusicInfo.state.show_tlrc = false;
              }
            }
          }
        }
        //获取当前歌曲源
        let soundInfo = null;
        if (!istry) {
          // console.log("进入了handelmusic获取歌曲源");
          soundInfo = await getMusicaudio(
            songid,
            vue.$nowMusicInfo.state.music_volume,
            vue
          );
          // drawSpectrum(soundInfo.songUrl, vue.$nowMusicInfo.state.m_canvas);
          vue.$nowSound.sound = soundInfo;
        } else {
          soundInfo = {};
          soundInfo.sound = vue.$nowSound.sound;
          soundInfo.flag = vue.$nowSound.flag;
          soundInfo.freeTrialInfo = vue.$nowSound.freeTrialInfo;
        }
      }
    },
    //进度条拖动事件
    processChange(value) {
      if (this.$nowSound.music_interval !== null) {
        clearInterval(this.$nowSound.music_interval);
      }
      if (this.$nowMusicInfo.state.haveInfo === false) {
        return false;
      }
      this.$nowMusicInfo.state.music_nowTime = convertSec(
        (value / this.max) * this.$nowMusicInfo.state.totalSeconds,
        this
      );
    },
    afterProcessChange(value) {
      if (this.$nowMusicInfo.state.haveInfo === false) {
        return false;
      }
      let vue = this;
      vue.$nowMusicInfo.state.isWheeling = false;
      if (vue.$nowMusicInfo.state.playBtn.isPlay) {
        this.listenMusicProcess(
          vue.$nowSound.sound,
          vue.$nowSound.currentMusicId,
          vue
        );
      }
      if (
        vue.$nowSound.sound !== null &&
        vue.$nowSound.sound !== undefined &&
        Object.keys(vue.$nowSound.sound).length !== 0
      ) {
        this.max = this.max ? this.max : 200;
        let location = 0;

        if (vue.$nowSound.freeTrialInfo !== null) {
          let baseValue =
            (vue.$nowSound.freeTrialInfo.start /
              vue.$nowMusicInfo.state.totalSeconds) *
            this.max;
          if (value < baseValue) {
            vue.$nowSound.sound.seek(0, vue.$nowSound.currentMusicId);
            return true;
          }

          location =
            ((value - baseValue) / (this.max - baseValue)) *
            (vue.$nowMusicInfo.state.totalSeconds -
              vue.$nowSound.freeTrialInfo.start);
        } else {
          location = (value / this.max) * vue.$nowMusicInfo.state.totalSeconds;
        }
        vue.$nowSound.sound.seek(location, vue.$nowSound.currentMusicId);
        this.$refs.mprocess.blur();
      }
    },
    //监听歌曲进度
    listenMusicProcess(sound, soundId, vue) {
      if (!vue.$nowSound.flag) {
        // await this.handleMusic(vue.$nowMusicInfo.state.currentMusicId, this);
        clearInterval(vue.$nowSound.music_interval);
        return;
      }
      this.max = this.max ? this.max : 200;
      if (vue.$nowSound.music_interval !== null) {
        clearInterval(vue.$nowSound.music_interval);
      }
      let freeTrialInfo = false;
      if (vue.$nowSound.freeTrialInfo !== null) {
        freeTrialInfo = true;
      }
      vue.$nowSound.music_interval = setInterval(() => {
        if (freeTrialInfo) {
          //当前播放位置(ms)
          this.playLocation =
            vue.$nowSound.freeTrialInfo.start + sound.seek(null, soundId);
        } else {
          const tmp = sound.seek(null, soundId);
          this.playLocation = tmp ? tmp : this.playLocation;
        }

        vue.$nowMusicInfo.state.playLocation = this.playLocation;
        let location = parseFloat(
          (
            (this.playLocation / vue.$nowMusicInfo.state.totalSeconds) *
            this.max
          ).toFixed(1)
        );

        vue.$nowMusicInfo.state.music_process = location;
        vue.$nowMusicInfo.state.music_nowTime = convertSec(
          vue.$nowMusicInfo.state.playLocation,
          vue
        );
      }, vue.$nowSound.music_interval_step);
    },
    async lastMusic() {
      return;
      await this.handleMusic(25727803, this, false);
    },
    async nextMusic() {
      // 修炼爱情 25727803
      return;
      await this.handleMusic(1388813293, this, false);
    },
    //音频事件注册
    registerSound(nowSound, nowMusicInfo, freeTrialInfo) {
      let that = this;
      if (freeTrialInfo !== null && nowSound.freeTrialInfo !== null) {
        this.max = this.max ? this.max : 200;
        // const v1 = (freeTrialInfo.start / 100) * this.max;
        // this.marks = ref({ v1: "试听开始", 495: "试听结束" });
        nowMusicInfo.state.totalSeconds =
          nowSound.sound.duration(nowSound.currentMusicId) +
          freeTrialInfo.start;
      } else {
        nowMusicInfo.state.totalSeconds = nowSound.sound.duration(
          nowSound.currentMusicId
        );
      }

      nowSound.sound.on("end", function () {
        if (nowSound.sound.loop(null, nowMusicInfo.state.currentMusicId)._loop)
          return;
        nowMusicInfo.state.playBtn.isPlay = false;
        clearInterval(that.music_interval);
        nowMusicInfo.state.currentRow = 0;
        nowMusicInfo.state.music_process = 0;
        //歌曲结束时移除该音频监听事件
        // nowSound.sound.off("fade", null, that.currentMusicId);
        // nowSound.sound.off("seek", null, that.currentMusicId);
        console.log("end");
      });
      nowSound.sound.on("fade", function () {
        if (!nowMusicInfo.state.playBtn.isPlay) {
          nowSound.sound.pause(nowSound.currentMusicId);
        } else {
        }
      });
      nowSound.sound.on("seek", function () { });
    },
    //改变播放状态
    async changePlayStatus(vue) {
      vue = vue ?? this;
      if (
        vue.$nowMusicInfo.state.haveInfo &&
        vue.$nowMusicInfo.state.isInit &&
        !vue.$nowMusicInfo.state.ischanging
      ) {
        vue.handleMusic(vue.$nowMusicInfo.state.music_id, vue, false);
        vue.$nowMusicInfo.state.foot_info = "正在恢复您的歌曲资源...";
        return;
      }
      if (
        vue.$nowSound.sound === null ||
        vue.$nowSound.sound === undefined ||
        Object.keys(vue.$nowSound.sound).length === 0 ||
        vue.$nowMusicInfo.state.ischanging
      ) {
        return;
      }
      let that = this;
      if (!vue.$nowSound.flag) {
        clearInterval(vue.$nowSound.music_interval);
        return;
      }
      //清除定时器并为当前sound注册事件
      clearInterval(vue.$nowSound.music_interval);
      if (
        vue.$nowSound.sound.isRegister === undefined ||
        vue.$nowSound.sound.isRegister === false
      ) {
        vue.$nowSound.sound.isRegister = true;
        this.registerSound(
          vue.$nowSound,
          vue.$nowMusicInfo,
          vue.$nowSound.freeTrialInfo
        );
      }

      //开始渐变切换播放状态
      if (!vue.$nowMusicInfo.state.playBtn.isPlay) {
        if (vue.$nowSound.currentMusicId !== -110) {
          vue.$nowSound.sound.fade(
            0,
            vue.$nowMusicInfo.state.music_volume / 100.0,
            1000,
            vue.$nowSound.currentMusicId
          );
          await vue.$nowSound.sound.play(vue.$nowSound.currentMusicId);
          if (
            vue.$nowMusicInfo.state.music_volume !==
            vue.$nowSound.sound.volume()
          ) {
            vue.$nowSound.sound.volume(
              vue.$nowMusicInfo.state.music_volume / 100.0,
              vue.$nowSound.currentMusicId
            );
          }
        } else {
          vue.$nowSound.currentMusicId = await vue.$nowSound.sound.play();
        }
        that.listenMusicProcess(
          vue.$nowSound.sound,
          vue.$nowSound.currentMusicId,
          vue
        );
        vue.$nowMusicInfo.state.playBtn.isPlay = true;
      } else {
        clearInterval(vue.$nowSound.music_interval);
        vue.$nowSound.sound.fade(
          vue.$nowMusicInfo.state.music_volume / 100.0,
          0,
          800,
          vue.$nowSound.currentMusicId
        );
        vue.$nowMusicInfo.state.playBtn.isPlay = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.control-lyric {
  height: 24px;
}

@transition-time: 0.3s;

// @import "@renderer/styles/theme/theme.less";
.tag-mv {
  cursor: pointer;
}

.tag-mv:hover {
  background-color: rgba(47, 104, 20, 0.644);
  color: #ffffff;
}

.icon-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

/deep/ .ant-btn-primary:focus {
  color: #fff;
  background: var(--defaultPrimaryColor);
  border-color: var(--defaultPrimaryColor);
}

/deep/.ant-slider-handle {
  width: 0;
  height: 0;
  margin-top: 0;
  display: none;
  transition: none;
}

/deep/.ant-slider-handle:focus {
  box-shadow: none;
  width: 0px;
  height: 0px;
  margin-top: -4px;
  background-color: var(--defaultPrimaryColor);
  border: 0;
  border-radius: 50%;
  display: flex;
  // transition: 0s;
}

/deep/.ant-slider-track {
  background-color: var(--defaultPrimaryColor);
  transition: width .2s !important;
}

/deep/ .ant-slider-rail {
  transition: none;
  background-color: #eeeeee;
}

/deep/.ant-slider:hover .ant-slider-rail {
  background-color: #eeeeee;
}

/deep/.ant-slider:hover .ant-slider-track {
  background-color: var(--defaultPrimaryColor);
  transition: none;
}

/deep/ .ant-slider:hover .ant-slider-handle {
  transition: none;
  width: 0px;
  height: 0px;
  margin-top: -4px;
  background-color: var(--defaultPrimaryColor);
  border: none;
  border-radius: 50%;
  display: flex;
}

/deep/ .ant-btn-primary {
  background-color: var(--defaultPrimaryColor);
  border: none;
}

/deep/ .ant-btn-primary:hover {
  background-color: var(--defaultPrimaryColor-7);
  border: none;
}

.myRange {
  // width: 100%;
}

/deep/ .ant-btn {
  margin: 0 10px 0 10px;
  -webkit-appearance: none;
}

.avatar-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  color: #fff;
  line-height: 64px;
  text-align: center;
  opacity: 0;
  border-radius: 50%;
  transition: opacity 0.2s;
  pointer-events: none;
}

.music-small-avatar:hover+.avatar-cover {
  opacity: 1;
}

.action-like {
  color: var(--defaultPrimaryColor);
  cursor: pointer;
}

.action-music-info-right {
  padding-left: 5px;
  display: flex;
  align-items: center;
}

.action-like:hover .icon-like {
  fill: var(--defaultPrimaryColor);
}

.action-like:hover .icon-mv {
  fill: #3d3d3d;
  transition: 0.2s;
}

.icon-like {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 1.3em;
  height: 1.3em;
  fill: var(--defaultPrimaryColor);
}

.icon-mv {
  margin-left: 5px;
  width: 1.3em;
  height: 1.3em;
  fill: #9e9e9e;
  transition: fill 0.2s;
}

.myIcon {
  width: 1em;
  height: 1em;
  fill: #5a5a5a;
}

.playMode-icons {
  display: flex;
}

.playMode-icons:hover .playMode-icon {
  fill: #363636;
  // transition: 0.3s;
}

.playMode-icon {
  width: 1.8em;
  height: 1.8em;
  fill: #777777;
  transition: 0.3s;
}

.pp-active {
  position: relative;
}

.pp-active::after {
  content: "";
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #353535;
  // border: 2px solid #353535;
  // border-top-color: transparent;
  // border-left-color: transparent;
  // transform: rotate(25deg);
}

.pp-icons {
  display: flex;
  align-items: center;
  cursor: pointer;

  .pp-icon {
    width: 1.6em;
    height: 1.6em;
    fill: #777777;
    transition: 0.3s;

    &:hover {
      fill: #363636;
    }
  }
}

.volume-icon {
  width: 1.8em;
  height: 1.8em;
  fill: #777777;
  transition: 0.3s;
}

.volume-icons {
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.volume-icons:hover .volume-icon {
  fill: #363636;
  // transition: 0.3s;
}

.tip-foot-info {
  margin-bottom: -5px;
  margin-top: -5px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 14px;
  color: #8f8f8f;
  height: 20px;
}

.tip-nowProcess {
  display: flex;
  justify-content: center;
  padding-left: 10px;
  color: #afafaf;
  font-size: 15px;
  height: 20px;
  margin-top: 5px;
}

.tip-allProcess {
  display: flex;
  justify-content: center;
  color: #afafaf;
  font-size: 15px;
  height: 20px;
  margin-top: 5px;
}

.col-contronl-btns {
  display: flex;
  justify-content: center;
  align-items: center;
}

.col-contronl-btns2 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.col-contronl-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 0 0;
}

.music-left {
  display: flex;
  align-items: center;
}

.music-small-avatar {
  cursor: pointer;
  transition: 0.1s;
  box-shadow: 0 0 0 4px rgba(48, 48, 48, 0.25);
  // border: 1px solid var(--defaultPrimaryColor);
}

.music-small-avatar img {
  border-radius: 50%;
  // border: 1px solid var(--defaultPrimaryColor);
}

.music-play-animate {
  animation-name: circleChange;
  animation-duration: 2.5s;
  animation-timing-function: ease-in;
  border-radius: 50%;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes circleChange {
  0% {
    box-shadow: 0 0 0 0rem var(--coverBorderColor),
      0 0 0 2px var(--coverBorderColor-2), 0 0 0 4px var(--coverBorderColor-4),
      0 0 0 12px var(--coverBorderColor-6);
  }

  100% {
    box-shadow: 0 0 0 2px var(--coverBorderColor-2),
      0 0 0 4px var(--coverBorderColor-4), 0 0 0 12px var(--coverBorderColor-6);
  }
}

.music-pic {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.music-simple-info {
  width: 140px;
  margin: 0 0 0 15px;
  display: flex;
  flex-direction: column;
}

.music-name {
  color: #333333;
  font-size: 15px;
  text-align: left;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(150%);
  // min-width: 80%;
  width: auto;
  // margin: 0 0 0 15px;
}

.music-singer {
  text-align: left;
  color: #858585;
  font-size: 13px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  // margin: 0 0 0 18px;
}

.music-process {
  margin: 0 0 0 0;
  width: 100%;
  -webkit-app-region: no-drag;
}
</style>
