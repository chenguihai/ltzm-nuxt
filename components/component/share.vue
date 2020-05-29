<template>
  <no-ssr>
    <div class="share">
      <p>
        <svg class="icon fenxiang" aria-hidden="true">
          <use :xlink:href="`#icon-fenxiang1`" />
        </svg>分享
      </p>
      <ul class="sharebar">
        <li
          v-for="name in Object.keys(templates)"
          :key="name"
          class="share-item"
          :class="{'noWX' :typeNone==='1' && name === 'wechat' }"
        >
          <a v-if="name === 'wechat'" href="javascript:;" @click="WXqrcode">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#icon-${name}`" />
            </svg>
          </a>
          <a
            v-else
            href="#"
            @click="() => {doShare(name)}"
            :title="titleText"
            @mousemove="titleMou(name)"
          >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#icon-${name}`" />
            </svg>
          </a>
        </li>
      </ul>
      <div v-show="popup">
        <el-dialog
          top="0"
          width="300px"
          title="分享到朋友圈"
          :visible.sync="popup"
          :before-close="handleClose"
          custom-class="qrcode_cpn qrActive"
        >
          <div class="qrcode-wrapper">
            <qrcode-vue :value="config.url" :size="196"></qrcode-vue>
            <p class="wx_desc">
              打开微信，点击底部的“发现”，
              <br />使用“扫一扫”即可将网页分享至朋友圈。
            </p>
          </div>
        </el-dialog>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue
  },
  props: ["config", "typeNone"],
  data() {
    return {
      shareUrl: this.config.url,
      titleText: "",
      popup: false,
      templates: {
        qq:
          'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}&summary="{{SUMMARY}}"',
        qzone:
          "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}",
        weibo:
          "https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}",
        douban:
          "http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11",
        wechat: "javascript:"
      },
      defaultConfig: {
        url: "https://www.zhongmei66.com",
        title: "凌天众媒网 - 一站式全媒界大型电商交易平台",
        image: "https://www.zhongmei66.com/_nuxt/img/be99ed4.png",
        summary: "",
        description:
          "凌天众媒官网在国内是领先的第三方广告交易平台，专注于电梯、楼宇、地铁、电视、公交车、 户外、机场、社区、网络、校园、影院、展会等领域广告区域投放。"
      }
    };
  },
  mounted() {

  },
  methods: {
    createUrl(name, dataset) {
      if (name == "qq") {
        dataset.description = "";
      }
      if (name == "weibo") {
        console.log("33333333", dataset);
        dataset.title = dataset.title + "-" + dataset.description;
      }
      return this.templates[name].replace(/\{\{(\w)(\w*)\}\}/g, function(
        m,
        fix,
        key
      ) {
        var nameKey = name + fix + key.toLowerCase();
        key = (fix + key).toLowerCase();

        return encodeURIComponent(
          (dataset[nameKey] === undefined ? dataset[key] : dataset[nameKey]) ||
            ""
        );
      });
    },
    doShare(name) {
      if (name == "qq") {
        this.defaultConfig.description = "";

        const data = Object.assign({}, this.defaultConfig, this.config);
        const shareUrl = this.createUrl(name, data);
        if (shareUrl.indexOf("http") > -1) {
          window.open(shareUrl);
        }
      } else {
        const data = Object.assign({}, this.defaultConfig, this.config);
        const shareUrl = this.createUrl(name, data);
        if (shareUrl.indexOf("http") > -1) {
          window.open(shareUrl);
        }
      }
    },
    titleMou(name) {
      if (name == "qq") {
        this.defaultConfig.description = "";
        console.log("22222", this.defaultConfig);
      }
      switch (name) {
        case "qq":
          return (this.titleText = "分享到QQ");
        case "qzone":
          return (this.titleText = "分享到QQ空间");
        case "weibo":
          return (this.titleText = "分享到微博");
        case "douban":
          return (this.titleText = "分享到豆瓣");
        default:
          return (this.titleText = "");
      }
    },
    WXqrcode() {
      this.shareUrl = this.config.url
      console.log(this.config.url)
      this.popup = true
    },
    handleClose() {
      this.popup = false;
    }
  },
  watch: {
    config(val) {
      this.config = val;
      this.shareUrl = val.url;
    }
  }
};
</script>
<style lang="less" scoped>
.share {
  display: flex;
  align-items: center;
  & > p {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
    & > .fenxiang {
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }
}
.sharebar {
  display: flex;
  align-items: center;
  margin-left: 9px;
  li {
    width: 16px;
    height: 16px;
    margin: 6px 6px 6px 0;
    a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      font-size: 16px;
      svg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    
  }
  .noWX {
    display: none;
  }
}
.qrcode-wrapper {
      padding-left: 32px;
      .wx_desc {
        font-size: 12px;
        color: #666;
        line-height: 20px;
        margin-top: 30px;
      }
    }
</style>
<style lang="scss">
.qrcode_cpn {
  .el-dialog__header {
    padding: 15px 15px 20px 50px;
    color: #333;
    .el-dialog__title {
      font-weight: bold;
      font-size: 14px;
    }
  }
  //   &.active {
  //     text-align: center;
  //     .el-dialog__header {
  //       background: #f4f6f8;
  //       .el-dialog__title {
  //         font-size: 16px;
  //         font-weight: normal;
  //       }
  //     }
  //   }
  .el-dialog__headerbtn {
    top: 18px;
    .el-dialog__close {
      font-size: 20px;
    }
    &:hover {
      .el-dialog__close {
        color: #f43c42;
      }
    }
  }
  &.qrActive {
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
.el-dialog {
  margin-top: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>