<template>
  <div class="search-container">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="网易云音乐榜">
        <a-row>
          <!-- <a-col :span="4">
           
          </a-col>
          <a-col :span="20">
            
          </a-col> -->
          <div class="rank-info-right">
            <a-select v-model:value="nowRank" style="width:200px" dropdownClassName="m-select-item" size="small"
              option-label-prop="label" @change="handleRankChange">
              <a-select-opt-group>
                <template #label>
                  <span>网易云音乐榜</span>
                </template>
                <a-select-option v-for="(i, index) in rankItemList" :label="i.name" :value="i.id">
                  <span>
                    <!-- <img width="48" height="48" :src="i.imgurl+'?param=150y150'" /> -->
                    {{ i.name }}
                  </span>
                </a-select-option>
              </a-select-opt-group>
            </a-select>
            <!-- <a-radio-group v-model:value="value1" size="large">
                <a-radio-button value="a" style="width:100%;height:30px;font-size:14px">热歌榜</a-radio-button>
              </a-radio-group> -->
            <span class="updateTime">更新时间：{{ updateTime }}</span>
          </div>
          <div>
            <a-table :columns="columns" :pagination="$rankInfo.state.paginationSetting"
              :loading="$searchInfo.state.r_loading" :data-source="$searchInfo.state.rank_list" size="small"
              :locale="locale" :customRow="rowClick" :rowKey="(record) => { return record.songid }"
              :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)">
              <!-- <template #emptyText>
          <div style="height:220px;"></div>
            </template>-->
              <template #id="{ record }">
                <span>
                  <span style="color:#8f8f8f;" v-if="record.songid !== $nowMusicInfo.state.music_id">{{ record.id
                  }}</span>
                  <span style="color:var(--defaultPrimaryColor);" v-if="record.songid === $nowMusicInfo.state.music_id">
                    <SoundOutlined />
                  </span>
                </span>
              </template>
              <template #time="{ record }">
                <span style="color:#929292;">{{ record.time }}</span>
              </template>
              <!-- 标签 -->

              <!-- 歌曲名 -->
              <template #songName="{ record }">
                <div style="display: flex;align-items:center;">
                  <img :src="`${record.album.picUrl}?param=65x65`" style="margin-right: 8px;border-radius: 6px;"
                    height="48" width="48" alt="">
                  <div style="width: 100%;" :title="r_getsongAllName(record)">
                    <div>
                      <a-tag v-if="record.mvid !== 0" class="tag-mv" color="green" style="height: 20px;"
                        @click="getmv(record.mvid)">
                        MV
                        <CaretRightFilled />
                      </a-tag>
                      <a-tag v-if="record.fee === 1 || record.fee === 4" color="orange"
                        style="margin: 3px;height: 20px;font-size:10px">VIP</a-tag>
                    </div>
                    <div style="
                    max-width: calc(100% - 20px);overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;">
                      <span style="font-size: 13px;">{{ record.songName }}</span>
                      <span style="color:#9f9f9f;font-size:13.5px" v-if="!r_isEmpty(record.alias)">({{ record.alias[0]
                      }})</span>
                      <span style="color:#9f9f9f;font-size:13.5px" v-if="!r_isEmpty(record.transNames)">({{
                        record.transNames[0] }})</span>
                    </div>
                  </div>
                </div>
              </template>
              <template #singger="{ record }">
                <span :title="getAllSinggers(record.singger)"><span style="font-size: 13px;">{{
                  getAllSinggers(record.singger) }}</span></span>
              </template>
              <template #album="{ record }">
                <span :title="record.album.name" style="font-size: 13px;">{{ record.album.name }}</span>
              </template>
              <template #action="{ record }">
                <span>
                  <span title="播放" class="tab-action" @click="playSong(record.songid, record.fee)">
                    <CaretRightOutlined />
                  </span>
                  <!-- <a-divider type="vertical" />
                <span v-if="record.fee !== 1 && record.fee !== 4" title="下载" class="tab-action">
                  <VerticalAlignBottomOutlined />
                </span>
                <span style="fill:#b6b6b6;" v-else title="下载" class="tab-action">
                  <VerticalAlignBottomOutlined />
                </span>-->
                </span>
              </template>
            </a-table>
          </div>
        </a-row>

      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {
  SmileOutlined,
  CaretRightOutlined,
  VerticalAlignBottomOutlined,
  MehOutlined,
  CaretRightFilled,
  SoundOutlined
} from "@ant-design/icons-vue";
import { h, ref } from "vue";
import contronl from "../contronl.vue";
import {
  getRanking,
  isEmpty,
  getsongAllName,
  getMv
} from "@renderer/utils/getMusicUtils_wy";
import { timestampToTime } from "@renderer/utils/timestampToTime.ts";
import { notification } from "ant-design-vue";
export default {
  name: "YourmusicstationSearchtable",
  components: {
    CaretRightOutlined,
    VerticalAlignBottomOutlined,
    SmileOutlined,
    MehOutlined,
    CaretRightFilled,
    SoundOutlined
  },
  setup() {
    return {
      activeKey: ref("1"),
      columns: [
        {
          title: "排名",
          dataIndex: "id",
          align: "center",
          width: 60,
          key: "id",
          slots: { customRender: "id" }
        },
        {
          title: "歌曲",
          dataIndex: "songName",
          ellipsis: true,
          width: "auto",
          key: "songName",
          width: 340,
          slots: { customRender: "songName" }
        },
        // {
        //   title: "",
        //   dataIndex: "tags",
        //   width: "auto",
        //   ellipsis: true,
        //   key: "tags",
        //   slots: { customRender: "tags" }
        // },
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
          title: "操作",
          dataIndex: "action",
          key: "action",
          slots: { customRender: "action" }
        }
      ],
      nowRank: ref("3778678"),
      rankItemList: [
        {
          id: "3778678",
          name: "热歌榜",
          type: "wy",
          imgurl:
            "https://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg"
        },
        {
          id: "19723756",
          name: "飙升榜",
          type: "wy",
          imgurl:
            "https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg"
        },
        {
          id: "3779629",
          name: "新歌榜",
          type: "wy",
          imgurl:
            "https://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg"
        },
        {
          id: "2884035",
          name: "原创榜",
          type: "wy",
          imgurl:
            "https://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg"
        },
        {
          id: "745956260",
          name: "云音乐韩语榜",
          type: "wy",
          imgurl:
            "https://p1.music.126.net/v--zfW0Y0jbexl3CiALGlw==/109951165611550672.jpg"
        },
        {
          id: "991319590",
          name: "云音乐说唱榜",
          type: "wy",
          imgurl:
            "https://p1.music.126.net/EJyXfGYsiHxxxoCiTAz6Kg==/109951165611553137.jpg"
        },
        {
          id: "71384707",
          name: "云音乐古典榜",
          type: "wy",
          imgurl:
            "https://p1.music.126.net/7XQ7j5GKsiWQ6hLMtjGGKQ==/109951165611553527.jpg"
        },
        {
          id: "1978921795",
          name: "云音乐电音榜",
          type: "wy",
          imgurl:
            "https://p1.music.126.net/FUTBe-hYwYZ7kidXNz2f0g==/109951165611546880.jpg"
        },
        {
          id: "71385702",
          name: "云音乐ACG榜",
          type: "wy",
          imgurl:
            "https://p2.music.126.net/pAFaa_EVMj0ktkDo381dnw==/109951165611551680.jpg"
        },
        {
          id: "2809513713",
          name: "云音乐欧美热歌榜",
          type: "wy",
          imgurl:
            "https://p1.music.126.net/uN5PupU0rXEuMq0HIlxb_w==/109951165752868980.jpg"
        },
        {
          id: "60198",
          name: "美国Billboard榜",
          type: "wy",
          imgurl:
            "https://p1.music.126.net/rwRsVIJHQ68gglhA6TNEYA==/109951165611413732.jpg"
        }
      ],
      updateTime: ref("（等待更新）")
    };
  },
  created() { },
  data() {
    return {
      locale: {
        emptyText: "..."
      }
    };
  },

  mounted() {
    let that = this;
    getRanking(3778678)
      .then(value => {
        that.$searchInfo.commit("setRankList", value.rankInfo);
        const date = timestampToTime(value.trackNumberUpdateTime);
        that.updateTime = date.M + "月" + date.D + "日";
      })
      .catch(err => {
        this.$searchInfo.state.r_loading = false;
      });
  },

  methods: {
    r_timestampToTime: timestampToTime,
    r_isEmpty: isEmpty,
    r_getsongAllName: getsongAllName,
    rowClick(record, index) {
      return {
        onClick: event => {
          // console.log(record)
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
          duration: 6,
          style: {
            whiteSpace: "pre-wrap",
            webkitAppRegion: 'no-drag'
          },
        });
      } else if (fee === 4) {
        notification.open({
          message: "提示",
          description: "当前歌曲为数字专辑暂未开放播放权限，您可以点击MV观看",
          icon: h(MehOutlined, { style: "color: #59723b" }),
          duration: 6,
          style: {
            whiteSpace: "pre-wrap",
            webkitAppRegion: 'no-drag'
          },
        });
        return false;
      }
      await contronl.methods.handleMusic(songid, this, false);
    },
    handleRankChange(value) {
      let that = this;
      that.$searchInfo.state.r_loading = true;
      getRanking(value).then(value => {
        that.$rankInfo.state.paginationSetting.current = 1;
        that.$searchInfo.commit("setRankList", value.rankInfo);
        const date = timestampToTime(value.trackNumberUpdateTime);
        that.updateTime = date.M + "月" + date.D + "日";
      });
    }
  }
};
</script>

<style lang="less" scoped>
.rank-info-right {
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.updateTime {
  display: flex;
  align-items: flex-end;
  font-size: 13px;
  color: #a0a0a0;
  justify-content: center;
}

/deep/.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
  box-shadow: none;
}

/deep/ .ant-tabs-nav-scroll {
  text-align: left;
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

/deep/.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  background-color: #b6b6b6;
}

/deep/.ant-tabs-nav-container {
  font-size: 13px;
}

/deep/.table-striped {
  background-color: #f9f9f9 !important;
}

/deep/ .ant-spin-dot-item {
  background-color: var(--defaultPrimaryColor);
}

/deep/ .ant-table-tbody>tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)>td {
  background: #e4e4e4;
}

/deep/ .ant-spin-text {
  color: var(--defaultPrimaryColor);
}

/deep/ .ant-tabs-tab-active {
  color: var(--defaultPrimaryColor);
}

/deep/ .ant-tabs-tab:hover {
  color: var(--defaultPrimaryColor);
}

/deep/ .ant-tabs-ink-bar {
  background-color: var(--defaultPrimaryColor);
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