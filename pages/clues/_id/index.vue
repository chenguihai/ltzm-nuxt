<template>
  <div class="detail" v-if="cluesDataList">
    <comHeader />
    <div class="main">
      <p class="address-text">首页>线索详情</p>
      <div class="content">
        <!-- 左边-->
        <div class="leftF">
          <div v-if="role==1">
            <admin-content
              :cluesDataList="cluesDataList"
              :messages="messages"
              v-if="messages!= ''"
            />
            <!-- 线索推荐 -->
            <div class="item-box-5" v-if="messages!= ''">
              <h3>线索推荐</h3>
              <div v-if="otherClue && otherClue.clueTen.length >0">
                <a
                  class="item-box-a"
                  v-for="(item , index) in otherClue.clueTen"
                  :key="index"
                  :href="`/clues/${item.id}`"
                  target="_blank"
                >
                  <div class="leftClue">
                    <div>
                      <h4>¥ {{item.budget_money}}</h4>
                      <strong>
                        <p>{{item.title}}</p>
                      </strong>
                      <i class="services" v-if="item.go !=null && item.go !='N'">急</i>
                      <i class="services" v-if="item.top !=null && item.top !='N'">顶</i>
                    </div>
                    <p>
                      <span>
                        客户领域:
                        <span class="font-cl">{{item.sr_name}}</span>
                      </span>
                      <span>
                        投放时间：
                        <i class="font-cl">{{item.clue_start_time}}</i>
                        <span style="margin-right: 6px;">至</span>
                        <i class="font-cl">{{item.clue_end_time}}</i>
                      </span>
                    </p>
                    <p>
                      <span>{{item.number}}</span>人浏览 /
                      <em>{{item.pay_number}}人</em>已购买线索
                    </p>
                  </div>
                  <div class="rightClue">
                    <strong>信息模式</strong>
                    <p v-if="item.clue_status =='Y'">
                      <span v-if="item.D || item.H ">
                        <em class="emclass">{{item.D}}</em>天
                        <em class="emclass">{{item.H}}</em>小时截止购买线索
                      </span>
                      <i v-else>
                        <em>已截止购买</em>
                      </i>
                    </p>
                    <p v-else>
                      <em>已截止购买</em>
                    </p>
                    <p>发布时间：{{item.created_at}}</p>
                  </div>
                </a>
              </div>
              <div class="tbodyNone" v-else>
                <img class="noneImg" src="@/assets/img/pintouge.png" alt />
                <p>暂无数据</p>
              </div>
            </div>
          </div>
          <div v-else>
            <default-content />
          </div>
        </div>
        <!--侧边-->
        <div class="side">
          <div v-if="role==1">
            <div>
              <div class="search">
                <p>
                  <img src="@/assets/img/icon/llrs.png" alt="浏览人数" />
                  <span>浏览人数：</span>
                  <strong style="color:#f3262d;" v-if="clueInfo.number">{{clueInfo.number}}人</strong>
                </p>
                <p>
                  <img src="@/assets/img/icon/gmrs.png" alt="购买人数" />
                  <span>购买人数：</span>
                  <strong style="color:#f3262d;">{{clueInfo.pay_number}}人</strong>
                </p>
                <hr v-if="clueInfo.status=='S' && clueInfo.clue_status != 'N'" />
                <a
                  href="javascript:;"
                  v-if="messages=='LoginBossOk' && clueInfo.status=='S' && clueInfo.clue_status=='Y'"
                >
                  <button @click="replenishClick">线索补充</button>
                </a>
                <a v-else-if="messages !='LoginBossOk'" class="releaseAbout" @click="fbClue()">
                  <button style="cursor: pointer;">发布类似线索</button>
                </a>
                <div
                  class="buttons"
                  v-if="messages=='LoginBossOk' && clueInfo.status!='Y'&& clueInfo.clue_status!='N'"
                >
                  <button @click="buyClick" style="cursor: pointer;">置顶</button>
                  <button @click="buyClick" style="cursor: pointer;">加急</button>
                  <button
                    v-if="clueInfo.service=='N'"
                    @click="buyClick"
                    style="cursor: pointer;"
                  >客服包办</button>
                  <button
                    v-if="clueInfo.city_id=='0'"
                    @click="buyClick"
                    style="cursor: pointer;"
                  >地域选择</button>
                  <button
                    v-if="clueInfo.grade=='0'"
                    @click="buyClick"
                    style="cursor: pointer;"
                  >服务商等级</button>
                  <button @click="closeClue" style="cursor: pointer;">关闭线索</button>
                </div>
                <hr />
                <share :config="config" v-if="config && clueInfo.status!='Y'&& clueInfo.clue_status!='N'" />
              </div>
              <div class="other">
                <h4>
                  <span>该雇主的其他线索</span>
                </h4>
                <div class="list" v-if="otherClue&& otherClue.bossClueTen.length>0">
                  <nuxt-link
                    class="item"
                    style="padding-bottom:12px"
                    v-for="(item , index) in otherClue.bossClueTen"
                    :key="index"
                    :to="'/clues/'+item.id"
                    target="_blank"
                  >
                    <p style="color:#F3262D">￥{{item.budget_money}}</p>
                    <div class="inner-item">
                      <span class="inner-item-title">{{item.title}}</span>
                      <span>{{item.pay_number}}人购买</span>
                    </div>
                  </nuxt-link>
                </div>
                <div class="noData" v-else>「暂无数据」</div>
              </div>
            </div>
          </div>
          <div v-else>
            <default-side />
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <!-- 购买线索 -->
    <div class="box" v-if="flageBox">
      <div class="buyClue" v-if="flagB">
        <div class="buyClue_head">
          请选择需要的服务
          <span @click="deleClick" class="iconfont icon-guanbi"></span>
        </div>
        <div class="buyClue_cont">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox
              v-for="(item , key) in clueListflit"
              :label="item"
              :key="key"
              :class="{'aaa':item.id == 4 || item.id == 6}"
            >
              <span>{{item.inc_name}}</span>
              <span
                v-bind:title="item.description"
                class="description"
                style="color:#999999;"
              >{{item.description}}</span>
              <span style="color:#ff0027!important">￥{{item.price}}</span>
            </el-checkbox>
            <el-row v-if="flageCha" class="selectAreaClue" :gutter="20">
              <el-col :span="20">
                <el-cascader
                  :props="prosDatas"
                  placeholder="请选择地址"
                  class="prosDatas"
                  :options="area"
                  v-model="selectArea"
                  popper-class="addArea"
                  clearable
                  @change="selectHandleChange"
                ></el-cascader>
              </el-col>
            </el-row>
            <el-select
              v-if="flageLea"
              class="selectAreaClue gradeLevel"
              popper-class="gradeL"
              v-model="gradeLevel"
              @change="choiceLevel"
              placeholder="请选择"
            >
              <el-option
                v-for="item in levelData"
                :key="item.id"
                :label="item.bl_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-checkbox-group>
          <div style="margin: 15px 0;"></div>
        </div>
        <div class="checkbox">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            class
          >全选</el-checkbox>
          <div class="buttOder">
            <span>
              <p>合计：</p>
              ￥{{total}}
            </span>
            <button @click="servicesnClick" class="buttZf">立即支付</button>
          </div>
        </div>
        <div class="attention">
          <h4>注意事项：</h4>
          <span>（1）置顶／加急生效后不能退款。</span>
          <span>（2）购买完成后置顶未生效，请及时拨打客服电话400-688-6662，联系客服人员处理。</span>
        </div>
      </div>
      <!-- 线索补充 -->
      <div class="replenish" v-if="flagR">
        <div class="replenish_head">
          补充内容
          <span @click="deleClick" class="iconfont icon-guanbi"></span>
        </div>
        <div class="replenish_con">
          <span>温馨提示：补充需求使凌客更加理解您的需求，请尽量仔细填写</span>
          <div class="replenish_text">
            <el-input
              type="textarea"
              resize="none"
              :rows="8"
              @blur="textBlur"
              placeholder="请输入需要补充的内容"
              v-model="textarea"
            ></el-input>
          </div>
          <span class="textareaErr" v-if="textFlag">{{textareaErr}}</span>
        </div>
        <div class="buttonClick">
          <button @click="saveClick">保存</button>
          <button @click="cancelClick">取消</button>
        </div>
      </div>
      <!-- 关闭线索 -->
      <div class="closeClue" v-if="flagC">
        <div class="closeClue_head">
          关闭线索
          <span @click="deleClick" class="iconfont icon-guanbi"></span>
        </div>
        <div class="closeClue_cont">
          <span>
            关闭线索，请联系
            <a href="https://url.cn/59IhwSe?_type=wpa&qidian=true" target="_blank">
              <p>官方客服</p>
            </a>
          </span>
        </div>
        <div class="buttonCloseClick">
          <button @click="deleClick">确定</button>
        </div>
      </div>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>

<script>
import ComHeader from "~/components/component/comHeader";
import DefaultSide from "~/components/clues/detail/default-side";
import AdminContent from "~/components/clues/detail/admin";
import comFooter from "@/components/component/comFooter";
import { clueAppend, servicesn, homeimage } from "@/api/list";
import { _checkStringVal } from "~/utils/tool";
import area from "@/assets/js/area";
import { clueShopShow } from "@/api/async-server";
import sideBar from "@/components/sideBar";
import share from "@/components/component/share";
import dataEventTrack from "@/utils/dataEventTrack";
import { mapState } from "vuex";

export default {
  components: {
    ComHeader,
    DefaultSide,
    AdminContent,
    comFooter,
    share,
    sideBar
  },
  head() {
    if (this.cluesDataList) {
      return {
        title: `广告线索 - ${this.cluesDataList.clueInfo.title ||
          ""} - 凌天众媒网`,
        meta: [
          {
            hid: "description",
            name: "description",
            content: `想投放广告就上凌天众媒网（zhongmei66.com），求购${this.cluesDataList.otherClue.className}广告线索，求购${this.keywords}广告线索`
          },
          {
            hid: "keywords",
            name: "keywords",
            content: `${this.cluesDataList.clueInfo.title}，求购${this.cluesDataList.otherClue.className}广告线索，求购${this.keywords}广告线索，凌天众媒网广告需求发布`
          }
        ]
      };
    }
  },
  provide() {
    return {
      cluesDataList: this.cluesDataList,
      cluesData: this.cluesData,
      clueInfo: this.clueInfo,
      otherClue: this.otherClue,
      service: this.service,
      messages: this.messages,
      clueList: this.clueList,
      levelData: this.levelData
    };
  },
  data() {
    return {
      role: 1,
      cluesDataList: "",
      messages: "",
      clueInfo: "",
      cluesData: "",
      otherClue: "",
      messages: "",
      textarea: "",
      service: [],
      flageBox: false,
      flagR: false,
      flagB: false,
      flagC: false,
      checkAll: false,
      checkedCities: [],
      clueList: [],
      clueListflit: [],
      isIndeterminate: true,
      selectArea: [], //地区选择
      area: JSON.parse(JSON.stringify(area)),
      prosDatas: {
        value: "id",
        label: "name",
        children: "child"
      },
      province: "",
      city: "",
      district: "",
      gradeLevel: "",
      levelData: "",
      id: this.$route.params.id,
      D: 0,
      H: 0,
      M: 0,
      S: 0,
      textareaErr: "内容不能为空",
      textFlag: false,
      flageCha: false,
      flageLea: false,
      itemG: "",
      regionId: "",
      clueData: [],
      keywords: "",
      config: "",
      ad_img: ""
    };
  },
  async asyncData(app) {
    const errCon = { statusCode: 500, message: "线索加载失败,请重试" };
    const dataRes = await clueShopShow(app, app.params.id, app.query.sign);
    console.log(dataRes.data)
    if (dataRes.data.code != 200) return;
    if (!dataRes.data.data) return;
    if (!dataRes.data) return errCon;
    const data = dataRes ? dataRes.data : "";

    let sorts = data.data.last.sort;
    let keywords = "";
    if (sorts) {
      for (var i = 0; i < sorts.length; i++) {
        if (i < 3) {
          keywords += sorts[0].cate_name + "、";
        }
      }
    }
    //获取当前时间
    for (var i = 0; i < data.data.otherClue.clueTen.length; i++) {
      var now = new Date(); //本地时间
      //设置截止时间
      var end = new Date(Date.parse(data.data.otherClue.clueTen[i].end_time)); //结束时间
      //时间差
      var nMS = parseInt((end.getTime() - now.getTime()) / 1000);
      //定义变量 d,h,m,s保存倒计时的时间
      if (nMS >= 0) {
        var D = parseInt(nMS / (24 * 60 * 60));
        var H = parseInt((nMS / (60 * 60)) % 24);
        var M = parseInt((nMS / 60) % 60);
        var S = parseInt(nMS % 60);
        data.data.otherClue.clueTen[i] = {
          ...data.data.otherClue.clueTen[i],
          D: D,
          H: H
        };
      } else {
      }
    }
    return {
      cluesDataList: data.data,
      cluesData: data.data,
      clueInfo: data.data.clueInfo,
      messages: data.message,
      otherClue: data.data.otherClue,
      service: data.data.clueInfo.service,
      clueList: data.data.clueInfo.service,
      levelData: data.data.level,
      keywords
    };
  },
  created() {
    if (this.cluesDataList == "") {
      this.$router.push({
        path: "/closeData/closeData",
        query: { type: 4 }
      });
    }
  },
  mounted() {
    for (var i = 0; i < this.area.length; i++) {
      if (this.area[i] && this.area[i].name === "全国") {
        this.area.splice(i, 1);
      }
      if (this.area[i].child) {
        var a = this.area[i].child;
        for (var j = 0; j < a.length; j++) {
          a[j].child = "";
        }
      }
    }
    var type = "27";
    homeimage(type)
      .then(res => {
        if (res.data.code == 200) {
          this.ad_img = res.data.data.ad_img;
          this.config = {
            url: location.href,
            title: `${this.clueInfo.title}`,
            description: `我在凌天众媒网发现一条不错的广告投放需求，赶快来看看`,
            image: this.envVars.IMG_HOST + this.ad_img,
            summary: `我在凌天众媒网发现一条不错的广告投放需求，赶快来看看`
          };
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    init(app) {
      var id = this.id;
    },
    // 切换线索ID
    cluesTitle(item, id) {
      this.id = item.id;
      this.$router.push({
        path: "/clues/" + this.id
      });
      window.location.reload();
    },
    // 关闭弹窗
    deleClick() {
      this.flagR = false;
      this.flagB = false;
      this.flagC = false;
      this.flageBox = false;
    },
    fbClue() {
      this.clueData = [];
      this.clueData.push(
        { content: this.clueInfo.content },
        { title: this.clueInfo.title }
      );
      window.localStorage.setItem("clueData", JSON.stringify(this.clueData));
      var { href } = this.$router.resolve({ path: "/clues/release" });
      window.open(href, "_blank");
    },
    // 线索补充
    replenishClick() {
      this.flagB = false;
      this.flagC = false;
      this.flagR = true;
      this.flageBox = true;
    },
    // 确认补充
    saveClick() {
      var re = /^.{10,500}$/;
      if (this.textarea == "") {
        this.textareaErr = "内容不能为空";
        this.textFlag = true;
        return;
      }
      if (!re.test(this.textarea)) {
        this.textareaErr = "请输入10-500字补充内容";
        this.textFlag = true;
        return;
      }
      this.textFlag = false;
      var data = {
        clueId: this.clueInfo.id,
        append: this.textarea
      };
      clueAppend(data)
        .then(res => {
          if (res.data.code == 200) {
            this.flagR = false;
            this.flageBox = false;
            this.textarea = "";
            this.$message.success("线索补充成功");
            this.init();
            window.location.reload();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消补充
    cancelClick() {
      this.textarea = "";
      this.flagR = false;
      this.flageBox = false;
    },
    //多选
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.clueListflit : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.clueListflit.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.clueListflit.length;
    },

    // 去除相同的增值服务
    filtservices() {
      if (this.clueList) {
        var a = [];
        for (var i = 0; i < this.clueList.length; i++) {
          if (this.clueInfo.city_id == 0) {
            this.flageCha = true;
            if (this.clueList[i].id == 4) {
              a.push(this.clueList[i]);
            }
          } else {
            this.flageCha = false;
          }

          if (this.clueList[i].id == 2) {
            a.push(this.clueList[i]);
          }

          if (this.clueInfo.service == "N") {
            if (this.clueList[i].id == 5) {
              a.push(this.clueList[i]);
            }
          }
          if (this.clueInfo.grade == 0) {
            this.flageLea = true;
            if (this.clueList[i].id == 6) {
              a.push(this.clueList[i]);
            }
          } else {
            this.flageLea = false;
          }
          if (this.clueList[i].id == 3) {
            a.push(this.clueList[i]);
          }
        }
        this.clueListflit = a;
      }
    },
    choiceLevel(item) {
      let idx = this.checkedCities.findIndex(res => {
        return res.id == 6;
      });
      this.itemG = item;
      for (var i = 0; i < this.checkedCities.length; i++) {
        if (this.checkedCities[i].id == 6) {
          this.checkedCities[i].grade = item;
        }
      }
    },
    //地区搜索
    async selectHandleChange(items) {
      this.province = items[0] ? items[0] : "";
      this.city = items[1] ? items[1] : "";
      this.regionId = items;
      for (var i = 0; i < this.checkedCities.length; i++) {
        if (this.checkedCities[i].id == 4) {
          this.checkedCities[i].city_id = this.regionId[1];
        }
      }
    },
    // 请选择需要的服务
    buyClick() {
      this.flagR = false;
      this.flagC = false;
      this.flagB = true;
      this.flageBox = true;

      this.service = this.cluesData.service;
      this.clueList = this.service;
      for (var i = 0; i < this.service.length; i++) {
        if (this.service[i].id == 4) {
          this.flageCha = true;
        }
        if (this.service[i].id == 6) {
          this.flageLea = true;
        }
      }
      this.filtservices();
    },
    closeClue() {
      this.flagB = false;
      this.flagR = false;
      this.flagC = true;
      this.flageBox = true;
    },
    // 增值服务下单
    servicesnClick() {
      let idC = this.checkedCities.findIndex(res => {
        return res.id == 4;
      });
      if (idC > -1) {
        if (this.regionId == "") {
          this.$message.error("请选择地域");
          return;
        }
        for (var i = 0; i < this.checkedCities.length; i++) {
          if (this.checkedCities[i].id == 4) {
            this.checkedCities[i].city_id = this.regionId[1];
          }
        }
        if (!this.checkedCities[idC].city_id) {
          this.$message.error("请选择地域");
          return;
        }
      }
      let idx = this.checkedCities.findIndex(res => {
        return res.id == 6;
      });
      if (idx > -1) {
        if (this.itemG == "") {
          this.$message.error("请选择服务商等级");
          return;
        }
        for (var i = 0; i < this.checkedCities.length; i++) {
          if (this.checkedCities[i].id == 6) {
            this.checkedCities[i].grade = this.itemG;
          }
        }
        if (!this.checkedCities[idx].grade) {
          this.$message.error("请选择服务商等级");
          return;
        }
      }
      if (this.checkedCities != undefined && this.checkedCities.length > 0) {
      } else {
        this.$message.error("请选择服务");
      }
      this.buyClue();
    },
    buyClue() {
      var data = { inc: this.checkedCities, clueid: this.clueInfo.id };
      servicesn(data)
        .then(res => {
          if (res.data.code == 200) {
            var order_sn = res.data.data;
            this.$router.push("/payment?order_sn=" + order_sn + "&type=2");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
      const {
        path = "",
        params: { id = "" }
      } = this.$route;
      let incId = this.checkedCities.map(item => item.id).toString();
      let incPrice = this.checkedCities.map(item => item.price).toString();
      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: path,
          rname: "立即支付",
          clues_id: id,
          inc_service_id: incId, //	购买多个增值服务用逗号分隔
          inc_service_price: incPrice //	购买多个增值服务用逗号分隔，价格和id顺序一一对应
        }
      });
    },
    //线索补充正则
    textBlur() {
      var re = /^.{10,500}$/;
      if (this.textarea == "") {
        this.textareaErr = "内容不能为空";
        this.textFlag = true;
      } else if (!re.test(this.textarea)) {
        this.textareaErr = "请输入10-500字补充内容";
        this.textFlag = true;
      } else {
        this.textFlag = false;
      }
    }
  },
  computed: {
    ...mapState({ envVars: "envVariables" }),
    total() {
      let total = 0;
      this.checkedCities.map(item => {
        total += item.price - 0;
      });
      total = total.toFixed(2);
      return total;
    }
  }
};
</script>
<style scoped lang="less">
@import "admin-sideScode.less";
</style>
<style lang="less">
.addArea {
  & > .el-cascader-panel {
    height: 250px;
    overflow: hidden;
  }
}
.buyClue {
  .is-indeterminate {
    .el-checkbox__inner {
      background-color: unset !important;
      border-color: unset !important;
    }
  }
}
.leftClue:focus {
  border: 0;
}
</style>
<style scoped lang="less">
.detail {
  background: #f4f6f8;
  .font-cl {
    color: #666666;
  }
  .main {
    width: 1210px;
    margin: 0 auto 50px;
    background: #f4f6f8;
    .address-text {
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      display: block;
      height: 31px;
      line-height: 31px;
    }
    .content {
      display: flex;
      .leftF {
        flex: 1;
      }
      .side {
        width: 260px;
        margin-left: 20px;
      }
    }
  }
}
.buyClue_cont {
  .el-checkbox-group {
    display: flex;
    flex-direction: column;
    padding: 20px 0 20px 33px;
    .el-checkbox {
      margin-bottom: 23px;
      .el-checkbox__input {
        margin-top: 8px;
      }
      .el-checkbox__label {
        display: flex;
        align-items: center;
        height: 23px;
        span:nth-child(1) {
          margin-top: 1px;
        }
        span {
          display: inline-block;
          min-width: 90px;
          margin-right: 35px;
        }
        .description {
          width: 289px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .aaa {
      height: 60px;
      align-items: flex-start;
    }
  }
}

.checkbox {
  width: 685px;
  margin-top: 23px;
  padding: 0 33px;
  display: flex;
  justify-content: space-between;
  .buttOder {
    display: flex;
    flex-direction: column;

    span {
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #ff0027;
      p {
        font-size: 14px;
        color: #666;
      }
    }
    .buttZf {
      width: 115px;
      height: 40px;
      text-align: center;
      height: 40px;
      border: 0;
      font-size: 16px;
      background: #f3262d;
      color: #fff;
      cursor: pointer;
      margin-top: 20px;
    }
    .buttZf:hover {
      background: #f43c42;
    }
    .buttZf:focus {
      border: 0;
    }
  }
}
.replenish_con {
  position: relative;
  .replenish_text {
    display: flex;
    justify-content: center;
    .el-textarea {
      display: flex;
      justify-content: center;
      width: 92%;

      .el-textarea__inner {
        width: 90%;
        border-radius: 0;
      }
      .el-textarea__inner:focus {
        border-color: none !important;
      }
    }
  }
  & > .textareaErr {
    margin: 0 !important;
    position: absolute;
    height: 18px;
    display: flex;
    align-items: center;
    bottom: -22px;
    left: 17px;
    line-height: 18px !important;
    padding-left: 23px;
    color: #f3262d !important;
    background: url(/assets/img/icon-error.png) no-repeat;
  }
}
.selectAreaClue {
  position: absolute !important;
  left: 186px;
  width: 200px;
  .el-col-20 {
    width: 110%;
    .prosDatas {
      margin-right: 0 !important;
    }
  }
  .el-input__suffix {
    width: 20px !important;
    height: 100% !important;
    margin-right: 8px !important;
    .el-input__suffix-inner {
      width: 20px !important;
      height: 100% !important;
      margin-right: 0px !important;
    }
  }
}
.el-row {
  top: 138px;
}
.gradeLevel {
  bottom: 40px;
  .el-input--suffix {
    width: 60%;
  }
}
.gradeL {
  min-width: 130px !important;
}
.attention {
  width: 685px;
  margin-top: 10px;
  padding: 0 33px;
  & > h4,
  & > span {
    font-size: 12px;
    color: #999;
    display: block;
  }
  & > :nth-child(2) {
    margin: 5px 0;
  }
}
.item-box-5 {
  padding: 20px;
  border: 1px solid #e9e9e9;
  background: #fff;
  margin-top: 20px;

  h3 {
    font-size: 18px;
    color: #333333;
    line-height: 28px;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 10px;
    padding-bottom: 5px;
  }

  & > div {
    .item-box-a {
      border-bottom: 1px solid #e8e8e8;
      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      .leftClue,
      .rightClue {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .leftClue {
        outline: none;
        & > :nth-child(1):hover {
          & > strong {
            & > p {
              color: #f3262d;
            }
          }
        }
        & > :nth-child(2) {
          & > span {
            margin-right: 5px;
          }
        }
        span,
        i {
          vertical-align: text-top;
        }
      }
      .rightClue {
        flex: 3;
        outline: none;
        strong {
          font-size: 14px;
          color: #333;
        }

        p {
          color: #999999;

          em {
            color: #999;
          }
          .emclass {
            color: #f3262d;
          }
        }

        p:nth-child(3) {
          width: 150px;
          height: 17px;
          overflow: hidden;
        }
      }

      .leftClue {
        flex: 5;

        div {
          display: flex;

          h4 {
            color: #f02a35;
            font-size: 14px;
          }

          strong {
            color: #3881ec;
            font-size: 14px;
            margin-left: 1em;
            &>p {
              color: #3881ec;
            }
          }

          .services {
            font-size: 12px;
            height: 20px;
            width: 20px;
            display: inline-block;
            background: #f3262d;
            color: #fff;
            text-align: center;
            line-height: 20px;
          }
        }

        p {
          color: #999999;

          span {
            i {
              display: inline-block;
              width: 75px;
              height: 15px;
              overflow: hidden;
            }
          }

          em {
            color: #f02a35;
          }
        }

        p:nth-child(2) {
          padding-top: 16px;
          padding-bottom: 14px;
        }
      }
    }

    .item-box-a:nth-last-child(1) {
      border: none;
    }
  }
  .tbodyNone {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;

    .noneImg {
      width: 90px;
      height: 115px;
    }

    & > p {
      color: #666;
      margin-left: 10px;
    }
  }
}
</style>
