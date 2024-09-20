<template>
  <div :class="['all-container', { 'playing-background': $nowMusicInfo.state.haveInfo }]">
    <!-- 预留logo -->
    <div
      style="position: absolute; z-index: 10; -webkit-user-drag: none"
      v-show="!$nowMusicInfo.state.haveInfo"
    >
      <svg
        t="1640691953866"
        class="icon-logo"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5235"
        width="256"
        height="256"
      >
        <path
          d="M430.08 291.84c166.8352 0 302.08 135.2448 302.08 302.08s-135.2448 302.08-302.08 302.08-302.08-135.2448-302.08-302.08 135.2448-302.08 302.08-302.08z m0 112.64c-104.6272 0-189.44 84.8128-189.44 189.44s84.8128 189.44 189.44 189.44 189.44-84.8128 189.44-189.44-84.8128-189.44-189.44-189.44z"
          p-id="5236"
        />
        <path
          d="M538.19392 128h114.35008l78.94016 447.48288-110.92992 19.5584z"
          p-id="5237"
        />
        <path
          d="M596.224 225.54624l56.32-97.54624 239.44192 138.24-56.32 97.54624z"
          p-id="5238"
        />
        <path
          d="M573.45536 327.96672c69.51936 37.5552 122.63936 101.57056 145.8688 178.54976l12.16 68.9664-110.92992 19.5584-1.10592-6.2976a188.9792 188.9792 0 0 0-9.71776-55.09632l-36.2752-205.68064zM652.544 128l25.5488 144.80896-127.31904-73.50784L538.19392 128h114.34496z"
          p-id="5239"
        />
      </svg>
    </div>
    <!-- <img
      style="position: absolute;z-index: 10;-webkit-user-drag: none;"
      alt="logo"
      :src="$nowMusicInfo.state.music_small_picUrl"
      v-show="!$nowMusicInfo.state.haveInfo"
    />-->
    <!-- 顶部tabs -->
    <div
      v-if="$nowMusicInfo.state.haveInfo"
      style="position: absolute; top: 0.5rem; z-index: 10"
    >
      <div>
        <ul class="all-tab">
          <li
            v-for="(t, index) in mTbas"
            :index="index"
            :class="['m-tab', { 'm-active': currentTab === index }]"
            @click="changeTab(index)"
          >
            {{ t.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 背景图片容器 -->
    <div class="p-container" v-show="$nowMusicInfo.state.haveInfo">
      <img
        ref="bg_big_img"
        style="position: absolute; right: 0"
        @load="underLoaded"
        :class="[
          'music_background opacity-0',
          { fadein: !$nowMusicInfo.state.loadingAudioInfo },
        ]"
        alt="music logo"
        :src="$nowMusicInfo.state.music_picUrl"
      />
      <img
        ref="bg_big_under_img"
        :onerror="errorImage"
        style="position: absolute; right: 0"
        :class="[
          'music_background_under',
          { fadeOut: !$nowMusicInfo.state.loadingAudioInfo },
        ]"
        alt="music logo"
        :src="$nowMusicInfo.state.music_under_picUrl"
      />
    </div>

    <!-- 热评模式容器 -->
    <div style="position: absolute; height: 100%; width: 100%" v-show="currentTab === 2">
      <div v-if="!$wycomments.state.loading" class="titile-comment">
        以下摘自歌曲《{{ $nowMusicInfo.state.music_name }}》热评
      </div>
      <div class="hot-comment">
        <div v-if="!$wycomments.state.loading" class="comment-container-left">
          <LeftOutlined @click="lastComment" class="left-comment" />
        </div>
        <div class="comment-container">
          <div v-if="$wycomments.state.loading" class="hot-comment-loading">
            <LoadingOutlined />
            <!-- v-if="!$wycomments.state.loading" -->
          </div>
          <div v-if="!$wycomments.state.loading">
            <div class="commnet-top">
              <div>
                <img
                  class="comment-avatar"
                  :src="
                    $wycomments.state.commentList[currentComment].user.avatarUrl +
                    '?param=48x48'
                  "
                />
              </div>
              <div class="comment-description">
                <span>{{
                  $wycomments.state.commentList[currentComment].user.nickname
                }}</span>
              </div>
            </div>
            <div class="comment-content">
              {{ $wycomments.state.commentList[currentComment].content }}
            </div>
            <div class="comment-action">
              <LikeOutlined style="margin: -3px 2px 0 0" />
              <span>{{ $wycomments.state.commentList[currentComment].likedCount }}</span>
            </div>
            <div class="comment-date">
              {{ $wycomments.state.commentList[currentComment].time }}
            </div>
            <div class="comment-page">
              <!-- <input class="comment-page-current" type="text" v-model="currentComment"/> -->
              {{ currentComment + 1 + " / " + $wycomments.state.commentList.length }}
            </div>
          </div>
        </div>
        <div v-if="!$wycomments.state.loading" class="comment-container-right">
          <RightOutlined @click="nextComment" class="right-comment" />
        </div>
      </div>
    </div>
    <!-- 封面模式容器 -->
    <div v-show="currentTab === 1">
      <div>
        <!-- .trans-active -->
        <div
          style="height: 16rem; width: 16rem"
          :class="[
            'img-cover-div',
            { 'img-tanslateCover-paused': !$nowMusicInfo.state.playBtn.isPlay },
          ]"
        ></div>
        <img
          style
          :class="[
            'img-coverMode',
            'img-tanslateCover',
            { 'img-tanslateCover-paused': !$nowMusicInfo.state.playBtn.isPlay },
          ]"
          alt="music logo"
          :src="$nowMusicInfo.state.music_cover_picUrl"
        />
      </div>
      <div class="music-info-coverMode">
        <div>
          <div>
            <!-- {{$nowMusicInfo.state.music_name + ' - ' +$nowMusicInfo.state.music_singger[0]}} -->
          </div>
        </div>
      </div>
    </div>
    <!-- 单行歌词 -->
    <div
      v-show="
        ($nowMusicInfo.state.music_lrc.length > 1 && currentTab === 1) || currentTab === 2
      "
    >
      <span class="playMode-lyric">{{ $nowMusicInfo.state.currentLyric }}</span>
    </div>
    <div
      class="pure-music"
      v-if="
        ($nowMusicInfo.state.music_lrc.length === 0 ||
          $nowMusicInfo.state.music_lrc.length === 1) &&
        $nowMusicInfo.state.haveInfo &&
        currentTab === 0
      "
    >
      <span>纯音乐，请欣赏</span>
    </div>
    <!-- 歌词容器 -->
    <div
      v-show="currentTab === 0 && $nowMusicInfo.state.music_lrc.length > 1"
      class="lrc-container"
      ref="lrcContainer"
      @mousewheel="wheelMove"
    >
      <!-- v-if="!$nowMusicInfo.state.music_lrc&&$nowMusicInfo.state.haveInfo" -->

      <div>
        <a-row justify="center" class="lyric-container">
          <a-col :span="24" class="song-lyric" ref="lyricUL">
            <!-- 这里用内联样式来实现当前歌词的高亮显示 -->
            <a-row
              key="default"
              :style="lyric_row"
              :class="[
                { 'lyric-row': !$nowMusicInfo.state.bool_tlrc },
                { 'lyric-row-trans': $nowMusicInfo.state.bool_tlrc },
              ]"
            ></a-row>
            <a-row
              v-if="$nowMusicInfo.state.music_lrc"
              justify="center"
              v-for="(item, index) in $nowMusicInfo.state.music_lrc"
              :key="index"
              :style="lyric_row"
              :class="[
                { 'lyric-row': !$nowMusicInfo.state.show_tlrc },
                { 'lyric-row-trans': $nowMusicInfo.state.show_tlrc },
                { 'lyric-now': index == $nowMusicInfo.state.currentRow },
              ]"
            >
              <span
                :key="index"
                class="lyric-line"
                :class="[{ 'lyric-line-now': index == $nowMusicInfo.state.currentRow }]"
                @click="JumpToPosition(item, index)"
                >{{ item.text }}</span
              >
              <span v-if="item.t_text && $nowMusicInfo.state.show_tlrc">{{
                item.t_text
              }}</span>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="canvas-container" v-show="$nowMusicInfo.state.showPP">
      <canvas ref="mp3Canvas" id="mp3-spectrum" class="canvas"></canvas>
    </div>
    <!-- 翻译切换按钮 -->
    <div
      :class="['trans-action', { 'trans-active': $nowMusicInfo.state.show_tlrc }]"
      @click="changeTrans"
      v-if="
        $nowMusicInfo.state.haveInfo && $nowMusicInfo.state.bool_tlrc && currentTab === 0
      "
    >
      <Icon :class="[{ 'fill-background': $nowMusicInfo.state.show_tlrc }]">
        <template #component>
          <svg
            t="1637234519427"
            class="myIcon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3564"
          >
            <path
              d="M128 64c-35.345655 0-64 28.654345-64 64v768c0 35.345655 28.654345 64 64 64h768c35.345655 0 64-28.654345 64-64v-768c0-35.345655-28.654345-64-64-64h-768z m0-64h768C966.692487 0 1024 57.307513 1024 128v768C1024 966.692487 966.692487 1024 896 1024h-768C57.307513 1024 0 966.692487 0 896v-768C0 57.307513 57.307513 0 128 0z m329.143025 251.428487h301.715127v68.571513c-18.020046 27.895172-58.368 67.967706-96.000589 96.000589 24.064 8.704 69.777949 13.274336 137.143026 13.71336l-13.714538 68.57269c-63.360883-7.297471-123.483807-31.818152-164.572102-54.858152-43.775411 21.120294-101.211218 41.41668-164.570924 54.856975l-27.429076-68.571513c56.378851-8.492138 100.279025-12.452782 137.143026-27.427898-28.031706-24.960883-54.747513-45.038345-68.571513-82.286051h-41.142437v-68.571513z m114.85749 68.571513c12.288 25.728294 22.271411 41.183632 47.998529 60.000515 31.873471-19.969177 45.072478-35.424515 60.048772-60.000515h-108.047301zM512 512h68.571513v-41.142437h68.556211V512h68.586814v68.571513h-68.586814v41.142436h109.729251v68.57269h-109.729251v109.712772H580.57269v-109.713949h-109.71395v-68.571513h109.71395V580.57269H512V512zM306.285462 223.999411c34.286345 22.113692 81.117278 54.858152 109.713949 82.286051l-54.856974 68.57269c-21.504-26.113177-54.527411-65.665471-95.999412-96.000589l41.142437-54.856974z m137.157149 397.714538v54.856975c-56.437701 53.431614-97.586023 90.002538-123.442611 109.715127l-36.000074-58.28561c10.752-9.600883 22.285536-25.042097 22.285536-37.714979V470.857563h-82.284873v-68.572689h150.857563V662.857563c28.631982-9.103007 51.494253-22.817545 68.584459-41.143614z"
              p-id="3565"
            />
          </svg>
        </template>
      </Icon>
    </div>
  </div>
</template>

<script>
import Icon from "@ant-design/icons-vue";
import {
  LikeOutlined,
  LoadingOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { getComment } from "@renderer/utils/getMusicUtils_wy";
import analyze from "rgbaster";
import { ref } from "vue";
export default {
  name: "playPage",
  created() {},
  setup() {
    const currentTab = ref(0);
    const currentComment = ref(0);
    return {
      currentTab,
      currentComment,
      mTbas: [
        {
          name: "歌词模式",
        },
        {
          name: "封面模式",
        },
        {
          name: "热评模式",
        },
      ],
      //鼠标滚轮滚动的步长
      step: 0,
      secStep: ref(0.3),
      timeout: null,
      timer: null,
    };
  },
  components: {
    Icon,
    LikeOutlined,
    LoadingOutlined,
    LeftOutlined,
    RightOutlined,
  },
  mounted() {
    this.$nowMusicInfo.state.m_playPage = this;
    this.$nowMusicInfo.state.m_canvas = this.$refs.mp3Canvas;
    // this.draw()
  },
  data() {
    return {
      page: null,
      bigstep: 43.6,
      smallstep: 21.6,
      canvas: this.$refs.mp3Canvas,
    };
  },
  methods: {
    JumpToPosition(t, i) {
      if (
        this.$nowMusicInfo.state.haveInfo &&
        this.$nowMusicInfo.state.isInit &&
        !this.$nowMusicInfo.state.ischanging
      ) {
        return false;
      } else {
        if (this.$nowMusicInfo.state.currentRow === i) {
          return false;
        } else {
          this.$nowMusicInfo.state.currentRow = i;
          this.$nowSound.sound.seek(t.time, this.$nowSound.currentMusicId);
        }
      }
    },
    nextComment() {
      if (this.currentComment >= this.$wycomments.state.commentList.length - 1) {
        this.currentComment = 0;
      } else {
        this.currentComment += 1;
      }
      console.log(this.currentComment);
    },
    lastComment() {
      if (this.currentComment <= 0) {
        this.currentComment = this.$wycomments.state.commentList.length - 1;
      } else {
        this.currentComment -= 1;
      }
      console.log(this.currentComment);
    },
    debounce(fn, wait) {
      return function () {
        if (this.timer !== null) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(fn, wait);
      };
    },
    wheelMove(e) {
      if (this.timeout != null) {
        window.clearTimeout(this.timeout);
      }
      this.$nowMusicInfo.state.isWheeling = true;
      //3000ms后，假定认为停止滚动
      const that = this;
      this.timeout = window.setTimeout(function () {
        that.$nowMusicInfo.state.isWheeling = false;
      }, 2000);
      this.debounce(this.actualMove(e), 500);
    },
    actualMove(e) {
      const h =
        this.$nowMusicInfo.state.bool_tlrc && this.$nowMusicInfo.state.show_tlrc
          ? 75
          : 55;
      const maxStep = this.$nowMusicInfo.state.music_lrc.length * (h - 10);
      const move = h - 20;
      this.step = e.deltaY > 0 ? this.step + move : this.step - move;
      this.step = this.step < 0 ? 0 : this.step > maxStep ? maxStep : this.step;
      this.lyric_row = "transform: translateY(-" + this.step + "px)";
    },
    async draw() {
      const that = this;
      let canvas = document.getElementById("canvas");
      let cxt = canvas.getContext("2d");
      let output = new Uint8Array(361);

      setTimeout(() => {
        (function drawSpectrum() {
          that.$nowSound.atx.audioAnalyser.getByteFrequencyData(output); //获取频域数据
          cxt.clearRect(0, 0, canvas.width, canvas.height);
          //画线条
          for (let i = 0; i < output.length; i++) {
            let value = output[i] / 10;
            //绘制左半边
            cxt.beginPath();
            cxt.lineWidth = 1;
            cxt.moveTo(300, 300);
            cxt.lineTo(
              Math.cos(((i * 0.5 + 90) / 180) * Math.PI) * (200 + value) + 300,
              -Math.sin(((i * 0.5 + 90) / 180) * Math.PI) * (200 + value) + 300
            );
            cxt.stroke();
            //绘制右半边
            cxt.beginPath();
            cxt.lineWidth = 1;
            cxt.moveTo(300, 300);
            cxt.lineTo(
              Math.sin(((i * 0.5) / 180) * Math.PI) * (200 + value) + 300,
              -Math.cos(((i * 0.5) / 180) * Math.PI) * (200 + value) + 300
            );
            cxt.stroke();
          }
          //画一个小圆，将线条覆盖
          cxt.beginPath();
          cxt.lineWidth = 1;
          cxt.arc(300, 300, 200, 0, 2 * Math.PI, false);
          cxt.fillStyle = "#fff";
          cxt.stroke();
          cxt.fill();
          //请求下一帧
          requestAnimationFrame(drawSpectrum);
        })();
      }, 2000);
    },
    errorImage() {
      this.$nowMusicInfo.state.music_under_picUrl = null;
    },
    async underLoaded() {
      await this.getMainColor();
      setTimeout(() => {
        this.$nowMusicInfo.commit("setUnderImgUrl");
        // this.draw();
      }, 1000);
    },
    async getMainColor() {
      const r = document.querySelector(":root");
      const result = await analyze(this.$nowMusicInfo.state.music_cover_picUrl, {
        scale: 0.5,
      });
      let c = result[0].color.match(/\d+/g);
      const grayLevel = c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;
      const standard = 55;
      if (grayLevel < standard) {
        c = result[result.length - 1].color.match(/\d+/g);
        for (let i = 0; i < 3; i++) c[i] = Math.floor(c[i] * (1 + 2));
      }
      const rgb = `rgba(${c[0]},${c[1]},${c[2]})`;
      const rgba2 = `rgba(${c[0]},${c[1]},${c[2]},0.2)`;
      const rgba4 = `rgba(${c[0]},${c[1]},${c[2]},0.4)`;
      const rgba6 = `rgba(${c[0]},${c[1]},${c[2]},0.6)`;
      r.style.setProperty("--coverBorderColor", rgb);
      r.style.setProperty("--coverBorderColor-2", rgba2);
      r.style.setProperty("--coverBorderColor-4", rgba4);
      r.style.setProperty("--coverBorderColor-6", rgba6);
      // console.log(grayLevel);
      // console.log(c);
    },
    async p_getComments() {
      if (this.$wycomments.state.id !== this.$nowMusicInfo.state.music_id) {
        this.$wycomments.state.loading = true;
        this.$wycomments.state.id = this.$nowMusicInfo.state.music_id;
        this.$wycomments.state.commentList = await getComment(
          this.$nowMusicInfo.state.music_id,
          2,
          this.$nowMusicInfo.state.realIP
        );
        this.currentComment = 0;
        this.$wycomments.state.loading = false;
      } else {
        return;
      }
    },
    async changeTab(index) {
      index = index ? index : 0;
      this.currentTab = index;
      if (this.currentTab === 2) {
        this.p_getComments();
      }
    },
    setDisply(v, index, disptext) {
      v = v ? v : this.page;
      index = index ? index : 0;
      disptext = disptext ? disptext : "";
      if (index === 0) {
        v.$refs.bg_big_img.style.display = disptext;
      } else if (index === 1) {
        v.$refs.bg_big_under_img.style.display = disptext;
      }
    },
    setOpacity(v, index, type) {
      //index:0为bg_big_img 1为bg_big_under_img
      v = v ? v : this.page;
      index = index ? index : 0;
      type = type ? type : 0;
      let dom = null;
      if (index === 0) {
        dom = v.$refs.bg_big_img;
      } else if (index === 1) {
        dom = v.$refs.bg_big_under_img;
      }
      if (type === 0) {
        dom.classList.remove("opacity-full");
        dom.classList.add("opacity-0");
      } else if (type === 1) {
        dom.classList.remove("opacity-0");
        dom.classList.add("opacity-full");
      }
    },
    setFadein(v, index) {
      //index:0为bg_big_img 1为bg_big_under_img
      v = v ? v : this.page;
      index = index ? index : 0;
      if (index === 0) {
        v.$refs.bg_big_img.classList.add("fadein");
      } else if (index === 1) {
        v.$refs.bg_big_under_img.classList.add("fadein");
      }
    },
    removeFadein(v, index) {
      v = v ? v : this.page;
      index = index ? index : 0;
      if (index === 0) {
        v.$refs.bg_big_img.classList.remove("fadein");
      } else if (index === 1) {
        v.$refs.bg_big_under_img.classList.remove("fadein");
      }
    },
    setFadeOut(v, index) {
      v = v ? v : this.page;
      index = index ? index : 0;
      if (index === 0) {
        v.$refs.bg_big_img.classList.add("fadeOut");
      } else if (index === 1) {
        v.$refs.bg_big_under_img.classList.add("fadeOut");
      }
    },
    removeFadeOut(v, index) {
      v = v ? v : this.page;
      index = index ? index : 0;
      if (index === 0) {
        v.$refs.bg_big_img.classList.remove("fadeOut");
      } else if (index === 1) {
        v.$refs.bg_big_under_img.classList.remove("fadeOut");
      }
    },
    changeTrans() {
      this.$nowMusicInfo.state.show_tlrc = !this.$nowMusicInfo.state.show_tlrc;
      if (!this.$nowMusicInfo.state.playBtn.isPlay) {
        if (this.$nowMusicInfo.state.show_tlrc) {
          this.$nowMusicInfo.state.playLocation += 0.00001;
        } else {
          this.$nowMusicInfo.state.playLocation -= 0.00001;
        }
      }
    },
  },
  computed: {
    musicId() {
      return this.$nowMusicInfo.state.music_id;
    },
    playLocation() {
      return this.$nowMusicInfo.state.playLocation;
    },
  },
  watch: {
    musicId() {
      if (this.currentTab === 2) {
        this.p_getComments();
      }
    },
    playLocation() {
      if (!this.$nowMusicInfo.state.music_lrc) {
        this.$nowMusicInfo.state.currentLyric = "";
        return;
      }
      if (
        this.$nowMusicInfo.state.currentRow === 0 ||
        this.$nowMusicInfo.state.music_lrc === null
      ) {
        this.lyric_row = "transform: translateY(0)";
      }

      this.$nowMusicInfo.state.music_lrc.forEach((element, index) => {
        if (this.$nowMusicInfo.state.playLocation >= element.time - this.secStep) {
          this.$nowMusicInfo.state.currentLyric = element.text;
          this.$nowMusicInfo.state.currentRow = index; //通过比较歌词属性里的时间与当前播放时间，来定位到该歌词
          if (
            this.$nowMusicInfo.state.show_tlrc &&
            !this.$nowMusicInfo.state.isWheeling
          ) {
            if (index > 1) {
              this.step = (44 + 25) * (index - 1);
              this.lyric_row = "transform: translateY(-" + this.step + "px);";
            }
          } else if (
            !this.$nowMusicInfo.state.show_tlrc &&
            !this.$nowMusicInfo.state.isWheeling
          ) {
            if (index > 2) {
              this.step = (22 + 25) * (index - 2);
              this.lyric_row = "transform: translateY(-" + this.step + "px);";
            }
          }
        }
      });
    },
  },
  data() {
    return {
      lyric_row: "translateY(0px)",
    };
  },
};
</script>

<style lang="less" scoped>
.canvas-container {
  transform: translateZ(0);
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 0;

  // -webkit-mask-image: linear-gradient(to left, rgb(91, 91, 91), rgba(113, 113, 113, 0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,1));
  .canvas {
    width: 99%;
    height: 100%;
    // background: transparent;
  }
}

.hot-comment {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.hot-comment-loading {
  font-size: 24px;
  width: 100%;
  color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.titile-comment {
  font-size: 14px;
  position: absolute;
  color: #dbdbdbab;
  top: 15%;
  left: 0;
  right: 0;
}

.commnet-top {
  display: flex;

  .comment-description {
    display: flex;
    align-items: center;
    color: #dbdbdb;
  }
}

.comment-date {
  color: #ccccccaf;
  margin: 5px 2rem 1rem 0;
  position: absolute;
  right: -10px;
  bottom: 0;
}

.comment-page {
  letter-spacing: 1.5px;
  margin: 1rem 0;
  color: #dbdbdb;
  position: absolute;
  left: 2rem;
  bottom: 0;
}

.comment-page-current:focus {
  border: 1px solid #ffffff46;
  outline: none;
}

.comment-page-current {
  background: transparent;
  width: 30px;
  text-align: center;
  border: 1px solid #ffffff46;
}

.comment-action {
  position: absolute;
  right: -10px;
  bottom: 2.5rem;
  margin: 0 2rem;
  color: #aaaaaa;
}

.comment-content {
  text-align: center;
  text-align: left;
  margin: 0 1.5rem 8px 1.5rem;
  font-size: 14px;
  color: #e6e3e3ce;
  height: 100px;
  padding: 5px;
  overflow: auto;
}

.comment-content::-webkit-scrollbar {
  width: 0;
}

.comment-content::-webkit-scrollbar-thumb {
  background: #e6e3e3ce;
  border-radius: 10px;
}

.comment-content::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

.left-comment:hover {
  color: #e6e3e3;
  font-size: 24px;
  transition: 0.2s;
}

.left-comment {
  cursor: pointer;
  transition: 0.15s;
}

.right-comment {
  cursor: pointer;
  transition: 0.15s;
}

.right-comment:hover {
  color: #e6e3e3;
  font-size: 24px;
  transition: 0.15s;
}

.comment-container-left {
  color: #e7e1e148;
  width: 10%;
  font-size: 20px;
  z-index: 0;
}

.comment-container-right {
  width: 10%;
  font-size: 20px;
  z-index: 0;
  color: #e7e1e148;
}

.comment-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 52%;
  width: 60%;
  color: #e6e3e3;
  border-radius: 15px;
  background-color: #ffffff1e;
  transition: 0.3s;
}

.comment-container:hover {
  background-color: #ffffff2d;
  box-shadow: 0 0 10px #9c9c9c2d;
  transition: 0.3s;
}

.comment-avatar {
  margin: 1rem 8px 1rem 1rem;
  height: 48px;
  width: 48px;
  border-radius: 50%;
}

.icon-logo path {
  fill: var(--defaultPrimaryColor);
}

.playMode-lyric {
  color: #f3f3f3d0;
  position: absolute;
  left: 0;
  right: 0;
  font-size: 18px;
  margin: auto;
  bottom: 10%;
  max-width: calc(96%);
}

.song-lyric {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.music-info-coverMode {
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  color: rgb(233, 233, 233);
}

.img-cover-div {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  border-radius: 50%;
  transform: translateZ(0);
}

.img-coverMode {
  display: inline-block;
  max-width: 100%;
  border-radius: 50%;
  width: 15rem;
  height: auto;
  z-index: 10;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  border: 40px solid #1f1f1f;
  box-shadow: 0 0 0 20px #00000046, 0 0 0 20px var(--coverBorderColor-4);
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  // box-shadow: 0px 4px 8px #dddddd;
}

@keyframes circleChange {
  0% {
    box-shadow: 0 0 0 0rem var(--coverBorderColor-2), 0 0 0 8px var(--coverBorderColor-2),
      0 0 0 16px var(--coverBorderColor-2), 0 0 0 24px var(--coverBorderColor-2);
  }

  100% {
    box-shadow: 0 0 0 8px var(--coverBorderColor-2), 0 0 0 16px var(--coverBorderColor-2),
      0 0 0 24px var(--coverBorderColor-2);
  }
}

@keyframes translate {
  /*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
  0% {
    /*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

// 旋转动画
.img-tanslateCover {
  animation: translate 25s linear infinite;
}

//边框波纹特效
.img-coverMode-animate {
  animation-name: circleChange;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  border-radius: 50%;
  animation-iteration-count: infinite;
}

.img-tanslateCover-paused {
  animation-play-state: paused;
}

.all-tab {
  font-size: 0;
  /*消除li inline-block 为行内元素后的默认间距*/
  list-style: none;
}

.all-tab li {
  position: relative;
  /*关键点： 为每个li设置绝对定位*/
  display: inline-block;
  /*使li为块级元素，可以横向排列*/
  padding: 8px 3rem;
  color: #969696;
}

.all-tab li::before {
  content: "";
  position: absolute;
  top: 0;
  left: 100%;
  width: 0;
  height: 100%;
  border-bottom: 2px solid #ececec;
  // transition: 0.15s ease-in-out;
}

.all-tab li:hover ~ li::before {
  left: 0;
  right: 0;
  margin: auto;
}

.m-active {
  text-shadow: 0 0 0.25px currentColor;
  color: #ececec !important;
}

.m-active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  width: 60%;
  height: 100%;
  border-bottom: 2px solid #ececec;
}

.m-tab {
  cursor: pointer;
  transition: color 0.25s;
  font-size: 15px;
}

.m-tab:hover {
  color: #ececec;
  transition: color 0.15s;
}

/deep/ .ant-table-placeholder {
  display: none;
}

.opacity-0 {
  opacity: 0;
}

.opacity-full {
  opacity: 1;
}

.fadein {
  opacity: 1 !important;
  transition: 1s ease-in-out;
}

.fadeOut {
  opacity: 0 !important;
  transition: 1s ease-in-out;
}

.pure-music {
  font-size: 20px;
  position: absolute;
  left: 0;
  right: 0;
  top: 200px;
  color: rgb(226, 226, 226);
}

.playing-background {
  background-color: rgb(39 39 39 / 75%) !important;
}

.fill-background {
  background-color: transparent;
}

.fill-background::before {
  content: "";
  position: absolute;
  transform: rotate(-45deg);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #b1b1b1;
  right: 3px;
  bottom: 5;
}

.myIcon {
  cursor: pointer;
  width: 1.8em;
  height: 1.8em;
  fill: #999696;
  border-radius: 3px;
  transition: 0.15s;
}

.trans-action {
  position: absolute;
  right: 4%;
  width: 2em;
  height: 2em;
  bottom: 8%;
}

.trans-active .myIcon {
  background-color: #d3d3d3;
  fill: #353535;
}

.lyric-row {
  text-align: center;
  color: #e0e0e06d;
  height: 22px;
  font-size: 14px;
  width: 100%;
  margin: 5px 0 20px 0;
  border-radius: 10px;
  transition: 0.25s;
  display: flex;
  flex-direction: column;
}

.lyric-line {
  padding: 4px 15px;
  width: fit-content;
  margin: 0 auto;
  border-radius: 10px;
  position: relative;
}

.lyric-line:hover:not(.lyric-line-now) {
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.1s;
}

.lyric-row-trans {
  text-align: center;
  color: #e9e9e981;
  height: 44px;
  font-size: 14px;
  width: 100%;
  margin: 5px 0 20px 0;
  transition: 0.25s;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.lyric-now {
  color: #ffffffea !important;
  font-size: 18px;
  width: 100%;
  transition: 0.25s;
  letter-spacing: 1px;
}

.p-container {
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  filter: brightness(0.35);
}

.all-container {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
}

.lrc-container {
  transform: translateZ(0);
  text-align: center;
  position: absolute;
  color: #ffffff;
  overflow: hidden;
  height: calc(70%);
  width: 90%;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, hsla(0, 0%, 100%, 0)),
    color-stop(15%, hsla(0, 0%, 100%, 0.6)),
    color-stop(25%, #fff),
    color-stop(75%, #fff),
    color-stop(85%, hsla(0, 0%, 100%, 0.6)),
    to(hsla(0, 0%, 100%, 0))
  );
}

a {
  color: #42b983;
}

.music_background-cover {
  width: 100%;
  height: 100%;
  filter: blur(40px);
  -webkit-user-drag: none;
  overflow: hidden;
  z-index: 1;
}

.music_background {
  width: 100%;
  height: 100%;
  filter: blur(40px);
  -webkit-user-drag: none;
  overflow: hidden;
  z-index: 10;
}

.music_background_under {
  width: 100%;
  height: 100%;
  filter: blur(40px);
  -webkit-user-drag: none;
  overflow: hidden;
  z-index: 0;
}
</style>
