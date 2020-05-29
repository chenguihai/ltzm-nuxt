<!--店铺资料页-->
<template>
    <div class="ws-info-container">
        <div class="user-info-wrap-1">
            <h3>基本信息</h3>
            <div class="avatar">
                <p class="p">请选择您的身份</p>
                <nuxt-link class="active" to="/store/info?storeIndex=info">
                    <p>
                        <i class="iconfont icon-geren1"></i>
                    </p>
                    <span>个人</span>
                </nuxt-link>
                <nuxt-link v-if="$store.state.storeInfo!==null" to="/store/company-info?storeIndex=info">
                    <p>
                        <i class="iconfont icon-geren1"></i>
                    </p>
                    <span>企业</span>
                </nuxt-link>
            </div>
            <el-form
                    ref="form1"
                    :inline="true"
                    label-position="right"
                    class="form1"
                    :model="baseForm"
                    :rules="rules"
                    label-width="100px"
            >
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item prop="contacts_name" required label="姓名">
                            <el-input v-model="baseForm.contacts_name" clearable placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item required prop="store_name" label="店铺名称">
                            <el-input v-model="baseForm.store_name" clearable placeholder="请输入店铺名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item required prop="selectArea" label="联系地址">
                            <el-cascader
                                    :props="prosDatas"
                                    :options="area"
                                    v-model="baseForm.selectArea"
                                    clearable
                                    @change="selectHandleChange"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item required prop="address" label="详细地址">
                            <el-input v-model="baseForm.address" clearable placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item required prop="phone" label="联系人电话">
                            <el-input v-model="baseForm.phone" clearable placeholder="请输入联系人电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item required prop="email" label="电子邮箱">
                            <el-input v-model="baseForm.email" clearable placeholder="请输入电子邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-form-item required prop="about_us" label="关于我们">
                            <el-input type="textarea" clearable v-model="baseForm.about_us"
                                      placeholder="请输入关于我们"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-button type="danger" @click="addBaseInfo('form1')" class="el-btn-red">保存</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!--工作-->
        <div class="info-job com-item">
            <div class="title">
                <h3>
                    <i class="el-icon-s-cooperation"></i>
                    <span>工作经历</span>
                </h3>
                <a href="javascript:;" @click="job_icon_ctr=!job_icon_ctr">
                    <i v-if="job_icon_ctr" class="el-icon-remove-outline"></i>
                    <i v-else class="el-icon-circle-plus-outline"></i>
                    <span>{{job_icon_ctr==true?'收起':'添加'}}</span>
                </a>
            </div>
            <p v-show="(job_list==null|| job_list.length==0) && (job_icon_ctr!==true)" class="no-data">+
                添加工作经历，增加您的实力，让雇主更加信任你！</p>
            <el-collapse-transition>
                <div style="margin-left: 64px" v-show="job_icon_ctr">
                    <el-form
                            class="job-form-set-width"
                            ref="form_job"
                            :inline="true"
                            :model="job_form"
                            label-width="104"
                            :rules="job_rules"
                    >
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="company_name" label="公司名称">
                                    <el-input width="500px" v-model="job_form.company_name"
                                              placeholder="请输入公司名称"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="nature_id" label="公司性质">
                                    <el-select v-model="job_form.nature_id" placeholder="请选择公司性质">
                                        <el-option
                                                v-for="item in job_nature_list"
                                                :key="item.nature_id"
                                                :label="item.label"
                                                :value="item.nature_id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="scale_id" label="公司规模">
                                    <el-select v-model="job_form.scale_id" placeholder="请选择公司规模">
                                        <el-option
                                                v-for="item in job_scale_list"
                                                :key="item.scale_id"
                                                :label="item.label"
                                                :value="item.scale_id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="department" label="工作部门">
                                    <el-input v-model="job_form.department" placeholder="请输入工作部门"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="position" label="工作职位">
                                    <el-input v-model="job_form.position" placeholder="请输入工作职位"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="jobPickTimeVal" label="在职时间">
                                    <el-date-picker
                                            v-model="job_form.jobPickTimeVal"
                                            value-format="yyyy-MM-dd"
                                            type="daterange"
                                            align="right"
                                            unlink-panels
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            :picker-options="pickTime1"
                                    ></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="work_desc" label="工作简介">
                                    <el-input type="textarea" v-model="job_form.work_desc"
                                              placeholder="请输入工作简介"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-button
                                        style="margin-left: 67px"
                                        type="danger"
                                        @click="addJobInfo('form_job')"
                                >保存
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                    <br/>
                </div>
            </el-collapse-transition>
            <div class="list job-list-item">
                <div class="item" v-for="(item ,index ) in job_list" :key="index">
                    <div class="job-inner">
                        <div class="div1">
                            <p>{{item.company_name}}</p>
                            <p>{{item.begin_time}} — {{item.end_time}}</p>
                        </div>
                        <div>
                            <p>职位：{{item.position}}</p>
                            <p>公司性质：{{item.nature_id || job_nature_list_filter }}</p>
                            <p>公司规模：{{item.scale_id || job_scale_list_filter}}人</p>
                            <p>部门：{{item.department}}</p>
                        </div>
                    </div>
                    <a href="javascript:;" @click="delJobInfoList(item.id)"
                       class="el-icon-delete el-icon-delete-hover"></a>
                </div>
            </div>
        </div>
        <!--自传资质-->
        <div class="info-job com-item">
            <div class="title">
                <h3>
                    <i class="el-icon-s-cooperation"></i>
                    <span>自传资质</span>
                </h3>
                <a href="javascript:;" @click="selfUploadClickHandle('1')">
                    <i v-if="self_icon_ctr" class="el-icon-remove-outline"></i>
                    <i v-else class="el-icon-circle-plus-outline"></i>
                    <span>{{self_icon_ctr==true?'收起':'添加'}}</span>
                </a>
            </div>
            <p v-show="(self_list==null||self_list.length==0)&&(self_icon_ctr!==true)" class="no-data">+
                添加工作经历，增加您的实力，让雇主更加信任你！</p>
            <el-collapse-transition>
                <div style="margin-left: 64px" v-show="self_icon_ctr">
                    <el-form ref="self_form"
                             label-width="80px"
                             :inline="true"
                             :model="self_form"
                             :rules="self_rules">
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="received_time" label="获取时间">
                                    <el-date-picker v-model="self_form.received_time" type="date"
                                                    placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="honor_typeid" label="资质证书">
                                    <el-cascader
                                            v-model="self_form.honor_typeid"
                                            :options="self_uplao_list"
                                            :props="self_list_props_data">
                                    </el-cascader>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item label="资质照片">
                                    <el-upload
                                            :action="$store.state.uploadApi"
                                            list-type="picture-card"
                                            :file-list="self_upload_imgs"
                                            :on-preview="handlePictureCardPreview"
                                            name="imgs"
                                            :limit="1"
                                            :on-exceed="exceedHandle"
                                            :on-remove="handleRemove"
                                            :before-remove="handleRemoveBefore"
                                            :headers="headers"
                                            :before-upload="slef_upload_before"
                                            :on-success="self_upload_success"
                                    >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="upload_dialogVisible">
                                        <img width="100%" :src="upload_dialogImageUrl" alt/>
                                    </el-dialog>
                                    <p style="color: #999;">请确保图片清晰，文字可辨并有清晰的红色公章。</p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="form-b-btn">
                        <el-button type="danger" @click="addSelfUploadHandle('self_form')">保存</el-button>
                    </div>
                </div>
            </el-collapse-transition>
            <div class="list">
                <div class="item" v-for="(item,index) in self_list" :key="index">
                    <div>
                        <p>授权单位：AAA级信用企业</p>
                        <p>获取时间：{{item.received_time}}</p>
                    </div>
                    <div style="margin-top: 20px;margin-bottom: 20px;">
                        <img width="160" height="120" :src="envVars.IMG_HOST+item.honor_img" alt/>
                    </div>
                    <div>
                        <a href="javascript:;" @click="delSelfInfoList(item.id)"
                           class="el-icon-delete el-icon-delete-hover"></a>
                    </div>
                </div>
            </div>
        </div>
        <!--媒介资质-->
        <div class="info-job com-item">
            <div class="title">
                <h3>
                    <i class="el-icon-s-cooperation"></i>
                    <span>媒介资质</span>
                </h3>
                <a href="javascript:;" @click="medias_icon_ctr=!medias_icon_ctr">
                    <i v-if="medias_icon_ctr" class="el-icon-remove-outline"></i>
                    <i v-else class="el-icon-circle-plus-outline"></i>
                    <span>{{medias_icon_ctr==true?'收起':'添加'}}</span>
                </a>
            </div>
            <p v-show="(medias_list==null||medias_list.length==0)&&(medias_icon_ctr!==true)" class="no-data">+
                添加工作经历，增加您的实力，让雇主更加信任你！</p>

            <el-collapse-transition>
                <div style="margin-left: 64px" v-show="medias_icon_ctr">
                    <el-form ref="medias_form" :inline="true" :rules="medias_rules" :model="medias_form"
                             label-width="80px">
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item label="获取时间" prop="mediaTime">
                                    <el-date-picker
                                            v-model="medias_form.mediaTime"
                                            type="daterange"
                                            value-format="yyyy-MM-dd"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="type_id" label="资质证书">
                                    <el-select v-model="medias_form.type_id" placeholder="请选择资质证书">
                                        <el-option
                                                v-for="item in mediasOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item label="附件图片">
                                    <el-upload
                                            :action="$store.state.uploadApi"
                                            list-type="picture-card"
                                            :file-list="medias_form.medias_upload_imgs"
                                            :on-preview="handlePictureCardPreview"
                                            name="imgs"
                                            :on-remove="handleRemove2"
                                            :data="self_upload_name"
                                            :headers="headers"
                                            :before-upload="slef_upload_before"
                                            :on-success="medias_upload_success"
                                    >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="upload_dialogVisible">
                                        <img width="100%" :src="upload_dialogImageUrl" alt/>
                                    </el-dialog>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="form-b-btn">
                            <el-button type="danger" @click="addMediasSaveHandle('medias_form')">保存</el-button>
                        </div>

                    </el-form>
                </div>
            </el-collapse-transition>
            <div class="list">
                <div style="padding-top: 20px;padding-bottom: 20px;" class="item" v-for="(item,index) in medias_list" :key="index">
                    <div>
                        <p>媒体资质：{{item.type_id | medias_list_filter}}</p>
                        <p>代理时间：{{item.begin_time}} - {{item.end_time}}</p>
                    </div>
                    <div style="margin-right: 30px;">
                        <img style="margin-right: 20px;" width="160" height="120" v-show="item.img1" :src="envVars.IMG_HOST+item.img1"
                             alt/>
                        <img style="margin-right: 20px;" width="160" height="120" v-show="item.img2" :src="envVars.IMG_HOST+item.img2"
                             alt/>
                        <img style="margin-right: 20px;" width="160" height="120" v-show="item.img3" :src="envVars.IMG_HOST+item.img3"
                             alt/>
                    </div>
                    <a href="javascript:;" @click="delMediasList(item.id)"
                       class="el-icon-delete el-icon-delete-hover"></a>
                </div>
            </div>

        </div>
        <!--隶属媒体-->
        <div class="info-job com-item">
            <div class="title">
                <h3>
                    <i class="el-icon-s-cooperation"></i>
                    <span>隶属媒体公司</span>
                </h3>
                <a href="javascript:;" @click="belong_icon_ctr=!belong_icon_ctr">
                    <i v-if="belong_icon_ctr" class="el-icon-remove-outline"></i>
                    <i v-else class="el-icon-circle-plus-outline"></i>
                    <span>{{belong_icon_ctr==true?'收起':'添加'}}</span>
                </a>
            </div>
            <p v-show="(belong_obj==null)&&(belong_icon_ctr!==true)" class="no-data">+
                添加工作经历，增加您的实力，让雇主更加信任你！</p>

            <el-collapse-transition>
                <div style="margin-left: 64px" v-show="belong_icon_ctr">
                    <el-form ref="belong_form" :inline="true" :model="belong_form" :rules="belong_rules"
                             label-width="80px">
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="company_name" label="公司名称">
                                    <el-input v-model="belong_form.company_name" placeholder="请输入公司名称"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item prop="type_id" label="公司证明">
                                    <el-select v-model="belong_form.type_id" placeholder="请选择公司证明">
                                        <el-option
                                                v-for="item in belongOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item label="附件图片">
                                    <el-upload
                                            :action="$store.state.uploadApi"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :file-list="belong_form.belong_upload_imgs"
                                            name="imgs"
                                            :limit="2"
                                            :on-exceed="mediasBelongExceedHandle"
                                            :on-remove="handleRemove3"
                                            :headers="headers"
                                            :before-upload="slef_upload_before"
                                            :on-success="belongMedias_upload_success"
                                    >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="upload_dialogVisible">
                                        <img width="100%" :src="upload_dialogImageUrl" alt/>
                                    </el-dialog>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt/>
                                    </el-dialog>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-button type="danger" @click="addBelongMediasSaveHandle('belong_form')">保存</el-button>

                </div>
            </el-collapse-transition>
            <div class="list" v-if="belong_obj">
                <div style="padding-top: 20px;padding-bottom: 20px;" class="item">
                    <div>
                        <p>公司名称：{{belong_obj.company_name}}</p>
                        <p>媒体资质：{{belong_obj.type_id}}</p>
                        <p>审核状态：{{belong_obj.status}}</p>
                    </div>
                    <div>
                        <img style="margin-right: 20px;" width="160" height="120" v-show="belong_obj.img_certify" :src="envVars.IMG_HOST+belong_obj.img_certify"
                             alt/>
                        <img style="margin-right: 20px;" width="160" height="120" v-show="belong_obj.img_license" :src="envVars.IMG_HOST+belong_obj.img_license"
                             alt/>
                    </div>
                    <a href="javascript:;" @click="delBelongMediasList(belong_obj.id)"
                       class="el-icon-delete el-icon-delete-hover"></a>
                </div>
            </div>

        </div>
        <div class="finish com-item">
            <p class="no-data">您的资料已完善，点击按钮进行下一个任务（选择技能）</p>
            <div>
                <el-button type="danger" @click="CheckGoNextHandle($store.state.storeInfo,'/store/skill?storeIndex=skill')">下一个任务</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import area from "@/assets/js/area";
    import pickTime1 from "../../assets/js/pickTime";
    import {
        /*------基本信息---*/
        add_store_base_info,
        get_store_info,
        /*-------工作------*/
        add_store_job_info,
        get_store_job_info,
        del_store_job_info,
        /*--------自传资质-----*/
        get_store_upload_self_user,
        get_store_upload_self_list,
        edit_store_upload_self,
        del_store_upload_self,
        add_store_upload_self,
    } from "../../api/store-flow";
    import {removeFile} from '@/api/common'
    import {medias, mediaBelong} from "../../api/store-flow";
    import {mapMutations, mapState} from "vuex";
    import {getCookie} from "../../utils";

    export default {
        data() {
            return {
                jobPickTimeVal: "",
                value: "",
                key: "",
                job_list: null,
                self_list: null,
                job_icon_ctr: false,
                job_show: true,
                job_scale_list: [
                    //规模
                    {scale_id: 1, label: "1人"},
                    {scale_id: 2, label: "10人"},
                    {scale_id: 3, label: "50人"},
                    {scale_id: 4, label: "100人"}
                ],
                job_nature_list: [
                    // 性质
                    {nature_id: 1, label: "公司性质1"},
                    {nature_id: 2, label: "公司性质2"},
                    {nature_id: 3, label: "公司性质3"},
                    {nature_id: 4, label: "公司性质4"}
                ],
                show3: false,

                self_upload_show: false,
                self_upload_name: {name: 'cs'},
                self_icon_ctr: false,
                self_upload_imgs: [],
                headers: {},
                upload_dialogVisible: false,
                upload_dialogImageUrl: '',
                self_uplao_list: [],
                self_list_props_data: {
                    value: 'id',
                    label: 'type_name',
                    children: 'children',
                    parent_id: 'parent_id'
                },
                baseFormRules: {},
                dialogImageUrl: "",
                dialogVisible: false,

                /*媒介资质 S*/
                medias_list: null,
                medias_icon_ctr: false,
                medias_show: false,

                mediasOptions: [
                    {value: '直营媒体', lable: '直营媒体', type_id: 0,},
                    {value: '一级代理', lable: '一级代理', type_id: 1,},
                    {value: '二级代理', lable: '二级代理', type_id: 2,},
                    {value: '其他', lable: '其他', type_id: 3,},
                ],
                medias_form: {
                    type_id: '',//资质证书
                    mediaTime: [],
                    medias_upload_imgs: [],
                },
                medias_rules: {
                    mediaTime: [{required: true, message: "时间不能为空", trigger: ["blur", "change"]}],
                    type_id: [{required: true, message: "请选择资质类型", trigger: ["blur", "change"]}],

                },
                /*媒介资质 E*/

                /*隶属公司 S*/
                belong_obj: null,
                belong_icon_ctr: false,
                belong_show: false,

                belongOptions: [
                    {value: '营业执照和工牌', lable: '营业执照和工牌', type_id: 1},
                    {value: '营业执照和名片', lable: '营业执照和名片', type_id: 2},
                ],
                belong_form: {
                    company_name: '',
                    type_id: '',
                    belong_upload_imgs: [],
                },
                belong_rules: {
                    company_name: [{required: true, message: "公司名称不能为空", trigger: ["blur", "change"]}],
                    type_id: [{required: true, message: "请选择公司证明", trigger: ["blur", "change"]}],

                },
                /*隶属公司 E*/
                area:JSON.parse(JSON.stringify(area)),
                pickTime1,

                baseForm: {
                    type_id: 1,
                    selectArea: ["110000", "110100", "110101"],
                    store_name: "", //店铺名称
                    contacts_name: "", //联系人姓名
                    email: "", //邮箱
                    phone: "", //联系人电话
                    about_us: "", //关于我们
                    country: "", //选择国家id
                    province: "", //选择省份id
                    city: "", //选择城市id
                    district: "", //选择区域id
                    address: "" //详细地址
                },
                rules: {
                    selectArea: [{required: true, message: "省市区不能为空", trigger: ["blur", "change"]}],
                    phone: [{
                        required: true,
                        message: "手机号不能为空",
                        trigger: ["blur", "change"]
                    }, {
                        pattern: /^((13[0-9]|14[1|5-9]|15[0-9]|16[2|5|6|7]|17[0-9]|18[0-9]|19[0-2|5-9])\d{8})$/,
                        message: "请检查手机号是否正确",
                        trigger: "blur"
                    }],
                    store_name: [{required: true, message: "店铺名称不能为空", trigger: ["blur", "change"]}],
                    contacts_name: [{required: true, message: "联系人姓名不能为空", trigger: ["blur", "change"]}],
                    email: [{required: true, message: "邮箱不能为空", trigger: ["blur", "change"]}],
                    about_us: [{required: true, message: "关于我们不能为空", trigger: ["blur", "change"]}],
                    address: [{required: true, message: "详细地址不能为空", trigger: ["blur", "change"]}]
                },
                job_form: {
                    jobPickTimeVal: "", //时间
                    company_name: "", //company_name:'公司名称',
                    scale_id: "", //scale_id:'公司规模id',
                    nature_id: "", //nature_id:'公司性质id',
                    department: "", //department:'所在部门',
                    position: "", //position:'公司职务',
                    begin_time: "", //begin_time:'开始时间',
                    end_time: "", //end_time:'结束时间',
                    work_desc: "" //work_desc:'工作经历简介',
                },
                job_rules: {
                    jobPickTimeVal: [{required: true, message: "时间不能为空", trigger: ["blur", "change"]}],
                    company_name: [{required: true, message: "公司名称不能为空", trigger: ["blur", "change"]}],
                    scale_id: [{required: true, message: "公司规模不能为空", trigger: ["blur", "change"]}],
                    nature_id: [{required: true, message: "公司性质不能为空", trigger: ["blur", "change"]}],
                    department: [{required: true, message: "所在部门不能为空", trigger: ["blur", "change"]}],
                    position: [{required: true, message: "公司职务不能为空", trigger: ["blur", "change"]}],
                    begin_time: [{required: true, message: "开始时间不能为空", trigger: ["blur", "change"]}],
                    end_time: [{required: true, message: "结束时间不能为空", trigger: ["blur", "change"]}],
                    work_desc: [{required: true, message: "工作经历简介不能为空", trigger: ["blur", "change"]}]
                },

                self_form: {
                    honor_typeid: '',//获得证书类型id，读取资质证书列表
                    honor_img: '',//图片1
                    received_time: ''//获得资质日期
                },
                self_rules: {
                    honor_typeid: [{required: true, message: "证书类型不能为空", trigger: ["blur", "change"]}],
                    honor_img: [{required: true, message: "图片不能为空", trigger: ["blur", "change"]}],
                    received_time: [{required: true, message: "时间不能为空", trigger: ["blur", "change"]}],
                },
                prosDatas: {
                    value: "id",
                    label: "name",
                    children: "child"
                },
                options: [
                    {
                        value: "zhinan",
                        label: "指南",
                        children: [
                            {
                                value: "shejiyuanze",
                                label: "设计原则",
                                children: [
                                    {
                                        value: "yizhi",
                                        label: "一致"
                                    },
                                    {
                                        value: "fankui",
                                        label: "反馈"
                                    },
                                    {
                                        value: "xiaolv",
                                        label: "效率"
                                    },
                                    {
                                        value: "kekong",
                                        label: "可控"
                                    }
                                ]
                            },
                            {
                                value: "daohang",
                                label: "导航",
                                children: [
                                    {
                                        value: "cexiangdaohang",
                                        label: "侧向导航"
                                    },
                                    {
                                        value: "dingbudaohang",
                                        label: "顶部导航"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        },
        filters: {
            // 公司性质过滤
            job_nature_list_filter: function (arr, val) {
                if (!val) return "";
                this.job_nature_list.forEach(element => {
                    if (element.nature_id == val) {
                        return element.label
                    }
                });
            },
            // 公司规模过滤
            job_scale_list_filter: function (arr, val) {
                if (!val) return "";
                this.job_scale_list.forEach(element => {
                    if (element.scale_id == val) {
                        return element.label
                    }
                });
            },
            medias_list_filter: (val) => {
                let mediasOptions = [
                    {value: '直营媒体', lable: '直营媒体', type_id: 0,},
                    {value: '一级代理', lable: '一级代理', type_id: 1,},
                    {value: '二级代理', lable: '二级代理', type_id: 2,},
                    {value: '其他', lable: '其他', type_id: 3,},
                ]
                return mediasOptions[val].lable
            },
        },
        watch: {
            storeInfo() {
                let arr = new Array();
                arr.push(this.storeInfo.province.toString());
                arr.push(this.storeInfo.city.toString());
                arr.push(this.storeInfo.district.toString());
                this.baseForm = this.storeInfo;
                this.$set(this.baseForm, "selectArea", arr);
            },
            "job_form.jobPickTimeVal"() {
                this.job_form.begin_time = this.job_form.jobPickTimeVal[0];
                this.job_form.end_time = this.job_form.jobPickTimeVal[1];
            }
        },
        computed: {
            ...mapState(["storeInfo"])
        },
        mounted() {
            this.initData();
        },
        methods: {
            ...mapMutations(["CHANGE_STORE_INFO"]),

            CheckGoNextHandle(b,u){
                if(b){
                    this.$router.push(u)
                }else{
                    this.$message.error('请先完成当前认证')
                }
            },

            /*---------删除工作列表----------------*/
            async delJobInfoList(id) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let _data = await del_store_job_info(id)
                    let {code, message, data} = _data.data
                    if (code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.initData()
                    } else {
                        this.$message.info(message);
                    }

                })
            },
            /*---------保存基本信息----------------*/
            async addBaseInfo(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        if (!this.baseForm.province) {
                            this.baseForm.province = this.baseForm.selectArea[0];
                        }
                        if (!this.baseForm.city) {
                            this.baseForm.city = this.baseForm.selectArea[1];
                        }
                        if (!this.baseForm.district) {
                            this.baseForm.district = this.baseForm.selectArea[2];
                        }
                        let _data = await add_store_base_info(this.baseForm);
                        let {code, message, data} = _data.data;
                        if (code == 200) {
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            let _data = await get_store_info();
                            let {code, data, message} = _data.data;
                            if (code == 200) {
                                this.CHANGE_STORE_INFO(data);
                            }
                        } else {
                            this.$message.error(message);
                        }
                    }
                });
            },
            /*---------保存基本信息----------------*/
            async addJobInfo(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let _data = await add_store_job_info(this.job_form);
                        let {code, message, data} = _data.data;
                        if (code == 200) {
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            let _data = await get_store_job_info();
                            let {code, data, message} = _data.data;
                            if (code == 200) {
                                this.job_list = data;
                                this.job_icon_ctr = !this.job_icon_ctr;
                                this.$refs[formName].resetFields();
                            }
                        } else {
                            this.$message.error(message);
                        }
                    }
                });
            },
            /*---------选择地址赋值----------------*/
            async selectHandleChange(items) {
                this.baseForm.province = items[0] ? items[0] : "";
                this.baseForm.city = items[1] ? items[1] : "";
                this.baseForm.district = items[2] ? items[2] : "";
            },
            /*---------初始化数据----------------*/
            async initData() {
                let _data = await get_store_job_info();
                let {code, data, message} = _data.data;
                if (code == 200) {
                    this.job_list = data;
                } else {
                    this.$message.error(message);
                }

                let init2 = async () => {
                    let _data = await get_store_upload_self_list()
                    let {code, message, data} = _data.data
                    if (code == 200) {
                        this.self_uplao_list = data
                    } else {
                        this.$message.error(message)
                    }
                }
                await init2()


                this.initSelf()
                this.mediasInit()
                this.belongMediasInit()
            },

            /*---------自传资质收起， 展开----------------*/
            async selfUploadClickHandle() {
                this.self_icon_ctr = !this.self_icon_ctr
            },

            async initSelf() {
                let _data = await get_store_upload_self_user();
                let {code, data, message} = _data.data;
                if (code == 200) {
                    this.self_list = data;
                } else {
                    this.$message.error(message);
                }
            },
            /*---------自传资质保存操作----------------*/
            async addSelfUploadHandle(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        if (this.self_upload_imgs.length == 0) {
                            this.$message.error('请先上传图片')
                            return false
                        }
                        let formData = this.self_form
                        this.$set(formData, 'honor_img', this.self_upload_imgs[0].path)
                        this.$set(formData, 'honor_typeid', formData.honor_typeid[1])
                        let _data = await add_store_upload_self(formData)
                        let {code, message, data} = _data.data
                        if (code == 200) {
                            this.$message.success('操作成功')
                            this.self_icon_ctr = !this.self_icon_ctr
                            this.self_upload_imgs = []
                            this.initSelf()
                            this.$refs[formName].resetFields();
                        }
                    }
                })
            },
            /*---------删除资质列表（自传）----------------*/
            async delSelfInfoList(id) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let _data = await del_store_upload_self(id)
                    let {code, message, data} = _data.data
                    if (code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.initSelf()
                    } else {
                        this.$message.info(message);
                    }

                })
            },
            /*---------upload预览----------------*/
            async handlePictureCardPreview(file) {
                // this.dialogImageUrl = file.url;
                // this.upload_dialogVisible = true;
            },
            /*---------upload删除----------------*/
            handleRemove(file, fileList) {
                let str = file.url
                let iStr = str.replace(file.domain, '')
                let arr = this.self_upload_imgs
                removeFile({rmfile: iStr}).then(res => {
                    arr.forEach((el, idx) => {
                        if (el.uid == file.uid) {
                            arr.splice(idx, 1)
                            this.self_upload_imgs = arr
                        }
                    })
                    this.$message.success('操作成功')
                }).catch(err => {
                    this.$message.error('操作失败')
                    return false
                })
            },
            /*---------upload删除前----------------*/
            async handleRemoveBefore(file, fileList) {

            },
            /*---------自传资质上传前钩子----------------*/
            async slef_upload_before(file) {
                // console.log(file)
                this.headers = {'Authorization': 'Bearer ' + getCookie('access_token')}
            },
            /*---------自传资质上传成功时钩子----------------*/
            async self_upload_success(response, file, fileList) {
                let {code, message, data} = response
                this.self_upload_imgs.push({
                    url: data.domain + '/' + data.file,
                    status: 'finished',
                    domain: data.domain + '/',
                    path: data.file,
                })
                this.$message.success('操作成功')
            },
            exceedHandle() {
                this.$message.error('只能上传一张')
            },

            /*媒介资质*/
            async mediasInit() {
                let _data = await medias.listFn()
                let {code, message, data} = _data.data
                if (code == 200) {
                    this.medias_list = data
                }
            },
            handleRemove2(file, fileList) {
                let str = file.url
                let iStr = str.replace(file.domain, '')

                let arr = this.medias_form.medias_upload_imgs
                removeFile({rmfile: iStr}).then(res => {
                    arr.forEach((el, idx) => {
                        if (el.uid == file.uid) {
                            arr.splice(idx, 1)
                            this.medias_form.medias_upload_imgs = arr
                        }
                    })
                    this.$message.success('操作成功')
                }).catch(err => {
                    this.$message.error('操作失败')
                    return false
                })
            },
            async medias_upload_success(response, file, fileList) {
                let {code, message, data} = response
                this.medias_form.medias_upload_imgs.push({
                    url: data.domain + '/' + data.file,
                    status: 'finished',
                    domain: data.domain + '/',
                    path: data.file,
                })
                this.$message.success('操作成功')
            },
            async addMediasSaveHandle(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        if (this.medias_form.medias_upload_imgs.length == 0) {
                            this.$message.error('请先上传图片')
                            return false
                        }
                        let formData = Object.assign({}, this.medias_form)
                        let arr = this.mediasOptions
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].lable == formData.type_id) {
                                formData.type_id = arr[i].type_id
                            }
                        }
                        formData.begin_time = formData.mediaTime[0]
                        formData.end_time = formData.mediaTime[1]

                        formData.img1 = this.medias_form.medias_upload_imgs[0] ? this.medias_form.medias_upload_imgs[0].path : ''
                        formData.img2 = this.medias_form.medias_upload_imgs[1] ? this.medias_form.medias_upload_imgs[1].path : ''
                        formData.img3 = this.medias_form.medias_upload_imgs[2] ? this.medias_form.medias_upload_imgs[2].path : ''

                        let _data = await medias.addFn(formData)
                        let {code, message, data} = _data.data
                        if (code == 200) {
                            this.$message.success('操作成功')
                            this.medias_icon_ctr = !this.medias_icon_ctr
                            this.medias_form.medias_upload_imgs = []
                            this.mediasInit()
                            this.$refs[formName].resetFields();
                        }
                    }
                })
            },
            async delMediasList(id) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let _data = await medias.delFn(id)
                    let {code, message, data} = _data.data
                    if (code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.mediasInit()
                    } else {
                        this.$message.info(message);
                    }

                })
            },

            /*隶属媒体公司*/
            async belongMediasInit() {
                let _data = await mediaBelong.listFn()
                let {code, message, data} = _data.data
                if (code == 200) {
                    this.belong_obj = data
                }
            },
            handleRemove3(file, fileList) {
                let str = file.url
                let iStr = str.replace(file.domain, '')

                let arr = this.belong_form.belong_upload_imgs
                removeFile({rmfile: iStr}).then(res => {
                    arr.forEach((el, idx) => {
                        if (el.uid == file.uid) {
                            arr.splice(idx, 1)
                            this.medias_form.medias_upload_imgs = arr
                        }
                    })
                    this.$message.success('操作成功')
                }).catch(err => {
                    this.$message.error('操作失败')
                    return false
                })
            },
            async belongMedias_upload_success(response, file, fileList) {
                let {code, message, data} = response
                this.belong_form.belong_upload_imgs.push({
                    url: data.domain + '/' + data.file,
                    status: 'finished',
                    domain: data.domain + '/',
                    path: data.file,
                })
                this.$message.success('操作成功')
            },
            async addBelongMediasSaveHandle(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        if (this.belong_form.belong_upload_imgs.length == 0) {
                            this.$message.error('请先上传图片')
                            return false
                        }else if(this.belong_form.belong_upload_imgs.length == 0){
                            this.$message.error('请上传2张图')
                            return false
                        }
                        let formData = Object.assign({}, this.belong_form)
                        let arr = this.belongOptions
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].lable == formData.type_id) {
                                formData.type_id = arr[i].type_id
                            }
                        }
                        formData.img_license = this.belong_form.belong_upload_imgs[0]?this.belong_form.belong_upload_imgs[0].path:''
                        formData.img_certify = this.belong_form.belong_upload_imgs[1]?this.belong_form.belong_upload_imgs[1].path:''

                        let _data = await mediaBelong.addFn(formData)
                        let {code, message, data} = _data.data
                        if (code == 200) {
                            this.$message.success('操作成功')
                            this.belong_icon_ctr = !this.belong_icon_ctr
                            this.belong_form.belong_upload_imgs = []
                            this.belongMediasInit()
                            this.$refs[formName].resetFields();
                        }
                    }
                })
            },
            async delBelongMediasList(id) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let _data = await mediaBelong.delFn(id)
                    let {code, message, data} = _data.data
                    if (code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.belongMediasInit()
                    } else {
                        this.$message.info(message);
                    }

                })
            },
            mediasBelongExceedHandle(){
                this.$message.error('只能上传两张图片')
            }

        }
    };
</script>
<style scoped lang="less">
    @import "~assets/css/store/info.less";

    .el-cascader {
        width: 500px;
    }

    .job-form-set-width {
        .el-input,
        .el-select,
        .el-textarea,
        .el-range-editor {
            width: 500px;
        }
    }

    .job-list-item {
        .item {
            display: flex;
            justify-content: space-between;

            .job-inner {
                padding-top: 20px;
                padding-bottom: 20px;

                .div1 {
                    color: #333;
                    display: flex;
                    padding-bottom: 18px;

                    p:nth-child(1) {
                        margin-right: 81px;
                        font-size: 16px;
                    }
                }

                div:nth-child(2) {
                    justify-content: flex-start !important;

                    p {
                        font-size: 14px;
                        color: #666;
                        margin-right: 77px;
                    }
                }
            }
        }
    }

    .el-icon-delete-hover {
        &:hover {
            color: #f3262d !important;
        }
    }

    .com-item {
        margin-bottom: 20px;
    }

    .form-b-btn {
        margin-left: 78px;
        margin-bottom: 20px;
    }
</style>
