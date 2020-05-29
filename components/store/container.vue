<template>
  <div class="container">
    <div class="con_top">
      <!--未开通-->
      <div class="con_left" v-if="storeInfo.status === undefined">
        <div class="con_left_img">
          <img v-if="storeInfo.avatar" :src="envVars.IMG_HOST+storeInfo.avatar" alt="用户头像" />
          <img v-else src="~assets/img/userDataImg.png" alt="默认头像" />
        </div>
        <div class="con_content">
          <div>{{original.nick_name}}</div>
          <div class="con_content2">
            <span>
              店铺状态：
              <span>未开通</span>
            </span>
          </div>
        </div>
      </div>
      <!--            v-if="storeInfo.status !== 0"-->
      <div class="con_left" v-else>
        <div class="con_left_img">
          <img v-if="storeInfo.logo" :src="envVars.IMG_HOST+storeInfo.logo" alt="用户头像" />
          <img v-else src="~assets/img/userDataImg.png" alt="默认头像" />
        </div>
        <div class="con_content">
          <div class="con_content1">
            <strong>{{storeInfo.store_name}}</strong>
            <!--isAuth-->
            <svg class="auth" aria-hidden="true">
              <use v-if="storeInfo.isAuth ===1" xlink:href="#icon-meitigongsirenzheng" />
              <use v-else xlink:href="#icon-meitigongsiweirenzheng" />
            </svg>
            <!--凌等级-->
            <span
              v-if="storeInfo.shopLevel"
              :style="{backgroundImage: 'url('+envVars.IMG_HOST +storeInfo.shopLevel.icon+')'}"
            >{{storeInfo.shopLevel.bl_name}}</span>
            <!--个人/企业-->
            <span :class="['store_type',storeInfo.type_id === 1 ? 'c_personal':'c_company']">{{storeInfo.type_id | storeType}}</span>
            <!--vip等级-->
            <img
              v-if="storeInfo.vipLevel"
              class="vipLevel"
              :src="envVars.IMG_HOST+storeInfo.vipLevel"
              alt
            />
            <!--诚实保证金-->
            <el-tooltip effect="light" popper-class="tooltip_wrap" placement="top">
              <div slot="content" class>
                {{storeInfo.paidMargin >=
                1?`您当前保证金为￥${storeInfo.paidMargin}`:'您还未缴保证金'}}
              </div>
              <svg class="level" aria-hidden="true">
                <use v-if="storeInfo.paidMargin >= 1" xlink:href="#icon-huanyingyebaozhengjin" />
                <use v-else xlink:href="#icon-baozhengjinweijiaona" />
              </svg>
            </el-tooltip>
          </div>
          <div>
            <!--状态：0 待审核 1 审核成功 -1 审核失败 -2 店铺关闭-->
            <!-- 已关闭-->
            <div v-if="storeInfo.status === -2">
              <div class="con_content2">
                <span>
                  店铺状态：
                  <span>{{storeInfo.status | storeStatus}}</span>
                </span>
                <el-button type="text" class="ml_10" size="small" @click="openStore">申请开通</el-button>
                <span v-if="!!storeInfo.expire_date">会员截止时间：{{storeInfo.expire_date}}</span>
              </div>
              <div>
                关闭原因：
                <span class="c_ff0027">{{storeInfo.close_reason}}</span>
              </div>
            </div>
            <!-- 待审核-->
            <div v-else-if="storeInfo.status === 0" class="con_content2">
              <span>店铺状态：{{storeInfo.status | storeStatus}}</span>
            </div>
            <!--已开通-->
            <div v-else-if="storeInfo.status === 1">
              <div class="con_content2">
                <span>
                  店铺状态：
                  <span>{{storeInfo.status | storeStatus}}</span>
                </span>
                <span v-if="!!storeInfo.expire_date">会员截止时间：{{storeInfo.expire_date}}</span>
              </div>
              <div class="con_content3">
                <span>当前剩余技术服务</span>
                <em>免费额度￥{{storeInfo.free_amount}}</em>
                <nuxt-link to="/store/tariff?storeIndex=index">技术费率详情></nuxt-link>
              </div>
            </div>
            <!-- 未通过-->
            <div v-else-if="storeInfo.status === -1">
              <div class="con_content2">
                店铺状态：
                <span class="c_ff0027">{{storeInfo.status | storeStatus}}</span>
                <el-button class="ml_10" type="text" size="small" @click="openStore">申请开通</el-button>
              </div>
              <div>
                <span v-if="!!storeInfo.remarks">未通过原因：{{storeInfo.remarks}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="con_right">
        <div class="div-item-1">
          <div class="name">当前保证金</div>
          <div class="set-bottom pointer" @click="returnInfo">
            <span class="num c_green">{{storeInfo.paidMargin ||'0.00'}}</span>
            <span class="name">元</span>
          </div>
          <div
            :class="['return_btn user_select',storeInfo.paidMargin == 0 || !storeInfo.paidMargin?'disabled':'gray']"
            @click="returnBond"
          >退回</div>
        </div>
        <div class="div-item-1">
          <span class="name name_title">
            需要交保证金
            <el-popover placement="right" width="262" trigger="hover">
              <ul class="popover_ul">
                <li class="title">需补缴保证金包含</li>
                <li>1、所有已保存未缴纳类目保证金之和</li>
                <li>2、出现违规扣除保证金后需要补足的保证金</li>
              </ul>
              <span slot="reference">
                <img class="hint_icon" src="~assets/img/store/tips.png" alt="提示" />
              </span>
            </el-popover>
          </span>
          <div class="set-bottom">
            <span class="num c_primary">{{storeInfo.unpaidMargin ||'0.00'}}</span>
            <span class="name">元</span>
          </div>
          <div
            :class="['return_btn user_select',storeInfo.unpaidMargin == 0 || !storeInfo.unpaidMargin?'disabled':'highlight']"
            @click="showPayBond"
          >缴纳保证金</div>
        </div>
      </div>
    </div>
    <div class="con_msg">
      <p>新手任务</p>
      <p>提示：请根据指引完成新手任务后，您就能获取店铺经营权！</p>
    </div>
    <!--完善店铺资料-->
    <div class="item_wrap">
      <div class="c_shop_info">
        <div>
          <h4 class="title">完善店铺资料</h4>
          <p class="desc_p">
            <span class="label">说明：</span>
            <span class="desc">完善店铺资料，增加您的实力，让雇主更加相信你。</span>
          </p>
          <p class="desc_p">
            <span class="label">进度：</span>
            <em class="progress">
              {{storeInfo.isStore!==0?'已完成':'未完成'}}
            </em>
          </p>
        </div>
        <button @click="clickHandle(1)">立即完善</button>
      </div>
    </div>
    <!--完善擅长技能-->
    <div class="item_wrap">
      <div class="c_shop_info">
        <div>
          <h4 class="title">完善擅长技能</h4>
          <p class="desc_p">
            <span class="label">说明：</span>
            <span class="desc">完善擅长技能，增加您的实力，让雇主更快匹配你。</span>
          </p>
          <p class="desc_p">
            <span class="label">进度：</span>
            <em class="progress">{{storeInfo.isEntered?'已完成':'未完成'}}</em>
          </p>
        </div>
        <button @click="clickHandle(2)">立即完善</button>
      </div>
    </div>
    <!--申请实名认证-->
    <div class="item_wrap">
      <div class="c_shop_info">
        <div>
          <h4 class="title">申请实名认证</h4>
          <p class="desc_p">
            <span class="label">说明：</span>
            <span class="desc">申请实名认证，增加您的信用，让雇主更放心。</span>
          </p>
          <p class="desc_p">
            <span class="label">进度：</span>
            <em class="progress">{{storeInfo.isAuth?'已完成':'未完成'}}</em>
          </p>
        </div>
        <button @click="clickHandle(3)">立即申请</button>
      </div>
    </div>
    <!--缴纳保证金-->
    <div class="item_wrap">
      <div class="c_shop_info">
        <div>
          <h4 class="title">缴纳保证金</h4>
          <p class="desc_p">
            <span class="label">说明：</span>
            <span class="desc">缴纳保证金，增加您的信用，让雇主更安心。</span>
          </p>
          <p class="desc_p">
            <span class="label">进度：</span>
            <em class="progress">{{storeInfo.isPayMargin?'已完成':'未完成'}}</em>
          </p>
        </div>
        <button @click="clickHandle(4)">立即缴纳</button>
      </div>
    </div>
    <!--交易动态-->
    <ul class="data_wrap">
      <li class="data_li">
        <h4 class="title left_blue">交易动态</h4>
        <ul class="con_ul">
          <li class="con_li" v-for="(item,index) in liveList" :key="index">
            <em class="data_blue">{{item.value || 0}}</em>
            <span class="text">{{item.name}}</span>
          </li>
        </ul>
      </li>
      <li class="data_li">
        <h4 class="title right_red">我的违规</h4>
        <ul class="con_ul">
          <li class="con_li">
            <em class="data_red">0</em>
            <span class="text">待处理违规</span>
          </li>
          <li class="con_li">
            <em class="data_red">0</em>
            <span class="text">受限权限</span>
          </li>
        </ul>
      </li>
    </ul>
    <dialog-cpn
      v-if="returnFlag"
      :item="{title:dialogTitle, btn:dialogBtn}"
      @emitClose="_handleClose"
      @emitSubmit="handleSubmit"
    >
      <!--保证金等于零显示-->
      <div v-if="status === 1" class="tips_content">
        <p class="title">尊敬的服务商您好，您申请退回保证金将受到如下影响：</p>
        <p class="ctn">
          1.您的店铺将会被关闭；
          <br />2.您店铺下的服务、客户合作示例等内容将会被下架；
          <br />
3.您将不能购买广告线索；
        </p>
      </div>
      <div v-if="status=== -1" class="tips_content">
        <p class="title">尊敬的服务商您好，满足条件可以通过申请退出保证金，具体条件是：</p>
        <p class="ctn">
          1、没有未处理完成的举报维权或争议纠纷案件；
          <br />2、没有因争议纠纷案件未偿还的待付款项；
          <br />3、没有未结束的交易；
          <br />4、最后一笔交易完结时间已经超过90个自然日；
        </p>
        <p class="hint">温馨提醒：您目前的条件不能全部达到，建议您满足条件后再来申请退出。</p>
      </div>
    </dialog-cpn>
    <!--提示信息-->
    <tips-cpn
      v-if="uncertifyFlag"
      type="red"
      @submit="handleSubmit"
      @close="_handleClose"
      :btn="status=== -2?'去实名认证':'去绑定银行卡'"
    >
      <template>
        <div v-if="status=== -2" class="hint_content">您还未实名认证，请先完成实名认证。</div>
        <div v-else-if="status === -3" class="hint_content">您还未绑定银行卡，请先绑定银行卡。</div>
      </template>
    </tips-cpn>
    <tips-cpn v-if="openFlag" @submit="_handleClose" @close="_handleClose">
      <template>
        <div class="hint_content">您的店铺开通申请已提交，管理员会在72小时内完成审核，请耐心等待</div>
      </template>
    </tips-cpn>
    <!--缴纳保证金-->
    <pay-bond
      v-if="dialogFlag"
      :pay="storeInfo.unpaidMargin"
      @emitClose="_handleClose"
      @emitSubmit="_handlePayBond"
    ></pay-bond>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { checkReturnMargin, marginOrder, applyOpen, getData } from "@/api/bond";
import { get_store_info } from "@/api/store-flow";
import DialogCpn from "~/components/DialogCpn";
import PayBond from "~/components/PayBond";
import TipsCpn from "~/components/TipsCpn";
import dataEventTrack from "@/utils/dataEventTrack";

export default {
  name: "container",
  components: { DialogCpn, PayBond, TipsCpn },
  data() {
    return {
      dialogTitle: "温馨提示",
      dialogBtn: "我已知晓",
      status: "", // status状态说明 1：正常状态，可以退还 -1:90天内有交易订单 -2：未实名认证 -3：未绑定银行卡 -4 已申请退还
      returnFlag: false, //退回
      dialogFlag: false, //false
      uncertifyFlag: false, //
      openFlag: false,
      original: {},
      orderSn: "",
      liveList: []
    };
  },
  created() {
    this.checkReturnMarginHttp();
    this.getDataHttp();
  },
  mounted(){
    dataEventTrack({
        referer: document.referrer,
        event_type: "page_show",
        kv: {
          router: "/store",
        }
    });
  },
  computed: {
    ...mapState({ envVars: "envVariables",userInfo:"userInfo", storeInfo:"storeInfo" })
  },
  watch: {
    userInfo: {
      handler() {
        let { original = {} } = this.userInfo || {};
        const { avatar = "", nick_name = "" } = original || {};
        this.original = {
          avatar: avatar,
          nick_name: nick_name
        };
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations(["CHANGE_STORE_INFO"]),
    showPayBond() {
      const { unpaidMargin } = this.storeInfo;
      if (unpaidMargin == 0 || !unpaidMargin) {
        return;
      }
      this.dialogFlag = true;
    },
    openStore() {
      this.applyOpenHttp();
    },
    returnInfo() {
      this.$router.push({
        path: "/store/security-records",
        query: {
          storeIndex: "index",
          subIndex: "history",
          status: this.storeInfo.status
        }
      });
    },
    returnBond() {
      const { paidMargin } = this.storeInfo;
      if (paidMargin == 0 || !paidMargin) {
        return;
      }
      if (this.storeInfo.isStore === 0) {
        this.messageFun();
      } else if (this.status === 1) {
        this.returnFlag = true;
      } else if (this.status === -1) {
        this.returnFlag = true;
        this.dialogTitle = "温馨提示";
        this.dialogBtn = "我已知晓";
      } else if (this.status === -2) {
        this.uncertifyFlag = true;
        this.dialogTitle = "提示信息";
        this.dialogBtn = "去实名认证";
      } else if (this.status === -3) {
        this.uncertifyFlag = true;
        this.dialogTitle = "提示信息";
        this.dialogBtn = "去绑定银行卡";
      } else if (this.status === -4) {
        this.$message.error({ title: "错误提示", message: "已申请退还" });
      }
    },
    messageFun() {
      this.$message.success({ message: "你的保证金为0，没有可退的呢" });
    },
    goto(url) {
      this.$router.push(url);
    },
    _handleClose() {
      this.returnFlag = false;
      this.dialogFlag = false;
      this.uncertifyFlag = false;
      this.openFlag = false;
    },
    _handlePayBond(amount) {
      this._handleClose();
      this.marginOrderHttp(amount);
      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: "/store",
          rname: "立即补缴",
          money: amount,
        }
      });
    },
    handleSubmit() {
      this._handleClose();
      if (this.status === 1) {
        this.goto(
          "/store/security-records?storeIndex=index&subIndex=back&amount=" +
            this.storeInfo.paidMargin
        );
      } else if (this.status === -2) {
        //去实名认证
        this.$router.push("/userCenter/realName/realName");
      } else if (this.status === -3) {
        //未绑定银行卡
        this.$router.push("/userCenter/myBank/myBank");
      }
    },
    getStoreInfoHttp() {
      get_store_info()
        .then(res => {
          let { code, data = {}, message } = res.data;
          if (code === 200) {
            this.CHANGE_STORE_INFO(data);
          } else if (code === 402) {
            this.CHANGE_STORE_INFO(data);
          } else {
            this.CHANGE_STORE_INFO(data);
            this.$message.error({ title: "错误提示", message: message });
          }
        })
        .catch(err => {
          this.$message.error({ title: "错误提示", err });
        });
    },
    checkReturnMarginHttp() {
      checkReturnMargin()
        .then(res => {
          let {
            code,
            data: { status, message }
          } = res.data;
          if (code === 200) {
            this.status = status;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    marginOrderHttp(amount) {
      let params = {
        type: 1, //	否	int	类型，服务商首页缴纳保证金使用 1
        amount: amount //	否	int	金额 ，服务商首页缴纳保证金使用
      };
      marginOrder(params)
        .then(res => {
          let {
            code,
            data: { order_sn }
          } = res.data;
          if (code === 200) {
            this.orderSn = order_sn;
            this.$router.push(`/payment?order_sn=${order_sn}&type=4`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    applyOpenHttp() {
      applyOpen()
        .then(res => {
          let { code, message } = res.data;
          if (code === 200) {
            this.openFlag = true;
            this.getStoreInfoHttp();
          } else {
            this.$message.error({ title: "错误提示", message: message });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataHttp() {
      getData()
        .then(res => {
          let { code, data, message } = res.data;
          if (code === 200) {
            this.liveList = data;
          } else {
            this.$message.error({ title: "错误提示", message: message });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    clickHandle(source) {
      // 1、未开通状态下如果完善店铺资料进度为未完成：点击技能管理、认证中心、缴纳保证金，提示请先完善店铺资料。
      // 2、完善擅长技能进度为未完成，点击实名认证、缴纳保证金提示请先完善擅长技能
      // 3、认证中心和缴纳保证金可不分先后顺序。
      if (source == 1) {
        const { type = "", type_id = "" } = this.storeInfo;
        this.$router.push("/store/info?storeIndex=info");
        return;
      }
      let storeInfo = this.storeInfo;
      if (storeInfo.isStore === 0) {
        this.$message.error("请先完善店铺资料");
        return;
      }
      if (source == 2) {
        //isEntered,isAuth, isPayMargin
        this.$router.push("/store/skill?storeIndex=skill");
      } else {
        if (storeInfo.isEntered) {
          if (source == 3) {
            this.$router.push("/store/auth?storeIndex=auth");
          } else if (source == 4) {
            this.$router.push(
              "/store/payment?storeIndex=payment&subIndex=skill"
            );
          }
        } else {
          this.$message.error("请先完善擅长技能");
        }
      }
    }
  },
  filters: {
    storeType: type => {
      //店铺类型：1 个人店铺 2 企业店铺
      return type === 1 ? "个人" : "企业";
    },
    storeStatus: type => {
      //状态：0 待审核 1 审核成功 -1 审核失败 -2 店铺关闭
      let name = "";
      switch (type) {
        case 0:
          name = "待审核";
          break;
        case 1:
          name = "已开通";
          break;
        case -1:
          name = "未通过";
          break;
        case -2:
          name = "已关闭";
          break;
      }
      return name;
    }
  }
};
</script>
<style scoped lang="less">
@import "../../assets/css/store/container.less";
</style>


