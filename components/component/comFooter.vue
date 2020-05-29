<template>
  <div class="comFooter">
    <div class="comFooterNav" :style="'width:'+headerWid+'px'">
      <div class="comFooter_top">
        <div class="comFooter_left">
          <div class="left_top">
            <ul>
              <h4>我是雇主</h4>
              <li>
                <nuxt-link to="/clues/release" target="_blank">发布线索</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/category/zimei?page=1" target="_blank">自媒体广告</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/category/louyu?page=1" target="_blank">楼宇广告</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/help?id=22" target="_blank">帮助中心</nuxt-link>
              </li>
            </ul>
            <ul>
              <h4>我是服务商</h4>
              <li>
                <nuxt-link to="/business" target="_blank">入驻介绍</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/business" target="_blank">立即入驻</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/clues" target="_blank">广告线索</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/help?id=32" target="_blank">帮助中心</nuxt-link>
              </li>
            </ul>
            <ul>
              <h4>交易保障</h4>
              <li>
                <nuxt-link to="/help?id=47" target="_blank">交易担保</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/help?id=48" target="_blank">支付方式</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/help?id=49" target="_blank">极速退款</nuxt-link>
              </li>
            </ul>
            <ul>
              <a class="aboutUs" href="/home" target="_blank">我们</a>
              <li>
                <nuxt-link to="/about" target="_blank">关于我们</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/news" target="_blank">新闻资讯</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/contact" target="_blank">商务合作</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/contact" target="_blank">联系我们</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="left_bot">
            <div>
              <a href="https://szcert.ebs.org.cn/504514c9-56e9-4a48-bc7b-941df740c609">
                <img src="../../assets/img/newGovIcon.gif" alt />
              </a>
            </div>
            <div>
              <a
                id="_pingansec_bottomimagelarge_brand"
                target="_blank"
                href="//si.trustutn.org/info?sn=174200422039490253045&certType=1"
              >
                <img src="//v.trustutn.org/images/cert/brand_realname_large_img.png" />
              </a>
            </div>
          </div>
          <p class="foot_statement">免责声明：本网站部分内容由用户自行上传，如权利人发现存在误传其作品情形，请及时与本站联系。</p>
        </div>
        <div class="comFooter_right">
          <h3>凌天众媒网城市版图</h3>
          <span>目前由深圳总部设立，北京，广州，上海，成都，武汉等城市正在筹建中，敬请期待！</span>
        </div>
      </div>
      <div class="comFooter_bot">
        <div class="link">
          <span>友情链接：</span>
          <a
            v-for="item in links"
            :key="item.id"
            :href="item.blogroll_url"
            target="_blank"
          >{{item.blogroll_name}}</a>
          <span @click="applyLink" class="friendship_link">
            <i class="iconfont icon-zuo left_arrow"></i>
            <span>申请友情链接</span>
          </span>
        </div>
        <div class="copyright">
          Copyright © 2019-{{year}} 凌天众媒版权所有，ICP备案证书号：
          <a
            class="m-icp"
            target="_blank"
            rel="nofollow"
            href="http://www.beian.miit.gov.cn"
          >粤ICP备18040617号</a>
        </div>
        <div class="address">联系地址：深圳市大宝路荣成达科创慧谷A栋310室 联系邮箱：service@zhongmei66.com 客服电话：400-688-6662</div>
      </div>
    </div>
    <div v-if="showFlag">
      <el-dialog
        top="0"
        width="300px"
        title="客服"
        :visible.sync="showFlag"
        :before-close="handleClose"
        custom-class="customer_service"
      >
        <div class="contacts">
          <p class="conta-nub">
            <span class="icon iconfont icon-dianhua1"></span>
            <span>400-688-6662</span>
          </p>
          <p class="conta-date">周一至周日 9:00-20:00</p>
          <div class="consult-ent">
            <div>
              <a
                href="https://url.cn/5fa6j74?_type=wpa&qidian=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="icon iconfont icon-duihua"></span>
                <p>网页咨询</p>
              </a>
            </div>
            <div>
              <a href="https://url.cn/59IhwSe?_type=wpa&qidian=true" target="_blank">
                <span class="icon iconfont icon-QQ"></span>
                <p>QQ咨询</p>
              </a>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/javascript" src="//trusted.shuidi.cn/trusted.js?id=3665"></script>
<script>
import { requestFoot } from "@/api/common";
export default {
  name: "comFooter",
  props: {
    headerWid: {
      type: Number,
      default: 1210
    }
  },
  data() {
    return {
      year: new Date().getFullYear(),
      links: [],
      showFlag: false
    };
  },
  mounted() {
    let links = sessionStorage.getItem("friendshipLink");
    if (links) {
      this.links = JSON.parse(links);
    } else {
      this.listHttp();
    }
  },
  methods: {
    applyLink() {
      this.showFlag = true;
    },
    handleClose() {
      this.showFlag = false;
    },
    listHttp() {
      requestFoot()
        .then(res => {
          const {
            code,
            data: { links = [] }
          } = res.data;
          if (code === 200) {
            this.links = links;
            sessionStorage.setItem("friendshipLink", JSON.stringify(links));
          }
        })
        .catch(err => {
          return false;
        });
    }
  }
};
</script>

<style scoped lang="less">
.comFooter {
  width: 100%;
  margin: auto;
  height: 434px;
  background: #1f1f24;
  .comFooterNav {
    width: 1210px;
    height: 434px;
    margin: 0 auto;
    overflow-x: auto;
    background: #1f1f24;
    .comFooter_top {
      height: 308px;
      width: 100%;
      border-bottom: 1px solid #2c2c30;
      padding-top: 30px;
      display: flex;
      .foot_statement {
        color: #999999;
      }
      .comFooter_left {
        height: 259px;
        width: 603px;
        border-right: 1px solid #2c2c30;
        .left_top {
          height: 170px;
          width: 602px;
          display: flex;
          ul {
            width: 132px;
            height: 170px;
            border-right: 1px solid #2c2c30;
            overflow: hidden;
            h4,
            .aboutUs {
              font-size: 16px;
              color: #b5b5b5;
              cursor: pointer;
              margin-bottom: 10px;
              display: block;
              font-weight: bold;
            }
            .aboutUs:hover{
                color: #f3262d;
            }
            li {
              font-size: 14px;
              color: #5a5a5c;
              cursor: pointer;
              line-height: 28px;
              a {
                font-size: 14px;
                color: #5a5a5c;
                text-decoration: none;
              }
            }
            & > li:hover {
              color: #fff;
              a {
                color: #fff;
              }
            }
          }
          & > ul:nth-child(2) {
            width: 158px;
            padding-left: 27px;
          }
          & > ul:nth-child(3) {
            width: 157px;
            padding-left: 26px;
          }
          & > ul:nth-child(4) {
            width: 154px;
            padding-left: 26px;
            border: 0;
          }
        }
        .left_bot {
          padding: 20px 0px 10px 0;
          width: 100%;
          display: flex;
          align-items: center;
          img {
            width: 108px;
            height: 41px;
            margin-right: 24px;
          }
        }
      }
      .comFooter_right {
        width: 558px;
        height: 295px;
        padding-left: 26px;
        background: url("../../assets/img/china.png") no-repeat 42% 20%;
        background-size: 56%;
        h3 {
          height: 16px;
          color: #b5b5b5;
          line-height: 16px;
          margin-bottom: 20px;
          font-size: 16px;
        }
        span {
          font-size: 14px;
          color: #5a5a5c;
          line-height: 14px;
        }
      }
    }
    .comFooter_bot {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 126px;
      padding: 8px 0 40px;
      .link {
        font-size: 14px;
        color: #b5b5b5;
        line-height: 40px;
        a {
          font-size: 14px;
          margin-left: 15px;
          color: #b5b5b5;
          text-decoration: none;
        }

        .friendship_link {
          color: #5a5a5c;
          display: inline-flex;
          align-items: center;
          margin-left: 15px;
          font-size: 14px;
          cursor: pointer;
          .left_arrow {
            font-size: 12px;
          }
          &:hover {
            color: #fff;
          }
        }
      }
      .copyright {
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 10px;
        color: #b5b5b5;
        .m-icp {
          color: #5a5a5c;
        }
      }
      .address {
        font-size: 12px;
        line-height: 12px;
        color: #5a5a5c;
      }
    }
  }
}
.contacts {
  display: flex;
  flex-direction: column;
  height: 140px;
  .conta-nub {
    text-align: center;
    span:nth-child(2) {
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      font-size: 16px;
      margin-left: 5px;
      line-height: 14px;
      vertical-align: text-bottom;
    }
    .icon {
      color: #666;
      font-size: 22px;
    }
  }
  .consult-ent {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 20px;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
    div {
      width: 100px;
      height: 80px;
      background: rgba(244, 246, 248, 1);
      text-align: center;
      padding: 12px 0 14px;
      cursor: pointer;
      p {
        margin-top: 10px;
        height: 14px;
        line-height: 14px;
        color: #666;
      }
      &:hover {
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.15);
        p {
          color: #ff0027;
        }
      }
    }
    .icon {
      color: #f3262d;
      font-size: 30px;
    }
  }
  .conta-date {
    color: #666;
    text-align: center;
    margin-top: 6px;
  }
}
</style>
<style lang="scss">
.el-dialog {
  margin-top: 0;
  top: 50%;
  transform: translateY(-50%);
}
.customer_service {
  .el-dialog__header {
    color: #666;
    padding: 11px;
    text-align: center;
    background: #f4f6f8;
    .el-dialog__title {
      font-size: 16px;
    }
  }
  .el-dialog__headerbtn {
    top: 14px;
    .el-dialog__close {
      font-size: 20px;
    }
    &:hover {
      .el-dialog__close {
        color: #f43c42;
      }
    }
  }
  .el-dialog__body {
    padding: 12px 38px 43px;
  }
}
</style>
