<template>
  <div class="release-main">
    <div class="item-box box1">
      <h4>选择你要发布的类型</h4>
      <div class="radio-box">
        <el-radio v-model="radio" label="1">发布广告线索</el-radio>
        <el-radio v-model="radio" disabled label="2">发布广告任务</el-radio>
      </div>
      <br />
      <br />
      <h4>选择你要发布的分类</h4>
      <div class="select">
        <div class="select-item" v-if="showListFlag">
          <span></span>
          <a @click="showClick" href="javascript:;">修改分类</a>
        </div>
        <div class="select-item" v-else>
          <span></span>
          <a @click="showClick" href="javascript:;">选择分类</a>
        </div>
        <div class="select-err" v-if="flagclass">
          <span>{{tipsContent}}</span>
        </div>
        <div class="text-title" v-if="selectShowList">
          <div v-for="(item,idx) in selectShowList.child" :key="idx">
            <div :title="selectShowListChildArr[idx]" class="text-list">
              <p>
                {{selectShowList.cate_name}} > {{item.cate_name}} >
                <span
                  v-for="(item2,idx2) in item.child"
                  :key="idx2"
                >
                  <span
                    v-if="item2.selected==true"
                  >{{item2.cate_name}} {{(idx2< item.child.length-1)?'、':"；"}}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="datas" v-show="listShow" @mouseleave="listMouseOut">
          <div class="parent">
            <div
              :class="['parent-inner',{active:idx==index}]"
              v-for="(item,idx) in list"
              :key="idx"
              @mouseover="list_child_hover(idx)"
            >
              <p>
                <a href="javascript:;">{{item.cate_name}}</a>
              </p>
            </div>
          </div>

          <div class="child" v-show="index>-1">
            <div v-for="(pitem,pi) in list" :key="pi">
              <div v-if="pitem.child&&pi==index">
                <div v-for="(item,i) in pitem.child" :key="i">
                  <div class="child_inner">
                    <div class="child_p">
                      <el-checkbox
                        v-model="item.selected"
                        class="child_checkbox"
                        text-color="#06c"
                        @change="secondSelectHandle(item.selected,index,i,item.id)"
                      >{{item.cate_name}}</el-checkbox>
                    </div>
                    <div class="child_p2" v-if="item&&item.child">
                      <div v-for="(item2,idx) in item.child" :key="idx">
                        <el-checkbox
                          v-model="item2.selected"
                          :class="{son_checkbox:item2.selected}"
                          @change="thirdSelectHandle(item2.selected,index,i,item.id,item2.id)"
                        >{{item2.cate_name}}</el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h4 class="other_h4">
        明确需求标题和详情
        <a href="javascript:;" @click="tpShow=!tpShow">插入模板</a>
        <nuxt-link to="/clues?page=1">逛逛大厅看看别人怎么写的</nuxt-link>
      </h4>
      <el-form :rules="userInfoRules" ref="eForm" :model="eForm" class="form" label-position="left">
        <el-form-item label prop="title">
          <el-input
            class="release-input-title"
            v-model="eForm.title"
            @blur="titleBlur()"
            placeholder="请用一句话概括您要做什么？比如：拼车打车APP开发"
          ></el-input>
          <div class="select-err" v-if="flagInput">
            <span>{{tipsContent}}</span>
          </div>
        </el-form-item>

        <section class="container">
          <div
            class="quill-editor"
            :content="eForm.content"
            @change="onEditorChange($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption"
          ></div>
        </section>
        <div class="release-input-tips">
          <div>
            最多可添加
            <span class="c_primary">5</span>个图片/文件，每个大小不超过
            <span class="c_primary">2M</span>
          </div>
          <a
            href="javascript:;"
            v-on:mouseover="onHoverHandle"
            v-on:mouseleave="LeaveHanlde"
          >无法上传附件？</a>
          <div class="select-err" v-if="flagText">
            <span>{{tipsContent}}</span>
          </div>
          <div class="tipes_box" v-show="showTips">
            <p>1.上传格式支持常见的办公软件文档格式（office文档格式)常见的图片格式（jpg.png.gif)等。</p>
            <p>2.最多可上传附件5个附件，每个文件大小不得超过2M。</p>
            <p>3.文件名称须符合正常规范（勿在文件名中包含其他符号，如点号等）</p>
          </div>
        </div>
        <div>
          <el-upload
            class="upload-demo"
            refs="upload"
            :action="$store.state.uploadApi"
            name="imgs"
            :on-remove="handleRemove"
            :before-upload="slefUploadBefore"
            :on-success="upload_success"
          >
            <el-button class="m-upload-btn" type="primary">上传附件</el-button>
          </el-upload>
          <ul class="upload_list">
            <li class="upload_li" v-for="(item,index) in upload_imgs" :key="index">
              <span class="upload_name">{{item.name}}</span>
              <span class="upload_size">({{(item.size/1024).toFixed(2)}}kb)</span>
              <span>-已完成</span>
              <svg @click="deleteEnclosure(index)" class="upload_delete" aria-hidden="true">
                <use xlink:href="#icon-guanbi-dianji" />
              </svg>
            </li>
          </ul>
        </div>
        <div class="fomr-item-1">
          <h3 class="h3-title">留下联系方式</h3>
          <el-form-item label="联系人" prop="name">
            <el-input v-model="eForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="eForm.mobile"></el-input>
            <div class="mobile-public">
              <div class="after"></div>是否公开此手机号？
              <span
                @click="eForm.mobile_status='N'"
                :class="eForm.mobile_status == 'N' ? 'active' : ''"
              >是</span>
              <span
                @click="eForm.mobile_status='Y'"
                :class="eForm.mobile_status == 'Y' ? 'active' : ''"
              >否</span>
            </div>
          </el-form-item>
          <el-form-item prop="verifyCode" label="验证码">
            <div class="flex">
              <el-input
                style="width:104px!important;"
                v-model="eForm.verification_code"
                @blur="varCode"
                maxlength="4"
              ></el-input>
              <el-button class="m-verify-code" @click="getCodeHandle" :disabled="ctrBtn">{{text}}</el-button>
              <div class="select-err" v-if="flagCode">
                <span>{{tipsContent}}</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="微信" prop="wechat">
            <el-input maxlength="20" v-model="eForm.wechat" @blur="varWQE"></el-input>
            <div class="select-err" v-if="flagWechat">
              <span>{{tipsContent}}</span>
            </div>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="eForm.qq" @blur="varWQE"></el-input>
            <div class="select-err" v-if="flagQQ">
              <span>{{tipsContent}}</span>
            </div>
          </el-form-item>
          <el-form-item label="E-mail" prop="email">
            <el-input maxlength="50" v-model="eForm.email" @blur="varWQE"></el-input>
          </el-form-item>
          <p class="tips_red">
            <img src="~assets/img/icon-error.png" alt /> 微信，qq，邮箱至少填一项
          </p>
        </div>
        <div class="select-model">
          <h3 class="h3-title">选择交易模式</h3>
          <div class="itme-1">
            <!--------------------------悬赏模式---------------------------->

            <h4>
              <el-radio v-model="radio_service_type" disabled label="1">悬赏模式</el-radio>
            </h4>
            <div class="text m-disabled">
              <p>凌客们先工作，再选中标作品。托管赏金后吸引更多凌客。</p>
              <p>适合简单设计、写作策划类任务，也适合取名祝福、发帖推广、下载注册等计件任务。</p>
            </div>
            <div v-show="false" class="select-box">
              <p>您打算支付多少赏金呢？</p>
              <div class="flex">
                <el-input class="w90" placeholder size="mini"></el-input>
                <span>元</span>
              </div>
              <br />
              <p>您打算如何分配该赏金呢？</p>
              <div class="set-item-p">
                <el-radio-group v-model="radio_1">
                  <p>
                    <el-radio :label="3">单人悬赏，只设置一个中标者</el-radio>
                  </p>
                  <p>
                    <el-radio :label="6">多人悬赏，设置多人中标分享赏金</el-radio>
                  </p>
                  <p>
                    <el-radio :label="9">计件悬赏，合格一稿，支付一稿（稿件数量≥2件)</el-radio>
                  </p>
                </el-radio-group>
                <br />
                <br />
                <p>您打算如何分配该赏金呢？</p>
                <div>
                  <div>
                    <el-select size="mini" v-model="radio_1_v" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>入围，他们将均分
                    <span>10%</span>赏金
                  </div>
                </div>
                <br />
                <p>您希望用多长时间来完成这个任务？</p>
                <div>
                  在
                  <el-date-picker
                    size="mini"
                    v-model="value2"
                    type="date"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1"
                  ></el-date-picker>截止投稿时间
                </div>
              </div>
            </div>

            <!--------------------------投标模式---------------------------->
            <h4>
              <el-radio v-model="radio_service_type" disabled label="2">投标模式</el-radio>
            </h4>
            <div class="text m-disabled">
              <p>先选中标凌客，TA再工作。找到中标凌客后托管赏金。</p>
              <p>适合开发周期较长的开发、装修类任务。</p>
            </div>
            <div v-show="false" class="select-box">
              <p>您打算支付多少赏金呢？</p>
              <p class="item-p">
                <el-radio v-model="radio" label="1">备选项</el-radio>
              </p>
              <p class="item-p">
                <el-radio v-model="radio" label="2">备选项</el-radio>
              </p>
              <br />
              <p>您希望用多长时间来寻找满意的合作者？</p>
              <div>
                在
                <el-date-picker
                  size="mini"
                  v-model="value2"
                  type="datetime"
                  placeholder="什么时候"
                  align="right"
                  :picker-options="pickerOptions1"
                ></el-date-picker>日截止报名
              </div>
            </div>
            <!--------------------------信息模式---------------------------->
            <h4>
              <el-radio v-model="radio_service_type" label="3">信息模式</el-radio>
            </h4>
            <div class="text">
              <p>广告主发布广告需求，符合媒体匹配对应的需求信息。</p>
            </div>
            <div class="list-box select-box set-flex-box">
              <div class="item-div-1">
                <div class="itemDiv release_form">
                  <P>选择广告投放时间</P>
                  <el-form-item>
                    <el-date-picker
                      size="mini"
                      v-model="startEndDate"
                      type="daterange"
                      @change="choiceDate"
                      choiceDate
                      @blur="starBlur"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions1"
                      :default-time="['00:00:00', '23:59:59']"
                    ></el-date-picker>
                    <div class="select-err" v-if="flagDate">
                      <span>{{tipsContent}}</span>
                    </div>
                  </el-form-item>
                </div>
                <div class="itemDiv release_form">
                  <p>投放预算</p>
                  <el-form-item prop="budget_money">
                    <div class="flex">
                      <el-input
                        maxlength="8"
                        class="w193"
                        v-model="eForm.budget_money"
                        @blur="starMoney"
                        size="mini"
                      ></el-input>
                      <span>元</span>
                      <div class="select-err" v-if="flagMoney">
                        <span>{{tipsContent}}</span>
                      </div>
                    </div>
                  </el-form-item>
                </div>
                <div class="itemDiv release_form">
                  <p>您需要用多少时间完成来完成这个广告线索采购：</p>
                  <el-form-item>
                    <span class="form_span">在</span>
                    <el-date-picker
                      popper-class="datePicker"
                      size="mini"
                      v-model="eForm.end_time"
                      @blur="starEndtime"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions1"
                    ></el-date-picker>
                    <span class="form_span">截止</span>
                    <div class="select-err" v-if="flagEndtime">
                      <span>{{tipsContent}}</span>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="item-div-2">
                <div class="release_form">
                  <p>客户类型</p>
                  <el-form-item>
                    <el-select
                      size="mini"
                      v-model="eForm.type_id"
                      placeholder="请选择"
                      @blur="starType"
                    >
                      <el-option
                        v-for="item in ClueCustomerType"
                        :key="item.id"
                        :label="item.customer_type"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <div class="select-err" v-if="flagType">
                      <span>{{tipsContent}}</span>
                    </div>
                  </el-form-item>
                </div>
                <div class="release_form">
                  <p>客户领域</p>
                  <el-form-item>
                    <el-select
                      size="mini"
                      v-model="eForm.field_id"
                      placeholder="请选择"
                      @blur="starRealm"
                    >
                      <el-option
                        v-for="item in ServiceRealm"
                        :key="item.id"
                        :label="item.sr_name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <div class="select-err" v-if="flagRealm">
                      <span>{{tipsContent}}</span>
                    </div>
                  </el-form-item>
                </div>
                <div class="release_form">
                  <p>投放区域</p>
                  <el-form-item class="choice-area">
                    <el-button
                      v-if="addressString.length==0"
                      size="mini"
                      class="m-upload-btn active_32"
                      @click="regionFlag = true"
                    >选择投放区域</el-button>
                    <div
                      v-else-if="addressString.length > 0"
                      class="address-string"
                      :title="addressString"
                    >{{addressString}}</div>
                    <div
                      v-if="addressString.length > 0"
                      class="edit-text"
                      @click="regionFlag = true"
                    >修改</div>
                    <div class="select-err" v-if="flagCity">
                      <span>{{tipsContent}}</span>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="item-box box2" v-if="service.length > 0">
      <h3>您可能还需要这些服务</h3>
      <div class="list-box">
        <div class="list-wrap">
          <el-checkbox-group v-model="check" @change="handleCheckedCitiesChange">
            <ul>
              <li v-for="(item,index) in service" :key="index">
                <div>
                  <div class="left">
                    <el-checkbox :label="item.id"></el-checkbox>
                    <span class="active">{{item.short}}</span>
                    <div>
                      <strong>{{item.inc_name}}</strong>
                      <p>{{item.description}}</p>
                    </div>
                  </div>
                  <br v-if="item.id==4" />
                  <div class="m-select-item" v-if="item.id==4">
                    <el-cascader
                      :props="prosDatas"
                      placeholder="请选择地址"
                      class="prosDatas"
                       :disabled="prosDatasOtherFlag"
                      :options="areaList"
                      v-model="selectAreaid"
                      popper-class="addArea"
                      clearable
                      @change="selectHandleChange"
                    ></el-cascader>
                    <div class="select-err" v-if="flagPros">
                      <span>{{tipsContent}}</span>
                    </div>
                  </div>
                  <br v-if="item.id==6" />
                  <div class="m-select-item" v-if="item.id==6">
                    <el-select
                      v-model="level"
                      @change="choiceLevel"
                      :disabled="selectFlag"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in levelData"
                        :key="item.id"
                        :label="item.bl_name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <div class="select-err" v-if="flagLevel">
                      <span>{{tipsContent}}</span>
                    </div>
                  </div>
                </div>
                <div class="right">￥{{item.price}}</div>
              </li>
            </ul>
          </el-checkbox-group>
        </div>
        <div class="bottom-btn">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        </div>
      </div>
    </div>
    <div class="item-box box3">
      <h3>结算清单</h3>
      <strong class="sub-title">附加服务：</strong>
      <div class="inc-list-wrap" v-if="eForm.inc.length>0">
        <p v-for="(item,index) in eForm.inc" :key="index">
          <strong>{{item.inc_name}}：</strong>
          <span>￥{{item.price}}</span>
        </p>
      </div>
      <div class="text">
        <span>应付总额：</span>
        <strong>
          <span class="color_red font22">￥{{priceTotal.toFixed(2)}}</span>
        </strong>
      </div>
      <div class="agreen">
        <el-checkbox v-model="agree">
          我已同意
          <nuxt-link
            class="agreen_link"
            :to="{path:'/aboutUs/regulation/regulation',query:{type:'4'}}"
            target="_blank"
          >《线索发布协议》</nuxt-link>
        </el-checkbox>
      </div>
      <div class="release-btn">
        <el-button @click="submitForm" :loading="showLoadi">发布线索</el-button>
      </div>
    </div>

    <div class="template" v-show="tpShow">
      <div class="content" v-if="tpList&&tpList.length>0">
        <div class="inner">
          <div class="head">
            <strong>插入模板</strong>
            <a @click="tpShow=!tpShow" href="javascript:;">
              <i class="el-icon-close"></i>
            </a>
          </div>
          <ul class="tab">
            <li
              :class="tpIdx == idx ? 'active':''"
              @click="tpIdx=idx"
              v-for="(item,idx) in tpList"
              :key="idx"
            >
              <a href="javascript:;">{{item.title}}</a>
            </li>
          </ul>
          <div class="msg">
            <h2 class="title">{{tpList[tpIdx].title}}</h2>
            <div class="con" v-html="tpList[tpIdx].content"></div>
          </div>
          <div class="button">
            <button @click="tpClickHandle">插入模板</button>
          </div>
        </div>
      </div>
    </div>
    <!--      地区选择弹框-->
    <region-list
      v-if="regionFlag"
      :list="selectArea"
      @close="_handleClose"
      @submit="_handleSubmit"
    />
  </div>
</template>

<script>
import TipsCpn from "~/components/TipsCpn";
import area from "@/assets/js/area";
import RegionList from "@/components/RegionList";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import { regionData } from "~/plugins/regionData";
import { addReleaseData,getInfo,editReleaseData } from "@/api/release";
import {removeFile} from '@/api/common'
import {fast_login_new} from '@/api/store-flow'

import citydata from "@/utils/city.json";
import REGION_DATA from "@/utils/data";
import { getCookie } from "../../../utils";
import dataEventTrack from '@/utils/dataEventTrack';

export default {
  name: "release-main",
  components: { RegionList, TipsCpn },
   head() {
    return {
      title:
        "发布线索 - 凌天众媒网",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "想找广告线索，线索发布，想找广告资源，需求发布，发布线索上凌天众媒网（zhongmei66.com）"
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "发布线索，发布广告线索，发布需求，发布广告需求，发布广告线索上凌天众媒网"
        }
      ]
    };
  },
  data() {
    return {
      area:JSON.parse(JSON.stringify(area)),
      showListFlag: false,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      regionFlag: false,
      startEndDate: [],
      addressString: "",
      optionProvince: [],
      selectArea: [],
      selectAreaId: [],
      chooicearealist: [],
      chooicearea: [],
      priceTotal: 0,
      map: {},
      prosDatasOtherFlag: true,
      tipsFlag: false,
      tipsContent: "",
      text: "获取验证码", // 按钮文字
      ctrBtn: false, // 控制按钮可点击
      agree: false,
      options: [
        {
          value: "2",
          label: "2人"
        },
        {
          value: "3",
          label: "3人",
          disabled: true
        },
        {
          value: "4",
          label: "4人"
        },
        {
          value: "5",
          label: "5人"
        }
      ],
      selectFlag: true,
      radio_service_type: "3",
      isIndeterminate: false,
      checkedServiceId: [],
      levelData: [],
      level: null,
      prosDatas: {
        value: "id",
        label: "name",
        children: "child"
      },
      prosDatas_other: {
        value: "id",
        label: "name",
        children: "child"
      },
      upload_imgs: [],
      eForm: {
        category: {},
        title: "",
        city: [],
        mobile_status: "N",
        content: "", //内容
        mobile: "", //手机号
        name: "",
        wechat: "",
        email: "",
        qq: "",
        clue_start_time: "",
        clue_end_time: "",
        end_time: "",
        budget_money: "",
        type_id: "",
        verification_code: "",
        verification_key: "",
        field_id: "",
        inc: [],
        annex: []
      },
      service: [],
      ClueCustomerType: [],
      ServiceRealm: [],
      checkAll: false,
      check: [],
      self_upload_name: { name: "cs" },
      headers: {},
      userInfoRules: {
        // title: [
        //   {
        //     required: true,
        //     message: "请填写标题",
        //     trigger: ["blur", "change"]
        //   }
        // ],
        content: [
          {
            required: true,
            message: "内容不能为空",
            trigger: ["blur", "change"]
          }
        ],
        name: [
          {
            required: true,
            message: "请填写姓名",
            min:2,
            trigger: ["blur", "change"]
          },
          {
            pattern: /^([\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}|[a-zA-Z\\.\\s]{2,20})$/,///^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/,
            message: "请填写真实姓名",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: ["blur", "change"]
          },
          {
            pattern:/^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/,
            message: "请检查手机号是否正确",
            trigger: "blur"
          }
        ],
        budget_money: [
          {
            pattern: /^[1-9]\d{2,}[\.]?\d*/,
            message: "投放预算请输入大于100的数字",
            trigger: "blur"
          }
        ],
        email: [
          {
            pattern:/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            message: "请检查邮箱是否正确",
            trigger: "blur"
          }
        ],
        qq: [
          {
            pattern: /^[1-9][0-9]{4,10}$/,
            message: "请输入正确的QQ号",
            trigger: "blur"
          }
        ],
        wechat: [
          {
            pattern: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
            message: "微信必须是6-20位字母、数字、下划线和减号,必须以字母开头",
            trigger: "blur"
          }
        ]
      },
      selectShowList: {},
      selectShowListChildArr: "",
      eFormRues: {},
      tpList: [],
      tpShow: false,
      tpIdx: 0,
      listShow: false,
      timer: null,
      index: -1,
      lIndex_child: 0,
      list: [],
      list_child: [],
      list_son: [],
      regionData,
      radio: "1",
      radio_1: "3",
      radio_1_v: "",
      height: 0,
      timeTop: null,
      value2: "",
      showTips: false,
      content: "",
      placeholder: "tes",
      editorOption: {
        placeholder:
          "请把需求再补充详细一些吧。越清晰具体，任务质量越高哦！友情提示：您还可以查看模板或者花点小钱让客服帮您完善需求。。。",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "link", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction
            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ["clean"]
          ]
        }
      },
      flagclass: false,
      flagInput: false,
      flagText: false,
      flagCode: false,
      flagWechat: false,
      flagQQ:false,
      flagDate: false,
      flagMoney: false,
      flagEndtime: false,
      flagType: false,
      flagRealm: false,
      flagCity: false,
      flagPros: false,
      flagLevel: false,
      province: "",
      city: "",
      regionId: "",
      showLoadi:false,
      areaList:[],
    };
  },
  watch: {
    selectShowList(newArr, oldArr) {
      this.selectShowListChildArr = [];
      if (newArr.child.length > 0) {
        newArr.child.forEach((res, index) => {
          this.selectShowListChildArr[index] = newArr.cate_name + ">";
          this.selectShowListChildArr[index] += res.cate_name;
          this.selectShowListChildArr[index] += ">";
          res.child.forEach(item => {
            if (item.selected === true) {
              this.selectShowListChildArr[index] += item.cate_name;
              this.selectShowListChildArr[index] += " 、";
            }
          });
        });
        this.showListFlag = true;
      } else {
        this.showListFlag = false;
      }
    }
  },
  created() {
    this.getInfo();
    this.areaList = JSON.parse(JSON.stringify(area))
  for (var i = 0; i < this.areaList.length; i++) {
      if (this.areaList[i].name === "全国") {
        this.areaList.splice(i, 1);
      }
      if (this.areaList[i].child) {
        var a = this.areaList[i].child;
        for (var j = 0; j < a.length; j++) {
          a[j].child = "";
        }
      }
    }
  },
  methods: {
    deleteEnclosure(index) {
      this.upload_imgs.splice(index, 1);
    },
    _handleSubmit(params) {
      this.selectArea = params;
      this.eForm.city = params.map(item => item.id);
      this.addressString = params.map(item => item.cityes).toString();
      this._handleClose();
    },
    _handleClose() {
      this.regionFlag = false;
      this.flagCity = false;
    },
    //地区搜索
    async selectHandleChange(items) {
        this.province = items[0] ? items[0] : "";
      this.city = items[1] ? items[1] : "";
       this.regionId = items;
      for (var i = 0; i < this.eForm.inc.length; i++) {
        if (this.eForm.inc[i].id == 4) {
          this.eForm.inc[i].city_id = this.city;
        }
      }
    },
    /** 处理按钮倒计时 **/
    countTime() {
      clearInterval(this.timer);
      let _times = 60;
      let _speed = 1000;
      let _t = this.text;
      this.timer = setInterval(() => {
        this.ctrBtn = true;
        _times--;
        this.text = `重新获取(${_times})`;
        if (_times <= 0) {
          this.text = "重获验证码";
          this.ctrBtn = false;
          clearInterval(this.timer);
        }
      }, _speed);
    },
    /*注册*/
    getCodeHandle() {
      this.ctrBtn = true;
      let _this = this;
      fast_login_new({ mobile: _this.eForm.mobile })
        .then(res => {
          localStorage.setItem("dataPhone", JSON.stringify(this.eForm.mobile));
          let { code, message, data } = res.data;
          if (code && code == 200) {
            _this.eForm.verification_key = data.key;
            localStorage.setItem("verification_key", JSON.stringify(data.key));
            _this.$message({
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
          _this.$message.error(err.data.message);
          _this.ctrBtn = false;
        });
    },
    // 标题失去焦点事件
    titleBlur() {
      if (
        this.eForm.title != "" &&
        this.eForm.title.length > 2 &&
        this.eForm.title.length < 30
      ) {
        this.flagInput = false;
      }
    },
    async submitForm() {


      this.flagclass = false
        this.flagInput = false
        this.flagText = false
        this.flagCode = false
        this.flagWechat = false
        this.flagDate = false
        this.flagMoney = false
        this.flagEndtime = false
        this.flagType = false
        this.flagRealm = false
        this.flagCity = false
        this.flagPros = false
        this.flagLevel = false
      let _this = this;
      let validFlag = true;
      let thisForm = JSON.parse(JSON.stringify(_this.eForm));

      if (!thisForm.category.class||thisForm.category.list&&thisForm.category.list.length<1) {
        this.flagclass = true;
        this.tipsContent = "请选择分类";
        this.height = 100;
        this.scroll();
        return;
      }
      if (!this.eForm.category.class||this.eForm.category.list&&this.eForm.category.list.length<1) {
        this.flagclass = true;
        this.tipsContent = "请选择分类";
        this.height = 100;
        this.scroll();
        return;
      }
      if (thisForm.title == "") {
        this.flagInput = true;
        this.tipsContent = "请填写标题";
        this.height = 300;
        this.scroll();
        return;
      }
      if (thisForm.title.length < 2 || thisForm.title.length > 30) {
        this.flagInput = true;
        this.tipsContent = "标题应为2-30个字";
        this.height = 300;
        this.scroll();
        return;
      } else {
        this.flagInput = false;
      }
      if (thisForm.content == "") {
        this.flagText = true;
        this.tipsContent = "请填写详情内容";
        this.height = 300;
        this.scroll();
        return;
      } else {
        this.flagText = false;
      }
      if (thisForm.content.length < 12 || thisForm.content.length > 1500) {
        this.flagText = true;
        this.tipsContent = "详细内容应大于5个字，少于1500个字";
        this.height = 300;
        this.scroll();
        return;
      } else {
        this.flagText = false;
      }
      if (!localStorage.getItem("cluesPubInfo")) {
        this.$refs.eForm.validate(valid => {
          if (valid) {
            validFlag = true;
          } else {
            validFlag = false;
            var p = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/;
            var n = /^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/;
            var w = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
            var q = /^[1-9][0-9]{4,10}$/;
            var e = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (this.eForm.title == "") {
              this.height = 300;
              this.scroll();
              return;
            }
            if (this.eForm.name == "" || !n.test(this.eForm.name)) {
              this.height = 600;
              this.scroll();
              return;
            }
            if (this.eForm.mobile == "" || !p.test(this.eForm.mobile)) {
              this.height = 600;
              this.scroll();
              return;
            }
            if (this.eForm.wechat == "" || !w.test(this.eForm.wechat)) {
              this.height = 700;
              this.scroll();
              return;
            }
            if (this.eForm.qq == "" || !q.test(this.eForm.qq)) {
              this.height = 750;
              this.scroll();
              return;
            }
            if (this.eForm.email == "" || !e.test(this.eForm.email)) {
              this.height = 800;
              this.scroll();
              return;
            }
          }
        });
        if (!validFlag) {
          return false;
        }
      }

      if (thisForm.name == "") {
        this.tipsFlag = true;
        this.tipsContent = "请输入联系人姓名";
        this.height = 600;
        this.scroll();
        return;
      }
      if (thisForm.name.length < 2 || thisForm.name.length > 20) {
        this.tipsFlag = true;
        this.tipsContent = "姓名应大于2个字，少于20个字";
        this.height = 600;
        this.scroll();
        return;
      }
      if (thisForm.mobile == "") {
        this.tipsFlag = true;
        this.tipsContent = "请填写手机号";
        this.height = 600;
        this.scroll();
        return;
      }
      if (thisForm.verification_key == "") {
        this.flagCode = true;
        this.tipsContent = "请获取手机验证码";
        this.height = 600;
        this.scroll();
        return;
      }
      if (thisForm.verification_code == "") {
        this.flagCode = true;
        this.tipsContent = "请输入手机验证码";
        this.height = 600;
        this.scroll();
        return;
      }
      if (thisForm.wechat == "" && thisForm.qq == "" && thisForm.email == "") {
        this.flagWechat = true;
        this.tipsContent = "微信,qq,email至少填写一项";
        this.height = 700;
        this.scroll();
        return;
      }
      if (thisForm.qq.length > 0) {
        if (thisForm.qq.length < 6 || thisForm.qq.length > 15) {
          this.flagQQ = true;
          this.tipsContent = "qq号码必须是6-15位的数字";
          this.height = 700;
          this.scroll();
          return;
        }
      }
      if (thisForm.wechat.length > 0) {
        if (thisForm.wechat.length < 6 || thisForm.wechat.length > 20) {
          this.flagWechat = true;
          this.tipsContent = "微信必须是6-20位";
          this.height = 800;
          this.scroll();
          return;
        }
      }
      if (thisForm.clue_start_time == "" || thisForm.clue_start_time == null) {
        thisForm.clue_start_time == "";
        this.flagDate = true;
        this.tipsContent = "请选择广告投放开始时间";
        this.height = 1600;
        this.scroll();
        return;
      }
      if (thisForm.clue_end_time == "" || thisForm.clue_end_time == null) {
        thisForm.clue_end_time == "";
        this.flagDate = true;
        this.tipsContent = "请选择广告投放结束时间";
        this.height = 1600;
        this.scroll();
        return;
      }
      if (thisForm.end_time == "" || thisForm.end_time == null) {
        thisForm.end_time == "";
        this.flagEndtime = true;
        this.tipsContent = "请选择广告线索采购截至时间";
        this.height = 1600;
        this.scroll();
        return;
      }
      if (thisForm.budget_money == "") {
        this.flagMoney = true;
        this.tipsContent = "请输入投放预算";
        this.height = 1600;
        this.scroll();
        return;
      }
      if (thisForm.type_id == "") {
        this.flagType = true;
        this.tipsContent = "请选择客户类型";
        this.height = 1600;
        this.scroll();
        return;
      }

      if (thisForm.field_id == "") {
        this.flagRealm = true;
        this.tipsContent = "请选择客户领域";
        this.height = 1600;
        this.scroll();
        return;
      }
      if (thisForm.city.length == 0) {
        this.flagCity = true;
        this.tipsContent = "选择投放区域";
        this.height = 1600;
        this.scroll();
        return;
      }

      if (thisForm.inc.length == 0) {
        delete thisForm.inc;
      } else {
        let idx_city = this.eForm.inc.findIndex(res => {
          return res.id == 4;
        });
        if (idx_city > -1) {
          if (!thisForm.inc[idx_city].city_id) {
            
            this.flagPros = true;
            this.tipsContent = "请选择地域";
            this.height = 2000;
            this.scroll();
            return;
          }
        }
        let idx = this.eForm.inc.findIndex(res => {
          return res.id == 6;
        });
        if (idx > -1) {
          if (!thisForm.inc[idx].grade) {
            this.flagLevel = true;
            this.tipsContent = "请选择服务商等级";
            this.height = 2000;
            this.scroll();
            return;
          }
        }
      }

      let annexArr = _this.upload_imgs;
      let imgArr = {};
      if (annexArr.length > 0) {
        annexArr.forEach((res, index) => {
          let keyName = "annex" + index;
          imgArr[keyName] = res.url;
        });
        thisForm.annex = imgArr;
      }
      if (thisForm.wechat == "") {
        delete thisForm.wechat;
      }
      if (thisForm.qq == "") {
        delete thisForm.qq;
      }
      if (thisForm.email == "") {
        delete thisForm.email;
      }
      thisForm.end_time = thisForm.end_time + " 23:59:59";
      if (!_this.agree) {
        _this.$message.error("请点击同意协议");
        return;
      }
        // 发布线索页曝光事件埋点
      let incData = this.eForm.inc
      let service_ids = [];
      let service_pics = [];
      for(let z=0;z<incData.length;z++){
       service_ids.push(incData[z].id)
       service_pics.push(incData[z].price)
      }
      service_ids = service_ids.join()
      service_pics = service_pics.join()
      dataEventTrack({
          referer: document.referrer,
          event_type: 'click',
          kv: {
            router: '/clues/release',
            rname:'发布线索',
            inc_service_id:service_ids,
            inc_service_price:service_pics
          }
        })
      this.showLoadi = true
      let addResponse = await addReleaseData({ ...thisForm });
        setTimeout(()=>{
          this.showLoadi = false
        },500)
       if(addResponse == undefined) return
      const {code , data , message} = addResponse.data   
      if(code != 200) return this.$message.error(message)
      if (!data) {
        localStorage.setItem("cluesPubInfo", JSON.stringify(this.eForm));
        localStorage.setItem(
          "selectShowList",
          JSON.stringify(this.selectShowList)
        );
        localStorage.setItem(
          "selectShowListChildArr",
          JSON.stringify(this.selectShowListChildArr)
        );
         setTimeout(()=>{
          this.showLoadi = false
        },500)
        return;
      } else {
        localStorage.removeItem("cluesPubInfo");
        localStorage.removeItem("selectShowListChildArr");
        localStorage.removeItem("selectShowList");
        localStorage.removeItem("dataPhone");
        if (!data.order_sn) {
          this.$router.push(`/clues/${data}`);
        } else {
          this.$router.push(
            "/payment?order_sn=" + data.order_sn + "&type=2"
          );
        }
      }
      setTimeout(()=>{
        this.showLoadi = false
      },500)
            
    },
    scroll() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      this.timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top = this
          .height;
        if (top > 0) {
          clearInterval(this.timeTop);
        }
      }, 10);
    },
    beforeDestroy() {
      clearInterval(this.timeTop); // 清除定时器
    },
    handleCheckAllChange(val) {
      let _this = this;
      this.check = val ? this.checkedServiceId : [];
      this.isIndeterminate = false;
      if (val) {
        _this.eForm.inc = [];
        _this.prosDatasOtherFlag = false;
        _this.selectFlag = false;
        _this.priceTotal = 0;
        _this.service.forEach((res, index) => {
          let itemPrice = res.price - 0;
          _this.priceTotal = _this.priceTotal + itemPrice;
          _this.eForm.inc.push(res);
        });
      } else {
        _this.priceTotal = 0;
        _this.eForm.inc = [];
        _this.prosDatasOtherFlag = true;
        _this.selectFlag = true;
      }
    },
    cityChange(item) {
      this.flagPros = false;
      let idx = this.eForm.inc.findIndex(res => {
        return res.id == 4;
      });
      this.eForm.inc[idx].city_id = item[1];
    },
    choiceLevel(item) {
      this.flagLevel = false;
      let idx = this.eForm.inc.findIndex(res => {
        return res.id == 6;
      });
      this.eForm.inc[idx].grade = item;
    },
    handleCheckedCitiesChange(value) {
      let _this = this;
      let checkedCount = value.length;
      _this.eForm.inc = [];
      let flagInc = value.find(incItem => {
        return incItem == 4;
      });
      let selectFlag = value.find(selectItem => {
        return selectItem == 6;
      });
      if (flagInc) {
        _this.prosDatasOtherFlag = false;
      } else {
        _this.prosDatasOtherFlag = true;
      }
      if (selectFlag) {
        _this.selectFlag = false;
      } else {
        _this.selectFlag = true;
      }
      _this.priceTotal = 0;
      value.forEach((res, index) => {
        let itemInc = _this.service.find(item => {
          return item.id == res;
        });
        let itemPrice = itemInc.price - 0;
        _this.priceTotal = _this.priceTotal + itemPrice;
        _this.eForm.inc.push(itemInc);
      });
      this.checkAll = checkedCount === this.service.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.service.length;
    },
    /*---------upload预览----------------*/
    async handlePictureCardPreview(file) {},
    choiceDate(item) {
      if (item != null) {
        this.eForm.clue_start_time = moment(item[0]).format("YYYY-MM-DD");
        this.eForm.clue_end_time = moment(item[1]).format("YYYY-MM-DD");
      }else{
        this.eForm.clue_start_time = ''
        this.eForm.clue_end_time = ''
      }
    },
    /*---------upload删除----------------*/
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
    /*---------upload删除前----------------*/
    async handleRemoveBefore(file, fileList) {},
     slefUploadBefore(file) {
          this.headers = { Authorization: "Bearer " + getCookie("access_token") };
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      } else {
        this.headers = { Authorization: "Bearer " + getCookie("access_token") };
      }
      let isLength = this.upload_imgs.length < 5;
      if (!isLength) {
        this.$message.error("最多可上传5个文件");
        return false;
      } else {
        this.headers = { Authorization: "Bearer " + getCookie("access_token") };
      }
      return isJPG || isBMP || isGIF || isPNG || isLt2M || isLength;
    },
    async upload_success(response, file, fileList) {
      let { code, message, data } = response;
      this.upload_imgs.push({
        url: data.domain + "/" + data.file,
        name: file.name,
        size: file.size,
        status: "finished",
        domain: data.domain + "/",
        path: data.file,
        uid: file.uid
      });
      this.$message.success("上传成功");
    },
    exceedHandle() {
      this.$message.error("只能上传五张");
    },
    // 插入模板
    tpClickHandle() {
      if (this.eForm.title == this.tpList[this.tpIdx].title) {
        this.$message.error("已经选择该模版，请不要重复选择");
        return false;
      }
      this.eForm.title = this.tpList[this.tpIdx].title;
      this.eForm.content = this.tpList[this.tpIdx].content;
      this.tpShow = !this.tpShow;
    },
    listMouseOut() {
      this.index = -1;
      this.listShow = false;
    },
    showClick() {
      this.listShow = true;
      this.flagclass = false;
    },
    listSelectFormat(pi, ci) {
      this.list.forEach((item, idx) => {
        if (pi !== idx) {
          this.map = {};
          if (item.child) {
            item.child.forEach((item2, idx2) => {
              this.$set(this.list[idx].child[idx2], "selected", false);
              if (item2.child) {
                item2.child.forEach((item3, idx3) => {
                  this.$set(
                    this.list[idx].child[idx2].child[idx3],
                    "selected",
                    false
                  );
                });
              }
            });
          }
        }
        let arr = this.list[pi].child;
        if (this.list[pi].child) {
          this.$set(this.list[pi].child[ci], "selected", true);
          arr = arr.filter(item => item.selected && item.child);
          this.map.child = JSON.parse(JSON.stringify(arr));
          this.map.cate_name = this.list[pi].cate_name;
          this.selectShowList = this.map;
        }
      });
    },
    secondSelectHandle(s, pi, ci, val) {
      this.map = {};
      if (this.list[pi].id != this.eForm.category.class) {
        this.eForm.category = { class: "", list: [] };
      }

      // 切换一级选项卡时，清空其他选项的选中状态
      this.list.forEach((item, idx) => {
        if (pi !== idx) {
          if (item.child) {
            item.child.forEach((item2, idx2) => {
              this.$set(this.list[idx].child[idx2], "selected", false);
              if (item2.child) {
                item2.child.forEach((item3, idx3) => {
                  this.$set(
                    this.list[idx].child[idx2].child[idx3],
                    "selected",
                    false
                  );
                });
              }
            });
          }
        }
      });
      let arr = this.list[pi].child[ci].child;
      if (arr && arr.length) {
        arr.forEach((el, i) => {
          if (el.pid == val) {
            if (s) {
              this.$set(this.list[pi].child[ci].child[i], "selected", true);
              this.eForm.category.class = this.list[pi].id;
              this.eForm.category.list.push(
                this.list[pi].child[ci].child[i].id
              );
            } else {
              let eformCategory = this.eForm.category.list;
              this.eForm.category.list.splice(
                eformCategory.findIndex(
                  res => res == this.list[pi].child[ci].child[i].id
                ),
                1
              );
              this.$set(this.list[pi].child[ci].child[i], "selected", false);
            }
          }
        });
      }
      // 处理点击二级选项时，添加到列表里
      let arrList = this.list[pi].child;
      arrList = arrList.filter(item => item.selected && item.child);
      this.map.child = JSON.parse(JSON.stringify(arrList));
      this.map.cate_name = this.list[pi].cate_name;
      this.selectShowList = this.map;
    },
    thirdSelectHandle(s, pi, ci, val1, val2) {
      let _this = this;
      _this.listSelectFormat(pi, ci);
      let arr = this.list[pi].child[ci].child;
      if (this.list[pi].id != this.eForm.category.class) {
        this.eForm.category = { class: "", list: [] };
      }
      if (arr && arr.length > 0) {
        arr.forEach((el, i) => {
          if (el.id == val2) {
            if (s) {
              this.$set(this.list[pi].child[ci].child[i], "selected", true);
              this.eForm.category.class = this.list[pi].id;
              this.eForm.category.list.push(
                this.list[pi].child[ci].child[i].id
              );
            } else {
              let eformCategory = _this.eForm.category.list;
              _this.eForm.category.list.splice(
                eformCategory.findIndex(
                  res => res == _this.list[pi].child[ci].child[i].id
                ),
                1
              );
              _this.$set(this.list[pi].child[ci].child[i], "selected", false);
            }
          }
        });
      }
      // 处理点击三级选项时，添加到列表里
      let arrChild = JSON.parse(JSON.stringify(_this.list[pi].child[ci].child));
      arrChild = arrChild.filter(item => item.selected);
      if (arrChild.length == 0) {
        this.$set(this.list[pi].child[ci], "selected", false);
        let index = this.map.child.findIndex(res => {
          return res.id == this.list[pi].child[ci].child[0].pid;
        });
        this.map.child.splice(index, 1);
      } else {
        let idx = this.map.child.findIndex(res => {
          return res.id == arrChild[0].pid;
        });
        this.map.child[idx].child = arrChild;
      }
      this.selectShowList = this.map;
    },
    list_child_hover(index) {
      this.index = index;
    },
    async editReleaseInfo(id) {
      let _this = this;
      let releaseInfo = await editReleaseData(id);
      const { code, message, data } = releaseInfo.data;
      if (code == 200) {
        _this.eForm.title = data.clue.title;
        _this.eForm.content = data.clue.content;
        _this.eForm.mobile_status = data.clue.mobile_status;
        _this.eForm.clue_start_time = data.clue.clue_start_time;
        _this.eForm.clue_end_time = data.clue.clue_end_time;
        _this.startEndDate = [
          moment(data.clue.clue_start_time),
          moment(data.clue.clue_end_time)
        ];
        _this.eForm.type_id = data.clue.type_id;
        _this.eForm.budget_money = data.clue.budget_money;
        _this.eForm.field_id = data.clue.field_id;
        _this.eForm.end_time = data.clue.end_time;
      }
    },
    async getInfo() {
      let _this = this;
      let result = await getInfo();
      let { code, message, data } = result.data;
      if (code == 200) {
        this.list = data.Category;
        this.tpList = data.Template.slice(0, 6);
        this.list.forEach((ele, i) => {
          if (ele.child) {
            ele.child.forEach((item, idx) => {
              this.$set(this.list[i].child[idx], "pid", ele.id);
              this.$set(this.list[i].child[idx], "selected", false);
              if (item.child) {
                item.child.forEach((con, sidx) => {
                  this.$set(
                    this.list[i].child[idx].child[sidx],
                    "pid",
                    item.id
                  );
                  this.$set(
                    this.list[i].child[idx].child[sidx],
                    "selected",
                    false
                  );
                });
              }
            });
          }
        });
        this.service = data.service.filter(item => item.is_show > 0);
        this.ClueCustomerType = data.ClueCustomerType;
        this.ServiceRealm = data.ServiceRealm;
        this.service.forEach(res => {
          _this.checkedServiceId.push(res.id);
        });
        if (!!localStorage.getItem("userInfo")) {
          var userInfo = JSON.parse(localStorage.getItem("userInfo"));
          this.eForm.mobile = userInfo.original.mobile;
        }
        if (!!localStorage.getItem("dataPhone")) {
          this.eForm.mobile = JSON.parse(localStorage.getItem("dataPhone"));
        }
        if (!!localStorage.getItem("verification_key")) {
          this.eForm.verification_key = JSON.parse(
            localStorage.getItem("verification_key")
          );
        }
        this.levelData = data.level;
      }
    },
    // 控制tips显示隐藏
    onHoverHandle() {
      this.showTips = true;
    },

    LeaveHanlde() {
      this.showTips = false;
    },

    onEditorBlur(editor) {
      if (
        this.eForm.content != "" &&
        this.eForm.content.length > 12 &&
        this.eForm.content.length < 1500
      ) {
        this.flagText = false;
      }
    },
    // 验证码失去焦点
    varCode() {
      if (
        this.eForm.verification_key != "" &&
        this.eForm.verification_code != ""
      ) {
        this.flagCode = false;
      }
    },
    // 微信 QQ 邮箱失去焦点
    varWQE() {
      if (
        this.eForm.wechat != "" ||
        this.eForm.qq != "" ||
        this.eForm.email != ""
      ) {
        this.flagWechat = false;
          this.flagQQ = false;
      }
    },
    // 选择广告投放时间失去焦点
    starBlur() {
      if (this.eForm.clue_end_time != "" || this.eForm.clue_end_time != null) {
        this.flagDate = false;
      }
    },
    starMoney() {
      if (this.eForm.budget_money != "") {
        this.flagMoney = false;
      }
    },
    starEndtime() {
      if (this.eForm.end_time != "" || this.eForm.end_time != null) {
        this.flagEndtime = false;
      }
    },
    starType() {
      if (this.eForm.type_id == "") {
        this.flagType = false;
      }
    },
    starRealm() {
      if (this.eForm.field_id == "") {
        this.flagRealm = false;
      }
    },
    onEditorFocus(editor) {},
    onEditorReady(editor) {},
    onEditorChange({ editor, html, text }) {
      this.eForm.content = html;
    },

    fn() {}
  },
  updated() {},
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.editReleaseInfo(id);
      return;
    }
    let clueData = JSON.parse(localStorage.getItem("clueData"));
    if (clueData) {
      this.eForm.content = clueData[0].content;
      this.eForm.title = clueData[1].title;
      localStorage.removeItem("clueData");
    }

    this.chooicearealist = JSON.parse(JSON.stringify(citydata));
    if (localStorage.getItem("selectShowListChildArr")) {
      this.selectShowListChildArr = JSON.parse(
        localStorage.getItem("selectShowListChildArr")
      );
    }
    if (localStorage.getItem("selectShowList")) {
      this.selectShowList = JSON.parse(localStorage.getItem("selectShowList"));
    }
    if (localStorage.getItem("cluesPubInfo")) {
      this.eForm = JSON.parse(localStorage.getItem("cluesPubInfo"));
      this.agree = true;
    }
    setTimeout(() => {
    }, 3000);
  // 发布线索页曝光事件埋点
  dataEventTrack({
       referer: document.referrer,
       event_type: 'page_show',
       kv: {
         router: '/clues/release',
       }
     })
  }
};
</script>
<style lang="less">
.addArea {
  & > .el-cascader-panel {
    height: 250px;
    overflow: hidden;
  }
}
.upload-demo {
  width: 126px;
  height: 38px;
  & > ul {
    display: none;
  }
  /deep/ .el-upload-list {
    display: none;

    li {
      justify-content: flex-start;
    }

    li.el-upload-list__item {
      margin-top: 10px;
      display: none;
      .el-icon-close {
        color: #f3262d !important;
      }

      .el-upload-list__item-status-label {
        margin-right: 12px;
      }
    }
  }
}
.form {
  & > .el-form-item {
    & > .el-form-item__content {
      line-height: 40px;
      position: relative;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
  }
}
.release-main {
  .ql-editor {
    p {
      max-height: 200px;
      width: 856px;
      overflow: auto;
    }
  }

  .el-checkbox__inner::after {
    transform: rotate(0) !important;
  }


  /deep/ .el-date-editor .el-range-input {
    font-size: 12px;
  }

  /*.w193 input,*/

  .fomr-item-1 input,
  .release-input-title input {
  }

  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success,
  .el-form-item.is-success .el-textarea__inner,
  .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #ccc !important;
    color: #333 !important;
  }

  .el-input__inner:hover {
    border-color: #ccc !important;
  }

  .el-input__inner {
    border-color: #ccc;
    border-radius: 0;
  }

  /*.w193 input:focus,*/

  .fomr-item-1 input:focus,
  .release-input-title input:focus,
  .release-input-title textarea:focus {
    box-shadow: 0px 0px 4px #5da6ff !important;
    border: 1px solid #5da6ff !important;
    border-color: #5da6ff !important;
  }

  .el-radio__label {
    color: #06c !important;
  }

  .is-disabled {
    .el-radio__label {
      color: #c0c4cc !important;
    }
  }

  .el-form-item__error {
    display: inline-block;
    position: static !important;
    padding-left: 22px;
    margin-left: 10px;
  }

  .font22 {
    font-size: 22px !important;
  }

  .color_red {
    color: #ff0027 !important;
  }

  .item-box {
    margin-top: 20px;
    border: 1px solid #e9e9e9;
    min-height: 200px;
    background: #fff;
    padding: 20px;
  }

  .mobile-public {
    height: 40px;
    line-height: 40px;
    width: 178px;
    border: 1px solid #e9e9e9;
    background: #fff;
    font-size: 12px;
    color: #666;
    position: relative;
    margin-left: 15px;
    padding-left: 11px;
    border-radius: 5px;
    display: inline-block;

    .after {
      position: absolute;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-right-color: #e9e9e9;
      left: -20px;
      top: 10px;
    }

    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      color: #0066cc;
    }

    .active {
      background: #f3262d;
      display: inline-block;
      border-radius: 4px;
      color: #fff;
      line-height: 20px;
    }
  }

  .address-box {
    display: flex;

    justify-content: left;
  }

  .address-string {
    border: 1px solid #ccc;
    width: 125px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    color: #666;
    background: #fff;
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
  }

  .choice-area .el-form-item__content {
    display: flex;
    justify-content: flex-start;
  }

  .edit-text {
    color: #0066cc;
    vertical-align: bottom;
    margin-left: 10px;
    width: 40px;
    height: 40px;
    font-size: 12px;
    line-height: 40px;
  }

  .tips_red {
    color: #f3262d;
    font-size: 12px;
    padding-left: 80px;

    img {
      vertical-align: middle;
    }
  }

  .box1 {
    h4 {
      font-size: 20px;
      color: #333333;
    }

    .other_h4 {
      a {
        font-size: 12px;
        color: #06c;
        text-decoration-line: none;
        outline: none;
        padding: 0 10px;
        font-weight: normal;

        &:hover {
          color: #f3262d;
        }
      }
    }

    .radio-box {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .select {
      position: relative;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .select-item {
        line-height: 48px;

        span {
          color: #666666;
          font-size: 16px;
          cursor: pointer;
        }

        span:hover {
          color: #f3262d;
        }

        a {
          text-decoration-line: none;
          color: #0066cc;
          font-size: 14px;
        }

        a:hover {
          color: #f3262d;
        }
      }
      .text-title {
        width: 888px;
      }
      .text-list {
        max-width: 790px;
        margin-right: 8px;
        padding: 7px 0 7px 12px;
        background-color: #fbfbfb;
        margin-bottom: 8px;
        border: 1px solid #cecece;
        border-radius: 3px;
        color: #666;
        font-size: 14px;
        display: inline-block;

        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .datas {
        position: absolute;
        border: 1px solid #dfdfdf;
        background: #fff;
        left: 0px;
        top: 41px;
        z-index: 11;
        display: flex;

        .parent {
          background: #f4f4f4;
          width: 140px;

          .parent-inner {
            line-height: 50px;
            border-bottom: 1px solid #dfdfdf;
            text-align: center;
            border-right: 1px solid #dfdfdf;

            &.active {
              background: #fff;
              border-right: none;
            }
          }

          .parent-inner:nth-last-child(1) {
            border-bottom: none;
          }

          a {
            color: #333333;
            text-decoration-line: none;
            outline: none;
          }
        }

        .child {
          width: 746px;

          .child_checkbox {
            color: #06c;

            .el-checkbox__inner {
              border: 1px solid #dcdfe6;
            }

            .is-checked {
              .el-checkbox__inner {
                border: 0;
              }

              .el-checkbox__inner::after {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: url("../../../assets/img/icon-checked.png")
                  no-repeat left top;
                background-size: 100% 100%;
                border: 0 !important;
              }
            }

            .el-checkbox__label {
              color: #06c;
              font-weight: 600;
            }
          }

          .child_inner {
            display: flex;
            padding-left: 20px;
            padding-right: 40px;

            .child_p {
              min-width: 120px;
              margin-top: 40px;
              padding-right: 20px;
              text-align: right;

              label {
                display: flex;
                justify-content: space-between;

                span:first-child {
                  display: block;
                  padding-top: 3px;
                }
              }
            }

            .child_p2 {
              margin-top: 40px;
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;

              div {
                padding-right: 12px;
                padding-bottom: 15px;
              }
            }
          }

          .son_checkbox {
            color: #666;

            .el-checkbox__inner {
              border: 1px solid #dcdfe6;
            }

            .el-checkbox__label {
              color: #e31939 !important;
            }

            .is-checked {
              .el-checkbox__inner {
                border: 0;
              }

              .el-checkbox__inner::after {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: url("../../../assets/img/icon-checked.png")
                  no-repeat left top;
                background-size: 100% 100%;
                border: 0 !important;
              }
            }
          }
        }
      }
    }

    .form {
      .release-input-title {
        margin-top: 20px;
        margin-bottom: 20px;
        width: 400px;

        input {
          height: 42px !important;
          line-height: 42px !important;
          border-radius: 0;
        }
      }

      .release-input-tips {
        position: relative;
        display: flex;
        align-items: center;
        color: #666;
        font-size: 12px;
        line-height: 1em;
        margin: 10px 0 14px;

        a {
          text-decoration-line: none;
          margin-left: 20px;
          color: #06c;

          &:hover {
            color: #f3262d;
          }
        }

        .tipes_box {
          position: absolute;
          left: 210px;
          top: -210px;
          z-index: 2;
          width: 216px;
          height: 204px;
          background: #fef7f2;
          border: 1px solid #dfdfdf;

          p {
            line-height: 20px;
            font-size: 12px;
            margin: 10px;
          }
        }
      }

      .fomr-item-1 {
        & > .el-form-item {
          & > .el-form-item__content {
            & > .flex {
              display: flex;
              align-items: center;
            }
          }
        }
        & > :nth-child(5) {
          & > .el-form-item__content {
            display: flex;
            align-items: center;
          }
        }
         & > :nth-child(6) {
          & > .el-form-item__content {
            display: flex;
            align-items: center;
          }
        }
        h3 {
          font-size: 20px;
          color: #212121;
          margin-bottom: 20px;
        }

        input {
          height: 40px !important;
          line-height: 40px !important;
        }

        .el-form-item__label {
          width: 80px;
          text-align: right;
        }

        .el-input {
          width: 220px !important;
        }
      }

      .select-model {
        .m-disabled {
          p {
            color: #9c9c9c !important;
          }
        }

        .h3-title {
          color: #333333;
          font-weight: bolder !important;
          font-size: 20px;
          margin-top: 50px;
        }

        .itme-1 {
          h4 {
            padding-top: 10px;

            .el-radio__label {
              font-size: 16px;
              font-weight: bolder;
            }
          }

          .text {
            padding-top: 10px;
            padding-bottom: 20px;

            p {
              padding-left: 20px;
              color: #333;
              font-size: 12px;
              line-height: 2;
            }
          }

          .select-box {
            padding: 20px;
            margin-left: 20px;
            background: #fff3f3;

            p {
              line-height: 2.8;
              padding-bottom: 10px;
            }

            .item-p {
              padding-top: 5px;
              padding-bottom: 5px;
              line-height: 1;
            }

            .set-item-p {
              p {
                padding-top: 5px;
                padding-bottom: 5px;
              }
            }

            .flex {
              display: flex;
              align-items: center;
              display: inline-block;

              .w90 {
                margin-right: 10px;
                width: 90px;
              }

              .w193 {
                width: 237px;
              }

              .w193 + span {
                margin-left: 4px;
              }
            }
          }

          .set-flex-box {
            display: flex;
            justify-content: space-between;

            .item-div-1 {
              width: 515px;
              // margin-right: 10px;

              p,
              .form_span {
                color: #333;
                line-height: 1;
              }

              .form_span {
                font-size: 12px;
              }
            }

            .item-div-2 {
              flex: 1;

              p {
                color: #333;
                line-height: 1;
              }
              .edit-text {
                cursor: pointer;
              }
            }
          }
        }

        .list-box {
          .el-form-item {
            .el-form-item__content {
              margin-left: 0 !important;
            }
          }
        }
        .list-box {
          & > div {
            & > .release_form {
              & > .el-form-item {
                & > .el-form-item__content {
                  display: flex;
                  align-items: center;
                  & > .flex {
                    display: flex;
                    align-items: center;
                  }
                }
              }
            }
          }
          & > .item-div-1 {
            & > div:nth-child(3) {
              & > .el-form-item {
                & > .el-form-item__content {
                  & > .el-input {
                    margin: 0 4px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .box2 {
    h3 {
      color: #333;
      font-size: 20px;
      margin-bottom: 20px;
    }

    .el-checkbox {
      line-height: 32px;
      margin-right: 14px;
      width: 14px;
    }

    .list-box {
      .list-wrap {
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          li {
            border-bottom: 1px dotted #e9e9e9;
            margin-bottom: 10px;
            margin-top: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            justify-content: space-between;
            width: 47%;

            .m-select-item {
              padding-left: 20px;
              padding-top: 20px;
              display: flex;
              align-items: center;
              .el-input__inner {
                border-radius: 0px;
                height: 34px;
              }
            }

            .right {
              padding-top: 10px;
              font-size: 14px;
              color: #ff0027;
            }

            .left {
              display: flex;

              & > .el-checkbox {
                & > .el-checkbox__input {
                  & > .el-checkbox__inner {
                    border-color: #ccc;
                  }
                }
              }

              .el-checkbox__label {
                display: none;
              }

              a {
                height: 16px;
                width: 16px;
                border: 1px solid #bfbfbf;
                margin-right: 0.5em;
                margin-top: 10px;

                &.active {
                }
              }

              label + .active {
                margin-right: 0.5em;
                height: 32px;
                width: 32px;
                border: 1px solid #bfbfbf;
                font-size: 14px;
                line-height: 30px;
                text-align: center;
                color: #666;
                border-radius: 50%;
              }

              .is-checked + .active {
                background: linear-gradient(
                  21deg,
                  rgba(88, 190, 129, 1),
                  rgba(78, 220, 136, 1)
                );
                box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
                color: #fff;
                border: none;
              }

              span + div {
                strong {
                  font-size: 14px;
                  color: #333333;
                  line-height: 1.5;
                }

                strong + p {
                  font-size: 12px;
                  color: #999999;
                  line-height: 1.5;
                }
              }
            }
          }

          li:nth-last-child(1) {
            display: block;
          }

          li:nth-last-child(n + 1) {
            display: flex;
          }
        }
      }

      .bottom-btn {
        margin-top: 20px;
        border-top: 1px dotted #e9e9e9;
        padding-top: 20px;
      }
    }
  }

  .box3 {
    h3 {
      color: #212121;
      font-size: 20px;
      border-bottom: 1px dotted #e9e9e9;
      padding-bottom: 10px;
    }

    h3 + .sub-title {
      display: block;
      font-size: 12px;
      color: #333;
      font-weight: bolder;
      padding-top: 18px;
      padding-bottom: 10px;
    }

    .sub-title + .inc-list-wrap {
      border: 1px solid #e9e9e9;
      padding: 10px;
      margin-bottom: 20px;

      p {
        display: flex;
        line-height: 1.8;

        strong {
          min-width: 60px;
          font-size: 12px;
          color: #212121;
        }

        span {
          color: #ff0027;
        }
      }
    }

    .text {
      span {
        font-size: 12px;
        color: #333;
        line-height: 2.8;
      }
    }

    .agreen {
      margin-bottom: 20px;

      .el-checkbox__label {
        color: #606266;
      }

      .agreen_link {
        color: #06c;
        text-decoration: none;
      }
    }

    .release-btn {
      button {
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        width: 158px;
        height: 41px;
        background: rgba(243, 38, 45, 1);
        outline: none;
        border: none;
        cursor: pointer;
      }
    }
  }

  .template {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 100;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .content {
      width: 820px;
      border: 1px solid rgba(230, 230, 230, 1);
      background: #fff;

      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 35px;
        line-height: 35px;
        background-color: rgba(245, 245, 245, 1);

        strong {
          font-size: 14px;
          color: #333;
          padding: 0 10px;
          font-weight: 700;
        }

        a {
          margin-right: 10px;
          width: 20px;
          height: 20px;
          font-size: 20px;
          color: #666;
          line-height: 20px;
          text-align: center;

          &:hover {
            color: #f3262d;
          }
        }
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        height: 32px;
        margin-top: 20px;
        padding-left: 20px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 55px;
        display: flex;
        width: 100%;

        li {
          margin: 0;
          padding: 0;
          height: 31px;
          line-height: 31px;
          border-top: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-left: none;
          background: #f5f5f5;
          border-bottom: none;
          position: relative;

          a {
            text-decoration: none;
            color: #666;
            display: block;
            font-size: 14px;
            padding: 0 10px;
            outline: none;
            font-weight: 700;
            max-width: 120px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          &.active {
            background: #fff;

            a {
            }
          }
        }

        li:nth-child(1) {
          border-left: 1px solid #ccc;
        }
      }

      .msg {
        .title {
          font-size: 14px;
          color: #000;
          text-align: center;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .con {
          color: #666;
          padding: 0px 20px;
          line-height: 1.7;

          img {
            max-width: 760px;
          }
        }
      }

      .button {
        padding-top: 86px;
        margin-bottom: 83px;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          width: 115px;
          height: 40px;
          line-height: 26px;
          text-align: center;
          background-color: #ec2828;
          border-radius: 3px;
          color: #fff;
          outline: none;
          border: none;
        }
      }
    }
  }
}

.lister {
  margin-right: 10px;
}

.info {
  border-top: 1px solid #ddd;
  margin-top: -25px;
  padding-top: 10px;
}

.cityename {
  height: 25px;
  line-height: 25px;
  text-align: center;
}

.cityelist {
  overflow: hidden;
  border-left: 1px solid #ddd;
  padding-left: 10px;

  li {
    list-style-type: none;
    line-height: 25px;
    padding: 0px 10px;
    float: left;
    font-size: 14px;
    margin: 3px 10px 3px 0;
    cursor: pointer;
  }
}

.cityelist li.activer {
  background: #1d79e2;
  border-radius: 15px;
  color: #fff;
}

.area_list {
  border-top: 1px solid #ddd;
  max-height: 400px;
  overflow-y: auto;
  padding-top: 10px;
}

.dialog-address .el-form-item__content {
  max-height: 76px;
  overflow: auto;
}

.m-time-choice-wrap {
  font-size: 12px;
  color: #333;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: 12px;
  color: #999;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: 12px;
  color: #999;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: 12px;
  color: #999;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-size: 12px;
  color: #999;
}

input::-webkit-input-placeholder {
  color: #999;
  font-size: 12px;
}

.datePicker {
  left: 424px !important;
}
.ql-editor.ql-blank::before{
      font-style: normal;
    color: #999;
    font-size: 12px;
}
.agreen,
.box2 {
  .is-checked {
    .el-checkbox__inner {
      border: 0 !important;
      background: none !important;
    }

    .el-checkbox__inner::after {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: url("../../../assets/img/icon-checkbox-checked.png") no-repeat
        0 0;
      background-size: 100% 100%;
    }
  }
}

.release_form {
  .el-input__inner {
    height: 32px;
    border-radius: 0;
  }
}
.regText {
  & > .el-dialog {
    & > .el-dialog__header {
      & > .el-dialog__headerbtn {
        top: 10px;
      }
    }
    & > .el-dialog__body {
      & > .content {
        text-align: center;
      }
    }
    & > .el-dialog__footer {
      & > .dialog-footer {
        & > .el-button {
          width: 64px;
          height: 30px;
          background: #f3262d !important;
          border-radius: 2px;
          color: #fff;
          padding: 0;
          border: 1px solid #f3262d;
          cursor: pointer;
        }
      }
    }
  }
}
.select-err {
  color: #f3262d;
  padding-left: 20px;
  margin-left: 10px;
  height: 18px;
  line-height: 18px;
  font-size: 12px !important;
  background: url("../../../assets/img/icon-error.png") no-repeat;
}
</style>
<style lang="less" scoped>
.m-verify-code {
  background: #f4f4f4 !important;
  color: #666;
  border: 1px solid #dfdfdf;
  padding: 12px 0 !important;
  width: 110px;
  height: 40px !important;
  margin-left: 5px;
  &:focus,
  &:hover {
    color: #333;
    background: #fff !important;
  }
}

.m-upload-btn {
  width: 128px;
  height: 38px;
  background: #f4f4f4;
  color: #666;
  border: 1px solid #dfdfdf;

  &.active_32 {
    height: 32px;
  }

  &:focus,
  &:hover {
    color: #333;
    background: #fff;
    border: 1px solid #dfdfdf;
  }
}

.is-disabled:focus {
  color: #333;
  background: #f4f4f4;
}

.container {
  width: 888px;
  margin: 0 auto;

  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}

.v-modal {
  background-color: #000;
  opacity: 0.6;
}

.upload_list {
  display: flex;
  margin: 22px 0px 48px;
  flex-wrap: wrap;
  .upload_li {
    display: inline-flex;
    align-items: center;
    width: 193px;
    height: 26px;
    background: #f4f4f4;
    padding: 0 24px 0 12px;
    font-size: 12px;
    color: #666;
    margin-right: 12px;
    position: relative;
    margin-bottom: 5px;
  }

  .upload_name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .upload_size {
  }

  .upload_delete {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    width: 18px;
    height: 18px;
    padding: 5px;
    cursor: pointer;
  }
}
</style>
