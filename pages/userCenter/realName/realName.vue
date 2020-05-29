<template>
  <!-- 实名认证 -->
  <div class="realName body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right real_Name" v-if="flag == '1'">
        <div class="realName_top">实名认证（仅针对中国大陆用户）</div>
        <div class="realName_one">
          <!--          个人实名-->
          <div class="realName_personage">
            <div class="personage_top">
              <span>个人实名</span>
              <span>（非开店铺认证）</span>
            </div>
            <div class="personage_bot">
              <span>每个身份证号仅支持5个账户使用，且认证通过身份号不能修改</span>
              <span @click="person">立即申请</span>
              <span>支持大陆个人实名</span>
            </div>
          </div>
          <!--          企业实名-->
          <div class="realName_enterprise">
            <div class="enterprise_top">
              <span>企业实名</span>
              <span>（非开店铺认证）</span>
            </div>
            <div class="enterprise_bot">
              <span>每个身份证号仅支持5个账户使用，且认证通过后营业执照将在店铺中展示，且不能修改统一社会信用代码或转为个人。</span>
              <span @click="enterpr">立即申请</span>
              <span>支持大陆企业实名</span>
            </div>
          </div>
        </div>
      </div>
      <div class="user_cen_right real_Name real_succ" v-else-if="flag == '2'">
        <div class="realName_top">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chenggong" class="ccccc" />
          </svg>
          <p>恭喜，您已经通过了实名认证</p>
        </div>
        <div class="realName_lest popper">
          <div>
            <span>认证身份：个人</span>
            <span>真实姓名：{{dataList.name}}</span>
            <span>证件号码：{{dataList.idno}}</span>
            <span>手机号码：{{dataList.mobile}}</span>
            <span v-if="dataList.accountid ==null || dataList.accountid ==''">
              合同功能：未拥有，请联系
              <a href="https://url.cn/59IhwSe?_type=wpa&qidian=true" target="_blank">
                客服人员
              </a>
              </span>
            <span v-else>合同功能：已拥有</span>
          </div>
        </div>
      </div>
      <div class="user_cen_right real_Name real_succ" v-else-if="flag == '3'">
        <div class="realName_top">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chenggong" class="ccccc" />
          </svg>
          <p>恭喜，您已经通过了实名认证</p>
        </div>
        <div class="realName_lest company">
          <div>
            <span>认证身份：企业</span>
            <span>企业名称：{{dataList.company_name}}</span>
            <span>企业统一信任代码：{{dataList.company_codeusc}}</span>
            <span>法人姓名：{{dataList.name}}</span>
            <span>法人身份证号：{{dataList.idno}}</span>
            <span>法人手机号：{{dataList.mobile}}</span>
            <span v-if="dataList.accountid ==null || dataList.accountid ==''">
              合同功能：未拥有，请联系
              <a href="https://url.cn/59IhwSe?_type=wpa&qidian=true" target="_blank">客服人员</a>
            </span>
            <span v-else>合同功能：已拥有</span>
          </div>
        </div>
      </div>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import LTnav from "@/components/component/LT_nav";
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { signAccount } from "@/api/list";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,sideBar
  },
  data() {
    return {
      flag: "",
      dataList: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      signAccount()
        .then(res => {
          if (res.data.code == 201) {
            this.flag = "1";
          } else if (res.data.code == 200 && res.data.data.signstatus == 3) {
            this.dataList = res.data.data;
            var regN =/([\u4E00-\u9FA5]{1})([\u4E00-\u9FA5]+)$/;
            this.dataList.name = this.dataList.name.replace(regN, "$1*");
            if (res.data.data.status == 1) {
              this.flag = "2";
              var reg = /(.{4}).*(.{4})/;
              var str = this.dataList.idno.replace(reg, "$1********$2");
              this.dataList.idno = str;
              var regp = /^(\d{3})\d+(\d{4})$/;
              var pho = this.dataList.mobile.replace(regp, "$1****$2");
              this.dataList.mobile = pho;
            } else {
              this.flag = "3";
              var reg = /(.{4}).*(.{4})/;
              var str = this.dataList.idno.replace(reg, "$1********$2");
              this.dataList.idno = str;
              var regp = /^(\d{3})\d+(\d{4})$/;
              var pho = this.dataList.mobile.replace(regp, "$1****$2");
              this.dataList.mobile = pho;
              var rege = /(.{4}).*(.{4})/;
              var com = this.dataList.company_codeusc.replace(
                rege,
                "$1********$2"
              );
              this.dataList.company_codeusc = com;
            }
          } else if (
            res.data.code == 200 &&
            res.data.data.signstatus != 3 &&
            res.data.data.step == 4 &&
            res.data.data.signService != null
          ) {
            if (res.data.data.signService.number < 3) {
              this.$router.push({
                path: "/userCenter/realName/enterprise/enterprise",
                query: { serviceId: res.data.data.service_id }
              });
            } else {
              this.flag = "1";
            }
          } else {
            this.flag = "1";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    person() {
      this.$router.push({
        path: "./personage/personage"
      });
    },
    enterpr() {
      this.$router.push({
        path: "./enterprise/enterprise"
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "realNameScode.less";
</style>

<style lang="less" scoped>
@import "../index.less";
</style>

<style lang="less">
@import "realName.less";
</style>
