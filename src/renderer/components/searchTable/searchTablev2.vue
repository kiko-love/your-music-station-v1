<template>
  <div class="search-container">
    <div style="position:relative" v-if="$searchInfo.state.searchTableshowv2">
      <a-page-header class="search-page-header" :title="$searchInfo.state.pageHeadertitle"
        :sub-title="$searchInfo.state.pageHeaderSubtitle" @back="backHomeSearch" />
    </div>
    <div class="search-radio" v-if="$searchInfo.state.searchTableshowv2">
      <a-radio-group v-model:value="$searchInfo.state.radioValue" @change="typeChange($event)">
        <a-radio-button value="0">单曲</a-radio-button>
        <a-radio-button value="1">MV</a-radio-button>
        <!-- <a-radio-button value="2">视频</a-radio-button> -->
        <!-- <a-radio-button value="3">歌单</a-radio-button>
        <a-radio-button value="4">专辑</a-radio-button>
        <a-radio-button value="5">歌词</a-radio-button>-->
      </a-radio-group>
    </div>
    <div v-if="$searchInfo.state.searchTableshowv2">
      <a-table class="search-table" v-if="$searchInfo.state.radioValue === '0'" :columns="columns" size="small"
        :pagination="$searchInfo.state.paginationSetting" :loading="$searchInfo.state.loading"
        :data-source="$searchInfo.state.res_list" :customRow="rowClick" :locale="slocale"
        :rowKey="(record) => { return record.songid }"
        :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)">
        <template #id="{ record }">
          <span>
            <span style="color:#8f8f8f;" v-if="record.songid !== $nowMusicInfo.state.music_id">{{ record.id + 1
            }}</span>
            <span style="color:var(--defaultPrimaryColor);" v-if="record.songid === $nowMusicInfo.state.music_id">
              <SoundOutlined />
            </span>
          </span>
        </template>
        <template #time="{ record }">
          <span style="color:#929292;">{{ record.time }}</span>
        </template>
        <template #tags="{ record }">
          <a-tag v-if="record.mvid !== 0" class="tag-mv" color="green" style="margin: 3px;height: 20px;"
            @click="getmv(record.mvid)">
            MV
            <CaretRightFilled />
          </a-tag>
          <a-tag v-if="record.privilege.maxbr === 999000" class="tag-sq" style="margin: 3px;height: 20px;">SQ</a-tag>
          <a-tag v-if="record.fee === 1 || record.fee === 4" color="orange" style="margin: 3px;height: 20px;font-size: 10px;">VIP</a-tag>
        </template>
        <template #songName="{ record }">
          <span :title="s_getsongAllName(record)">
            <img :src="`${record.album.picUrl}?param=65x65`"
              style="margin-right: 8px;border-radius: 6px;border:1px solid #d9d9d992" height="48" width="48" alt="">
            <span>{{ record.songName }}</span>
            <span style="color:#9f9f9f;font-size:13.5px" v-if="!isEmpty(record.alias)">({{ record.alias[0] }})</span>
            <span style="color:#9f9f9f;font-size:13.5px" v-if="!isEmpty(record.transNames)">({{ record.transNames[0]
            }})</span>
          </span>
        </template>
        <template #singger="{ record }">
          <span :title="getAllSinggers(record.singger)">{{ getAllSinggers(record.singger) }}</span>
        </template>
        <template #album="{ record }">
          <span :title="record.album.name">{{ record.album.name }}</span>
        </template>
        <template #action="{ record }">
          <span @click.stop>
            <span title="播放" class="tab-action" @click="playSong(record.songid, record.fee)">
              <CaretRightOutlined />
            </span>
            <a-divider type="vertical" />
            <span title="下载" class="tab-action" @click="donwloadSong(record.songid)">
              <VerticalAlignBottomOutlined />
            </span>
          </span>
        </template>
      </a-table>
      <div class="mv-search-container" v-if="$searchInfo.state.radioValue === '1'">
        <a-spin v-if="$searchInfo.state.mv_searching" tip="正在加载..." />
        <a-row
          v-if="!isEmpty($searchInfo.state.mv_list) && $searchInfo.state.mv_list.length > 0 && !$searchInfo.state.mv_searching"
          :wrap="true">
          <a-col v-for="( i, index ) in  $searchInfo.state.mv_list " class="gutter-row" :xs="12" :sm="12" :md="12" :lg="8"
            :xl="6">
            <div class="gutter-box">
              <div class="mv-item" @click="getmv(i.id)">
                <div class="mv-item-hover">
                  <div class="mv-item-hover-play">
                    <PlayCircleOutlined />
                  </div>
                </div>
                <div class="mv-item-playNum">
                  <CaretRightOutlined />
                  {{ i.playCount }}
                </div>
                <div class="mv-item-playTime">{{ s_timestampToTime(i.duration) }}</div>
                <div class="mv-item-img">
                  <img :src="i.cover + '?param=350x350'" />
                </div>
              </div>
              <div class="mv-item-name">
                <a-tag class="tag-sq" style="margin: 3px;height: 20px;">MV</a-tag>
                <span>{{ i.name }}</span>
              </div>
            </div>
          </a-col>
        </a-row>
        <div
          v-if="(isEmpty($searchInfo.state.mv_list) || $searchInfo.state.mv_list.length === 0) && !$searchInfo.state.mv_searching">
          <a-empty description="没有找到相关MV数据" />
        </div>
      </div>
      <div v-if="$searchInfo.state.radioValue === '2'">视频</div>
      <div class="emptybox"
        v-if="$searchInfo.state.res_list.length == 0 && !$searchInfo.state.loading && $searchInfo.state.radioValue === '0'">
        <a-empty :image="null">
          <template #description>
            <span>
              没有找到与{{ "“" + $searchInfo.state.keyword_tmp + "”" }}相关的内容，您可以
              <a style="color:var(--defaultPrimaryColor)" @click="goback">返回</a>上一级
            </span>
            <span></span>
          </template>
        </a-empty>
      </div>
    </div>
    <div class="history-container" v-if="!$searchInfo.state.searchTableshowv2">
      <div style="color:#858585; height:20px">
        搜索历史
        <a-popconfirm title="是否清空搜索历史？" ok-text="是" cancel-text="否" @confirm="clearHistory">
          <template #icon>
            <DeleteOutlined style="color: var(--defaultPrimaryColor)" />
          </template>
          <DeleteOutlined />
        </a-popconfirm>
      </div>
      <!--  JSON.stringify($searchInfo.state.historyData)-->
      <div v-if="$searchInfo.state.historyData.length == 0" style="font-size:13px; color:#a3a3a3">暂无搜索历史记录</div>
      <div style="max-width: 80%;text-align: left;">
        <a-tag class="tag-history" v-for="( i, index ) in  $searchInfo.state.historyData " :key="i"
          @close="s_deleteHistoryKey(i)" @click="searchSongs(i)" closable>{{ i }}</a-tag>
      </div>
    </div>
    <div class="hot-container" v-if="!$searchInfo.state.searchTableshowv2">
      <div v-if="hotKeys.length">
        <a-empty :image="null">
          <template #description>
            <span style="color:#686868">不知道听什么？看看大家都在搜索什么吧~</span>
          </template>
        </a-empty>
      </div>
      <div style="width:80%">
        <div v-if="!hotKeys.length">
          <a-spin tip="正在加载热搜关键词..." />
        </div>
        <a-tag class="hotKey" v-for="( i, index ) in  hotKeys " :key="i.searchWord" @click="searchSongs(i.searchWord)">
          <!-- <div v-if="i.iconType!==0" class="hotkey-icon" style="font-size:12px;">
            <img :src="i.iconUrl+'?param=26x13'" />
          </div>-->
          <a-tooltip placement="top" arrowPointAtCenter :mouseLeaveDelay="0" :mouseEnterDelay="0">
            <template #title>
              <div style="font-size:12px;letter-spacing:1.5px;">
                <FireOutlined />
                {{ ' 热度：' + i.score }}
              </div>
              <div v-if="i.content" style="font-size:12px">{{ i.content }}</div>
            </template>
            {{ index + 1 + '.' }}{{ i.searchWord }}
            <!-- <span v-if="i.iconType!==0" class="hotkey-icon" style="font-size:12px;"><img :src="i.iconUrl+'?param=26x13'" /></span> -->
          </a-tooltip>
        </a-tag>
      </div>
    </div>
  </div>
</template>

<script>
import convertSec from "@renderer/utils/convertSecends";
import { timestampToTime } from "@renderer/utils/timestampToTime";
import {
  CaretRightOutlined,
  VerticalAlignBottomOutlined,
  MehOutlined,
  SmileOutlined,
  CaretRightFilled,
  SoundOutlined,
  DeleteOutlined,
  FireOutlined,
  PlayCircleOutlined
} from "@ant-design/icons-vue";
import getSongs from "@renderer/utils/getSongs_wy";
import { message } from "ant-design-vue";
import {
  getsongAllName,
  getMv,
  getHotDetail,
  isEmpty,
  searchMv
} from "@renderer/utils/getMusicUtils_wy";
import {
  setHistoryKey,
  getHistoryKey,
  deleteHistoryKey,
  clearAllHistory
} from "@renderer/utils/historySearch";
import contronl from "../contronl.vue";
import { h, ref } from "vue";
import { notification } from "ant-design-vue";
export default {
  name: "YourmusicstationSearchtable",
  components: {
    CaretRightOutlined,
    VerticalAlignBottomOutlined,
    MehOutlined,
    SmileOutlined,
    CaretRightFilled,
    SoundOutlined,
    DeleteOutlined,
    FireOutlined,
    PlayCircleOutlined
  },
  setup() {
    return {
      columns: [
        {
          title: "",
          dataIndex: "id",
          align: "center",
          width: 40,
          key: "id",
          slots: { customRender: "id" }
        },
        {
          title: "歌曲",
          dataIndex: "songName",
          width: 200,
          ellipsis: true,
          key: "songName",
          slots: { customRender: "songName" }
        },
        {
          title: "",
          dataIndex: "tags",
          width: 160,
          ellipsis: true,
          key: "tags",
          slots: { customRender: "tags" }
        },
        {
          title: "歌手",
          dataIndex: "singger",
          key: "singger",
          ellipsis: true,
          slots: { customRender: "singger" }
        },
        {
          title: "专辑",
          dataIndex: "album",
          ellipsis: true,
          key: "album",
          slots: { customRender: "album" }
        },
        {
          title: "时间",
          key: "time",
          dataIndex: "time",
          slots: { customRender: "time" }
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action",
          slots: { customRender: "action" }
        }
      ]
    };
  },
  created() { },
  data() {
    return {
      slocale: {
        emptyText: " "
      },
      hotKeys: []
    };
  },

  mounted() {
    this.$searchInfo.state.historyData = getHistoryKey();
    this.s_getHotDetail()
      .then(value => {
        this.hotKeys = value;
      })
      .catch(err => {
        this.hotKeys = [];
      });
  },

  methods: {
    backHomeSearch() {
      this.$searchInfo.state.searchTableshowv2 = false;
      this.$searchInfo.state.radioValue = "0"
    },
    s_timestampToTime(time) {
      const t = timestampToTime(time);
      return this.s_convertSec(t.mm * 60 + t.s);
    },
    s_convertSec: convertSec,
    s_getHotDetail: getHotDetail,
    s_getsongAllName: getsongAllName,
    typeChange(e) {
      const v = e.target.value;
      if (v === "0") {
        this.searchSongs(this.$searchInfo.state.keyword);
      } else if (v === "1") {
        this.s_searchMv(this.$searchInfo.state.keyword);
      }
    },
    async s_searchMv(q) {
      this.$searchInfo.state.mv_searching = true;
      const res = await searchMv(q);
      this.$searchInfo.state.mv_list = res.mvs;
      this.$searchInfo.state.mv_searching = false;
      if (!isEmpty(this.$searchInfo.state.mv_list)) {
        this.$searchInfo.state.pageHeaderSubtitle =
          "共为您找到" + this.$searchInfo.state.mv_list.length + "条MV记录";
      }
    },
    s_deleteHistoryKey(q) {
      this.$searchInfo.commit("setHistoryData", deleteHistoryKey(q));
    },
    goback() {
      this.$searchInfo.state.keyword = "";
      this.$searchInfo.state.searchTableshowv2 = false;
    },
    s_setHistoryKey(q) {
      this.$searchInfo.state.keyword_tmp = q;
      this.$searchInfo.state.historyData = setHistoryKey(q);
      this.$searchInfo.state.pageHeadertitle = "搜索结果";
      this.$searchInfo.state.pageHeaderSubtitle = "正在搜索...";
    },
    clearHistory() {
      clearAllHistory();
      this.$searchInfo.state.historyData.length = 0;
    },
    donwloadSong(songid) {
      message.warning("下载功能正在开发中，感谢您的使用");
    },
    async searchSongs(q, type) {
      if (isEmpty(q) || this.$searchInfo.state.loading) {
        this.$searchInfo.state.searchTableshowv2 = false;
        return;
      }
      type = type ? type : "";
      this.s_setHistoryKey(q);
      this.$searchInfo.state.searchTableshowv2 = true;
      this.$sideRoute.state.current[0] = "search_0";
      this.$searchInfo.state.res_list = Array.from([]);
      this.$searchInfo.state.loading = true;
      this.$searchInfo.state.firstSearch = true;
      this.$router.push("/home/search");
      this.$searchInfo.state.keyword = q;
      this.$searchInfo.state.res_list = await getSongs(encodeURI(q), type);
      this.$searchInfo.state.pageHeadertitle = "‘" + q + "’" + "搜索结果";
      this.$searchInfo.state.pageHeaderSubtitle =
        "共为您找到" + this.$searchInfo.state.res_list.length + "条单曲记录";
      this.$searchInfo.state.paginationSetting.current = 1;
      this.$searchInfo.state.loading = false;
    },
    rowClick(record, index) {
      return {
        onClick: event => {

        },
        onDblclick: event => {
          this.playSong(record.songid, record.fee);
        }
      };
    },
    async getmv(mvid) {
      this.$router.push("/home/mvideo");
      if (this.$nowMusicInfo.state.mv_getting) {
        return false;
      }
      this.$nowMusicInfo.state.mv_getting = true;
      const mvInfo = await getMv(mvid);

      this.$nowMusicInfo.state.mv_url = mvInfo.url;
      this.$nowMusicInfo.state.mv_getting = false;
    },
    changePage(current) {
      this.$searchInfo.state.currentPage = current;
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
    getAllSinggers(s_array) {
      if (!s_array.length) {
        return null;
      }
      let allSingger = "";
      for (let i in s_array) {
        if (i < s_array.length - 1) {
          allSingger = allSingger + s_array[i].name + " / ";
        } else {
          allSingger = allSingger + s_array[i].name;
        }
      }
      return allSingger;
    },
    async playSong(songid, fee) {
      //目前已知fee值：[0,8]免费播放，1为vip，4为数字专辑
      if (fee === 1) {
        notification.open({
          message: "试听提示",
          description: "当前歌曲为VIP付费音乐，未登录用户仅提供试听片段",
          icon: h(SmileOutlined, { style: "color: #59723b" }),
          duration: 6
        });
      } else if (fee === 4) {
        notification.open({
          message: "提示",
          description: "当前歌曲为数字专辑，暂不提供播放",
          icon: h(MehOutlined, { style: "color: #59723b" }),
          duration: 6
        });
        return false;
      }
      await contronl.methods.handleMusic(songid, this, false);
    }
  }
};
</script>

<style lang="less" scoped>
.mv-search-container {
  overflow: auto;
}

.mv-item-playNum {
  position: absolute;
  z-index: 1;
  color: #ffffff;
  right: 0;
  margin: 0;
  padding: 0 5px 0 0;
  font-size: 13px;
  width: 100%;
  text-align: right;
  background-color: rgba(0, 0, 0, 0.096);
}

.mv-item-name {
  font-size: 14px;
  text-align: left;
  margin: 0 10px;
  padding: 0 0 1rem 0;
}

.mv-item-playTime {
  position: absolute;
  z-index: 1;
  color: #ffffff;
  width: 100%;
  text-align: right;
  background-color: rgba(0, 0, 0, 0.226);
  right: 0;
  margin: 5px 0 0 0;
  padding: 0 5px 0 0;
  bottom: 0;
  font-size: 13px;
}

.mv-item {
  cursor: pointer;
  position: relative;
  margin: 1rem 0rem;
  width: 95%;
  height: 98%;
}

.mv-item-hover {
  position: absolute;
  background-color: rgba(22, 22, 22, 0.6);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.25s;
  pointer-events: none;
  border-radius: 5px;
  box-shadow: 0 0 12px 13px #2f2f2fc7 inset;
}

.mv-item-hover-play {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  z-index: 1;
  font-size: 30px;
  color: #ffffff;
}

.mv-item-img {
  width: 100%;
  display: inline-block;
  box-shadow: inset 5px 5px 10px #06c;
  z-index: 1;
}

.mv-item img {
  border-radius: 5px;
  width: 100%;
  height: 100%;
  z-index: 0;
  vertical-align: top;
}

.mv-item:hover .mv-item-hover {
  opacity: 0.8;
  transition: 0.25s;
}

.mv-item-cover {
  border-radius: 5px;
  // height: 100px !important;
}

/deep/.ant-radio-button-wrapper:hover:not(.ant-radio-button-wrapper-checked) {
  color: #ffffff;
  background-color: var(--defaultPrimaryColor);
}

/deep/.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within {
  color: #ffffff;
  background-color: var(--defaultPrimaryColor);
}

/deep/.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  color: #ffffff;
  background-color: var(--defaultPrimaryColor);
}

.search-radio {
  // margin-top: 1rem;
  display: flex;
}

.ant-radio-button-wrapper {
  margin: 2px;
}

/deep/.ant-page-header-back-button:focus {
  color: var(--defaultPrimaryColor);
}

/deep/.ant-page-header-back-button:hover {
  color: var(--defaultPrimaryColor);
}

/deep/.ant-empty-image {
  height: 0;
}

/deep/.ant-pagination-item:hover a {
  color: var(--defaultPrimaryColor-8);
}

/deep/.ant-pagination-item-active {
  border-color: var(--defaultPrimaryColor);
}

/deep/.ant-pagination-item-active a {
  color: var(--defaultPrimaryColor);
}

.history-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem;
  gap: 0.8rem;
}

.hot-container {
  height: 280px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .hotkey-icon {
    // position:absolute;
    user-select: none;
    // margin-top: -2px;
  }

  .hotkey-icon img {
    -webkit-user-drag: none;
  }

  .hotKey {
    position: relative;
    cursor: pointer;
    border: 1px solid transparent;
    margin: 0.7rem;
    border-radius: 5px;
    background-color: var(--defaultPrimaryColorBackground);
    color: var(--defaultPrimaryColor);
  }

  .hotKey:hover {
    background-color: var(--defaultPrimaryColor-9);
    color: #ffffff;
  }
}

/deep/ .ant-spin-dot-item {
  background-color: var(--defaultPrimaryColor);
}

/deep/ .ant-spin-text {
  color: var(--defaultPrimaryColor);
}

/deep/ .ant-table-tbody>tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)>td {
  background: #e4e4e4;
}

/deep/ .ant-table-placeholder {
  display: none;
}

/deep/.table-striped {
  background-color: #f9f9f9 !important;
}

.tag-history {
  cursor: pointer;
  border: 1px solid transparent;
  margin: 0.4rem 0.4rem;
  border-radius: 10px;
  background-color: #e7e7e7;
  color: rgb(26, 26, 26);
}

.tag-history:hover {
  /deep/.anticon-close {
    color: rgb(22, 22, 22);
  }

  background-color: #d1d1d1;
  color: rgb(78, 78, 78);
}

.tag-sq {
  background-color: transparent;
  border: 1px solid var(--defaultPrimaryColor);
  color: var(--defaultPrimaryColor);
  font-size: 10px;
}

.tag-mv {
  background-color: transparent;
  color: var(--defaultPrimaryColor);
  border: 1px solid var(--defaultPrimaryColor);
  cursor: pointer;
  font-size: 10px;
}

.tag-mv:hover {
  background-color: var(--defaultPrimaryColor);
  border: 1px solid transparent;
  color: #ffffff;
}

.tab-action {
  cursor: pointer;
  font-size: 16px;
}

.tab-action :hover {
  fill: var(--defaultPrimaryColor);
}

.search-container {
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
</style>