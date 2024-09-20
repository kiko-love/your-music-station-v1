<template>
  <div class="mv-container">
    <div class="back-container">
      <ArrowLeftOutlined class="back" @click="back" />
    </div>
    <div class="mv-div" v-if="!$nowMusicInfo.state.mv_getting">
      <video class="mvideo" controlslist="nodownload" autoplay ref="mvideoRef" controls="controls"
        :src="$nowMusicInfo.state.mv_url" @play="onPlay" @loadedmetadata="initVolume"></video>
    </div>
    <div class="loading" v-else>
      <a-spin tip="MV加载中..." />
    </div>
  </div>
</template>

<script>
import contronl from "../contronl.vue";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
export default {
  name: "YourmusicstationMvideo",
  components: {
    ArrowLeftOutlined,
  },
  data() {
    return {};
  },
  computed: {
    playing() {
      return this.$nowMusicInfo.state.playBtn.isPlay;
    },
  },
  mounted() {
    this.pauseNowMusic()
  },
  methods: {
    initVolume() {
      this.$refs.mvideoRef.volume = this.$nowMusicInfo.state.music_volume / 100
    },
    onPlay() {
      this.pauseNowMusic();
    },
    pauseNowMusic() {
      if (this.$nowMusicInfo.state.playBtn.isPlay) {
        contronl.methods.changePlayStatus(this.$nowMusicInfo.state.m_contronl);
      }
    },
    back() {
      this.$router.back();
    },
  },
  watch: {
    playing() {
      if (this.playing && this.$route.path === "/home/mvideo") {
        this.$refs.mvideoRef.pause();
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-spin-dot-item {
  background-color: #eeeeee;
}

/deep/ .ant-spin-text {
  color: #eeeeee;
}

.back-container {
  position: absolute;
  width: 30px;
  z-index: 1;
  text-align: left;
  margin: 0.8rem;
}

.back {
  cursor: pointer;
  color: #ffffff;
  font-size: 18px;
}

video:focus {
  outline: -webkit-focus-ring-color auto 0px;
}

.mv-page-header {
  color: #694d4d;
}

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mv-div {
  width: 100%;
  height: 100%;
}

.mv-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
}

.mvideo {
  width: 100%;
  height: 100%;
}
</style>