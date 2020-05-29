<template>
  <!-- 我的信息 -->
  <div class="myDatabox body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="myData">
          <span class="my_new">基本信息</span>
          <div class="myOrder_form">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="头像" prop="userImg" class="userImg">
                <el-button @click="dialogTableVisible = true" class="userImg_btn">
                  <template>
                    <img
                      src="../../../assets/img/icon_sign_mobile.jpg"
                      alt
                      v-if="avatar == null || avatar==''"
                    />
                    <!-- 微信默认头像返回是完整地址，用户上传返回时相对地址 -->
                    <img
                      v-else
                      :src="avatar.indexOf('http')>-1?avatar:envVars.IMG_HOST+avatar"
                      alt
                      style="width:100px;height:100px;"
                    />
                  </template>
                  <template>
                    <div class="modifierImg">修改</div>
                  </template>
                </el-button>
                <el-dialog title="头像设置" :visible.sync="dialogTableVisible" class="primary_btn">
                  <template>
                    <div class="upload_state">
                      <span>支持JPG格式，图片大小不超过5MB</span>
                      <span>头像最佳默认尺寸为120X120像素</span>
                    </div>
                  </template>
                  <el-upload
                    class="upload-demo"
                    :action="$store.state.uploadImg"
                    :file-list="imageUrl"
                    name="avatar"
                    ref="upload"
                    :headers="headers"
                    :on-change="handleChange"
                    :auto-upload="false"
                    :on-success="avant_upload_succ"
                    :before-upload="beforeAvatarUpload"
                    list-type="picture"
                  >
                    <img
                      class="avatar"
                      src="../../../assets/img/icon_sign_mobile.jpg"
                      alt="默认头像"
                      v-if="avatar == null || avatar==''"
                    />
                    <img
                      class="avatar"
                      alt="默认头像22"
                      v-else
                      :src="avatar.indexOf('http')>-1?avatar:envVars.IMG_HOST+avatar"
                    />
                    <el-button size="small" style="color:#666" slot="trigger">上传头像</el-button>
                  </el-upload>
                  <template>
                    <div class="announcements">
                      <h3>注意事项</h3>
                      <ul>
                        <li>1.请上传您的品牌LOGO或者个人真实头像</li>
                        <li>2.请不要在头像上面留电话、QQ、网址、邮箱等信息</li>
                        <li>
                          3.上传遇到问题，请联系客服：
                          <a
                            href="https://url.cn/59IhwSe?_type=wpa&qidian=true"
                            target="_blank"
                          >800884838</a>
                        </li>
                      </ul>
                    </div>
                  </template>
                  <el-button
                    class="but_sub"
                    style="margin-left: 10px;"
                    size="small"
                    type="success"
                    @click="submitUpload"
                  >确定</el-button>
                  <el-button
                    style="margin-left: 10px;"
                    size="small"
                    type="success"
                    @click="cancelUpload"
                    class="but_sub but_can"
                  >取消</el-button>
                </el-dialog>
              </el-form-item>

              <el-form-item label="昵称" prop="real_name" class="real_name">
                <el-input v-model="ruleForm.real_name"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex" class="sex">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio label="M">男</el-radio>
                  <el-radio label="F">女</el-radio>
                  <el-radio label="U">保密</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="生日" required class="user_birthday">
                <el-radio-group label="生日" class="user_birthday" id="user_yesr">
                  <template>
                    <div class="iconf bir">
                      <svg class="icon img" aria-hidden="true">
                        <use xlink:href="#icon-shouyejiantou" />>
                      </svg>
                      <el-select v-model="ruleForm.year" placeholder="请选择" class="user_yesr">
                        <el-option
                          v-for="item in 58"
                          :key="1960+item"
                          :label="1960+item"
                          :value="1960+item"
                        >{{1960+item}}</el-option>
                      </el-select>
                    </div>
                  </template>
                  <template>
                    <div class="iconf bir">
                      <svg class="icon img" aria-hidden="true">
                        <use xlink:href="#icon-shouyejiantou" />>
                      </svg>
                      <el-select
                        v-model="ruleForm.month"
                        collapse-tags
                        placeholder="请选择"
                        class="user_yesr"
                        @change="monthChange"
                      >
                        <el-option
                          v-for="item in 12"
                          :key="item"
                          :label="item"
                          :value="item"
                        >{{item}}</el-option>
                      </el-select>
                    </div>
                  </template>
                  <template>
                    <div class="iconf bir">
                      <svg class="icon img" aria-hidden="true">
                        <use xlink:href="#icon-shouyejiantou" />>
                      </svg>
                      <el-select
                        v-if="ruleForm.month == '1'||ruleForm.month == '3'||ruleForm.month == '5'||ruleForm.month == '7'||ruleForm.month == '8'||ruleForm.month =='10'||ruleForm.month == '12'"
                        v-model="ruleForm.date"
                        collapse-tags
                        placeholder="请选择"
                        class="user_yesr"
                        @change="dataChange"
                      >
                        <el-option
                          v-for="item in 31"
                          :key="item"
                          :label="item"
                          :value="item"
                        >{{item}}</el-option>
                      </el-select>
                      <el-select
                        v-else-if="ruleForm.month =='4'||ruleForm.month == '6'||ruleForm.month == '9'||ruleForm.month =='11'"
                        v-model="ruleForm.date"
                        collapse-tags
                        placeholder="请选择"
                        class="user_yesr"
                        @change="dataChange"
                      >
                        <el-option
                          v-for="item in 30"
                          :key="item"
                          :label="item"
                          :value="item"
                        >{{item}}</el-option>
                      </el-select>
                      <el-select
                        v-else
                        v-model="ruleForm.date"
                        collapse-tags
                        placeholder="请选择"
                        class="user_yesr"
                        @change="dataChange"
                      >
                        <el-option
                          v-for="item in 28"
                          :key="item"
                          :label="item"
                          :value="item"
                        >{{item}}</el-option>
                      </el-select>
                    </div>
                  </template>
                </el-radio-group>
                <template>
                  <div v-if="flag" class="err">生日信息不完整</div>
                </template>
              </el-form-item>
              <el-form-item label="手机" class="userp">
                <el-input :disabled="true" v-model="userp"></el-input>
              </el-form-item>
              <el-form-item label="联系地址" prop="selectArea" id="selectArea">
                <template>
                  <div class="iconf">
                    <svg class="icon img" aria-hidden="true">
                      <use xlink:href="#icon-shouyejiantou" />>
                    </svg>
                    <el-select
                      v-model="ruleForm.province"
                      clearable
                      @change="changeProvince"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in areaArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                </template>
                <template>
                  <div class="iconf">
                    <svg class="icon img" aria-hidden="true">
                      <use xlink:href="#icon-shouyejiantou" />>
                    </svg>
                    <el-select
                      size="mini"
                      class="city"
                      clearable
                      v-model="ruleForm.city"
                      @change="changeDistrict"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in cityList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                </template>
                <template>
                  <div class="iconf">
                    <svg class="icon img" aria-hidden="true">
                      <use xlink:href="#icon-shouyejiantou" />>
                    </svg>
                    <el-select
                      v-model="ruleForm.district"
                      @change="disChange"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in districtList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                  <div v-if="flagiv" class="err flagiv">请选择地址</div>
                </template>
              </el-form-item>
              <el-form-item label="详细地址" prop="address" class="address">
                <el-input
                  type="textarea"
                  placeholder="请输入详细地址"
                  resize="none"
                  v-model="ruleForm.address"
                ></el-input>
              </el-form-item>
              <el-form-item class="sun_btn">
                <el-button
                  type="primary"
                  :plain="true"
                  @click="submitForm('ruleForm')"
                  :loading="isLoading"
                >保存</el-button>
              </el-form-item>
            </el-form>
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
import { upAvatar, upInfodataData, getUserInfo } from "@/api/list";
import { getCookie } from "../../../utils";
import { mapMutations, mapState } from "vuex";
import area from "@/assets/js/area";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      } else {
        const reg = /^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/;
        if (!reg.test(value)) {
          callback();
        } else {
          return callback(new Error("昵称不能为电话号码"));
        }
      }
    };
    return {
      dialogTableVisible: false,
      avatar: "",
      imageUrl: [],
      areaArr: JSON.parse(JSON.stringify(area)),
      cityList: [],
      districtList: [],
      Token: "",
      headers: {},
      img: "",
      file: "",
      fileData: "",
      addG: [],
      flag: false,
      flagiv: false,
      isLoading: false,
      userp: "",
      prosDatas: {
        value: "id",
        label: "name",
        children: "child"
      },
      ruleForm: {
        real_name: "",
        selectArea: [],
        year: "",
        month: "",
        date: "",
        birthday: "",
        province: "",
        city: "",
        district: "",
        address: "",
        sex: "U",
        upinfoData: "",
        fileDat: "",
        nmber: ""
      },
      changPor: false,
      changCit: false,
      changDis: false,
      rules: {
        real_name: [
          { validator: checkName, trigger: ["blue", "change"] },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: ["blue", "change"]
          }
        ],
        year: [
          {
            required: true,
            message: "请选择日期",
            trigger: ["blue", "change"]
          }
        ],
        month: [
          {
            required: true,
            message: "请选择日期",
            trigger: ["blue", "change"]
          }
        ],
        date: [
          {
            required: true,
            message: "请选择日期",
            trigger: ["blue", "change"]
          }
        ],

        sex: [
          { required: true, message: "请选择性别", trigger: ["blue", "change"] }
        ],
        address: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: ["blue", "change"]
          }
        ]
      }
    };
  },

  computed: {
    ...mapState({
      envVars: "envVariables",
      storeInfo: "storeInfo",
      userInfo: "userInfo"
    })
  },
  created() {},
  mounted() {
    this.init();
    for (var i = 0; i < this.areaArr.length; i++) {
      if (this.areaArr[i].name === "全国") {
        this.areaArr.splice(i, 1);
      }
    }
    let original= this.userInfo&&this.userInfo.original;
    if(!original) return;
    if (original&&original.province) {
      this.cityList = this.areaArr
        .filter(item => original.province == item.id)
        .map(item => item.child)[0];
      this.districtList = this.cityList
        .filter(item =>original.city == item.id)
        .map(item => item.child);
      this.districtList = this.districtList[0];
    }
  },
  methods: {
    ...mapMutations(["CHANGE_USER_INFO"]),
    init() {
      this.Token = localStorage.getItem("access_token");
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
     if(!this.userInfo) return this.$loginp(0, () => {
      });
      if (
        this.userInfo.original.birthday != "" &&
         this.userInfo.original.birthday != null
      ) {
        var birthday = this.userInfo.original.birthday;
        birthday = birthday.trim().split(" ")[0];
        var birth = birthday.trim().split("-");
        this.ruleForm.year = birth[0];
        this.ruleForm.month = Number(birth[1]);
        this.ruleForm.date = Number(birth[2]);
      }
      this.ruleForm.address =  this.userInfo.original.address;
      this.ruleForm.province =  this.userInfo.original.province;
      this.ruleForm.city =  this.userInfo.original.city;
      this.ruleForm.district =  this.userInfo.original.district;
      if (
        this.ruleForm.province != "" &&
        this.ruleForm.city != "" &&
        this.ruleForm.district != ""
      ) {
        this.addG.push(
          this.ruleForm.province,
          this.ruleForm.city,
          this.ruleForm.district
        );
        this.ruleForm.selectArea = this.addG;
      }
      if (this.userInfo&&this.userInfo.original.sex != "") {
        this.ruleForm.sex = this.userInfo.original.sex;
      }
      this.userp =  this.userInfo.original.mobile;
      this.ruleForm.real_name =  this.userInfo.original.nick_name;
      this.avatar =  this.userInfo.original.avatar;
      this.headers = { Authorization: "Bearer " + getCookie("access_token") };

      for (var i = 0; i < this.areaArr.length; i++) {
        var a = this.areaArr[i].child;
        if (a != undefined) {
          for (var j = 0; j < a.length; j++) {
            if (this.ruleForm.city != 0) {
              if (a[j].id == this.ruleForm.city) {
                this.ruleForm.city = a[j].name;
              }
            } else {
              this.ruleForm.city = "";
            }
            if (this.ruleForm.province != 0) {
              if (this.areaArr[i].id == this.ruleForm.province) {
                this.ruleForm.province = this.areaArr[i].name;
              }
            } else {
              this.ruleForm.province = "";
            }
            var b = a[j].child;
            if (b != undefined && b.length > 0) {
              for (var k = 0; k < b.length; k++) {
                if (b[k] != undefined) {
                  if (this.ruleForm.district != 0) {
                    if (b[k].id == this.ruleForm.district) {
                      this.ruleForm.district = b[k].name;
                    }
                  } else {
                    this.ruleForm.district = "";
                  }
                }
              }
            }
          }
        
      }
      }
    },
    changeProvince(value) {
      if (value === "") {
        this.cityList = [];
        this.ruleForm.city = "";
        return;
      }

      this.ruleForm.city = "";
      this.ruleForm.district = "";
      this.districtList = [];
      this.changPor = true;
      this.cityList = this.areaArr
        .filter(item => value === item.id)
        .map(item => item.child)[0];
    },
    changeDistrict(value) {
      if (value === "") {
        this.districtList = [];
        this.ruleForm.district = "";
        return;
      }
      this.districtList = [];
      this.ruleForm.district = "";
      this.districtList = this.cityList
        .filter(item => value === item.id)
        .map(item => item.child);
      this.districtList = this.districtList[0];
      if (this.changPor == false) {
        this.changCit = true;
      }
    },
    // 地址判断
    disChange() {
      if (
        this.ruleForm.district != "" &&
        this.ruleForm.city != "" &&
        this.ruleForm.province != ""
      ) {
        this.flagiv = false;
      } else {
        this.flagiv = true;
      }
      if (this.changCit != true) {
        this.changDis = true;
      }

    },
    cancelUpload() {
      this.$refs.upload.clearFiles();
      this.dialogTableVisible = false;
    },
    submitForm(formName) {
      if (this.isLoading) {
        return;
      }
      if (
        this.ruleForm.province == "" ||
        this.ruleForm.city == "" ||
        this.ruleForm.district == ""
      ) {
        this.flagiv = true;
        return;
      } else {
        this.flagiv = false;
      }
      if (
        this.ruleForm.year == "" ||
        this.ruleForm.month == "" ||
        this.ruleForm.date == ""
      ) {
        this.flag = true;
      } else {
        this.flag = false;
      }
      if (this.flag == true) {
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          var yea = this.ruleForm.year;
          var mon = this.ruleForm.month;
          var dat = this.ruleForm.date;
          this.ruleForm.birthday = yea + "-" + mon + "-" + dat;
          this.ruleForm.fileDat = this.fileData;
          var reg = /^([\u4E00-\u9FA5])*$/;
          // if (!reg.test(name))
          var provi = "";
          var cit = "";
          var distr = "";

          if (reg.test(this.ruleForm.province)) {
            provi = this.addG[0];
          }
          if (reg.test(this.ruleForm.city)) {
            cit = this.addG[1];
          }
          if (reg.test(this.ruleForm.district)) {
            distr = this.addG[2];
          }
          if (this.ruleForm.real_name == this.userInfo.original.nick_name) {
            if (provi != "" && cit != "" && distr != "") {
              var data = {
                province: provi,
                city: cit,
                district: distr,
                address: this.ruleForm.address,
                sex: this.ruleForm.sex,
                birthday: this.ruleForm.birthday,
                avatar: this.avatar
              };
            } else {
              var por = this.ruleForm.province;
              var ciy = this.ruleForm.city;
              if (this.changCit == true) {
                por = provi;
              }
              if (this.changDis == true) {
                por = provi;
                ciy = cit;
              }
              var data = {
                province: por || this.ruleForm.province,
                city: ciy|| this.ruleForm.city,
                district: this.ruleForm.district,
                address: this.ruleForm.address,
                sex: this.ruleForm.sex,
                birthday: this.ruleForm.birthday,
                avatar: this.avatar
              };
            }
          } else {
            if (provi != "" && cit != "" && distr != "") {
              var data = {
                province: provi,
                city: cit,
                district: distr,
                nick_name: this.ruleForm.real_name,
                address: this.ruleForm.address,
                sex: this.ruleForm.sex,
                birthday: this.ruleForm.birthday,
                avatar: this.avatar
              };
            } else {
              var por = this.ruleForm.province;
              var ciy = this.ruleForm.city;
              if (this.changCit == true) {
                por = provi;
              }
              if (this.changDis == true) {
                por = provi;
                ciy = cit;
              }
              var data = {
                province: por|| this.ruleForm.province,
                city: ciy|| this.ruleForm.city,
                district: this.ruleForm.district,
                nick_name: this.ruleForm.real_name,
                address: this.ruleForm.address,
                sex: this.ruleForm.sex,
                birthday: this.ruleForm.birthday,
                avatar: this.avatar
              };
            }
          }
          this.isLoading = true;

          upInfodataData(data)
            .then(res => {
              let { code, message, data } = res.data;
              if (code === 200) {
                getUserInfo(data.access_token)
                  .then(rsp => {
                    let { code, data, message } = rsp.data;
                    if (code === 200) {
                      this.CHANGE_USER_INFO(data);
                      this.$message.success("修改成功");
                    } else {
                      this.$message.error(message);
                    }
                  })
                  .catch(err => {});
              } else {
                this.$message.error(message);
              }
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => (this.isLoading = false));
        } else {
          return false;
        }
      });
    },
    // 生日判断
    dataChange() {
      if (
        this.ruleForm.year != "" &&
        this.ruleForm.month != "" &&
        this.ruleForm.date != ""
      ) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    monthChange() {
      this.ruleForm.date = "";
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //图片格式
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
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 5MB!");
        return false;
      }
      return isJPG || isBMP || isGIF || isPNG || isLt2M;
    },
    handleChange(file, fileList) {
      this.imageUrl = fileList.slice(-1);
      var imageUrl = { ...this.imageUrl };
      this.img = imageUrl[0];
      this.upinfoData = imageUrl[0];
    },
    async avant_upload_succ(response, file, fileList) {
      let { code, message, data } = response;

      if (code == 200) {
        let access_token = getCookie("access_token");
        let res = await getUserInfo(access_token);
        if (res.data.code == 200) {
          this.CHANGE_USER_INFO(res.data.data);
          window.location.reload();
        }
      }
    },
    submitUpload() {
      if (this.imageUrl.length) {
        // 更换了图片才执行提交
        this.$refs.upload.submit();
      } else {
        this.dialogTableVisible = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "myDataScode.less";

/deep/ .el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-textarea__inner {
  border-color: #dcdfe6;
}

/deep/ .el-form-item.is-success .el-textarea__inner {
  border-color: #dcdfe6;
}

/deep/ .el-form-item.is-success .el-input__inner:focus {
  border: 1px solid #5da6ff;
  outline: 0;
  box-shadow: 0px 0px 4px #5da6ff;
}

/deep/ .myOrder_form .el-form-item.is-error .el-textarea__inner:focus {
  border: 1px solid #5da6ff;
  outline: 0;
  box-shadow: 0px 0px 4px #5da6ff;
}

/deep/ .el-form-item.is-success .el-textarea__inner:focus {
  border: 1px solid #5da6ff;
  outline: 0;
  box-shadow: 0px 0px 4px #5da6ff;
}
</style>
<style lang="less">
@import "myData.less";
</style>
<style lang="less" scoped>
@import "../index.less";
</style>
