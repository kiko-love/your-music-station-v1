<template>
  <a-layout id="app-layout-sider">
    <a-layout-sider
      v-model:collapsed="$sideRoute.state.collapsed"
      collapsible
      defaultCollapsed
      theme="light"
      class="layout-sider"
    >
      <div class="user-info">
        <img
          class="user-avatar"
          alt="USER"
          :src="
            'https://q4.qlogo.cn/g?b=qq&nk=2350262486&s=100&t=' + Date.now()
          "
          @click="egg"
        />
        <span class="user-nickName">梁惜台</span>
        <span class="user-tags-container">
          <!-- <img
            class="user-tags"
            src="data:image/png;base64,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"
          />-->
          <div v-show="!$sideRoute.state.collapsed">
            <!-- <a-tag class="user-tag user-VIP" title="内测用户身份标识，欢迎您测试使用本软件并反馈您宝贵的意见">内测用户</a-tag>
            <a-tag class="user-tag user-VIP" title="超级用户解锁软件所有权限">超级用户</a-tag>-->
          </div>
        </span>
        <a-divider style="background-color: #f5f5f5; margin: 5px 0" />
      </div>
      <div class="user-menu">
        <a-menu
          class="menu-item"
          theme="light"
          mode="inline"
          v-model:selectedKeys="$sideRoute.state.current"
          @click="menuHandle"
        >
          <a-menu-item-group key="m1">
            <template #title>
              <span v-show="!$sideRoute.state.collapsed">在线音乐</span>
              <!-- <span v-else></span> -->
            </template>
            <a-menu-item v-for="(menuInfo, index) in menu" :key="index">
              <template #title>
                <span>{{ menuInfo.title }}</span>
              </template>
              <mIcon v-if="menuInfo.defaultIcon" :icon="menuInfo.icon" />
              <span>{{ menuInfo.title }}</span>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="m2">
            <template #title>
              <span v-show="!$sideRoute.state.collapsed">我的音乐</span>
              <span v-show="$sideRoute.state.collapsed">
                <div
                  style="height: 1px; background: #dddddd; margin: 15px 0"
                ></div>
              </span>
            </template>
            <a-menu-item v-for="(menuInfo, index) in menu_2" :key="index">
              <template #title>
                <span>{{ menuInfo.title }}</span>
              </template>
              <mIcon v-if="menuInfo.defaultIcon" :icon="menuInfo.icon" />
              <Icon
                v-else-if="
                  !menuInfo.defaultIcon && menuInfo.pageName === 'playlist'
                "
              >
                <template #component>
                  <svg
                    t="1637492038024"
                    class="myIcon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2067"
                  >
                    <path
                      d="M964.608 234.496c-46.08-52.565333-104.789333-93.696-169.642667-118.784a34.030933 34.030933 0 0 0-46.421333 31.744v420.352a178.005333 178.005333 0 0 0-110.933333-38.741333c-98.816 0-179.2 80.384-179.2 179.2S538.794667 887.466667 637.610667 887.466667s179.2-80.384 179.2-179.2c0-1.877333-0.170667-3.754667-0.341334-5.632 0-1.024 0.341333-1.877333 0.341334-2.901334V201.216c36.181333 20.309333 69.12 46.933333 96.597333 78.165333 12.458667 14.165333 34.133333 15.530667 48.128 3.072 14.165333-12.288 15.530667-33.792 3.072-47.957333zM637.610667 819.2c-61.098667 0-110.933333-49.834667-110.933334-110.933333s49.834667-110.933333 110.933334-110.933334 110.933333 49.834667 110.933333 110.933334-49.834667 110.933333-110.933333 110.933333zM185.344 307.2h392.533333c18.773333 0 34.133333-15.36 34.133334-34.133333s-15.36-34.133333-34.133334-34.133334h-392.533333a34.133333 34.133333 0 1 0 0 68.266667zM424.277333 460.8h-238.933333c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133334h238.933333c18.773333 0 34.133333-15.36 34.133334-34.133334s-15.36-34.133333-34.133334-34.133333zM321.877333 682.666667h-136.533333c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133333h136.533333c18.773333 0 34.133333-15.36 34.133334-34.133333s-15.36-34.133333-34.133334-34.133333z"
                      p-id="2068"
                    />
                  </svg>
                </template>
              </Icon>
              <span>{{ menuInfo.title }}</span>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="m3">
            <template #title>
              <span v-show="!$sideRoute.state.collapsed">关于</span>
              <span
                v-show="$sideRoute.state.collapsed"
                style="text-align: center"
              >
                <div
                  style="height: 1px; background: #dddddd; margin: 15px 0"
                ></div>
              </span>
            </template>
            <a-menu-item v-for="(menuInfo, index) in menu_other" :key="index">
              <template #title>
                <span>{{ menuInfo.title }}</span>
              </template>
              <mIcon v-if="menuInfo.defaultIcon" :icon="menuInfo.icon" />
              <span>{{ menuInfo.title }}</span>
            </a-menu-item>
          </a-menu-item-group>
        </a-menu>
      </div>
    </a-layout-sider>

    <a-layout>
      <a-layout-content class="layout-content">
        <!-- vue3.0配置 -->
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component
              :is="Component"
              v-if="$route.meta.keepAlive"
              :key="$route.path"
            />
          </keep-alive>
          <component
            :is="Component"
            v-if="!$route.meta.keepAlive"
            :key="$route.path"
          />
        </router-view>
      </a-layout-content>
      <!-- 底部控制 -->
      <contronl />
    </a-layout>
  </a-layout>
</template>
<script>
import { mIcon } from "./ICON.ts";
import Icon from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { getPlayerConfig } from "@renderer/utils/playerConfig";
import {getEggAvatar} from '@renderer/utils/getEgg'
import contronl from "./contronl.vue";
export default {
  name: "AppSider",
  components: {
    mIcon,
    contronl,
    Icon,
  },
  props: {},
  setup() {
    return {};
  },
  data() {
    return {
      nowKeys: [],
      menu: {
        homeIndex_0: {
          icon: "CustomerServiceOutlined",
          defaultIcon: true,
          title: "播放页",
          menuName: "homeIndex_0",
          pageName: "homeIndex",
          params: {},
        },
        search_0: {
          icon: "SearchOutlined",
          defaultIcon: true,
          title: "音乐库",
          menuName: "search_0",
          pageName: "search",
          params: {},
        },
        rank_0: {
          icon: "BarChartOutlined",
          defaultIcon: true,
          title: "排行榜",
          menuName: "rank_0",
          pageName: "rank",
          params: {},
        },
      },
      menu_2: {
        history_1: {
          icon: "ClockCircleOutlined",
          defaultIcon: true,
          title: "最近播放",
          menuName: "history_1",
          pageName: "history",
          params: {},
        },
        like_1: {
          icon: "HeartOutlined",
          defaultIcon: true,
          title: "我喜欢",
          menuName: "like_1",
          pageName: "like",
          params: {},
        },
        playlist_1: {
          icon: "SearchOutlined",
          defaultIcon: false,
          title: "歌单集",
          menuName: "playlist_1",
          pageName: "playlist",
          params: {},
        },
      },
      menu_other: {
        about_2: {
          icon: "UserOutlined",
          defaultIcon: true,
          title: "关于",
          menuName: "about_2",
          pageName: "about",
          params: {},
        },
      },
    };
  },
  created() {
    const player = getPlayerConfig();
    this.$sideRoute.state.collapsed = player
      ? player.collapsed
      : this.$sideRoute.state.collapsed;
    this.current = [this.$route.name];
  },
  mounted() {
    // this.menuHandle({ key: "homeIndex_0" });
  },
  methods: {
    async egg() {
      const res = await getEggAvatar();
      notification.open({
        message: res.msg?.title,
        duration: res.msg?.duration,
        description:
          res.msg?.content,
        style: {
          whiteSpace: "pre-wrap",
          webkitAppRegion:'no-drag'
        },
        onClick: () => {},
      });
    },
    menuHandle(item) {
      let linkInfo = null;
      const f = parseInt(item.key.split("_")[1]);
      if (f === 0) {
        linkInfo = this.menu[item.key];
      } else if (f === 1) {
        linkInfo = this.menu_2[item.key];
      } else if (f === 2) {
        linkInfo = this.menu_other[item.key];
      }
      this.$router.push({ name: linkInfo.pageName, params: linkInfo.params });
      this.$sideRoute.state.current[0] = linkInfo.pageName;
    },
  },
};
</script>
<style lang="less" scoped>
// 嵌套
#app-layout-sider {
  width: 100%;
  position: absolute;
  top: 56px;
  bottom: 0px;
  left: 0px;
  // border-top: 1px solid#e8eaec;
  .logo {
    border-bottom: 1px solid#e8eaec;
    text-align: center;
  }

  /deep/.ant-menu-light .ant-menu-item-active {
    color: var(--defaultPrimaryColor);
  }

  /deep/ .ant-menu-item-group-title {
    font-size: 13px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user-menu {
    overflow: auto;
  }

  .user-tags-container {
    margin: 0px 0 2px 0;
    display: flex;
  }

  .user-tags {
    text-align: left;
    width: 24px;
    height: 12px;
    margin-top: -2px;
  }

  .user-tag {
    cursor: pointer;
    border: 1px solid transparent;
    font-size: 11px;
    border-radius: 15px;
  }

  .user-VIP {
    color: #ffffff;
    background-color: rgba(32, 32, 32, 0.897);
  }

  .user-VIP:hover {
    color: rgb(255, 255, 255);
    background-color: var(--defaultPrimaryColor);
  }

  .user-nickName {
    color: #7a7a7a;
    font-size: 13.5px;
  }

  .user-avatar {
    cursor: pointer;
    vertical-align: middle;
    border-radius: 50%;
    height: 56px;
    width: 56px;
    margin: 24px 48px 6px 48px;
    // border: 1px solid #1d1d1d;
  }
  .layout-sider {
    // border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8eaec;
    // background-color: #2a3733;
  }
  .menu-item {
    .ant-menu-item {
      background-color: #fff;
      margin-top: 0px;
      margin-bottom: 0px;
      padding: 0 0px !important;
      user-select: none;
    }
  }

  /deep/ .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }

  /deep/.ant-layout-sider-trigger {
    position: fixed;
    bottom: 7px;
  }

  /deep/ .ant-layout-sider-trigger {
    color: #9e9e9e;
    border-right: 1px solid #e8eaec;
  }

  /deep/ .ant-layout-sider-trigger:hover {
    background-color: rgb(235, 235, 235);
  }

  /deep/.ant-menu-item:hover {
    color: var(--defaultPrimaryColor);
    background-color: var(--defaultPrimaryColorBackground);
    transition: border-color 0.3s, background 0.3s, padding 0.1s;
  }

  .myIcon {
    width: 1.1em;
    height: 1.1em;
    fill: #262626;
    transition: 0.1s;
  }

  /deep/ .ant-menu-item::after {
    border-right: 3px solid var(--defaultPrimaryColor);
  }

  /deep/ .ant-menu-item-selected {
    color: var(--defaultPrimaryColor);
    background-color: var(--defaultPrimaryColorBackground);
  }

  /deep/.ant-menu-item:hover .myIcon {
    transition: border-color 0.3s;
    fill: var(--defaultPrimaryColor);
  }

  /deep/.ant-menu-item-selected .myIcon {
    transition: 0.3s;
    fill: var(--defaultPrimaryColor);
  }

  .layout-content {
    height: 100%;
    background-color: #ffffff;
    overflow: auto;
  }
  .layout-footer {
    // height: 10%;
    background-color: #ffffff;
    // background-image:url("http://p2.music.126.net/QD_pdnqzF0ix1KaQcPfZWA==/109951166503956880.jpg?param=500y500");
    background-repeat: no-repeat;
    background-size: auto;
    position: relative;
    padding: 15px 20px 15px;
    border-top: 1px solid #e8eaec;
  }
}
</style>
