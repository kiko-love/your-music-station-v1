!<template>
  <div class="search-container">
    <a-table
      :columns="columns"
      :pagination="$searchInfo.state.paginationSetting"
      :loading="$searchInfo.state.loading"
      :data-source="$searchInfo.state.res_list"
      :scroll="{ y: 380 }"
      :rowKey="(record)=>{return record.songid}"
    >
      <template #emptyText>
        <div style="height:220px;border:none">
          <div v-if="!$searchInfo.state.firstSearch">
            <a-empty image="../../assets/searchFirsh.svg" :image-style="{height: '72px',}">
              <template #description>
                <span>还没有搜索过？赶紧试试吧~</span>
              </template>
            </a-empty>
          </div>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <span>
            <span style="color:#8f8f8f;">{{record.id + 1}}</span>
          </span>
        </template>
        <template v-if="column.key === 'time'">
          <span style="color:#929292;">{{record.time}}</span>
        </template>
        <template v-if="column.key === 'tags'">
          <a-tag v-if="record.mvid!==0" class="tag-mv" color="green" style="margin: 3px;height: 20px;">MV</a-tag>
          <a-tag v-if="record.fee === 1 || record.fee === 4" color="red" style="margin: 3px;height: 20px;">VIP</a-tag>
        </template>
        <template v-if="column.key === 'songName'">
          <span :title="s_getsongAllName(record)">
            <span>{{record.songName}}</span>
            <span style="color:#9f9f9f;font-size:13.5px" v-if="!isEmpty(record.alias)">({{record.alias[0]}})</span>
            <span style="color:#9f9f9f;font-size:13.5px" v-if="!isEmpty(record.transNames)">({{record.transNames[0]}})</span>
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
            <span title="下载" class="tab-action">
              <VerticalAlignBottomOutlined />
            </span>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import {
  CaretRightOutlined,
  VerticalAlignBottomOutlined,
  MehOutlined,
  SmileOutlined
} from "@ant-design/icons-vue";
import {getsongAllName} from '../../utils/getMusicUtils_wy'
import contronl from "../contronl.vue";
import { h, ref } from "vue";
// import convertSec from "../../utils/convertSecends";
import { notification } from "ant-design-vue";
export default {
  name: "YourmusicstationSearchtable",
  components: {
    CaretRightOutlined,
    VerticalAlignBottomOutlined,
    MehOutlined,
    SmileOutlined
  },
  setup() {
    return {
      columns: [
        {
          title: "",
          dataIndex: "id",
          align: "center",
          width: 80,
          key: "id"
        },
        {
          title: "歌曲",
          dataIndex: "songName",
          width: 200,
          ellipsis: true,
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
          title: "时间",
          key: "time",
          dataIndex: "time"
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action"
        }
      ],
      defaultData: []
    };
  },
  created() {},
  data() {
    return {};
  },

  mounted() {},

  methods: {
    s_getsongAllName:getsongAllName,
    changePage(current){
      this.$searchInfo.state.currentPage = current
      console.log(current)
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
      // console.log(this.$nowMusicInfo.state);
      await contronl.methods.handleMusic(songid, this);
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