<template>
  <!-- 补充需求弹框 -->
  <div class="supplement-box" @click.self="close">
    <div class="supplement">
      <div class="top">
        <p></p>
        <p class="title">补充需求</p>
        <i class="iconfont icon-guanbi close" @click="close"></i>
      </div>
      <textarea maxlength="500" v-model="con" placeholder="请输入需要补充的内容（字数限制500字）"></textarea>
      <div class="file-list" v-if="fileList.length > 0">
        <div class="file-item" :key="item.uid" v-for="(item, idx) in fileList">
          <span>{{item.name}}</span>
          <span v-if="item.response">
            {{item.response.code === 1 ? '上传成功!' : '上传失败'}}
            <i
              @click="delThis(idx)"
              class="iconfont icon-guanbi file-icon"
            ></i>
          </span>
        </div>
      </div>
      <el-upload
        class="upload-demo"
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
      <div class="btn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { submitSupplement, delFile } from "~/api/order";
import { dialogMixin, uploadMixin } from "~/utils/common-mixins";
import { getCookie } from "../../utils";
import {removeFile} from '@/api/common'
export default {
  name: "supplement",
  mixins: [dialogMixin(), uploadMixin()],
  data() {
    return {
      con: "",
      fileList: [],
      upload_imgs: [],
      headers: {
        Authorization: "Bearer " + Cookie.get("access_token")
      },
      count: 0
    };
  },
  computed: {
  },
  inject: ["identity", "orderInfo"],
  methods: {
    async submit() {
      if (this.con === "") return this.$message.error("请填写需求");
      const files = this.upload_imgs.map(item => item.url);
      const params = {
        require: this.con,
        require_attach: files.length !== 0 ? files : undefined,
        order_id: this.orderInfo.id
      };
      const data = await submitSupplement(params)
      const {code, message} = data.data
      if(code !=200) return this.$message.error(message)
      console.log(data)
      if (!data) return;
      this.$message.success("补充成功");
      this.close(1);
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
    width: 500px;
    background: #fff;
    padding-bottom: 36px;
    max-height: 450px;
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
      margin-top: 30px;
      display: block;
      font-size: 12px;
    }
    .upload-demo {
      width: 450px;
      margin: auto;
      margin-top: 20px;
    }
    .tip {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666;
    }
    .up-box {
      display: flex;
      align-items: center;
    }
    .btn {
      width: 80px;
      height: 36px;
      background: rgba(243, 38, 45, 1);
      border-radius: 2px;
      font-size: 14px;
      margin: auto;
      cursor: pointer;
      margin-top: 30px;
      line-height: 36px;
      color: #fff;
      text-align: center;
      &:hover {
        background: #f43c42;
      }
    }
  }
}
</style>

<style lang="less">
.el-list-enter-active,
.el-list-enter-to,
.is-uploading {
  display: none !important;
}
.supplement {
  & > .upload-demo {
    & > .el-upload-list {
      display: flex;
      align-content: center;
      & > .el-upload-list__item {
        width: 88px;
        margin-top: 0;
        & > .el-upload-list__item-name {
          margin-right: 25px;
        }
      }
    }
  }
}
</style>
