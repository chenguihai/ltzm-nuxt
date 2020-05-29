<template>
  <div class="job-file">
    <p>{{title}}</p>
    <div class="file-box">
      <p v-show="uiFiles.length <= 0" class="no-data">{{emptyText}}</p>
      <ul v-loading="loading">
        <li v-for="(item,idx) in uiFiles" :key="idx">
          <div class="file-item">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shoujian" />
            </svg>
            <span class="txt">{{item.file_name}}</span>
            <span class="size">{{item.format_size}}</span>
            <span class="date">{{item.created_at}}</span>
          </div>
          <div>
            <em v-if="type !== 2" @click="download(item.file_path, item.file_name, item.id)">查看</em>
            <em v-if="identity === 1" @click="download(item.file_path, item.file_name, item.id)">下载</em>
            <em
              v-else-if="identity === 2 && orderInfo.order_status <= 5"
              @click="tipsVis(item,idx)"
            >删除</em>
          </div>
        </li>
      </ul>
    </div>
    <template v-if="[4,5].includes(orderInfo.order_status) && identity === 2">
      <el-upload
        v-loading="uploading"
        :disabled="selfFileList.length >=5"
        class="upload-box"
        :headers="fileHeaders"
        :action="urlHead"
        :on-remove="fileRemove"
        :before-remove="beforeFileRemove"
        :limit="5"
        :on-exceed="fileExceed"
        :on-success="fileSuccess"
        :file-list="fileList"
        name="files[]"
        :data="{order_sn:orderInfo.order_sn, type: type}"
      >
        <div class="up-box">
          <div class="ug-btn">上传附件</div>
          <div class="tip">最多可添加5个附件，每个大小不超过50M.</div>
        </div>
      </el-upload>
    </template>
    <el-dialog
      custom-class="dialog-box"
      with="520"
      title="提示"
      :modal-append-to-body="false"
      :visible.sync="tipsVisible"
      center
    >
      <div class="code-box">
        <p>此操作将永久删除该文件, 是否继续?</p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="tipsVisible=false">取消</el-button>
        <el-button type="primary" @click="removeFile">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadMixin, downloadMixin } from "~/utils/common-mixins";
import { getServiceFiles, sendFiles, removeFile as delFile } from "~/api/order";
import { proxyMixin } from "~/utils/common-mixins";
import config from "@/config/index";
import { mapState } from "vuex";
import { getCookie } from "../../utils";
const origin = {
  async uploadGo({ file }) {
    this.uploading = true;
    const params = {
      "files[]": file,
      order_sn: this.orderInfo.order_sn,
      type: this.type
    };
    const res = await sendFiles(params, e => this.uploadProgress(e)).catch(e =>
      this.$message.error(`${file.name}上传失败`)
    );
    this.uploading = false;
    if (!res) return;
    this.$emit("upload");
    res.every(item => {
      if (item.status !== 1) {
        this.$message.error(item.msg);
        return false;
      }
      return true;
    });
    this.fileList = [];
    this.getFiles();
  }
};
export default {
  name: "jobFile",
  mixins: [
    downloadMixin()
  ],
  props: ["title", "emptyText", "hasFiles", "type"],
  inject: ["orderInfo", "identity"],
  data() {
    return {
      selfFileList: this.hasFiles || [],
      showSelfFile: false,
      loading: false,
      uploading: false,
      tipsVisible: false,
      item: "",
      fileHeaders: { Authorization: "Bearer " + getCookie("access_token") },
      urlHead: `${config.UPLOAD_IMAGE_URL}/api/service/uploadFiles`,
      fileList: [],
      deleteIndex: 0
    };
  },
  computed: {
    ...mapState({
      envVars: "envVariables"
    }),
    uiFiles() {
      return !this.showSelfFile ? this.hasFiles : this.selfFileList;
    }
  },
  methods: {
    fileSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.getFiles();
      }
    },
    fileExceed(files, fileList) {
      this.$message.error(
        `当前限制选择 ${this.selfFileList.length} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeFileRemove(file, fileList) {
      if (file.size > 5) return true;
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    async removeFile() {
      var id = this.item.id;
      const res = await delFile(id).catch(e => this.$message.error("删除失败"));
      if (!res) return;
      this.tipsVisible = false;
      this.$message.success("删除成功,正在刷新文件列表");
      this.selfFileList.splice(this.deleteIndex, 1);
    },
    tipsVis(item, index) {
      this.tipsVisible = true;
      this.item = item;
      this.deleteIndex = index;
    },
    async getFiles() {
      this.loading = true;
      const res = await getServiceFiles(this.orderInfo.order_sn).catch(e =>
        this.$message.error("更新文件列表失败")
      );
      this.loading = false;
      if (!res) return;
      const { data } = res.data;
      let typeData = data.filter(item => {
        return item.type === this.type;
      });
      this.fileList = [];
      this.selfFileList = typeData;
      if (this.selfFileList.length ===1) {
        this.$emit("upload");
      }
      this.showSelfFile = true;
    },
    uploadProgress(e) {
      if (!e.lengthComputable) {
        return;
      } else {
        // 进度条
        console.log(e);
      }
    }
  }
};
</script>

<style scoped lang="less">
@bg: #f4f6f8;
@redText: #f3262d;
@c333: #333;
@c666: #666;
@pick: #fff8f8;

.job-file {
  margin-bottom: 20px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  /deep/ .dialog-box {
    position: absolute;
    width: 520px !important;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: -50px !important;
  }
  .code-box {
    margin: 0 auto;
    width: 70%;
    /deep/ .el-button--default {
      background: #f3262d;
      color: #fff;
    }
    /deep/ .is-disabled {
      background: #e3e3e3;
      color: #999;
    }
  }
}
.no-data {
  width: 879px;
  height: 170px;
  line-height: 170px;
  text-align: center;
  color: rgba(243, 38, 45, 1);
  opacity: 0.5;
}

.file-box {
  margin-top: 12px;
  width: 879px;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 170px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(221, 221, 221, 1);
  li {
    padding-left: 12px;
    padding-right: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration-line: none;
    line-height: 32px;
    font-size: 12px;
    cursor: pointer;
    .file-item {
      display: flex;
      align-items: center;
    }
    .txt {
      text-indent: 10px;
      color: @c333;
    }
    .size,
    .date {
      color: #888;
      margin-left: 1em;
    }
    .date {
      margin-left: 50px;
    }
    em,
    .look_img {
      color: #3e93f8;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #f3262d;
      }
      &:last-child {
        margin-left: 30px;
      }
    }
  }
}
.up-box {
  display: flex;
  align-items: center;
  margin-top: 12px;
  .tip {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666;
  }
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
}
</style>

<style lang="less">
.upload-box {
  .el-upload-list {
    display: none;
  }
}
</style>