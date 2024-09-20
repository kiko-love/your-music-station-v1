<template>
  <div class="about-container">
    <a-card hoverable style="width: 450px; border: 2px solid rgb(241 235 235);">
      <template #cover>
        <!-- <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />-->
        <span class="auth-cover">作者名片</span>
        <span class="version-cover">
          <span>当前版本：{{ vconfig.appVersion }}</span>
          <span>{{ vconfig.isTest ? '(内部测试版本)' : '（正式版）' }}</span>
          <a-tooltip>
            <template #title>
              <span style="font-size:13px;">当前版本已是最新，无需更新</span>
            </template>
            <CheckCircleOutlined style="color:green" />
          </a-tooltip>
          <a class="a-update-content" style="font-size:12px;" @click="getUpdateContentInfo">版本更新内容</a>
        </span>

        <div>
          <a style="font-size:12px;color: #4a90e2;" @click="protVisible = true">《用户使用协议》</a>
        </div>
        <a-modal v-model:visible="updateContentVisible" title="更新内容" destroyOnClose :mask="false" :maskClosable="false"
          :keyboard="false" :closable="false" @ok="updateContentVisible = false">
          <a-skeleton style="height:200px" v-if="!getUpdateContentmsg" />
          <div v-else class="update-container">
            <div class="latest">
              <span>最新版本：</span>
              <span class="latest-version">{{ updateRes.appVersion }}</span>
            </div>
            <div class="update-content-wrapper">
              <div v-for="(i, k) in updateRes.updateContent">
                <div>
                  <span>{{ k + 1 }}.</span>
                  <span>{{ i.content }}</span>
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <a-button class="btn-agree-update" type="primary" @click="handleUpdateModalOk">确定</a-button>
          </template>
        </a-modal>
        <a-modal v-model:visible="protVisible" title="用户使用协议及说明" destroyOnClose :mask="false" :maskClosable="false"
          :keyboard="false" :closable="false" @ok="protVisible = false">
          <template #footer>
            <a-button class="btn-agree" type="primary" @click="protVisible = false">我同意</a-button>
          </template>
          <!-- 内容 -->
          <protocol />
        </a-modal>
      </template>
      <template #actions class="ant-card-actions">
        <a-tooltip :mouseEnterDelay="0" :mouseLeaveDelay="0.01">
          <template #title>
            项目主页（Gitee）
          </template>
          <Icon @click="goGitee" class="myAction">
            <template #component>
              <svg t="1636726659493" class="myIcon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="1993" width="256" height="256">
                <path
                  d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m259.168-568.896h-290.752a25.28 25.28 0 0 0-25.28 25.28l-0.032 63.232c0 13.952 11.296 25.28 25.28 25.28h177.024a25.28 25.28 0 0 1 25.28 25.28v12.64a75.84 75.84 0 0 1-75.84 75.84h-240.224a25.28 25.28 0 0 1-25.28-25.28v-240.192a75.84 75.84 0 0 1 75.84-75.84h353.92a25.28 25.28 0 0 0 25.28-25.28l0.064-63.2a25.312 25.312 0 0 0-25.28-25.312H417.184a189.632 189.632 0 0 0-189.632 189.6v353.952c0 13.952 11.328 25.28 25.28 25.28h372.928a170.656 170.656 0 0 0 170.656-170.656v-145.376a25.28 25.28 0 0 0-25.28-25.28z"
                  p-id="1994" />
              </svg>
            </template>
          </Icon>
        </a-tooltip>
        <a-tooltip :mouseEnterDelay="0" :mouseLeaveDelay="0.01">
          <template #title>
            <div class="wxgzh">
              <div class="wxgzh-tip">
                作者微信公众号：
                星星回收站台
              </div>
              <a-image :width="200" :height="200" :preview="false"
                src="https://open.weixin.qq.com/qr/code?username=zyyystar" style="-webkit-user-drag: none;"
                fallback="data:image/png;base64,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" />
            </div>
          </template>
          <WechatOutlined key="wxgzh" />
        </a-tooltip>
        <a-tooltip :mouseEnterDelay="0" :mouseLeaveDelay="0.01">
          <template #title>
            <div class="reward-info">
              <span>觉得好用就打赏一下吧</span>
              <span>您的支持是作者继续更新的动力</span>
              <span>
                打赏后可解锁
                <span style="font-size: 16px;color: wheat;">意想不到的</span>资源
              </span>
            </div>
            <br />
            <a-image :width="200" :height="200" :preview="false" :src="$globalConfig.rewardImage"
              style="-webkit-user-drag: none;"
              fallback="data:image/png;base64,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" />
          </template>
          <PayCircleFilled key="wechat" />
        </a-tooltip>
      </template>
      <a-card-meta title="梁惜台" description="你的点歌台 - 悦享每一刻">
        <template #avatar>
          <a-avatar :size="64" :src="'https://q4.qlogo.cn/g?b=qq&nk=2350262486&s=100&t=' + (Date.now())" />
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
const { shell } = require("electron");
import { getUpdateContent } from '@renderer/utils/getUpdateContent'
import config from "@renderer/config/config";
import Icon from "@ant-design/icons-vue";
import protocol from '../protocol/protocol.vue';
import {
  GithubOutlined,
  WeiboCircleOutlined,
  WechatOutlined,
  CheckCircleOutlined,
  LikeFilled,
  PayCircleFilled
} from "@ant-design/icons-vue";
export default {
  name: "YourmusicstationAbout",
  components: {
    GithubOutlined,
    WeiboCircleOutlined,
    WechatOutlined,
    Icon,
    CheckCircleOutlined,
    LikeFilled,
    PayCircleFilled,
    protocol
  },
  data() {
    return {
      viewAvatar: false,
      protVisible: false,
      updateContentVisible: false,
      getUpdateContentmsg: false,
      updateRes: {
        'appVsersion': '0.0.0'
      },
      vconfig: config
    };
  },
  mounted() { },

  methods: {
    handleUpdateModalOk() {
      this.updateContentVisible = false;
      this.getUpdateContentmsg = false
    },
    async getUpdateContentInfo() {
      this.updateContentVisible = true
      const res = await getUpdateContent();
      this.updateRes = res
      this.getUpdateContentmsg = true
    },
    goExternal(url) {
      shell.openExternal(url);
    },
    goGitee() {
      shell.openExternal("https://gitee.com/kikolove/yourMusicstation");
    },
    goweibo() {
      shell.openExternal("https://weibo.com/u/5657001743");
    },
  }
};
</script>

<style></style>

<style lang="less" scoped>
.update-content-wrapper{
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
}
.latest {
  margin-bottom: .5rem;
  font-size: 16px;
  font-weight: bold;
}

.latest-version {
  font-weight: 600;
}

.a-update-content {
  color: #8f8f8f;
  text-decoration: underline;
}

.wxgzh {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .wxgzh-tip {
    color: #f8f1f1;
    padding-bottom: 1rem;
  }
}

a {
  color: var(--defaultPrimaryColor)
}

h2 {
  font-weight: 600;
}

strong {
  margin-right: 0.4rem;
}

.btn-agree {
  background: var(--defaultPrimaryColor);
  border-radius: 2px;
  margin: 10px;
}

.btn-agree-update {
  border-radius: 2px;
  margin: 8px;
}

.btn-agree:hover {
  background: var(--defaultPrimaryColor-8);
}

.update-container {
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}



.reward-info {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}

.about-container {
  background: linear-gradient(to left top,
      var(--defaultPrimaryColor-8),
      var(--defaultPrimaryColor-6),
      var(--defaultPrimaryColor-2));
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: -webkit-fill-available;
}

.version-cover {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 6px;
  color: #808080;
  font-size: 13px;
  margin: 5px 0;
}

.auth-cover {
  color: rgb(26, 19, 8);
  padding: 5px 0 0 0;
  margin: 5px 0 0 0;
}

.myIcon {
  width: 1em;
  height: 1em;
  fill: #898989;
  transition: 0.2s;
}

.myIcon:hover {
  fill: var(--defaultPrimaryColor);
  transition: 0.2s;
}

.myAction:hover .myIcon {
  fill: var(--defaultPrimaryColor);
  transition: 0.2s;
}

.ant-card-actions>li>span a:not(.ant-btn):hover,
.ant-card-actions>li>span>.anticon:hover {
  color: var(--defaultPrimaryColor);
  transition: 0.2s;
}
</style>