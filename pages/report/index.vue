<template>
  <div>
    <navAll :navWidth="1210"/>
    <section class="report-page">
      <div class="report-box" v-if="reportInfo">
        <h3 class="report-title">请填写以下信息完成举报</h3>
        <div class="report">
          <!-- 被举报人 -->
          <div class="report-items">
            <p class="items-title">被举报人：</p>
            <div class="items-con pd11">{{reportInfo.passive_uid}}#{{reportInfo.passive_name}}</div>
          </div>
          <!-- 被举报人 -->
          <!-- 举报项目 -->
          <div class="report-items">
            <p class="items-title">举报项目：</p>
            <div class="items-con-box">
              <img
                v-if="selectType !== '3'"
                class="items-face"
                :class="{ser :![1,2].includes(selectType)}"
                v-lazy="reportInfo.project_img"
                src="~/assets/img/userDataImg.png"
                alt="项目LOGO"
              />
              <div class="items-con pd18" style="margin-bottom:0;">
                <p>{{targetTxt}}#{{reportInfo.project_id}}</p>
                <p>{{reportInfo.project_name}}</p>
              </div>
            </div>
          </div>
          <!-- 举报项目 -->
          <!-- 举报类型 -->
          <div class="report-items" style="padding-bottom:3px;">
            <p class="items-title">举报类型：</p>
            <div class="items-con-box">
              <div
                class="items-con center pd18 w200 itemClass"
                v-for="(items, idx) in reportTypeList"
                :key="idx"
                :class="{active:typeSel === idx+1}"
                @click="typeSel = idx+1"
              >
                <p class="con-title">{{items.type}}</p>
                <p class="con-txt">{{items.description}}</p>
                <span class="icon iconfont items-sel xuanze">&#xe6ad;</span>
              </div>
            </div>
          </div>
          <!-- 举报类型 -->

          <!-- 举报原因描述 -->
          <div class="report-items">
            <p class="items-title">举报原因描述：</p>
            <textarea
              class="report-inp"
              v-model="reason"
              maxlength="500"
              placeholder="请输入您要举报的详细描述，请写明具体的以便管理员核实，最多500字"
            ></textarea>
            <el-upload
              v-model="fileList"
              class="upload-box"
              accept=".jpg, .jpeg, .png"
              :headers="fileHeaders"
              :action="imgApi"
              :on-preview="filePreview"
              :on-remove="fileRemove"
              :before-remove="beforeFileR"
              :limit="fileLimit"
              :auto-upload="true"
              :on-exceed="fileExceed"
              :on-success="fileSuccess"
              :on-change="fileChange"
              :before-upload="sizeCheck"
              :file-list="fileList"
              list-type="picture-card"
              name="imgs"
              ref="upload"
            >
              <div class="up-box" slot="trigger" v-if="fileList.length < 5">
                <i class="el-icon-plus"></i>
                <div class="ug-btn">上传凭证</div>
              </div>
              <div class="tip" slot="tip">凭证为您举报的证据，可上传5张，上传图片格式为.jpg、.jpeg 、.png，每张大小为10M以内.</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <!-- 验证码 -->
            <div class="code-box">
              <span>图形验证码:</span>
              <input type="text" class="code-inp" v-model="code" @keyup.enter="submit" />
              <img @click="getCaptcha" :src="captcha" alt />
            </div>
            <!-- 提交 -->
            <div class="submit" @click="submit">提交举报</div>
          </div>
          <!-- 举报原因描述 -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { uploadMixin } from "~/utils/common-mixins";
import { report } from "~/api/report";
import { checkEmptyValue } from "@/utils/tool";
import { getHeader } from "@/api/async-server";
import navAll from "@/components/component/navAll";

const rulesList = [
  {
    name: "typeSel",
    custom(val) {
      return val !== 0;
    }
  },
  {
    name: "reason",
    custom(val) {
      return val.length >= 20 && val.length <= 500;
    }
  },
  {
    name: "fileList",
    custom(val) {
      return val.length > 0 && val.length <= 5;
    }
  },
  "code"
];
const errorMsgList = new Map([
  ["reason", "请输入最少20字的举报原因"],
  ["typeSel", "请选择举报类型"],
  ["code", "请输入验证码"],
  ["fileList", "请最少上传一份举报凭证"]
]);
const targetTxtList = new Map([
  [1, "用户编号"],
  [2, "店铺编号"],
  [3, "线索编号"],
  [4, "服务编号"],
  [5, "客户示例编号"],
  [6, "案例编号"],
  [7, "传记编号"],
  [8, "图片编号"],
  [9, "视频编号"]
]);
export default {
  name: "report",
  layout: "shop-list-layout",
  mixins: [uploadMixin({ maxSize: 10 * 1024 * 1024 })],
  components: { navAll },
  props: {},
  data() {
    return {
      reportInfo: {},
      captcha: "",
      fileList: [],
      typeSel: 0,
      reason: "",
      code: "",
      reportTypeList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      selectType: 0, // 1用户 2店铺 3线索 4服务 5客户示例
      selectId: 0
    };
  },
  created() {
    const { type = 0, id = 0 } = this.$route.query;
    this.selectType = type;
    this.selectId = id;
    this.init();
  },
  provide() {
    return {
      // 导航SSR
      navList: this.headerNavList,
      navLeftMadio: this.navLeftMadio,
      popularMedia: this.popularMedia,
      PopularBrand: this.PopularBrand,
    };
  },
  async asyncData(app) {
    // 导航SSR
    let navData = await getHeader();
    const navDataRes = navData.data.data;
    // if (code != 200) return this.$message.error(message);
    let navLeftMadio = navDataRes.cate_left;
    let headerNavList = navDataRes.cate_right || [];
    let PopularBrand = navDataRes.hot_media && navDataRes.hot_media.hot_brand;
    let popularMedia = navDataRes.hot_media && navDataRes.hot_media.hot_media;
    for (var i = 0; i < navLeftMadio.length; i++) {
      var a = navLeftMadio[i].child;
      var itemList = [];
      navLeftMadio[i] = { ...navLeftMadio[i], itemList };
      if (a) {
        for (var j = 0; j < a.length; j++) {
          for (var k = 0; k < a[j].child.length; k++) {
            if (a[j].child[k].inr == 1 && a[j].child[k].pid == a[j].id) {
              navLeftMadio[i].itemList.push(a[j].child[k]);
            }
          }
        }
      }
    }

    return {
      // 导航SSR
      navLeftMadio,
      popularMedia,
      headerNavList,
      PopularBrand
    };
  },
  computed: {
    targetTxt() {
      return targetTxtList.get(+this.selectType);
    }
  },
  methods: {
    init() {
      let data = {
        project_type: this.selectType,
        project_id: this.selectId
      };
      report.tipOffs(data).then(res => {
        this.reportInfo = res.data.data;
        this.captcha = this.reportInfo.captcha;
        this.reportTypeList = this.reportInfo.typeList;
      });
    },
    getCaptcha() {
      report.captcha().then(res => {
        this.captcha = res.data.data;
      });
    },
    filePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    sizeCheck(file) {
      if (file.size > this.maxSize) {
        this.$message.error("文件大小不得超过10M");
        return false;
      }
      const isIMG =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png";
      if (!isIMG) {
        this.$message.error("上传头像图片只支持jpg、jpeg、png格式!");
        return false;
      }
    },
    beforeFileR(file, fileList) {
      if (file.size > this.maxSize) return true;
      return this.$confirm(`确定移除 ${file.name}？`, "温馨提示", {
        confirmButtonText: "确定",
        customClass: "customClass",
        confirmButtonClass: "subClass",
        showCancelButton: false,
        center: true
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    submit() {
      const res = rulesList.every(rule =>
        checkEmptyValue(rule, this, rule =>
          this.$message.error(errorMsgList.get(rule))
        )
      );
      if (!res) return;
      let proof_imgs = "";
      this.fileList.forEach((res, index) => {
        proof_imgs += res.response.data.file;
        if (index < this.fileList.length - 1) {
          proof_imgs += ",";
        }
      });
      let data = {
        passive_uid: this.reportInfo.passive_uid,
        passive_name: this.reportInfo.passive_name,
        tip_offs_type: this.reportInfo.typeList[this.typeSel - 1].id,
        project_type: parseInt(this.$route.query.type),
        project_id: parseInt(this.$route.query.id),
        project_name: this.reportInfo.project_name,
        description: this.reason,
        captcha: this.code,
        proof_imgs: proof_imgs
      };
      report.addTipOffs(data).then(res => {
        if (res.data.code == 200) {
          this.$message.success("举报成功");
          this.$router.push(sessionStorage.getItem('historyUrl')) ;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.report-page {
  width: 100%;
  background: #f4f6f8;
  padding-bottom: 50px;
}

.report-box {
  width: 100%;
  max-width: 1210px;
  margin: auto;
  overflow: auto;

  .report-title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    padding-left: 10px;
    border-left: 4px solid #f3262d;
    margin: 20px 0;
  }

  .report {
    width: 100%;
    padding: 30px 40px 50px 40px;
    background: #fff;

    .report-items {
      width: 100%;
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 24px;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        border: none;
      }

      .items-title {
        color: rgba(51, 51, 51, 1);
        margin-bottom: 10px;
      }

      .report-inp {
        width: 100%;
        height: 180px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid #eee;
        overflow-y: auto;
        padding: 10px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        resize: none;
        outline: none;
      }

      .items-con {
        color: rgba(102, 102, 102, 1);
        min-width: 420px;
        background: rgba(244, 246, 248, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        line-height: 1;
        display: inline-block;

        p:first-child {
          margin-bottom: 10px;
        }

        .con-txt {
          font-size: 12px;
          color: #999;
        }

        .items-sel {
          display: none;
          width: 20px;
          font-size: 24px;
        }

        &.active {
          color: #f3262d;
          background: #ffd7d8;
          position: relative;
          overflow: hidden;

          .items-sel {
            position: absolute;
            bottom: -6px;
            right: 0;
            display: block;
          }
        }

        &.w200 {
          min-width: 200px;
        }
      }
        .itemClass{
            width: 214px!important;
        }
      .items-con-box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .items-con {
          border: none;
          margin-bottom: 12px;
          margin-right: 12px;
          border: 1px solid #ddd;
          cursor: pointer;
        }

        .items-face {
          height: 76px;
          margin-right: 10px;

          &.ser {
          }
        }
      }

      .pd11 {
        padding: 11px 10px;
      }

      .pd18 {
        padding: 18px 10px;
      }

      .center {
        text-align: center;
      }
    }
  }
}

.upload-box {
  .up-box {
    width: 120px;
    height: 120px;
    border: 1px solid rgba(223, 223, 223, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #666666;

    i {
      font-size: 24px;
      color: #dfdfdf;
    }

    .ug-btn {
      margin-top: 20px;
      font-size: 16px;
    }
  }
  
  /deep/ .el-upload--picture-card {
    width: auto;
    height: auto;
    line-height: normal;
    border: none;
    border-radius: 0;
    background: none;
  }

  /deep/ .el-upload-list__item {
    width: 120px;
    height: 120px;
    margin-right: 20px;
    border: none;
    border-radius: 0;

    .el-progress,
    .el-progress-circle {
      width: 100% !important;
      height: 100% !important;
    }
  }
}

.tip {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 24px;
}

.code-box {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
  margin-top: 20px;

  .code-inp,
  img {
    height: 40px;
  }

  .code-inp {
    margin: 0 10px;
    border: 1px solid rgba(221, 221, 221, 1);
    box-sizing: border-box;
    outline: none;
    text-indent: 10px;
  }
  .code-inp:focus {
    border: 1px solid #5da6ff;
    outline: 0;
    box-shadow: 0px 0px 4px #5da6ff;
  }
  img {
    width: 110px;
  }
}

.submit {
  width: 164px;
  height: 44px;
  background: rgba(243, 38, 45, 1);
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(254, 254, 254, 1);
  margin-top: 30px;
  cursor: pointer;

  &:hover,
  &:active {
    background: rgba(244, 60, 66, 1);
  }
}
textarea[class="report-inp"]::-webkit-input-placeholder {
  color: #999;
  font-size: 14px;
}
textarea[class="report-inp"]:-moz-placeholder {
  color: #999;
  font-size: 14px;
}
textarea[class="report-inp"]::-moz-placeholder {
  color: #999;
  font-size: 14px;
}
textarea[class="report-inp"]:-ms-input-placeholder {
  color: #999;
  font-size: 14px;
}
</style>
<style lang="less">
.el-message-box__wrapper {
  & > .customClass {
    width: 426px;
    height: 220px;
    border-radius: 0;
    & > .el-message-box__header {
      padding: 0;
      height: 45px;
      background: #f5f5f5;
      font-size: 16px;
      color: #666;
      text-align: center;
      & > .el-message-box__title {
        & > span {
          line-height: 45px;
        }
      }
      & > .el-message-box__headerbtn {
        top: 12px;
        font-size: 18px;
      }
      & > .el-message-box__headerbtn:hover {
        & > i {
          color: #f3262d;
        }
      }
    }
    & > .el-message-box__content {
      padding-top: 34px;
      padding-bottom: 29px;
    }
    & > .el-message-box__btns {
      & > .subClass {
        width: 68px;
        height: 30px;
        background: rgba(243, 38, 45, 1);
        color: #fff;
        border: 1px solid #f3262d;
      }
      & > .subClass:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>
<style lang="less">
  .report-page{
    .el-icon-close-tip{
      display: none !important;
    }
  }
</style>
