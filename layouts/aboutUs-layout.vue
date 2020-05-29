<template>
  <div class="enterpriseLT">
    <!-- 关于我们首页 -->
    <div class="aboutHeat">
      <div class="heatCent">
        <a href="/" class="logo">
          <img src="~/assets/img/aboutUs/logo2.png" alt />
        </a>
        <div class="nav">
          <ul>
            <li>
              <nuxt-link to="/home">首页</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about">关于我们</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/culture">企业文化</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/contact">联系我们</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <nuxt />
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
                  <img src="~/assets/img/newGovIcon.gif" alt />
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
            <img src="~/assets/img/aboutUs/logo2.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="footerBot">
      <div class="combot">
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
          <div
            class="address"
          >联系地址：深圳市大宝路荣成达科创慧谷A栋310室 联系邮箱：service@zhongmei66.com 客服电话：400-688-6662</div>
        </div>
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
  name: "aboutUs-layout",
  props: {
    headerWid: {
      type: Number,
      default: 1300
    }
  },
  data() {
    return {
      year: new Date().getFullYear(),
      links: [],
      showFlag: false
    };
  },
  created() {
    this.listHttp();
  },
  mounted() {},
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
          if (code == 200) {
            this.links = links;
          }
        })
        .catch(err => {
          return false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.enterpriseLT {
  width: 100%;
  background: #f4f6f8;
  & > .aboutHeat {
    width: 100%;
    background: #fff;
    & > .heatCent {
      width: 1300px;
      height: 80px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > .logo {
        width: 136px;
        height: 50px;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      & > .nav {
        & > ul {
          height: 80px;
          display: flex;
          align-items: center;
          & > li {
            margin-right: 34px;
            & > a {
              padding: 6px 18px 8px;
              color: #666;
              font-size: 18px;
              line-height: 18px;
              display: block;
              &:hover {
                color: #f3262d;
              }
            }
            .nuxt-link-active {
              background: linear-gradient(
                -90deg,
                rgba(253, 95, 73, 1),
                rgba(243, 38, 45, 1)
              );
              box-shadow: 0px 8px 16px 0px rgba(255, 114, 100, 0.59);
              border-radius: 16px;
              color: #fff !important;
            }
          }

          & > li:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
.comFooter {
  width: 100%;
  margin: auto;
  height: 324px;
  background: #fff;
  .comFooterNav {
    width: 1300px;
    height: 324px;
    margin: 0 auto;
    overflow-x: auto;
    background: #fff;
    .comFooter_top {
      height: 324px;
      width: 100%;
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      .foot_statement {
        color: #999999;
      }
      .comFooter_left {
        height: 259px;
        width: 603px;
        .left_top {
          height: 170px;
          width: 602px;
          display: flex;
          & > ul {
            width: 132px;
            height: 170px;
            border-right: 1px solid #eee;
            overflow: hidden;
            & >h4,&>.aboutUs {
              font-size: 16px;
              color: #333;
              cursor: pointer;
              margin-bottom: 10px;
              display: block;
              font-weight: bold;
            }
            &>.aboutUs:hover{
                color: #f3262d;
            }
            & > h4:hover {
              color: #f3262d;
            }
            & > li {
              font-size: 14px;
              color: #999;
              cursor: pointer;
              line-height: 28px;
              & > a {
                font-size: 14px;
                color: #999;
                text-decoration: none;
              }
            }
            & > li:hover {
              color: #f3262d;
              & > a {
                color: #f3262d;
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
          & > div {
            & > a {
              & > img {
                width: 108px;
                height: 41px;
                margin-right: 24px;
              }
            }
          }
        }
      }
      .comFooter_right {
        height: 245px;
        display: flex;
        align-items: center;
        & > img {
          width: 149px;
          height: 55px;
        }
      }
    }
  }
}
.footerBot {
  width: 100%;
  margin: auto;
  background: #1f1f24;
  .comFooter_bot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 117px;
    & > div:nth-child(1) {
      font-size: 14px;
      color: #b5b5b5;
      line-height: 14px;
      margin-bottom: 12px;
      a {
        font-size: 14px;
        margin-left: 15px;
        color: #b5b5b5;
        text-decoration: none;
      }
      & > .friendship_link {
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
    & > div {
      font-size: 12px;
      color: #5a5a5c;
      line-height: 25px;
      .m-icp {
        color: #5a5a5c !important;
      }
    }
  }
}
.combot {
  width: 1300px;
  height: 117px;
  margin: 0 auto;
  overflow-x: auto;
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