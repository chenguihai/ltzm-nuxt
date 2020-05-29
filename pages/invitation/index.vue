<template>
  <div class="invi_content">
    <div class="invi_box">
      <div class="header"></div>
      <div class="header_2">
        <span class="invi_btn" @click="inviClick">立即邀请</span>
      </div>
      <div class="header_3">
        <h4 class="title"></h4>
        <template v-if="inviList.length > 0">
          <p class="desc">
            <span>已邀请</span>
            <span class="desc_num">{{count}}</span>
            <span>人&nbsp;未入驻店铺</span>
            <span>{{notStore}}</span>
            <span>人</span>
          </p>
          <div class="invi_table">
            <div class="table_th">
              <span>好友用户号</span>
              <span>注册时间</span>
              <span>入驻店铺时间</span>
              <span>状态</span>
            </div>
            <div class="table_td" v-for="item in inviList" :key="item.id">
              <span>{{item.user_invite_list.mobile}}</span>
              <span>{{item.user_invite_list.created_at}}</span>
              <span>{{item.first_open_at || '-------'}}</span>
              <!-- 状态：状态：0 已注册，1 已完成 -->
              <span :class="{'completed':item.status ===1}">{{item.status ===1 ? '已完成':'已注册'}}</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="invi_no">
            <img class="img" src="~assets/img/invitation/no_data.png" alt="默认图片" />
            <p class="text">暂未邀请好友，现在就去邀请</p>
          </div>
        </template>
        <div class="page_box" v-if="total > 10">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            background
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <div class="invi_footer">
        <h4 class="title">活动规则</h4>
        <p class="text">
          1、每成功邀请一位好友，奖励免技术费额度50元，以此类推；每成功邀请五十位好友，享受平台店铺推荐位展示一周；每成功邀请一百位好友，享受首页焦点大图广告位展示一周；
          <br />2、好友注册并入驻店铺成功后奖励即可入账；
          <br />3、奖励记录查询：免费技术额度可到【服务商-我的-店铺工具】查询；
          <br />4、未开通店铺的新用户满足邀请资格，同一账号仅可被邀请一次；奖励不设上限，邀请越多，奖励越多；
          <br />5、本活动最终解释权归凌天众媒网所有。
        </p>
      </div>
    </div>
    <!-- 475 -->
    <div v-if="showFlag">
      <el-dialog
        top="0"
        width="440px"
        title="分享到"
        :visible.sync="showFlag"
        :before-close="handleClose"
        custom-class="qrcode_cpn active"
      >
        <invite-share :config="config" @show="showQrcode" />
      </el-dialog>
    </div>
    <div v-if="qrcodeFlag">
      <el-dialog
        top="0"
        width="300px"
        title="分享到朋友圈"
        :visible.sync="qrcodeFlag"
        :before-close="handleClose"
        custom-class="qrcode_cpn qrActive"
      >
        <div class="qrcode-wrapper">
          <qrcode-vue :value="config.wxurl" :size="196"></qrcode-vue>
          <p class="wx_desc">
            打开微信，点击底部的“发现”，
            <br />使用“扫一扫”即可将网页分享至朋友圈。
          </p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { Loginp } from "@/components/plugins/LoginPlugin";
import InviteShare from "@/components/component/inviteShare";
import { requestInvite } from "@/api/invitation";
// import { encryptedData, decryptData } from "@/utils/common";
import { bin2Hex } from "@/utils/common";
import { mapState } from "vuex";
import QrcodeVue from "qrcode.vue";

export default {
  name: "invitation",
  layout: "banner-link-layout",
  components: { InviteShare, QrcodeVue },
  head() {
    return {
      title: "凌天众媒送你百万商机：邀请好友入驻店铺享好礼",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "凌天众媒网试运营期间，活动不断，商机不断！邀请好友入驻店铺，奖励免技术费额度，还可享受平台店铺推荐位或首页焦点大图广告位展示一周。百万商机，不容错过。"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "凌天众媒,凌天众媒网,凌天众媒活动,凌天众媒有什么活动"
        }
      ]
    };
  },
  data() {
    return {
      notStore: 0,
      count: 0,
      inviList: [],
      total: 0,
      pageSize: 0,
      showFlag: false,
      qrcodeFlag: false,
      config: "",
      userInfo: "",
      page: 1
    };
  },
  created() {},
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo) || "";
      this.getList();
    }
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  methods: {
    showQrcode() {
      this.qrcodeFlag = true;
      this.showFlag = false;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    inviClick() {
      if (this.userInfo) {
        this.showFlag = true;
        let {
          original: { id }
        } = this.userInfo;
        // let encrypt = encryptedData(id + ""),
        let encrypt = window.btoa(bin2Hex(id + "")),
          desc =
            "入驻凌天众媒店铺，开启赚钱之旅~ \n 更多广告位等你来选，先到先得哦！",
          origin = location.origin;
        // let decrypt = decryptData(encrypt);
        this.config = {
          url: `${origin}/business?inviteUserId=${encrypt}`,
          wxurl: `${origin}/invitation`, //.replace('www','m')
          title: `众媒时代 强势来袭！`,
          description: desc,
          image: origin + "/favicon.ico",
          summary: desc
        };
        // console.log("加密解密", encrypt, decrypt);
      } else {
        Loginp(0, () => window.location.reload(true));
      }
    },
    handleClose() {
      this.showFlag = false;
      this.qrcodeFlag = false;
    },
    getList() {
      requestInvite(this.page)
        .then(res => {
          let {
            code,
            data: {
              notStore,
              count,
              list: { data = [], total = 0, per_page = 0 }
            }
          } = res.data;
          if (code === 200) {
            this.inviList = data.filter(item => item.user_invite_list);
            this.total = total;
            this.pageSize = per_page;
            this.notStore = notStore;
            this.count = count;
          }
          // else {
          //     this.$message.error({title: '错误提示', message: message});
          // }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="less">
@c_FD5600: #fd5600;
@c_border: #ffae53;
.invi_content {
  background-color: #f4f6f8;
  margin-bottom: 80px;
}
.invi_box {
  max-width: 1920px;
  min-width: 1210px;
  margin: 0 auto;
  .header,
  .header_2 {
    display: block;
    background: no-repeat center center;
    background-size: cover;
  }
  .header {
    height: 647px;
    background-image: url("~assets/img/invitation/1.png");
  }
  .header_2 {
    position: relative;
    height: 757px;
    background-image: url("~assets/img/invitation/2.jpg");
  }
  .invi_btn {
    display: inline-block;
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 70px;
    line-height: 70px;
    background: @c_FD5600;
    border-radius: 35px;

    cursor: pointer;
    font-size: 30px;
    font-weight: 500;
    color: #fff;
    text-align: center;
  }
}
.header_3 {
  padding: 60px 0;
  background-color: #ffcf7f;
  .title {
    margin: 0 auto;
    width: 388px;
    height: 65px;
    background: url("~assets/img/invitation/3.png") no-repeat center center;
  }
  .desc {
    font-size: 24px;
    width: 1098px;
    margin: 60px auto 20px;
    color: #f94322;
  }
  .desc_num {
    font-weight: bold;
    font-size: 28px;
  }
}
.invi_table {
  display: block;
  width: 1098px;
  margin: 0 auto;
  background: #ffbc69;
  border: 1px solid @c_border;
  span {
    font-size: 24px;
    height: 100%;
    flex: 1;
    text-align: center;
    &:not(:last-child) {
      border-right: 1px solid @c_border;
    }
  }
  .table_th {
    display: flex;
    align-items: center;
    color: #a2470a;
    height: 88px;
    line-height: 88px;
    background-color: #ffbd69;
    border-bottom: 1px solid @c_border;
  }
  .table_td {
    background-color: #fff9c2;
    display: flex;
    align-items: center;
    color: #d07339;
    height: 80px;
    line-height: 80px;
    text-align: center;
    &:not(:last-child) {
      border-bottom: 1px solid @c_border;
    }
  }
  .completed {
    color: #fd5600;
  }
}
.invi_footer {
  background-color: @c_FD5600;
  padding: 78px 0;
  .title,
  .text {
    margin: 0 auto;
    color: #fff;
  }
  .title {
    height: 48px;
    line-height: 48px;
    font-size: 50px;
    font-weight: 500;
    text-align: center;
    width: 350px;
    height: 55px;
    margin-bottom: 64px;
    background: url("~assets/img/invitation/title_bg.png") no-repeat center
      center;
  }
  .text {
    font-size: 20px;
    line-height: 38px;
    width: 902px;
  }
}
.invi_no {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0 8px;
  .img {
    width: 211px;
    height: 286px;
    margin-bottom: 30px;
  }
  .text {
    font-size: 18px;
    color: #fff;
  }
}
.page_box {
  padding: 20px 0;
  width: 1098px;
  text-align: right;
  margin: 0 auto;
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
  &.active {
    text-align: center;
    .el-dialog__header {
      background: #f4f6f8;
      .el-dialog__title {
        font-size: 16px;
        font-weight: normal;
      }
    }
  }
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
.page_box {
  .el-pagination.is-background {
    .btn-next,
    .btn-prev,
    .el-pager li {
      background-color: #fff;
    }
    .el-pager li:not(.disabled) {
      &.active {
        background-color: #f43c42;
      }
      &:hover {
        color: #f43c42;
      }
    }
  }
}
.el-dialog {
  margin-top: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
