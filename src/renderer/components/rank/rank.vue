!<template>
  <div class="search-container">
    <a-row style="margin: 10px;">
      <div>
        <a-select
          v-model:value="nowRank"
          style="width: 300px"
          option-label-prop="label"
          @change="handleRankChange"
        >
          <a-select-opt-group>
            <template #label>
              <span>小云音乐榜</span>
            </template>
            <a-select-option v-for="(i ,index) in rankItemList" :label="i.name" :value="i.id">
              <span>
                <img width="48" height="48" :src="i.imgurl" />
                {{i.name}}
              </span>
            </a-select-option>
          </a-select-opt-group>
        </a-select>
      </div>
    </a-row>
    <a-row>
      <a-table
        :columns="columns"
        :pagination="$rankInfo.state.paginationSetting"
        :loading="$searchInfo.state.r_loading"
        :data-source="$searchInfo.state.rank_list"
        :scroll="{ y: 325 }"
        :rowKey="(record)=>{return record.songid}"
      >
        <template #emptyText>
          <div style="height:220px;"></div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'id'">
            <span>
              <span style="color:#8f8f8f;">{{record.id}}</span>
            </span>
          </template>
          <template v-if="column.key === 'time'">
            <span style="color:#929292;">{{record.time}}</span>
          </template>
          <!-- 标签 -->
          <template v-if="column.key === 'tags'">
            <a-tag v-if="record.mvid!==0" class="tag-mv" color="green" style="margin: 3px;height: 20px;">MV</a-tag>
            <a-tag v-if="record.fee === 1 || record.fee === 4" color="red" style="margin: 3px;height: 20px;">VIP</a-tag>
          </template>
          <!-- 歌曲名 -->
          <template v-if="column.key === 'songName'">
            <span :title="r_getsongAllName(record)">
              <span>{{record.songName}}</span>
              <span style="color:#9f9f9f;font-size:13.5px" v-if="!r_isEmpty(record.alias)"
              >({{record.alias[0]}})</span>
              <span style="color:#9f9f9f;font-size:13.5px" v-if="!r_isEmpty(record.transNames)" >({{record.transNames[0]}})</span>
            </span>
          </template>
          <template v-if="column.key === 'singger'">
            <span>{{getAllSinggers(record.singger)}}</span>
          </template>
          <template v-if="column.key === 'album'">
            <span>{{record.album.name}}</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <span title="播放" class="tab-action" @click="playSong(record.songid,record.fee)">
                <CaretRightOutlined />
              </span>
              <a-divider type="vertical" />
              <span v-if="record.fee !== 1 && record.fee !== 4" title="下载" class="tab-action">
                <VerticalAlignBottomOutlined />
              </span>
              <span style="fill:#b6b6b6;" v-else title="下载" class="tab-action">
                <VerticalAlignBottomOutlined />
              </span>
            </span>
          </template>
        </template>
      </a-table>
    </a-row>
  </div>
</template>

<script>
import {
  SmileOutlined,
  CaretRightOutlined,
  VerticalAlignBottomOutlined
} from "@ant-design/icons-vue";
import { h, ref } from "vue";
import contronl from "../contronl.vue";
import {
  getRanking,
  isEmpty,
  getsongAllName
} from "../../utils/getMusicUtils_wy";
import { notification } from "ant-design-vue";
export default {
  name: "YourmusicstationSearchtable",
  components: {
    CaretRightOutlined,
    VerticalAlignBottomOutlined,
    SmileOutlined
  },
  setup() {
    return {
      columns: [
        {
          title: "排名",
          dataIndex: "id",
          align: "center",
          width: 80,
          key: "id"
        },
        {
          title: "歌曲",
          dataIndex: "songName",
          ellipsis: true,
          width: 240,
          key: "songName"
        },
        {
          title: "",
          dataIndex: "tags",
          width: 120,
          ellipsis: true,
          key: "tags"
        },
        {
          title: "歌手",
          dataIndex: "singger",
          key: "singger",
          ellipsis: true
        },
        {
          title: "专辑",
          dataIndex: "album",
          ellipsis: true,
          key: "album"
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action"
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
        }
      ]
    };
  },
  created() {},
  data() {
    return {};
  },

  mounted() {
    navigator
        .mediaDevices
        .enumerateDevices()
        .then(function(devices) {
          let audioDevices = devices.filter(device => device.kind === 'audiooutput' && device.deviceId !== "default");
          console.log(audioDevices);
        })
    let that = this;
    getRanking(3778678).then(value => {
      that.$searchInfo.commit("setRankList", value);
      // console.log(that.$searchInfo.state.ranklist);
    });
  },

  methods: {
    r_isEmpty: isEmpty,
    r_getsongAllName: getsongAllName,
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
          description: "当前歌曲为数字专辑，可能无法播放",
          icon: h(MehOutlined, { style: "color: #59723b" }),
          duration: 6
        });
        // return false;
      }
      await contronl.methods.handleMusic(songid, this);
    },
    handleRankChange(value) {
      let that = this;
      that.$searchInfo.state.r_loading = true;
      getRanking(value).then(value => {
        that.$rankInfo.state.paginationSetting.current = 1;
        that.$searchInfo.commit("setRankList", value);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tag-mv {
  cursor: pointer;
}

.tag-mv:hover {
  color: #1e3603;
}

.tab-action {
  cursor: pointer;
  font-size: 16px;
}

.tab-action :hover {
  fill: #c94e4e;
}

.search-container {
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
</style>