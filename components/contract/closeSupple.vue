<template>
  <!-- 关闭需求弹框 -->
  <div class="supplement-box" @click.self="close">
    <div class="supplement" :class="{'suppl-xq':orderInfo.order_status<3}">
      <div class="top">
        <p></p>
        <p class="title">{{title}}</p>
        <i class="iconfont icon-guanbi close" @click="close"></i>
      </div>

      <!-- <div
        class="tips"
        v-if="fni && orderInfo.order_status >= 3"
      >
        您的退款申请已提交成功，请耐心等待服务商处理，服务商同意后平台将赏金退回到您账户余额。
      </div>-->
      <!-- <div
        class="tips"
        v-else-if="fni && orderInfo.order_status <3"
      >
        
      </div>-->

      <div class="supple-item" v-if="orderInfo.order_status >= 3 && !fni">
        <div class="label up">退款项目：</div>
        <div class="right">{{orderInfo.name}}</div>
      </div>

      <div class="supple-item" v-if="!fni">
        <div class="label">{{orderInfo.order_status < 3 ? '关闭' : '申请'}}原因：</div>
        <el-select v-model="value" placeholder="请选择" class="right" :popper-class="{'serClass':orderInfo.order_status<3}">
          <el-option
            v-for="item in orderInfo[orderInfo.order_status < 3 ? 'closeReason' : 'refundReason']"
            :key="item.id"
            :label="item.reason"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>

      <div class="supple-item" v-if="value === 16 && !fni">
        <div class="label"></div>
        <el-input class="right" v-model="why" placeholder="请输入其他原因"></el-input>
      </div>

      <template v-if="orderInfo.order_status >= 3 && !fni">
        <div class="supple-item">
          <div class="label up">问题描述：</div>
          <textarea class="right" maxlength="200" v-model="con" placeholder="请输入需要描述的内容（字数限制200字）"></textarea>
        </div>

        <div class="supple-item">
          <div class="label">上传附件：</div>
          <el-upload
            class="right"
            :headers="headers"
            name="imgs"
            ref="upload"
            :action="$store.state.uploadApi"
            :file-list="upload_imgs"
            :on-remove="handleRemove"
            :limit="5"
            :auto-upload="true"
            :before-upload="beforeAvatarUpload"
            :on-success="avant_upload_succ"
            :on-exceed="handleExceed"
          >
            <div class="up-box">
              <div class="ug-btn">上传附件</div>
              <div class="tip">最多可添加5个附件，每个大小不超过50M.</div>
            </div>
          </el-upload>
        </div>

        <div class="supple-item">
          <div class="label">应退金额：</div>
          <p class="right">￥{{this.orderInfo.amount}}</p>
        </div>
        <div class="btn-box">
          <div class="btn" v-if="!fni" @click="submit">下一步</div>
          <div class="btn" v-else @click="close(1)">关闭</div>
        </div>
      </template>
      <template v-else>
        <div class="btn-box" v-if="!fni">
          <div class="btn" @click="submit">确定</div>
          <div class="btn cancel" @click="close">取消</div>
        </div>
        <div class="btn-box" v-else>
          <div class="btn" @click="close(1)">关闭</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { applyRefund, closeService } from "~/api/order";
import { dialogMixin, uploadMixin } from "~/utils/common-mixins";
import { _checkStringVal } from "~/utils/tool";
import { getCookie } from "~/utils";
import {removeFile} from '@/api/common'

export default {
  name: "closeSupple",
  mixins: [dialogMixin(), uploadMixin()],
  data() {
    return {
      con: "",
      value: "", // 原因
      why: "", // 其他原因
      fni: false,
      fileList: [],
      upload_imgs: [],
      count: 0,
      headers: {
        Authorization: "Bearer " + Cookie.get("access_token")
      }
    };
  },
  computed: {
    title() {
      if (this.fni) return "温馨提示";
      if (this.orderInfo.order_status < 3) {
        return "关闭需求";
      } else {
        return "申请退款";
      }
    }
  },
  inject: ["orderInfo", "identity"],
  methods: {
    async submit() {
      // 退款
      if (this.orderInfo.order_status < 3) return this.closeSup();
      if (this.con === "") return this.$message.error("请填写问题描述");
      if (this.value === "") return this.$message.error("申请原因不能为空");
      const files = this.upload_imgs.map(item => item.url);
      const params = {
        order_sn: this.orderInfo.order_sn,
        reason_id: this.value,
        text: this.con,
        url: files.length !== 0 ? files : undefined
      };
      const data = await applyRefund(params).catch(e =>
        this.$message.error("提交失败")
      );
      if (!data) return;
      // this.fni = true
      this.close(1);
      this.$message({
        message:
          "您的退款申请已提交成功，请耐心等待服务商处理，服务商同意后平台将赏金退回到您账户余额。",
        type: "success",
        duration: 2500
      });
      window.location.reload()
    },
    async closeSup() {
      // 关闭
      if (!_checkStringVal(this.value))
        return this.$message.error("请选择原因");
      const params = {
        order_sn: this.orderInfo.order_sn,
        reason_id: this.value,
        text: this.why
      };
      const res = await closeService(params).catch(e =>
        this.$message.error("提交失败")
      );
      if (!res) return;
      const tip = `关闭需求成功!${
        this.orderInfo.pay_status === 1
          ? "平台将已托管金额退回到您的账户余额，请注意查收"
          : ""
      }`;
      this.$message.success(tip);
      // this.fni = true
      this.close(1);
       window.location.reload()
    },
    beforeAvatarUpload(file) {
      this.headers = { Authorization: "Bearer " + getCookie("access_token") };
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 50MB!");
        return false;
      }
      return isJPG || isBMP || isGIF || isPNG || isLt2M;
    },
    handleExceed(files, fileList) {
      this.$message.error("最多只能上传5个文件");
    },
    handleRemove(file, fileList) {
      if (file && file.status === "success") {
        let str = file.url;
        let iStr = str.replace(file.domain, "");
        let arr = this.upload_imgs;
        removeFile({ rmfile: iStr }).then(res => {
            arr.forEach((el, idx) => {
              if (el.uid == file.uid) {
                arr.splice(idx, 1);
                this.upload_imgs = arr;
              }
            });
            this.$message.success("操作成功");
          }).catch(err => {
            this.$message.error("操作失败");
            return false;
          });
      }
    },
    async avant_upload_succ(response, file, fileList) {
      let { code, message, data } = response;
      var index = 0;
      this.count++;
      this.upload_imgs.push({
        url: data.file,
        name: `附件` + this.count
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "./dialog.less";
.ug-btn {
  width: 70px;
  height: 30px;
  background: rgba(244, 244, 244, 1);
  border: 1px solid rgba(223, 223, 223, 1);
  margin-right: 14px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #666;
  &:hover {
    background: #ffffff;
  }
}
.file-list {
  margin-top: 20px;
}
.file-item {
  width: 450px;
  height: 26px;
  display: flex;
  justify-content: space-between;
  padding: 0 11px;
  background: #eef6fb;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333;
  align-items: center;
  margin: auto;
  margin-bottom: 8px;
  .file-icon {
    width: 11px;
    height: 11px;
    margin-left: 38px;
    line-height: 11px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: #f3262d;
    }
  }
}
.supplement-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .supplement {
    width: 520px;
    background: #fff;
    padding-bottom: 36px;
    overflow: auto;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 25px;
      background: #f5f5f5;
      text-align: center;
      .title {
        font-size: 16px;
        font-weight: 400;
        color: #333;
      }
    }
    textarea {
      width: 450px;
      height: 120px;
      background: #fff;
      border: 1px solid #dddddd;
      padding: 11px;
      outline: none;
      resize: none;
      margin: auto;
      display: block;
      font-size: 12px;
    }
    .btn-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 35px;
      .btn {
        width: 100px;
        height: 36px;
        border-radius: 2px;
        color: #fff;
        background: #f3262d;
        font-size: 14px;
        line-height: 36px;
        text-align: center;
        margin-right: 20px;
        cursor: pointer;
      }
      .btn:hover {
        opacity: 0.9;
      }
      .cancel {
        border: 1px solid #f3262d;
        background: #fff;
        color: #f3262d;
        &:hover {
          background: #f3262d;
          color: #fff;
        }
      }
    }
    .supple-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 420px;
      margin: auto;
      margin-top: 15px;
      &:first-child {
        margin-top: 40px;
      }
      .right {
        flex: 1;
        color: #333;
        font-size: 14px;
      }
      .label {
        width: 70px;
        margin-right: 10px;
        color: #666;
        font-size: 14px;
        &.up {
          align-self: flex-start;
        }
      }
      .up-box {
        display: flex;
        align-items: center;
      }
    }

    .tips {
      margin-top: 50px;
      text-align: center;
      color: #666;
      width: 364px;
      text-align: left;
      line-height: 24px;
      margin: auto;
      margin-top: 44px;
    }
    .tip {
      font-size: 12px;
      color: #666;
    }
  }
  .suppl-xq{
    width: 426px;
    height: 281px;
  }
  input:focus,
  textarea:focus {
    box-shadow: 0px 0px 4px #5da6ff !important;
    border: 1px solid #5da6ff !important;
  }
}
</style>
<style lang="less">
.right {
  & > .el-upload-list {
    & > .el-upload-list__item {
      width: 88px;

      & > .el-upload-list__item-name {
        margin-right: 0;
      }
    }
  }
}
.suppl-xq{
  &>.supple-item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* margin: auto; */
    margin-top: 55px!important;
    padding-left: 40px;
    &>.el-select{
        width: 260px;
      &>.el-input{
          width: 260px;
        &>.el-input__inner{
          width: 260px;
          height: 36px;
          border-radius: 0;
        }
      }
    }
  }
  &>.btn-box{
   &>.btn{
     width: 64px!important;
     height: 30px!important;
     line-height: 30px!important;
   }
    &>.cancel{
      color: #f3262d;
       margin-right: 0!important;
    }
    &>.btn:hover{
      background: #F43C42;
     
    }
    &>.cancel:hover{
      background: #FF0000;
      color: #fff;
    }
  }
}
.serClass{
  min-width: 261px!important;
}
.el-select .el-input.is-focus .el-input__inner{
  border-color: #ddd!important;
}
.el-input__inner:hover{
   border-color: #ddd!important;
}
.el-select .el-input__inner:focus{
   border-color: #ddd!important;
}
</style>
