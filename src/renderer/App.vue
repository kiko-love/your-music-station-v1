<script>
import { ref } from "vue";
import { setRecord, getRecord } from "@renderer/utils/playSongRecord";
export default {
  setup() {
    return {
      mvisible: ref(false)
    };
  },
  beforeCreate: function() {
    document
      .getElementsByTagName("body")[0]
      .setAttribute("style", "background-color:#fff0");
  },
  created() {
    this.$nowMusicInfo.state.realIP = window.realIP
      ? window.realIP
      : this.$nowMusicInfo.state.realIP;
    console.log(this.$nowMusicInfo.state.realIP);
    const songRecord = getRecord();
    if (songRecord !== null) {
      Object.assign(this.$nowMusicInfo.state, songRecord);
      document.title =
        this.$nowMusicInfo.state.music_name +
        " - " +
        this.getAllSinggers(this.$nowMusicInfo.state.music_singger);
    } else {
      this.$nowMusicInfo.state.isInit = false;
    }
  },
  mounted() {},
  methods: {
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
    }
  },
  data() {
    return {
      msg: "hello your music station"
    };
  }
};
</script>

<template>
  <router-view></router-view>
</template>

<style>
:root {
  --defaultPrimaryColor: rgb(171, 84, 90);
  --defaultPrimaryColor-1: rgba(171, 84, 90, 0.1);
  --defaultPrimaryColor-2: rgba(171, 84, 90, 0.2);
  --defaultPrimaryColor-3: rgba(171, 84, 90, 0.3);
  --defaultPrimaryColor-4: rgba(171, 84, 90, 0.4);
  --defaultPrimaryColor-5: rgba(171, 84, 90, 0.5);
  --defaultPrimaryColor-6: rgba(171, 84, 90, 0.6);
  --defaultPrimaryColor-7: rgba(171, 84, 90, 0.7);
  --defaultPrimaryColor-8: rgba(171, 84, 90, 0.8);
  --defaultPrimaryColor-9: rgba(171, 84, 90, 0.9);
  /* --defaultPrimaryColor-btn-hover:rgba(171, 84, 90, 0.9); */
  --defaultPrimaryColorBackground: rgba(171, 84, 90, 0.15);
  --coverBorderColor: var(--defaultPrimaryColor);
  --coverBorderColor-6: var(--defaultPrimaryColor-6);
  --coverBorderColor-4: var(--defaultPrimaryColor-4);
  --coverBorderColor-2: var(--defaultPrimaryColor-2);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 99%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 99%;
  box-shadow: 0px 1px 6px rgb(19 19 19 / 19%);
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  border-radius: 2px;
}
body {
  box-shadow: 0px 0px 10px #888888;
}
html {
  padding: 10px auto;
  scroll-behavior: smooth;
}
</style>
