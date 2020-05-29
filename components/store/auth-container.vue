<template>
  <div class="ac_container">
    <!--初始状态，企业和个人共享-->
    <div v-if="!stateObj" class="ac_default">
      <div class="title">
        <h3>实名认证</h3>
        <span>（仅针对中国大陆用户）</span>
      </div>
      <div class="container">
        <!--个人实名-->
        <div v-if="storeInfo.type_id ===1" class="item">
          <div class="head">
            <div>个人实名</div>
            <p>( 开店铺认证 )</p>
          </div>
          <div class="text">
            <p>每个身份证号仅支持5个账户使用，且认证通过身份号不能修改</p>
            <div>
              <button @click="personStepsController">立即申请</button>
            </div>
            <p>支持大陆个人实名</p>
          </div>
        </div>
        <!--企业实名-->
        <div v-else-if="storeInfo.type_id ===2" class="item company">
          <div class="head">
            <div>企业实名</div>
            <p>( 开店铺认证 )</p>
          </div>
          <div class="text">
            <p>每个身份证号仅支持5个账户使用，且认证通过后营业执照将在店铺中展示，且不能修改统一社会信用代码或转为个人。</p>
            <div>
              <button @click="companyStepsController">立即申请</button>
            </div>
            <p>支持大陆企业实名</p>
          </div>
        </div>
      </div>
    </div>
    <template v-else>
      <template v-if="role==1">
        <!--个人已通过实名认证-->
        <div class="finish-last" v-if="authResult.audit_status==1">
          <!--个人-->
          <div class="finish_title">
            <svg class="finish_icon" aria-hidden="true">
              <use xlink:href="#icon-tips" class="ccccc" />
            </svg>
            <span class="ml_10">恭喜你，已通过实名认证</span>
          </div>
          <div class="finish_desc">
            <p>认证身份：{{authResult.status==1?'个人':'企业'}}</p>
            <p>姓名：{{computedName}}</p>
            <p>身份证：{{computedIdno}}</p>
            <p>手机号：{{computedPhone}}</p>
            <p>合同功能：{{authResult.accountid ? '已拥有':''}}</p>
          </div>
        </div>
        <!--个人认证结果反馈 -->
        <div v-else-if="(p_steps>1 && p_steps<3)" class="finish-company finish-person">
          <h3>个人实名</h3>
          <div class="inner-steps">
            <span class="active personal">1</span>
            <i class="active personal"></i>
            <span class="active">2</span>
          </div>
          <h3 class="result">管理员审核</h3>
          <!--等待审核 -->
          <div class="f-box" v-if="authResult.audit_status==0">
            <img class="f_img" src="~assets/img/store/auth_s.png" alt />
            <div class="f_right">
              <div class="title">您的实名认证申请已提交！</div>
              <p>管理员会在5个工作日内完成审核，请耐心等待。</p>
              <div class="f_btn_wrap">
                <nuxt-link :to="{path:'/store?storeIndex=index'}">返回首页</nuxt-link>
                <nuxt-link
                  class="btn"
                  :to="{path:'/store/payment',query:{storeIndex:'payment',subIndex:'skill'}}"
                >前往缴纳保证金</nuxt-link>
              </div>
            </div>
          </div>
          <!--审核未通过 -->
          <div class="f-box" v-else-if="authResult.audit_status==-1">
            <img class="f_img" src="~assets/img/store/auth_f.png" alt />
            <div class="f_right">
              <div class="title">您的实名认证申请审核未通过</div>
              <p>未通过原因：{{authResult.remarks}}</p>
              <div class="f_btn_wrap">
                <a href="javascript:;" @click="openStore" class="btn">重新申请</a>
              </div>
            </div>
          </div>
        </div>
        <!--个人认证-->
        <div v-else-if="p_steps==1" class="ac_private">
          <div class="top">
            <h3>个人实名</h3>
            <div class="steps"></div>
          </div>
          <div class="base">
            <h3>填写本人信息</h3>
            <el-form
              class="authForm common_form"
              :model="personForm"
              ref="personForm"
              :rules="personRules"
              label-width="100px"
            >
              <el-form-item prop="name" label="真实姓名：">
                <el-input
                  :disabled="authResult.quickAuth > 0"
                  placeholder="请输入真实姓名"
                  v-model="personForm.name"
                ></el-input>
                <p class="input_desc">为保障您的资金安全，实名认证姓名和身份证号须和您提现的银行卡的户名保持一致</p>
              </el-form-item>

              <el-form-item prop="idno" label="身份证号码：">
                <el-input
                  :disabled="authResult.quickAuth > 0"
                  v-model="personForm.idno"
                  placeholder="请输入身份证号码"
                ></el-input>
                <p class="input_desc">身份证号码前后不能有空格，年龄不足18岁，不能认证</p>
              </el-form-item>

              <el-form-item prop="mobile" label="手机号码：">
                <!--                        <div>{{original.mobile}}</div>-->
                <el-input :disabled="true" v-model="personForm.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
            </el-form>
            <div class="uplaod_id">
              <div class="left">
                <p>身份证正面照：</p>
                <el-upload
                  class="avatar-uploader"
                  :action="$store.state.uploadApi"
                  name="imgs"
                  :headers="headers"
                  :before-upload="uploadBefore"
                  :on-success="uploadSuccess1"
                  :show-file-list="false"
                >
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="right">
                <p>示例：</p>
                <div class="flex">
                  <div class="img"></div>
                  <div>
                    <p>请上传本人身份证正面头部照片</p>
                    <p>必须看清证件信息，且证件信息不能被遮挡</p>
                    <p>您提供当照片凌天众媒将予以保护，不会用于其他用途</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="uplaod_id active">
              <div class="left active">
                <p>身份证反面照：</p>
                <el-upload
                  class="avatar-uploader"
                  :action="$store.state.uploadApi"
                  name="imgs"
                  :headers="headers"
                  :before-upload="uploadBefore"
                  :on-success="uploadSuccess2"
                  :show-file-list="false"
                >
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="right active">
                <p>示例：</p>
                <div class="flex">
                  <div class="img other_side"></div>
                  <div>
                    <p>请上传本人身份证反面国徽照片</p>
                    <p>必须看清证件信息，且证件信息不能被遮挡</p>
                    <p>您提供当照片凌天众媒将予以保护，不会用于其他用途</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn_box">
              <span class="next_step" @click="personSubmit('personForm')">下一步</span>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="role==2">
        <!--企业 已通过实名认证-->
        <!--                authResult.audit_status==1-->
        <div
          class="finish-last"
          v-if="authResult.signstatus===3 && authResult.sd_id != null && authResult.quickAuth !==1&& authResult.audit_status === 1"
        >
          <div class="finish_title">
            <svg class="finish_icon" aria-hidden="true">
              <use xlink:href="#icon-tips" class="ccccc" />
            </svg>
            <span class="ml_10">恭喜你，已通过实名认证</span>
          </div>
          <div class="finish_desc">
            <p>认证身份：{{authResult.status==1?'个人':'企业'}}</p>
            <p>企业名称：{{authResult.company_name}}</p>
            <p>企业统一信用代码：{{computedCode}}</p>
            <p>法人姓名：{{computedName}}</p>
            <p>法人身份证：{{computedIdno}}</p>
            <p>法人手机号：{{computedPhone}}</p>
            <p>合同功能：{{authResult.accountid ? '已拥有':''}}</p>
          </div>
        </div>
        <!--企业认证结果反馈-->
        <div
          v-else-if="authResult.quickAuth ===2 && (authResult.step===4 || authResult.step===2) && !companyFlag"
          class="finish-company"
        >
          <h3>企业实名</h3>
          <div class="inner-steps">
            <span class="active">1</span>
            <i class="active"></i>
            <span class="active">2</span>
            <i class="active"></i>
            <span class="active">3</span>
            <i class="active"></i>
            <span class="active">4</span>
          </div>
          <h3 class="result">管理员审核</h3>
          <div class="f-box">
            <img
              class="f_img"
              v-if="authResult.audit_status==-1"
              src="~assets/img/store/auth_f.png"
              alt
            />
            <img class="f_img" v-else src="~assets/img/store/auth_s.png" alt />
            <!--待审核-->
            <div class="f_right" v-if="authResult.audit_status==0 && authResult.accountid">
              <div class="title">您的实名认证申请已提交！</div>
              <p>管理员会在5个工作日内完成审核，请耐心等待。</p>
              <div class="f_btn_wrap">
                <nuxt-link :to="{path:'/store?storeIndex=index'}">返回首页</nuxt-link>
                <nuxt-link
                  class="btn"
                  :to="{path:'/store/payment',query:{storeIndex:'payment',subIndex:'skill'}}"
                >前往缴纳保证金</nuxt-link>
              </div>
            </div>
            <!-- 审核未通过-->
            <div class="f_right" v-else-if="authResult.audit_status==-1 && authResult.accountid">
              <div class="title">您的实名认证申请审核未通过</div>
              <p>
                未通过原因：
                <span>{{authResult.remarks}}</span>
              </p>
              <div class="f_btn_wrap">
                <a href="javascript:;" @click="openStore" class="btn">重新申请</a>
              </div>
            </div>
          </div>
        </div>
        <!--实名认证失败-->
        <div
          v-else-if="!authResult.accountid && authResult.quickAuth ===0&& authResult.step===4 && !companyFlag"
          class="finish-company"
        >
          <h3>企业实名</h3>
          <div class="inner-steps">
            <span class="active">1</span>
            <i class="active"></i>
            <span class="active">2</span>
            <i class="active"></i>
            <span class="active">3</span>
            <i class="active"></i>
            <span class="active">4</span>
          </div>
          <h3 class="result">管理员审核</h3>
          <div class="f-box">
            <img
              class="f_img"
              v-if="authResult.audit_status==-1"
              src="~assets/img/store/auth_f.png"
              alt
            />
            <img class="f_img" v-else src="~assets/img/store/auth_s.png" alt />
            <!--实名认证失败-->
            <div class="f_right">
              <div class="title">您的实名认证失败</div>
              <p>失败原因：{{this.errorMessage || authResult.remarks}}</p>
              <div class="f_btn_wrap">
                <a href="javascript:;" @click="openStore" class="btn">重新申请</a>
              </div>
            </div>
          </div>
        </div>
        <!--企业认证-->
        <div v-else-if="(c_steps>0) || companyFlag" class="company">
          <!--上传企业信息 第一步-->
          <div v-if="c_steps_next==1" class="steps1">
            <h3>企业实名</h3>
            <div class="inner-steps">
              <span class="active">1</span>
              <i class="active"></i>
              <span class>2</span>
              <i class></i>
              <span>3</span>
              <i></i>
              <span>4</span>
            </div>
            <div class="box">
              <div class="hint_text">这是一项身份识别服务，请注意以下几点：</div>
              <p class="desc_text">
                请确保您具有法人资格的商户，您需要提供可证明您依法设立、依法经营，开展社会活动执照、证件等（如营业执照副本）
                <br />证件有效期在3个月内的商户，请找工商部门更新资料后在行提交
              </p>
            </div>
            <div class="info">
              <h3>填写企业信息</h3>
              <el-form
                ref="cAuthForm1"
                class="companyForm common_form"
                :model="cAuthForm1"
                :rules="cAuthRules"
                label-width="124px"
              >
                <el-form-item prop="name" label="企业名称">
                  <el-input
                    :disabled="authResult.quickAuth > 0"
                    v-model="cAuthForm1.name"
                    placeholder="请输入企业名称"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="codeUSC" label="统一社会信用代码">
                  <el-input
                    :disabled="authResult.quickAuth>0"
                    v-model="cAuthForm1.codeUSC"
                    placeholder="请输入统一社会信用代码"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="legalName" label="企业法人">
                  <el-input
                    :disabled="authResult.quickAuth >0"
                    v-model="cAuthForm1.legalName"
                    placeholder="请输入企业法人"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="selectArea" label="营业执照所在地">
                  <el-cascader
                    placeholder="请选择"
                    prop="selectArea"
                    clearable
                    v-model="cAuthForm1.selectArea"
                    :options="area"
                    :props="prosDatas"
                  ></el-cascader>
                </el-form-item>
                <el-form-item prop="address" label="营业执照详细地址">
                  <el-input v-model="cAuthForm1.address" placeholder="填写常用地址"></el-input>
                </el-form-item>
                <el-form-item label="营业年限">
                  <el-date-picker
                    class="form_date"
                    v-model="timeArray"
                    format="yyyy-MM-dd"
                    @change="changeTime"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>&nbsp;&nbsp;
                  <el-checkbox
                    v-model="cAuthForm1.long_time"
                    :label="1"
                    name="type"
                    @change="changeLoneTime"
                  >长期</el-checkbox>
                </el-form-item>
                <el-form-item prop="business_scope" label="经营范围">
                  <el-input
                    type="textarea"
                    v-model="cAuthForm1.business_scope"
                    :rows="3"
                    placeholder="请输入经营范围"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="bottom">
              <h3>营业执照扫描件</h3>
              <p class="c_orange">(三证合一用户请上传营业执照扫描件)</p>
              <div class="uplaod">
                <div class="left">
                  <el-upload
                    class="avatar-uploader"
                    :action="$store.state.uploadApi"
                    name="imgs"
                    :headers="headers"
                    :before-upload="uploadBefore"
                    :on-success="companyUploadSuccess1"
                    :show-file-list="false"
                  >
                    <img v-if="companyImg1" :src="companyImg1" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
                <div class="right">
                  <div class="right_title c_blue">证件要求：</div>
                  <p>
                    必须为清晰、完整的
                    <span class="c_orange">彩色</span>原价扫描件或数码照
                  </p>
                  <p>必须在有效期内且年检章齐全（当年成立的公司可无年检章）</p>
                  <p>必须为中国大陆公司局颁发</p>
                </div>
              </div>
              <h3 class="title_h3">请选择法人的认证方式</h3>
              <div class="card">运营商识别</div>
              <div class="btn_box">
                <span class="next_step" @click="companyNextSteps1('cAuthForm1')">下一步</span>
              </div>
            </div>
          </div>
          <!--上传法人信息  第二步-->
          <div v-else-if="c_steps_next==2" class="steps2">
            <h3>企业实名</h3>
            <div class="inner-steps">
              <span class="active">1</span>
              <i class="active"></i>
              <span class="active">2</span>
              <i class="active"></i>
              <span>3</span>
              <i></i>
              <span>4</span>
            </div>
            <div class="info">
              <h3>填写法人信息</h3>
              <el-form
                ref="cAuthForm2"
                :model="cAuthForm2"
                :rules="cAuthRule2"
                class="companyForm common_form"
                label-width="100px"
              >
                <el-form-item prop="name" label="真实姓名">
                  <el-input disabled v-model="cAuthForm2.name" placeholder="请输入真实姓名"></el-input>
                  <!--                            <div>{{cAuthForm2.name}}</div>-->
                </el-form-item>
                <el-form-item prop="idno" label="身份证号码">
                  <el-input
                    :disabled="authResult.quickAuth > 0"
                    v-model="cAuthForm2.idno"
                    placeholder="请输入身份证号码"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="手机号码">
                  <el-input
                    :disabled="authResult.quickAuth > 0"
                    v-model="cAuthForm2.mobile"
                    placeholder="请输入手机号码"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="uplaod_id">
              <div class="left">
                <p>身份证正面照：</p>
                <el-upload
                  class="avatar-uploader"
                  :action="$store.state.uploadApi"
                  name="imgs"
                  :headers="headers"
                  :before-upload="uploadBefore"
                  :on-success="companyIDUploadSuccess1"
                  :show-file-list="false"
                >
                  <img v-if="cAuthForm2.IDmsg1" :src="cAuthForm2.IDmsg1" class="avatar" />
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
              </div>
              <div class="right">
                <p>
                  <strong>示例：</strong>
                </p>
                <div class="flex">
                  <div class="img"></div>
                  <div>
                    <p>请上传本人身份证正面头部照片</p>
                    <p>必须看清证件信息，且证件信息不能被遮挡</p>
                    <p>您提供当照片凌天众媒将予以保护，不会用于其他用途</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="uplaod_id active">
              <div class="left active">
                <p>身份证反面照：</p>
                <el-upload
                  class="avatar-uploader"
                  :action="$store.state.uploadApi"
                  name="imgs"
                  :before-upload="uploadBefore"
                  :on-success="companyIDUploadSuccess2"
                  :headers="headers"
                  :show-file-list="false"
                >
                  <img v-if="cAuthForm2.IDmsg2" :src="cAuthForm2.IDmsg2" class="avatar" />
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
              </div>
              <div class="right active">
                <p>示例：</p>
                <div class="flex">
                  <div class="img other_side"></div>
                  <div>
                    <p>请上传本人身份证反面国徽照片</p>
                    <p>必须看清证件信息，且证件信息不能被遮挡</p>
                    <p>您提供当照片凌天众媒将予以保护，不会用于其他用途</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn_box">
              <span class="next_step" @click="companyNextSteps2('cAuthForm2')">下一步</span>
            </div>
          </div>
          <!--对公账户信息及打款回填 第三步-->
          <div v-else-if="c_steps_next==3" class="steps3">
            <h3>企业实名</h3>
            <div class="inner-steps">
              <span class="active">1</span>
              <i class="active"></i>
              <span class="active">2</span>
              <i class="active"></i>
              <span class="active">3</span>
              <i class="active"></i>
              <span>4</span>
            </div>
            <div class="info border_none">
              <h3>填写法人信息</h3>
              <el-form
                ref="cAuthForm3"
                :model="cAuthForm3"
                :rules="cAuthRule3"
                class="companyForm common_form"
                label-width="130px"
              >
                <el-form-item prop="name" label="对公账户户名">
                  <el-input disabled v-model="cAuthForm3.name" placeholder="请输入对公账户户名"></el-input>
                </el-form-item>
                <el-form-item prop="cardno" label="企业对公银行账号">
                  <el-input v-model="cAuthForm3.cardno" placeholder="请输入企业对公银行账号"></el-input>
                </el-form-item>
                <el-form-item prop="bank" label="开户行名称">
                  <el-input v-model="cAuthForm3.bank" placeholder="请输入开户行名称"></el-input>
                </el-form-item>
                <el-form-item prop="subbranch" label="开户行支行全称">
                  <el-input
                    v-model="cAuthForm3.subbranch"
                    @blur="searchAddrBySubbranch(cAuthForm3.subbranch)"
                    placeholder="请输开户行支行全称"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="addr" label="开户行所在地">
                  <el-select
                    v-model="cAuthForm3.addr"
                    @change="addrSelectChange"
                    placeholder="请选择开户行所在地"
                  >
                    <el-option
                      v-for="(item,index) in addrArray"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class="btn_box">
              <span class="next_step" @click="companyNextSteps3('cAuthForm3')">下一步</span>
            </div>
          </div>
          <!--对公账号打款回填 第四步-->
          <div v-else-if="c_steps_next==4" class="ac_steps4">
            <h3>企业实名</h3>
            <div class="inner-steps">
              <span class="active">1</span>
              <i class="active"></i>
              <span class="active">2</span>
              <i class="active"></i>
              <span class="active">3</span>
              <i class="active"></i>
              <span>4</span>
            </div>
            <div class="center">
              <h3>对公打款</h3>
              <div class="img-c"></div>
              <p>系统即将往您公司的对公账户打一笔1元以下的款项，打款将在两小时内完成，请收到款项后再次 点击实名认证进入本页面填写打款金额，完成身份认证</p>
              <div class="center_form">
                <el-form
                  ref="cAuthForm4"
                  class="step4Form common_form"
                  :model="cAuthForm4"
                  :rules="cAuthRule4"
                  label-width="100px"
                >
                  <el-form-item prop="cash" label="打款金额：">
                    <el-input v-model="cAuthForm4.cash" type="number" placeholder="请输入打款金额"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="text-last">
                <div class="hint">温馨提示：</div>
                <p>
                  打款到账最多需要等待
                  <span>2小时</span>，打款金额
                  <span>72小时</span>有效，请及时查看收款记录并提交验证， 允许最多错误
                  <span>3次</span>，超过3次请重新申请实名认证。
                </p>
              </div>
            </div>
            <div class="btn_box">
              <span class="next_step" @click="companyNextSteps4('cAuthForm4')">确认</span>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Auth, AuthCompany } from "@/api/store-flow";
import { getCookie } from "../../utils";
import {
  formatSearchTime,
  filterName,
  filterPhone,
  filterIdno,
  filterCode
} from "../../utils/common";
import areaJson from "../../assets/js/area";

export default {
  name: "auth-container",
  data() {
    let areaJsons = JSON.parse(JSON.stringify(areaJson));
    areaJsons.shift();
    return {
      errorMessage: "",
      personalFlag: false,
      companyFlag: false,
      timeArray: [],
      service_id: "",
      companyImg1: "",
      area: areaJsons,
      prosDatas: {
        value: "id",
        label: "name",
        children: "child"
      },
      /*企业认证第一步 S*/
      cAuthForm1: {
        name: "", //公司名称
        legalName: "", //法人姓名
        codeUSC: "", //统一社会信用代码
        bl_province: "", //营业执照所在地(省)
        bl_city: "", //营业执照所在地(市)
        bl_district: "", //营业执照所在地(县/区)
        address: "", //营业执照详细地址
        begin_time: "", //营业年限开始时间
        end_time: "", //营业年限结束时间
        long_time: "", //营业年限是否为长期 选中为：1
        business_scope: "", //经营范围
        business_license: "", //营业执照
        selectArea: [] //"110000", "110100", "110101"
      },
      cAuthRules: {
        name: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: ["blur", "change"]
          }
        ],
        legalName: [
          {
            required: true,
            message: "法人姓名不能为空",
            trigger: ["blur", "change"]
          }
        ],
        codeUSC: [
          {
            required: true,
            message: "统一社会信用代码不能为空",
            trigger: ["blur", "change"]
          }
        ],
        address: [
          {
            required: true,
            message: "营业执照详细地址不能为空",
            trigger: ["blur", "change"]
          }
        ],
        begin_time: [
          {
            required: true,
            message: "营业年限开始时间不能为空",
            trigger: ["blur", "change"]
          }
        ],
        end_time: [
          {
            required: true,
            message: "营业年限结束时间不能为空",
            trigger: ["blur", "change"]
          }
        ],
        business_scope: [
          {
            required: true,
            message: "经营范围不能为空",
            trigger: ["blur", "change"]
          }
        ],
        business_license: [
          {
            required: true,
            message: "营业执照不能为空",
            trigger: ["blur", "change"]
          }
        ],
        selectArea: [
          {
            required: true,
            message: "省市区不能为空",
            trigger: ["blur", "change"]
          }
        ]
      },
      /*企业认证第一步 E*/

      /*企业认证第二步 S*/
      cAuthForm2: {
        name: "", //姓名
        idno: "", //身份证号码
        mobile: "", //手机号
        identity_card_front: "", //身份证正面照片
        identity_card_back: "", //身份证反面照片
        IDmsg1: null, //身份证正面
        IDmsg2: null //身份证反面
      },
      cAuthRule2: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: ["blur", "change"]
          }
        ],
        idno: [
          {
            required: true,
            message: "身份证号码不能为空",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: ["blur", "change"]
          }
        ]
      },
      /*企业认证第二步 E*/

      /*企业认证第三步 S*/
      cAuthForm3: {
        bank: "", //对公银行全称
        cardno: "", //对公银行卡号
        provice: "", //省
        city: "", //市
        name: "", //公司全称
        subbranch: null, //支行全称
        addr: "", //开户行所在地
        service_id: ""
      },
      cAuthRule3: {
        name: [
          {
            required: true,
            message: "对公账户户名不能为空",
            trigger: ["blur", "change"]
          }
        ],
        cardno: [
          {
            required: true,
            message: "企业对公银行账号不能为空",
            trigger: ["blur", "change"]
          }
        ],
        bank: [
          {
            required: true,
            message: "开户行名称不能为空",
            trigger: ["blur", "change"]
          }
        ],
        subbranch: [
          {
            required: true,
            message: "支行全称不能为空",
            trigger: ["blur", "change"]
          }
        ],
        addr: [
          {
            required: true,
            message: "支行全称不能为空",
            trigger: ["blur", "change"]
          }
        ]
      },
      /*企业认证第三步 E*/

      /*企业认证第四步 S*/
      cAuthForm4: {
        cash: "", //金额
        serviceId: ""
      },
      cAuthRule4: {
        cash: [
          {
            required: true,
            message: "金额不能为空",
            trigger: ["blur", "change"]
          }
        ]
      },
      addrArray: [],
      /*企业认证第四步 E*/
      imageUrl: "",
      authResult: {
        status: ""
      },
      headers: {},
      IDmsg1: {}, //身份证正面
      IDmsg2: {}, //身份证反面
      imageUrl1: "",
      imageUrl2: "",
      c_steps: 0, // 默认 步骤 0
      c_steps_next: 1, //默认 步骤 1
      p_steps: 1, // 默认 步骤 1
      role: 1, // 默认 1
      active: 1,
      personRules: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: ["blur", "change"]
          }
        ],
        idno: [
          {
            required: true,
            message: "身份证号不能为空",
            trigger: ["blur", "change"]
          }
        ]
      },
      personForm: {
        name: "",
        idno: "",
        mobile: "",
        identity_card_front: "",
        identity_card_back: ""
      },
      value: "",
      test: "",
      optionsList: [
        {
          lable: "1",
          value: "1",
          children: []
        }
      ],
      original: {},
      stateObj: null,
      personalLoading: false,
      isLoading: false
    };
  },
  created() {
    this.getResult();
    for (var i = 0; i < this.area.length; i++) {
      if (this.area[i].name === "全国") {
        this.area.splice(i, 1);
      }
    }
  },
  watch: {
    storeInfo: {
      handler() {
        const { type_id = "" } = this.storeInfo;
        if (type_id) {
          this.role = type_id;
        }
      },
      immediate: true,
      deep: true
    },
    $route: {
      handler(to, from, next) {
        let { c_steps_next, c_steps, flag } = this.$route.query;
        if (c_steps_next) {
          this.c_steps_next = c_steps_next;
        }
        this.companyFlag = flag;
        if (c_steps) {
          this.c_steps = c_steps;
        }
      },
      immediate: true,
      deep: true
    },
    userInfo: {
      handler() {
        let { original = {} } = this.userInfo || {};
        const { mobile = "" } = original || {};
        this.original = {
          mobile: mobile
        };
        this.personForm.mobile = mobile;
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapState(["userInfo", "storeInfo"]),
    computedName() {
      return filterName(this.authResult.name);
    },
    computedPhone() {
      return filterPhone(this.authResult.mobile);
    },
    computedIdno() {
      return filterIdno(this.authResult.idno);
    },
    computedCode() {
      return filterIdno(this.authResult.company_codeusc);
    }
  },
  methods: {
    openStore() {
      //跳转到第一步
      if (this.role === 1) {
        //个人
        this.p_steps = 1;
        this.personalFlag = true;
      } else if (this.role === 2) {
        //企业
        this.companyFlag = true;
        this.c_steps = 1;
        this.c_steps_next = 1;
      }
    },
    changeTime(value) {
      //时间范围的选择
      this.cAuthForm1.long_time = "";
    },
    changeLoneTime(value) {
      //长期
      this.timeArray = "";
    },
    // 企业认证第一步，数据提交
    companyNextSteps1(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return false;
        }
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        let params = JSON.parse(JSON.stringify(this.cAuthForm1));
        if (this.timeArray) {
          const [beginTime, endTime] = formatSearchTime(this.timeArray);
          params.begin_time = beginTime;
          params.end_time = endTime;
        } else {
          params.long_time = +params.long_time || "";
        }
        const [province, city, district] = params.selectArea;
        params.bl_province = province;
        params.bl_city = city;
        params.bl_district = district;
        delete params.selectArea;
        if (this.authResult.quickAuth > 0) {
          params.quickAuth = 1;
        }
        let result = await AuthCompany.submit1(params);
        let { code, message, data } = result.data;
        if (code == 200) {
          this.service_id = data.service_id;
          this.cAuthForm3.service_id = data.service_id;
          this.cAuthForm4.serviceId = data.service_id;
          this.cAuthForm2.name = this.cAuthForm1.legalName;
          this.$message.success(message);
          let c_steps = Number(this.$route.query.c_steps);
          this.$router.replace({
            name: this.$route.name,
            query: {
              storeIndex: "auth",
              c_steps: c_steps + 1,
              c_steps_next: this.c_steps_next + 1,
              flag: this.companyFlag
            }
          });
        } else {
          this.$message.error(message);
        }
        this.isLoading = false;
      });
    },
    /*---------选择地址赋值----------------*/
    async selectHandleChange(items) {
      this.cAuthForm1.province = items[0] ? items[0] : "";
      this.cAuthForm1.city = items[1] ? items[1] : "";
      this.cAuthForm1.district = items[2] ? items[2] : "";
    },
    // 个人认证数据提交
    personSubmit(formName) {
      if (this.personalLoading) {
        return;
      }
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let identity_card_front = ""; // 身份证正面
          let identity_card_back = ""; // 身份证反面
          if (this.imageUrl1) {
            identity_card_front = this.IDmsg1.file;
          } else {
            this.$message.error("请先上传身份证正面");
            return false;
          }
          if (this.imageUrl2) {
            identity_card_back = this.IDmsg2.file;
          } else {
            this.$message.error("请先上传身份证反面");
            return false;
          }
          this.$set(
            this.personForm,
            "identity_card_front",
            identity_card_front
          );
          this.$set(this.personForm, "identity_card_back", identity_card_back);
          let personForm = JSON.parse(JSON.stringify(this.personForm));
          if (this.authResult.quickAuth > 0) {
            personForm.quickAuth = 1;
          }
          this.personalLoading = true;
          let result = await Auth.personVerify(personForm); //添加个人信息
          let { code, message, data } = result.data;
          if (code == 200) {
            this.personalFlag = false;
            this.getResult();
          } else {
            this.$message.error(message);
          }
          this.personalLoading = false;
        }
      });
    },
    // 上传前钩子
    uploadBefore() {
      this.headers = { Authorization: "Bearer " + getCookie("access_token") };
    },
    // 身份上传成功处理
    async uploadSuccess1(response, file, fileList) {
      if (response && response.code == 1) {
        this.IDmsg1 = response.data;
        this.imageUrl1 = `${response.data.domain}/${response.data.file}`;
      }
    },
    async companyUploadSuccess1(response, file, fileList) {
      if (response && response.code == 1) {
        this.cAuthForm1.business_license = response.data.file;
        this.companyImg1 = `${response.data.domain}/${response.data.file}`;
      }
    },
    /*认证第二步 S*/
    async companyIDUploadSuccess1(response, file, fileList) {
      if (response && response.code == 1) {
        this.cAuthForm2.identity_card_front = response.data.file;
        this.cAuthForm2.IDmsg1 = `${response.data.domain}/${response.data.file}`;
      }
    },
    async companyIDUploadSuccess2(response, file, fileList) {
      if (response && response.code == 1) {
        this.cAuthForm2.identity_card_back = response.data.file;
        this.cAuthForm2.IDmsg2 = `${response.data.domain}/${response.data.file}`;
      }
    },
    companyNextSteps2(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false;
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        let params = JSON.parse(JSON.stringify(this.cAuthForm2));
        if (this.authResult.quickAuth > 0) {
          params.quickAuth = 1;
        }
        let result = await AuthCompany.submit2(params);
        let { code, message, data } = result.data;
        if (code == 200) {
          this.$message.success(message);
          if (this.authResult.quickAuth > 0) {
            //跳转到待审核页面
            this.$router.replace({
              name: this.$route.name,
              query: {
                storeIndex: "auth"
              }
            });
            this.getResult();
          } else {
            let c_steps = Number(this.$route.query.c_steps);
            let c_steps_next = Number(this.$route.query.c_steps_next);
            this.cAuthForm3.name = this.cAuthForm1.name;
            this.$router.replace({
              name: this.$route.name,
              query: {
                storeIndex: "auth",
                c_steps: c_steps + 1,
                c_steps_next: c_steps_next + 1,
                flag: this.companyFlag
              }
            });
          }
        } else {
          this.$message.error(message);
        }
        this.isLoading = false;
      });
    },
    /*认证第二步 E*/

    /*认证第三步 S*/

    //根据支行搜索所在地
    async searchAddrBySubbranch(val) {
      let res = await AuthCompany.search({ keyword: val });
      let { code, message, data } = res.data;
      if (code == 200) {
        if (data) {
          this.addrArray = Array.from(
            new Set(data.map(item => item.s + "-" + item.city))
          );
        }
      } else {
      }
    },
    addrSelectChange(val) {
      const [provice = "", city = ""] = val.split("-");
      this.$set(this.cAuthForm3, "provice", provice);
      this.$set(this.cAuthForm3, "city", city);
    },
    // 点击下一步
    companyNextSteps3(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false;
        if (this.isLoading) return;
        this.isLoading = true;
        let result = await AuthCompany.submit3(this.cAuthForm3);
        let { code, message, data } = result.data;
        if (code == 200) {
          this.$message.success(message);
          let c_steps = Number(this.$route.query.c_steps);
          let c_steps_next = Number(this.$route.query.c_steps_next);
          this.$router.replace({
            name: this.$route.name,
            query: {
              storeIndex: "auth",
              c_steps: c_steps + 1,
              c_steps_next: c_steps_next + 1,
              flag: this.companyFlag
            }
          });
        } else {
          this.$message.error(message);
        }
        this.isLoading = false;
      });
    },
    /*认证第三步 E*/

    /*认证第四步 S*/
    companyNextSteps4(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false;
        if (this.isLoading) return;
        this.isLoading = true;
        let result = await AuthCompany.submit4(this.cAuthForm4);
        let { code, message, data } = result.data;

        if (data.failure === 3) {
          this.errorMessage = message;
          this.$router.replace({
            name: this.$route.name,
            query: {
              storeIndex: "auth"
            }
          });
          this.getResult();
        }

        if (code == 200) {
          this.$message.success(message);
          this.$router.replace({
            name: this.$route.name,
            query: {
              storeIndex: "auth"
            }
          });
          this.getResult();
        } else {
          this.errorMessage = message;
          this.$message.error(message);
        }
        console.log("companyNextSteps4");
        this.isLoading = false;
      });
    },
    /*认证第四步 E*/

    async uploadSuccess2(response, file, fileList) {
      if (response && response.code == 1) {
        this.IDmsg2 = response.data;
        this.imageUrl2 = `${response.data.domain}/${response.data.file}`;
      }
    },
    // 个人认证 下一步
    async personStepsController() {
      this.stateObj = {};
      if (this.storeInfo.type_id === 1) {
        //个人
        this.p_steps = 1;
      }
    },
    // 企业认证 下一步
    async companyStepsController() {
      this.stateObj = {};
      this.$router.replace({
        name: this.$route.name,
        query: { storeIndex: "auth", c_steps: this.c_steps + 1 }
      });
    },

    // 查询认证结果
    async getResult() {
      let result = await Auth.getResult();
      let { code, messsage, data } = result.data;
      if (code == 200) {
        this.stateObj = data;
        if (data) {
          // this.p_steps++
          this.cAuthForm4.serviceId = data.service_id;
          if (data.status == 1) {
            // 个人 status  1 个人2 企业
            const {
              name = "",
              idno = "",
              mobile = "",
              identity_card_front = "",
              identity_card_back = ""
            } = data;
            this.authResult = data;
            this.personForm = {
              name,
              idno,
              mobile,
              identity_card_front,
              identity_card_back
            };
            if (data.audit_status === 0) {
              this.p_steps = data.sd_id ? 2 : 1;
            } else if (data.audit_status === -1) {
              this.p_steps = 2;
            } else if (data.audit_status === 1) {
              //附件资料审核状态 0：待审核 1：审核成功 -1：审核失败
              this.p_steps = 3;
            }
          } else if (data.status == 2) {
            // 企业
            if (data.quickAuth > 0) {
              this.cAuthForm1.name = data.company_name; //公司名称
              this.cAuthForm1.legalName = data.name; //法人姓名
              this.cAuthForm1.codeUSC = data.company_codeusc; //统一社会信用代码
              this.cAuthForm2.name = data.company_name; //公司名称
              this.cAuthForm2.idno = data.idno; //身份证号码
              this.cAuthForm2.mobile = data.mobile; //手机号码
            }
            this.c_steps_next = data.step === 3 ? 4 : 1;
            this.c_steps = 1; //新增
            this.authResult = data;
          }
        }
      }
    }
  }
};
</script>

<style lang="less">
@import "~assets/css/store/auth-container.less";
</style>

<style scoped lang="less">
.btn_box {
  padding: 50px 0 40px;
}
</style>
