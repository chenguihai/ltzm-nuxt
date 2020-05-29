<template>
    <div>
    <div class="store-banner-main"></div>
    <div class="service_center">
        <info-side/>
        <div class="info_wrap">
            <!--基本信息-->
            <div class="user_info">
                <h3>基本信息</h3>
                <div class="avatar" v-if="storeInfo.store_name || baseForm.type_id">
                    <p class="p">请选择您的开店身份</p>
                    <img class="img"
                         :src="require(`~/assets/img/stores/${storeInfo.type_id ===1 ? 'personal_active':'personal_disabled'}.png`)"/>
                    <img class="img"
                         :src="require(`~/assets/img/stores/${storeInfo.type_id ===2 ? 'company_active':'company_disabled'}.png`)"/>
                </div>
                <div class="avatar" v-else>
                    <p class="p">请选择您的开店身份</p>
                    <img class="active img" @click="switchIdentity(1)"
                         :src="require(`~/assets/img/stores/${selectType ===1 ? 'personal_active':'personal'}.png`)"/>
                    <img class="active img" @click="switchIdentity(2)"
                         :src="require(`~/assets/img/stores/${selectType ===2 ? 'company_active':'company'}.png`)"/>
                </div>
                <el-form ref="baseForm"
                         label-position="right"
                         class="demo-ruleForm common_form"
                         :model="baseForm"
                         :rules="rules"
                         label-width="154px"
                >
                    <!--企业特有的-->
                    <template v-if="storeInfo.type_id === 2 || selectType === 2">
                        <el-form-item prop="company_name" label="企业名称">
                            <el-input v-model="baseForm.company_name" clearable placeholder="请填写企业名称"></el-input>
                        </el-form-item>
                        <el-form-item prop="company_type_id" label="企业类型">
                            <el-select v-model="baseForm.company_type_id" placeholder="请选择">
                                <el-option
                                        v-for="item in nature_list"
                                        :key="item.id"
                                        :label="item.nature_name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="scale_id" label="公司规模">
                            <el-select v-model="baseForm.scale_id" placeholder="请选择">
                                <el-option
                                        v-for="item in scale_list"
                                        :key="item.id"
                                        :label="item.scale_name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                    <el-form-item prop="store_name" label="店铺名称">
                        <el-input v-model="baseForm.store_name" clearable placeholder="请填写店铺名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="district" label="联系地址">
                        <el-select class="w_150" v-model="baseForm.province" placeholder="请选择"
                                   :disabled="!!storeInfo.store_name"
                                   @change="provinceChange">
                            <el-option
                                    v-for="item in provinceList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select class="w_150" v-model="baseForm.city" placeholder="请选择"
                                   :disabled="!!storeInfo.store_name" @change="cityChange">
                            <el-option
                                    v-for="item in cityList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select class="w_150 mr_0" v-model="baseForm.district" placeholder="请选择">
                            <el-option
                                    v-for="item in districtList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input class="mt_22" v-model="baseForm.address" clearable
                                  placeholder="请填写详细地址"></el-input>
                    </el-form-item>
                    <!--企业特有的-->
                    <el-form-item prop="contacts_name" label="姓名">
                        <el-input v-model="baseForm.contacts_name" clearable placeholder="请填写姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" label="联系人电话">
                        <el-input v-model="baseForm.phone" clearable placeholder="请填写联系电话"></el-input>
                    </el-form-item>
                    <el-form-item prop="email" label="电子邮箱">
                        <el-input v-model="baseForm.email" clearable placeholder="请填写邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="about_us" label="关于我们">
                        <el-input type="textarea" clearable v-model="baseForm.about_us"
                                  placeholder="请填写..."></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button size="small" class="button_wrap save_btn" :loading="isLoading"
                                   @click="addBaseInfo('baseForm')">保存修改
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--工作-->
            <work-experience v-if="storeInfo.type_id ===1 || selectType===1"></work-experience>
            <!--自传资质-->
            <auto-qualify></auto-qualify>
            <!--媒介资质-->
            <media-qualify></media-qualify>
            <!--隶属媒体-->
            <subjection-media v-if="storeInfo.type_id ===1 || selectType===1"></subjection-media>
            <div class="finish com-item" v-if="storeInfo.isEntered!==1">
                <p class="no-data">您的资料已完善，点击按钮进行下一个任务（选择技能）</p>
                <div class="btn_wrap">
                            <span class="save_btn"
                                  @click="CheckGoNextHandle('/store/skill?storeIndex=skill')">下一个任务</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import {get_NaturesList, get_ScalesList, add_store_base_info, get_store_info} from '../../api/store-flow'
    import InfoSide from '~/components/store/side';
    import area from "@/assets/js/area";
    import {mapMutations, mapState} from "vuex";
    import {addressSplit} from "../../utils/common";
    import WorkExperience from "@/components/service/WorkExperience";
    import AutoQualify from "@/components/service/AutoQualify";
    import MediaQualify from "@/components/service/MediaQualify";
    import SubjectionMedia from "@/components/service/SubjectionMedia";

    export default {
        layout: 'shop-flow-layout',
        components: {InfoSide, WorkExperience, AutoQualify, MediaQualify, SubjectionMedia},
        data() {
            var validateStoreName = (rule, value, callback) => {
                if (/公司|旗舰/.test(value)) {
                    // console.log(this.storeInfo.type_id,this.selectType)
                    if (this.storeInfo.type_id === 2 || this.selectType === 2) {
                        callback()
                    } else {
                        callback(new Error('个人店铺名称不能包含公司，旗舰等字'))
                    }
                } else {
                    callback()
                }
            }
            let areaJson = JSON.parse(JSON.stringify(area))
            areaJson.shift()
            return {
                provinceList: areaJson,//省
                cityList: [],//市
                districtList: [],//区
                baseForm: {
                    type_id: '',
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
                    store_name: [{
                        required: true,
                        message: "店铺名称不能为空",
                        trigger: "change"
                    }, {validator: validateStoreName, trigger: 'change'}],
                    contacts_name: [{required: true, message: "联系人姓名不能为空", trigger: "change"}],
                    email: [{required: true, message: "邮箱不能为空", trigger: "change"}],
                    phone: [{required: true, message: "手机号不能为空", trigger: "change"},
                        {pattern:/^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/ , message: "请检查手机号是否正确", trigger: "change"}
                    ],
                    about_us: [{required: true, message: "关于我们不能为空", trigger: "change"}],
                    address: [{required: true, message: "详细地址不能为空", trigger: "change"}],
                    district: [{required: true, message: "省市区不能为空", trigger: "change"}],


                    company_name: [{required: false, message: "企业名称不能为空", trigger: "change"},
                        {min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'change'}],
                    scale_id: [{required: false, message: "企业规模不能为空", trigger: "change"}],
                    company_type_id: [{required: false, message: "企业性质不能为空", trigger: "change"}],
                },
                selectType: -1, //选中的角色
                isLoading: false
            };
        },
        created() {
            this.getNaturesList()
            this.getScalesList()
        },
        methods: {
            ...mapMutations(["CHANGE_STORE_INFO", 'GET_NATURE_LIST', 'GET_SCALE_LIST']),
            provinceChange(val) {
                let data = this.provinceList;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == val) {
                        this.cityList = data[i].child;
                        this.districtList = [];
                        this.baseForm.city = '';
                        this.baseForm.district = '';
                    }
                }
            },
            cityChange(val) {
                let data = this.provinceList, item = [];
                for (let i = 0; i < data.length; i++) {
                    item = data[i].child || []
                    for (let j = 0; j < item.length; j++) {
                        if (item[j].id == val) {
                            this.districtList = item[j].child;
                            this.baseForm.district = '';
                        }

                    }
                }
            },
            async getNaturesList() {  // 获取公司性质
                let res = await get_NaturesList()
                let {code, data} = res.data
                if (code == 200) {
                    this.GET_NATURE_LIST(data)
                }
            },
            async getScalesList() { // 获取公司规模
                let res = await get_ScalesList()
                let {code, data} = res.data
                if (code == 200) {
                    this.GET_SCALE_LIST(data)
                }
            },

            switchIdentity(type) {
                this.selectType = type;
            },
            CheckGoNextHandle(u) {
                if (this.storeInfo.status !== undefined) {
                    this.$router.push(u)
                } else {
                    this.$message.error('请先完成当前认证')
                }
            },
            async addBaseInfo(formName) { //保存基本信息
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let param = JSON.parse(JSON.stringify(this.baseForm));
                        param.type_id = this.storeInfo.type_id || this.selectType;
                        this.isLoading = true;
                        let _data = await add_store_base_info(param);
                        let {code, message, data} = _data.data;
                        if (code == 200) {
                            this.getStoreInfoHttp();
                            this.$message({message: "操作成功", type: "success"});
                        } else {
                            this.$message.error(message);
                        }
                        this.isLoading = false;
                    }
                });
            },
            getStoreInfoHttp() {
                get_store_info().then(res => {
                    let {code, data = {}, message} = res.data
                    this.CHANGE_STORE_INFO(data);
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        watch: {
            "storeInfo"(data) {
                if (data.store_name) {
                    this.baseForm = {
                        type_id: data.type_id,
                        store_name: data.store_name, //店铺名称
                        contacts_name: data.contacts_name, //联系人姓名
                        email: data.email, //邮箱
                        phone: data.phone, //联系人电话
                        about_us: data.about_us, //关于我们
                        country: data.country + '', //选择国家id
                        province: data.province + '', //选择省份id
                        city: data.city + '', //选择城市id
                        district: data.district + '', //选择区域id
                        address: data.address, //详细地址

                        company_name: data.company_name || '',// 企业名称
                        scale_id: data.scale_id || '',// 企业规模id
                        company_type_id: data.company_type_id || ''// 企业性质id
                    }
                    if (data.type_id === 2) {
                        this.rules.store_name = [{required: false, message: "店铺名称不能为空", trigger: "change"}],
                            this.rules.company_name = [{required: true, message: "企业名称不能为空", trigger: "change"}];
                        this.rules.scale_id = [{required: true, message: "企业规模不能为空", trigger: "change"}];
                        this.rules.company_type_id = [{required: true, message: "企业性质不能为空", trigger: "change"}];
                    }
                    const [city = [], district = []] = addressSplit(this.provinceList, data.province, data.city, data.district) || []
                    this.cityList = city;
                    this.districtList = district;
                } else if (data.type) {
                    this.baseForm.type_id = data.type;
                    this.storeInfo.type_id = data.type;
                    this.selectType = data.type;
                } else {
                    this.selectType = 1;
                }
            },
            "selectType"(data) {
                let flag = data === 2;
                this.rules.company_name = [{required: flag, message: "企业名称不能为空", trigger: "change"}];
                this.rules.scale_id = [{required: flag, message: "企业规模不能为空", trigger: "change"}];
                this.rules.company_type_id = [{required: flag, message: "企业性质不能为空", trigger: "change"}];
            }
        },
        computed: {
            ...mapState(['storeInfo', 'nature_list', 'scale_list'])
        },
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/store/info.less";
</style>
<style lang="less">
    @import "../../assets/css/form.less";
</style>
