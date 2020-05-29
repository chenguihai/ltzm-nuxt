<template>
  <div class="contranct-detail">
    <div class="box">
      <div class="close" @click="close">
        <span class="iconfont icon-guanbi"></span>
      </div>
      <div class="sm" v-if="status==2">
        <div class="is_working">合同状态：{{isWorking ? '已生效' : '未生效'}}</div>
        <div
          class="m-tips-top"
        >以下合同内容由服务商提供，请仔细阅读合同内容，交易过程中如双方发生争议，合同将作为官方仲裁的重要依据 若您对合同有疑问或异议，请及时联系服务商修改</div>
      </div>
      <h3 class="title">网络服务交易合同</h3>
      <div class="sm">
        <strong>合同说明：</strong>
        <p>
          以下合同内容由双方沟通商议后在线发起并签订，请仔细阅读合同内容，任何一方点击接受本合同，即意味着其已
          阅读本合同所有条款，并对本合同条款的含义及相应的法律后果已全部知晓并充分认可，交易过程中如双方发生争议，合同将 作为官方仲裁的重要依据。
          本合同由《专用条款》、《通用条款》组成，其效力按照由高到低排列，条款冲突时，以效力较高者优先适用。
        </p>
        <p style="text-align: center;font-size: 18px;color: #333;font-weight: bold;">《专用条款》</p>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-gongqi"></i>工期
      </h4>
      <div class="zytk zytk-1">
        <p class="txt">该需求完成时间为：</p>
        <div>
          <div v-if="status == 2" class="txt-item">
            {{startDate}} 到 {{endDate}} 共计
            <span>{{day}}</span> 天
          </div>
          <div class="block" v-if="status==1">
            <el-date-picker
              v-model="value2"
              @change="changeTime"
              type="daterange"
              align="right"
              unlink-panels
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <span class="count">共计:</span>
            {{contractForm.day_count || '-'}}
            <span>天</span>
          </div>
        </div>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-gongqi"></i>项目阶段与支付方式-无定金
      </h4>
      <div class="zytk zytk-2">
        <p class="txt">
          需求金额：
          <span class="money-font">{{contractForm.ProjectPhasePrice}}元</span>
        </p>
        <div>
          <div v-show="false" class="txt-item"></div>
          <div class="head-box">
            <el-form ref="form" :model="contractForm" :rules="rules">
              <div class="head">
                <div class="txt-1">项目阶段</div>
                <div class="txt-2">具体内容及交付成果项目阶段</div>
                <div :style="status == 2 ? 'width:170px' : ''" class="txt-3">付款金额</div>
                <div class="txt-4">所需工时</div>
                <div class="txt-5" v-if="status == 1">操作</div>
              </div>
              <div class="input-list">
                <template v-if="status==1">
                  <div class="list-item" v-for="(item,index) in contractForm.project" :key="index">
                    <div class="item1">
                      <el-form-item
                        :prop="`project.${index}.ProjectPhaseName`"
                        :rules="rules.ProjectPhaseName"
                      >
                        <el-input size="small" placeholder="例：方案确定" v-model="item.ProjectPhaseName"></el-input>
                      </el-form-item>
                    </div>
                    <div class="item2">
                      <el-form-item
                        :prop="`project.${index}.ProjectPhaseGain`"
                        :rules="rules.ProjectPhaseGain"
                      >
                        <el-input
                          size="small"
                          placeholder="例：需求沟通及方案输出"
                          v-model="item.ProjectPhaseGain"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="item3">
                      <el-form-item>
                        <el-input size="small" @blur="addPlusAll" v-model="item.ProjectPhasePrice"></el-input>
                      </el-form-item>
                      <span style="color:#ff0000">元</span>
                    </div>
                    <div class="item4">
                      <el-form-item>
                        <el-input
                          size="small"
                          @blur="addDayAll"
                          style="display: inline-block"
                          v-model="item.ProjectPhaseDay"
                        ></el-input>
                      </el-form-item>
                      <span style="color:#ff0000">天</span>
                    </div>
                    <div class="item5">
                      <el-form-item>
                        <el-button
                          class="m-delete-btn"
                          @click="deleteProject(index)"
                          type="danger"
                          size="small"
                        >删除</el-button>
                      </el-form-item>
                    </div>
                  </div>
                </template>

                <div v-if="status==2" class="text-list">
                  <div v-for="(item,index) in list" :key="index">
                    <p>{{item.name}}</p>
                    <p>{{item.stage}}</p>
                    <p :style="status == 2 ? 'width:170px' : ''">
                      {{item.moneys}}
                      <span>元</span>
                    </p>
                    <p>
                      {{item.days}}
                      <span>天</span>
                    </p>
                  </div>
                </div>
                <div v-if="status==1">
                  <span class="addBtn" @click="addProject">
                    添加新的项目阶段
                    <i class="el-icon-plus"></i>
                  </span>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-miaoshu"></i>项目描述
      </h4>
      <div class="zytk zytk-3">
        <p>
          <em>提示：</em>
          <span></span>雇主与服务商应当充分沟通，并明确服务项目的具体内容,如项目描述、产品功能描述、服务要求等
        </p>
        <div class="tear-box" v-if="status==1">
          <el-input type="textarea" minlength="10" maxlength="500" v-model="contractForm.content"></el-input>
        </div>
        <div class="tear-box" v-if="list.length>0">{{list[0].content}}</div>
      </div>
      <p
        style="text-align: center;font-size: 18px;color: #333;font-weight: bold;padding-top: 20px;"
      >《通用条款》</p>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-miaoshu"></i>一、定义
      </h4>
      <div class="zytk zytk-text">
        <pre>

除非本合同另有约定，在本合同中所用下列术语定义如下:
1.1 服务平台：指深圳市凌天众媒网，网址：www.zhongmei66.com及以后可能使用的新网址。
1.2 用户：指在服务平台合法注册，接受并认可服务平台相关协议、规则、规范、制度等的自然人、法人或其他组织。
1.3 雇主：指在服务平台上发布服务需求并支付赏金的用户。
1.4 服务商：指在服务平台上提供服务并收取赏金的用户。
1.5 服务需求：指雇主发布的需要服务商完成的服务内容。
1.6 赏金：指雇主和服务商的交易金额，即本合同金额。
1.7 平台账户：指用户在服务平台注册的帐号，用户只能通过该帐户登录服务平台进行交易。
              </pre>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-miaoshu"></i>二、双方责任
      </h4>
      <div class="zytk zytk-text">
        <pre>

2.1 雇主应当根据服务需求主动或者应服务商要求向服务商提交本项目所需的相关资料，并保证该资料的真实性、合法性、 准确性、完整性，如因雇主未按照前述标准提供资料导致服务商无法履行合同义务，由此产生的责任由雇主自行承担。
2.2 服务商应当在交易开始前，根据本项目服务需求提醒并引导雇主提交本项目所需的相关资料。如因服务商基于经验优势故 意或过失未提醒雇主提供必要资料导致项目无法继续进行的，由服务商承担相应责任。
2.3 雇主与服务商因当在《专用条款》中明确服务需求的具体内容，包括服务事项、期限、赏金等项。
2.4 雇主未按照约定托管或支付赏金的，服务商有权拒绝或顺延提供服务。
2.5 服务商在服务平台开设店铺或出售服务中所公示的条款中，免除或者限制其责任的条款服务商有义务采取合理的方式提请 雇主注意，或按照雇主的要求对该条款予以说明。否则，以有利于雇主的解释为准。
2.6 服务商未在本合同约定期限（含变更期限）内完成工作（含变更内容）的，雇主有权拒绝支付未确认部分的赏金。期限届 满后，如在雇主催告要求交付服务成果或申请退款之时起48小时内，服务商仍无法交付工作成果，服务商同意全额退款给雇 主，但雇主与服务商另有约定的除外。
2.7 雇主与服务商明确约定工作期限，工作期限（含变更期限）届满，工作（含变更内容）未完成的：双方有约定的，按照约 定办理；如没有约定的，将按照工作未完成返还雇主所有支付款项（见2.6条），但是雇主与服务商继续就需求继续磋商，服务 商继续完成工作的，将视为双方变更工作期限，该变更工作期限双方未有明确约定的，雇主有权随时要求服务商在合理时间
（合理时间应以雇主主张时起算，不得少于3个工作日）内完成工作，最终工作期限以雇主要求为准。
2.8 雇主与服务商约定分阶段工作的，服务商完成阶段性工作，雇主应在3个工作日内予以验收确认，如验收合格应支付已完成 阶段的赏金；如雇主在3个工作日内未予以验收的，视为验收合格，服务商有权要求雇主支付已完成阶段赏金。经雇主验收合格 并确认支付赏金后产生纠纷的，已支付赏金不予退回，但雇主与服务商另有约定的除外。
2.9 雇主与服务商未约定分阶段工作的，如工作未按期完成，雇主前期支付的款项应予以返还并按照双方约定承担违约责任， 但雇主与服务商另有约定的除外。
2.10 雇主与服务商应按照法律规定自行缴纳相应税费。
2.11 雇主与服务商均应充分了解且同意遵守服务平台公布的所有协议、规则、制度等文件，并按照服务平台的相关规定处理相 关交易事项。
              </pre>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-miaoshu"></i>三、赏金
      </h4>
      <div class="zytk zytk-text">
        <pre>

3.1 雇主与服务商应当根据服务平台公布的《凌天众媒网交易规则》完成赏金的托管及支付。
3.2 服务商应当按照雇主最终实际支付的赏金金额向雇主开具合法有效的发票。
              </pre>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-miaoshu"></i>四、服务保障
      </h4>
      <div class="zytk zytk-text">
        <pre>

4.1 服务商应按照服务平台的规定及服务商自行作出的承诺承担服务保障责任。
              </pre>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-miaoshu"></i>五、权利保证
      </h4>
      <div class="zytk zytk-text">
        <pre>

5.1 本合同所产生成果的知识产权在雇主支付完全部赏金后，归雇主所有，但服务商享有署名权并保留用于参展、评选的权利。 但雇主与服务商另有约定的除外。
5.2 服务商应当保证服务成果符合国家法律法规的规定，不存在任何侵犯第三方的所有权、知识产权、名誉权、肖像权等侵权行 为，并承担因此产生的全部责任。
              </pre>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-miaoshu"></i>六、保密责任
      </h4>
      <div class="zytk zytk-text">
        <pre>

6.1 服务商承诺，对在为雇主提供服务期间所知悉的雇主的商业秘密承担保密义务。
              </pre>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-miaoshu"></i>七、不可抗力
      </h4>
      <div class="zytk zytk-text">
        <pre>

7.1 因不可抗力导致本合同无法按照约定期限或是内容履行时，双方应及时协商解决。因不可抗力导致合同延迟履行或不能履行 的，均不构成违约责任。不可抗力是指不能预见、不能避免并无法克服的情况，包含地震、洪水等自然灾害以及战争等人力无 法抗拒的情形。
              </pre>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-miaoshu"></i>八、争议解决
      </h4>
      <div class="zytk zytk-text">
        <pre>

8.1 因本合同及与本合同有关的争议、解释等，均适用中华人民共和国法律。
8.2 本合同签订或履行过程中，如有争议，双方应当友好协商解决；协商不成，双方一致同意任何一方可提交服务平台由服务平 台按照平台相关规则进行调解。
8.3 双方也可不经服务平台进行调解，直接向人民法院提起诉讼。
              </pre>
      </div>
      <h4 class="s-title">
        <i class="iconfont icon-hetong-miaoshu"></i>九、其他
      </h4>
      <div class="zytk zytk-text">
        <pre>

9.1 本合同以电子文本形式生成，雇主与服务商完成合同订立手续后，即具有与手写签名同等的法律效力。
9.2 本合同中的任何约定如违反法律法规的规定而无效的，该无效条款不影响本合同其他条款的效力，雇主与服务商仍因履行其他条 款所约定的权利义务。
9.3 任何一方通过服务平台点击确认或以其他方式选择接受本合同，即表示该方已理解且同意本合同全部内容，本合同经双方点击确 认后立即生效。
              </pre>
      </div>

      <div class="sm sign-content" v-if="status==2">
        <div class="left_box">
          <p>雇主{{userB.realname ? '已完成' : '未完成'}}认证</p>
          <p>甲方（雇主）：{{userA.name}}</p>
          <p v-if="userA.realname">姓名：{{userA.realname}}</p>
          <p>签署日期：{{signATime}}</p>

          <div class="graphA" v-if="signA">
            <img :src="'data:image/jpeg;base64,'+signA" class="graph_w" />
          </div>
          <div class="graph_no_sign" v-else>
            <img src="~assets/img/no-sign.png" alt />
          </div>

        </div>
        <div class="right_box">
          <p>服务商{{userB.realname ? '已完成' : '未完成'}}认证</p>
          <p>乙方（服务商）{{userB.name}}</p>
          <p v-if="userA.realname">{{userB.status==2 ? '企业名称' : '姓名'}}：{{userB.realname}}</p>
          <p>签署日期：{{signBTime}}</p>
          <div class="graphB" v-if="signB">
            <img :src="'data:image/gif;base64,'+signB" class="graph_w" />
          </div>
          <div class="graph_no_sign" v-else>
            <img src="~assets/img/no-sign.png" alt />
          </div>
        </div>
      </div>
      <div class="bottom-btn" v-if="!isSign">
        <div v-if="status==1">
          <button class="confirm" @click="alertConfirm">确定</button>
          <button class="cancel" @click="close">取消</button>
        </div>
        <div v-if="status==2">
          <button class="confirm1" @click="openContractMessageBox">同意签署合同</button>
        </div>
      </div>
    </div>
    <el-dialog
    v-if="shareUrl !=''"
      custom-class="dialog-box"
      with="520"
      title="手绘个人签名"
      :modal-append-to-body="false"
      :visible.sync="centerDialogVisible"
      center
    >
      <div v-if="sign==''">
        <p>请使用微信或者手机浏览器的扫一扫功能扫面以下二维码</p>
        <p>（此二维码十分钟内有效）</p>
        <img v-if="isExpire" class="sign-expire" src="~assets/img/sign_expire.png" @click="onSignExpire" />
        <div class="qrcode-wrapper" style="margin:0 auto">
          <qrcode-vue  :value="shareUrl" :size="150" style="display: flex;"></qrcode-vue>
        </div>
      </div>
      <div v-if="sign!=''">
        <div class="sign-box">
          <img :src="'data:image/png;base64,'+sign" alt />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="openContractMessageBox" class="reset-btn">重新绘制</el-button>
          <el-button type="primary" class="m-success-btn" @click="eSignUser">完成</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog
      custom-class="dialog-box"
      with="520"
      title="短信验证"
      :modal-append-to-body="false"
      :visible.sync="codeDialogVisible"
      center
    >
      <div class="code-box">
        <p>接收手机号码：{{mobile|filterPhone}}</p>
        <p class="flex">
          <el-input v-model="verifyCode" maxlength="6" placeholder="验证码"></el-input>
          <el-button @click="getCodeHandle" :disabled="ctrBtn">{{text}}</el-button>
        </p>
        <p>如已更新手机号请联系客服400-688-6662</p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button class="m-code-btn" type="primary" @click="contractSign">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      custom-class="dialog-box dialog-box-left"
      title="发送合同"
      width="520"
      :modal-append-to-body="false"
      :visible.sync="alertDialogVisible"
      center
    >
      <div class="code-box">
        请确保合同内容已经双方协商达成一致，如未协商，请先协商之后再 发起。合同将作为交易过程中的执行标准以及纠纷仲裁的唯一依据。
        <br />确定发送该合同么？
      </div>

      <span slot="footer" class="dialog-footer footer-right">
        <button class="m-code-btn" type="primary" @click="submitForm">确认,签署合同</button>
        <button class="m-code-btn m-clos-btn" type="primary" @click="submitClose">取消</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import moment from "moment";
import axios from "axios";
import {
  contentstuff,
  contractStuff,
  getCAndP,
  contractQrCode,
  contractSign,
  eSignUserGet,
  eSignUserRemove,
  eSignUser,
  getContractDetail,
  eSignUserCode
} from "@/api/contract";
import { orderInfo } from "../../api/list";
import { filterPhone } from "~/utils/common";
import QrcodeVue from "qrcode.vue";
import { mapState } from "vuex";
const msgList = new Map([
  ["budget_money", ["请输入投放预算", "", "投放预算请输入大于100的数字"]],
  ["email", ["", "", "请输入正确的邮箱名"]],
  ["qq", ["", "", "请输入正确的QQ号"]],
  [
    "wechat",
    ["", "", "微信必须是6-20位字母、数字、下划线和减号,必须以字母开头"]
  ],
  ["name", ["请填写姓名", "", "请输入真实姓名"]]
]);
export default {
  name: "detail",
  props: ["contractDetail"],
  inject: ["orderInfo", "identity"],
  components: {
    QrcodeVue
  },
  data() {
    return {
      // 签名的token
      token: '',
      shareUrl: "",
      CAndP: null,
      alertDialogVisible: false,
      codeTimer: null,
      signTimer: null,
      // 二维码失效
      signExpireTimer: null,
      isExpire: true,
      expireTime: 600, // 10分钟时效
      userId: 0,
      mobile: "",
      isWorking: false,
      isSign: false,
      codeDialogVisible: false,
      ctrBtn: false, // 控制按钮可点击
      text: "获取验证码", // 按钮文字
      verifyCode: "",
      startDate: "",
      wxQrCode: "",
      signA: "",
      signB: "",
      eSignNum: 0,
      signATime: "",
      sign: "",
      signBTime: "",
      centerDialogVisible: false,
      userA: {
        name: "",
        realname: "",
        status: 0
      },
      userB: {
        name: "",
        realname: "",
        status: 0
      },
      endDate: "",
      day: 0,
      contractData: null,
      totalPrice: 0,
      totalDay: 0,
      list: [],
      status: 1, //未填充合同 2已填充
      dialogVisible: true,
      value2: "",
      rules: {
        ProjectPhaseName: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] },
          { min: 1, max: 10, message: "最多10个字" }
        ],
        ProjectPhaseGain: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] },
          { min: 1, max: 20, message: "最多20个字" }
        ]
      },
      contractForm: {
        begin_time: "", //开始时间
        end_time: "", //结束时间
        day_count: 0, //总天数
        ProjectPhasePrice: 10000, //	总价格
        content: "", //	内容
        ordersn: this.$route.query.order_sn, //服务订单
        project: [
          {
            ProjectPhaseName: "", //阶段名字
            ProjectPhaseGain: "", //阶段说明
            ProjectPhasePrice: 0, //阶段价格
            ProjectPhaseDay: "" //阶段天数
          }
        ] //阶段
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  filters: { filterPhone },
  methods: {
    async checkCAndP() {
      const { data = {} } = await getCAndP();
      if (data.code === 201) {
      } else {
        const { mobile } = data.data;
        this.mobile = mobile;
        this.CAndP = data.data.status === 2 ? "C" : "P";
      }
    },
    alertConfirm() {
      let _this = this;
      let form = this.contractForm;
      if (form.begin_time == "") {
        this.$message.error("请选择起止时间");
        return;
      }
      if (form.end_time == "") {
        this.$message.error("请选择起止时间");
        return;
      }

      if (form.content == "") {
        this.$message.error("项目描述为10-500字");
        return;
      }

      if (form.content.length < 10 || form.content.length > 500) {
        this.$message.error("项目描述为10-500字");
        return;
      }
      if (form.project.length == 0) {
        this.$message.error("请至少写一个项目阶段");
        return;
      }
      if (this.totalPrice != form.ProjectPhasePrice) {
        this.$message.error("各阶段付款金额总和与需求金额不相等。");
        return;
      }
      if (this.totalDay != parseInt(form.day_count)) {
        this.$message.error("各阶段所需工时总和与工期不相等。");
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.alertDialogVisible = true;
        } else {
          _this.$message.error("项目阶段信息不符合");
        }
      });
    },
    // 填充合同
    async submitForm() {
      let _this = this;
      let contentstuffReponse = await contentstuff({ ..._this.contractForm });
      let { code, data } = contentstuffReponse.data;
      if (code == 200) {
        // 填充成功
        this.status = 2;
        this.alertDialogVisible = false;
        this.$message.success("提交成功");
      }
    },
    submitClose() {
      this.alertDialogVisible = false;
    },
    /** 处理按钮倒计时 **/
    countTime() {
      clearInterval(this.codeTimer);
      let _times = 60;
      let _speed = 1000;
      let _t = this.text;
      this.codeTimer = setInterval(() => {
        this.ctrBtn = true;
        _times--;
        this.text = `${_times}s`;
        if (_times <= 0) {
          this.text = _t;
          this.ctrBtn = false;
          clearInterval(this.codeTimer);
        }
      }, _speed);
    },
    getCodeHandle() {
      let _this = this;
      this.ctrBtn = true;
      eSignUserCode()
        .then(res => {
          let { code, message, data } = res.data;
          if (code && code == 200) {
            _this.$message.success({
              title: "成功",
              message: "验证码已发送",
              type: "success"
            });
            _this.countTime();
          } else {
            _this.$message.error(message);
            _this.ctrBtn = false;
          }
        })
        .catch(err => {
          _this.ctrBtn = false;
        });
    },
    resetSign() {
      let _this = this;
      _this.sign = "";
      let data = {
        order_sn: _this.$route.query.order_sn,
        token: this.token,
        type: 'pc',
        user_id: this.$store.state.userInfo.original.id,
      };
      eSignUserRemove(data)
        .then(res => {
          if (res.data.code == 200) {
            _this.eSignNum = 0;
            clearInterval(_this.signTimer);
            _this.signTimer = setInterval(() => {
              _this.eSignUserGet();
            }, 3000);
          }
        })
        .catch(e => console.log(e));
    },
    close() {
      this.$emit("closeContractBox");
    },
    contractSign() {
      let _this = this;
      let data = {
        ordersn: _this.$route.query.order_sn,
        code: _this.verifyCode
      };
      contractSign(data)
        .then(res => {
          if (res.data.code == 200) {
            _this.codeDialogVisible = false;
            _this.getContractDetail();
            _this.close();
          } else if (res.data.code == 1017) {
            _this.$message.error("短信验证码错误");
          } else if (res.data.code == 201) {
            _this.$message.error("请输入短信验证码");
          } else {
            _this.$message.error(res.data.message);
          }
        })
        .catch(e => console.log(e));
    },
    eSignUser() {
      let _this = this;
      _this.centerDialogVisible = false;
      if (_this.sign == "") {
        _this.$message.error("请扫码签名");
        return;
      } else {
        _this.codeDialogVisible = true;
      }
      // let data = {
      //   ordersn: _this.$route.query.order_sn,
      //   base: _this.sign
      // };
      // eSignUser(data)
      //   .then(res => {
      //     if (res.data.code == 200) {
      //       _this.codeDialogVisible = true;
      //     }
      //   })
      //   .catch(e => console.log(e));
    },
    async openContractMessageBox() {
      let _this = this;
      if (this.CAndP == "P") {
        this.centerDialogVisible = true;
        
        let data = {
          order_sn: this.$route.query.order_sn
        };
        let navData = await contractQrCode(data);
        this.shareUrl = navData.data.data.url;
        this.token = navData.data.data.token;
        console.log('shareUrl', this.shareUrl);

        _this.resetSign();
        
        _this.eSignNum = 0;
        clearInterval(_this.signTimer);
        _this.signTimer = setInterval(() => {
          _this.eSignUserGet();
        }, 3000);

        // 设置定时器，10分钟后二维码失效
        _this.isExpire = false;
        _this.expireTime = 600;
        clearInterval(_this.signExpireTimer);
        _this.signExpireTimer = setInterval(() => {
          if (_this.expireTime == 0) {
            _this.isExpire = true;
            clearInterval(_this.signExpireTimer);
          } else {
            _this.expireTime = _this.expireTime - 1;
          }
        }, 1000);


      } else if (this.CAndP == "C") {
        _this.codeDialogVisible = true;
      }

    },
   
    eSignUserGet() {
      let _this = this;
      if (_this.eSignNum >= 100) {
        clearInterval(_this.signTimer);
        _this.signTimer = null;
        _this.$message.error("签名失败，请重新扫码签名");
        setTimeout(function() {
          window.location.reload();
        }, 500);
      }
      let data = {
        ordersn: this.$route.query.order_sn
      };
      eSignUserGet(data)
        .then(res => {
          if (res.data.code == 200) {
            clearInterval(_this.signTimer);
            _this.signTimer = null;
            _this.sign = res.data.data.sign;
          }
        })
        .catch(e => console.log(e));
    },

    changeTime(item) {
      this.contractForm.begin_time = moment(item[0]).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      this.contractForm.end_time = moment(item[1]).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      this.contractForm.day_count = (item[1] - item[0]) / (60 * 60 * 24 * 1000);
    },
    deleteProject(index) {
      this.contractForm.project.splice(index, 1);
    },
    addProject() {
      if (this.contractForm.project.length >= 5) {
        this.$message.error("最多只能5个阶段");
        return false;
      }
      this.contractForm.project.push({
        ProjectPhaseName: "", //阶段名字
        ProjectPhaseGain: "", //阶段说明
        ProjectPhasePrice: 0, //阶段价格
        ProjectPhaseDay: "" //阶段天数
      });
    },
    addPlusAll() {
      this.totalPrice = 0;
      this.totalDay = 0;
      this.contractForm.project.forEach(res => {
        this.totalPrice += parseFloat(res.ProjectPhasePrice);
        this.totalDay += parseFloat(res.ProjectPhaseDay);
      });
    },

    addDayAll() {
      this.totalDay = 0;
      this.contractForm.project.forEach(res => {
        this.totalDay += parseInt(res.ProjectPhaseDay);
      });
    },

    getContractDetail() {
      let _this = this;
      getContractDetail(_this.$route.query.order_sn)
        .then(res => {
          _this.contractDetail = res.data.data;
        })
        .catch(e => console.log(e));
    },

    onSignExpire() {
      this.isExpire = false;
      this.openContractMessageBox();
    }

  },
  created() {
    this.checkCAndP();
  },

  watch: {
    contractDetail(newData, oldData) {
      if (newData) {
        if (this.orderInfo.order_status < 3) {
          this.status = 1;
        } else if (
          this.orderInfo.order_status == 3 &&
          newData.StuffData &&
          newData.StuffData.length > 0
        ) {
          this.status = 2;
        } else {
          this.status = 2;
        }
        this.list = newData.StuffData;
        this.userA = newData.contractData.usera;
        this.userB = newData.contractData.userb;
        if (newData.signA) {
          this.signA = newData.signA;
        }
        if (newData.signB) {
          this.signB = newData.signB;
        }
        this.signATime = newData.signATime;
        this.signBTime = newData.signBTime;
        this.contractForm.ProjectPhasePrice = this.list[0].money;
        this.startDate = moment(this.list[0].begin_time).format("YYYY-MM-DD");
        this.endDate = moment(this.list[this.list.length - 1].end_time).format(
          "YYYY-MM-DD"
        );
        this.day = this.list[0].day;
        let role = newData.contractData.role;

        if (
          (this.signA != "" && this.userId == role.A) ||
          (this.signB != "" && this.userId == role.B)
        ) {
          this.isSign = true;
        } else {
          this.isSign = false;
        }
        if (this.signA != "" && this.signB != "") {
          this.isWorking = true;
        }
      }
    }
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { id } = userInfo.original;
    this.userId = id;
    this.contractForm.ProjectPhasePrice = parseFloat(this.orderInfo.amount);
  },
  beforeDestroy() {
    clearInterval(this.signTimer);
    this.signTimer = null;
    clearInterval(this.signExpireTimer);
    this.signExpireTimer = null;
  }
};
</script>

<style scoped lang="less">
.contranct-detail {
  position: absolute;
  width: 100%;
  min-height: 3650px;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;

  /deep/ .dialog-box {
    position: absolute;
    width: 520px !important;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: -50px !important;
    &>.el-dialog__header{
        &>.el-dialog__headerbtn{
            top: 12px!important;
        }
    }
  }
  /deep/ .dialog-box-left {
    & > .el-dialog__header {
      text-align: left;
      padding: 10px 40px 10px;
      & > .el-dialog__headerbtn {
        top: 13px;
      }
    }
  }
  /deep/ input:focus,
  /deep/ textarea:focus {
    box-shadow: 0px 0px 4px #5da6ff !important;
    border: 1px solid #5da6ff !important;
  }
  /deep/ .el-dialog__footer {
    padding: 10px 40px 32px;
  }
  .money-font {
    font-size: 24px;
    color: #f3262d;
  }

  .addBtn {
    color: #f3262d;
    cursor: pointer;
  }

  .box {
    width: 935px;
    height: auto;
    background: rgba(255, 248, 248, 1);
    position: relative;
    padding-bottom: 80px;
    border-radius: 8px;

    .title {
      width: 219px;
      height: 42px;
      background: url("~assets/img/ht.png") no-repeat center;
      background-size: contain;
      line-height: 36px;
      text-align: center;
      margin: 60px auto 28px auto;
      font-size: 18px;
      color: #ffffff;
      font-weight: bold;
    }

    .sm {
      padding-left: 40px;
      margin-right: 40px;

      strong {
        font-weight: bold;
        font-size: #333;
        font-size: 14px;
      }

      .left_box {
        float: left;
        min-width: 230px;
        height: 100px;
        box-sizing: border-box;
        position: relative;
        transform: translateX(40px);

        p {
          margin-bottom: 5px;
        }

        .graphA {
          position: absolute;
          top: -10px;
          left: -76px;
          z-index: 10;
          transform: scale(1.4);
          height: 150px;
          width: 300px;

          img {
            position: absolute;
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            transform: rotate(-90deg);
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 40%;
          }
        }
      }

      .graph_no_sign {
        position: absolute;
        top: 0;
        left: 50px;
        z-index: 10;
        height: 96px;
        width: 132px;

        img {
          width: 100%;
        }
      }

      .right_box {
        float: right;
        position: relative;
        transform: translateX(-90px);
        min-width: 230px;
        height: 100px;
        box-sizing: border-box;

        p {
          margin-bottom: 5px;
        }

        .graphB {
          position: absolute;
          top: -10px;
          left: -76px;
          z-index: 10;
          height: 150px;
          width: 300px;

          img {
            position: absolute;
            -webkit-transform: rotate(-90deg);
            -moz-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            transform: rotate(-90deg);
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 40%;
          }
        }
      }

      p {
        text-indent: 2em;
        font-size: 14px;
        color: #333;
        line-height: 1.5;
      }
    }

    .s-title {
      margin-top: 20px;
      margin-left: 40px;
      margin-right: 40px;
      height: 40px;
      background: rgba(255, 204, 204, 1);
      padding-left: 12px;
      font-size: 16px;
      font-weight: bold;
      line-height: 40px;
      color: #666;

      i {
        font-size: 20px;
        margin-right: 0.5em;
      }
    }

    .zytk {
      margin-left: 40px;
      margin-right: 40px;
      border: 1px solid rgba(232, 232, 232, 1);
      border-top: 0;

      .txt {
        font-size: 13px;
        color: #333;
        padding-left: 35px;
        padding-top: 20px;
        padding-bottom: 10px;
      }

      .txt-item {
        font-size: 14px;
        color: #333;
        padding-left: 35px;
        padding-bottom: 35px;

        span {
          font-weight: bold;
          font-size: 18px;
        }
      }

      .block {
        padding-left: 35px;
        display: flex;
        align-items: center;
        padding-bottom: 35px;

        .count {
          font-size: 13px;
          color: #333;
          margin-left: 0.5em;
          margin-right: 0.5em;
        }

        .el-input {
          width: 201px;
        }
      }
    }

    .zytk-2 {
      .head-box {
        padding-left: 35px;
        padding-bottom: 30px;

        .head {
          display: flex;
          align-items: center;

          div {
            font-size: 14px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }

          .txt-1 {
            width: 240px;
            margin-right: 20px;
          }

          .txt-2 {
            width: 200px;
            margin-right: 20px;
          }

          .txt-3 {
            width: 100px;
            margin-right: 20px;
          }

          .txt-4 {
            width: 90px;
            margin-right: 20px;
          }

          .txt-5 {
            width: 60px;
          }
        }

        .input-list {
          /deep/ .el-input__inner {
            padding: 0 5px;
          }

          .list-item {
            display: flex;
            margin-bottom: 10px;
            align-items: center;

            .el-form-item {
              margin-bottom: 0;
              margin-top: 5px;
              margin-bottom: 5px;
            }

            .item1 {
              width: 240px;
              margin-right: 20px;
            }

            .item2 {
              margin-right: 20px;
              width: 200px;
            }

            .item3 {
              width: 100px;
              margin-right: 20px;

              .el-form-item {
                display: inline-block;
                margin-right: 6px;
                width: 80px;
              }
            }

            .item4,
            .item5 {
              width: 60px;
              margin-right: 20px;
            }

            .item4 {
              width: 90px;

              span {
                display: inline-block;
                width: 20px;
              }

              .el-form-item {
                display: inline-block;
                margin-right: 6px;
                width: 60px;
              }
            }

            .item5 {
              margin-right: 0;
            }
          }

          .text-list {
            color: #333;
            padding-top: 20px;

            div {
              display: flex;
              align-items: center;

              p {
                margin-right: 20px;
                line-height: 2;

                span {
                  color: #f3262d;
                }
              }

              p:nth-child(1) {
                width: 240px;
              }

              p:nth-child(2) {
                width: 200px;
              }

              p:nth-child(3),
              p:nth-child(4) {
                width: 60px;
              }
            }
          }
        }
      }
    }

    .zytk-3 {
      color: #333;

      p:first-child {
        padding: 20px;
        color: #333;
        font-size: 12px;
      }

      .tear-box {
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        word-wrap: break-word;

        p {
          margin-bottom: 10px;

          button {
            width: 80px;
            height: 30px;
            background: rgba(244, 244, 244, 1);
            border: 1px solid rgba(223, 223, 223, 1);
            font-size: 12px;
            color: #666;
          }

          .up {
            color: #337eef;
            font-size: 12px;
            margin-left: 20px;
          }
        }

        .txt-btn {
          color: #757575;
          font-size: 12px;
        }

        .el-textarea {
          width: 782px;
          margin-bottom: 20px;

          /deep/ textarea {
            height: 100px;
          }
        }
      }
    }

    .zytk-text {
      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        color: #666;
        font-size: 13px;
        line-height: 1.5;
        padding: 0 35px;

        div {
          color: #f3262d;
        }
      }
    }

    .bottom-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 50px;
      padding-bottom: 128px;

      button {
        border: none;
      }

      button:nth-child(1) {
        margin-right: 30px;
      }

      .confirm {
        width: 80px;
        height: 36px;
        background: #f3262d;
        border-radius: 2px;
        color: #fff;
        font-size: 14px;
      }

      .confirm:hover {
        background: #f43c42;
      }

      .cancel {
        width: 80px;
        height: 36px;
        background: rgba(244, 244, 244, 1);
        border: 1px solid rgba(223, 223, 223, 1);
        border-radius: 2px;
        font-size: 14px;
        color: #666;
      }

      .cancel:hover {
        background: #fff;
      }

      .confirm1 {
        width: 154px;
        height: 36px;
        background: rgba(243, 38, 45, 1);
        color: #fff;
        border-radius: 2px;
        font-size: 14px;
      }

      .cancel1 {
        font-size: 14px;
        width: 154px;
        height: 36px;
        border: 1px solid rgba(255, 0, 0, 1);
        color: #ff0000;
        background: #fff;
      }
    }
  }

  .wx_img {
    margin: 20px auto;
    display: block;
    width: 180px;
    height: 180px;
    padding: 10px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .dialog-box p {
    text-align: center !important;
  }

  .sign-box {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
    margin: 0 auto;
    width: 192px;
    height: 292px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
    }
  }

  .el-dialog {
    border-top: 1px solid #ccc;
  }

  .dialog-footer {
    text-align: center !important;
    display: block;
    width: 100%;
  }
  .footer-right {
    text-align: right !important;
  }
  .reset-btn {
    border: 1px solid #f3262d;
    background: #ffffff !important;
    width: 98px;
    color: #f3262d;
  }

  .reset-btn:hover {
    background: #fff;
  }
  .reset-btn,
  .m-success-btn {
    padding: 12px 20px!important;
  }
  .m-success-btn {
    width: 100px;
    border: 1px solid #f3262d !important;
  }

  .m-success-btn:hover {
    background: #f43c42 !important;
  }

  .code-box {
    margin: 0 auto;
    width: 440px;

    /deep/ .el-button--default {
      background: #f3262d;
      color: #fff;
    }

    /deep/ .is-disabled {
      background: #e3e3e3;
      color: #999;
    }
  }

  .m-code-btn {
    display: inline-block;
    border: 0;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #f3262d;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  .m-clos-btn {
    margin-left: 12px;
    border: 1px solid #dfdfdf;
    background: #f4f4f4;
    color: #666;
  }
  .m-clos-btn:hover {
    background: #fff;
  }
  .code-box p {
    text-align: left !important;
    padding-bottom: 10px;
  }

  .flex {
    display: flex;

    button {
      margin-left: 10px;
      min-width: 112px;
    }

    .el-input {
      width: 192px;
    }
  }

  .sign-content {
    height: 150px;
    padding-top: 40px;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;

    .icon-guanbi {
      font-size: 12px;
      color: #666;
      cursor: pointer;
    }
    .icon-guanbi:hover {
      color: #f3262d;
    }
  }

  .is_working {
    color: #f3262d;
    padding-top: 30px;
    padding-bottom: 20px;
  }

  .refuse-input {
    width: 450px;
    height: 160px;
    border: 1px solid #ccc;
  }

  .m-tips-top {
    color: #666;
  }

  .m-delete-btn {
    background: #f3262d !important;
  }

  .m-delete-btn:hover {
    background: #f43c42 !important;
  }

  .el-button--primary {
    border: 0 !important;
  }

  .sign-expire {
    width: 158px;
    height: 158px;
    position: absolute;
    top: 145px;
    left: 180px;
    cursor: pointer;
  }
}

</style>
<style lang='less'>
 .qrcode-wrapper {
       display: flex;
    justify-content: center;
    &>div{
      padding: 13px;
    border: 1px solid #ddd;
margin-top: 30px;
    }
  }
</style>