<template>
  <no-ssr>
    <div class="share">
      <ul class="sharebar">
        <li
          v-for="name in Object.keys(templates)"
          :key="name"
          class="share-item"
          :class="{'noWX' :typeNone==='1' && name === 'wechat' }"
        >
          <!-- <a
            v-if="name === 'wechat'"
            href="javascript:;"
            @mouseover="popup = true"
            @mouseleave="popup = false"
          >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#icon-${name}`" />
            </svg>
            <p class="invi_text">微信</p>
            <div v-show="popup" class="qrcode-wrapper">
              <h4 class="wx_title">分享到朋友圈</h4>
              <qrcode-vue :value="shareUrl" :size="196"></qrcode-vue>
              <p class="wx_desc">
                打开微信，点击底部的“发现”，
                <br />使用“扫一扫”即可将网页分享至朋友圈。 
              </p>
            </div>
          </a>-->
          <!-- :title="titleText"  v-else-->
          <a
            href="javascript:;"
            @click="() => {doShare(name)}"
            :title="titleName[name]"
            @mousemove="titleMou(name)"
          >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#icon-${name}`" />
            </svg>
            <p class="invi_text">{{titleName[name]}}</p>
          </a>
        </li>
      </ul>
    </div>
  </no-ssr>
</template>

<script>
export default {
  name: "inviteShare",
  props: ["config", "typeNone"],
  data() {
    return {
      //   conf: this.config,
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
      titleName: {
        qq: "QQ好友",
        qzone: "QQ空间",
        weibo: "新浪微博",
        douban: "豆瓣网",
        wechat: "微信"
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
  created() {
    console.log(this.config);
  },
  methods: {
    createUrl(name, dataset) {
      if (name == "qq") {
        dataset.description = "";
      }
      if (name == "weibo") {
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
        console.log("shareUrl", shareUrl);
        if (shareUrl.indexOf("http") > -1) {
          window.open(shareUrl);
        }
      } else if (name === "wechat") {
        this.$emit("show");
      } else {
        const data = Object.assign({}, this.defaultConfig, this.config);
        const shareUrl = this.createUrl(name, data);
        console.log("shareUrl", shareUrl);
        if (shareUrl.indexOf("http") > -1) {
          window.open(shareUrl);
        }
      }
    },
    titleMou(name) {
      if (name == "qq") {
        this.defaultConfig.description = "";
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
          return (this.titleText = "微信");
      }
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;
  li {
    flex: 1;
    text-align: center;
    width: 70px;
    height: auto;
    a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      font-size: 16px;
      svg {
        // position: absolute;
        // left: 0;
        // top: 0;
        // width: 100%;
        // height: 100%;
        width: 32px;
        height: 32px;
      }
      &:hover{
        svg{
          opacity:0.9 ;
        }
      }
    }
  }
  .noWX {
    display: none;
  }
}
.invi_text {
  margin-top: 20px;
  font-size: 14px;
  line-height: 14px;
}
</style>