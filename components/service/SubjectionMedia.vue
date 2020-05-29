<template>
    <div class="com-item">
        <div class="title">
            <h3>
                <svg class="svg_icon" aria-hidden="true">
                    <use xlink:href="#icon-lishumeitigongsi"/>
                </svg>
                <span>隶属媒体公司</span>
            </h3>
            <a v-if="!belongObj" href="javascript:;" @click="addBelong">
                <i v-if="belongFlag" class="el-icon-remove-outline"></i>
                <i v-else class="el-icon-circle-plus-outline"></i>
                <span>{{belongFlag==true?'收起':'添加'}}</span>
            </a>
        </div>
        <p v-show="(belongObj==null)&&(belongFlag!==true)" class="no-data">+添加隶属媒体公司，增强您的实力，让雇主更加信任您！</p>

        <!--        <el-collapse-transition>        </el-collapse-transition>-->
        <el-form v-show="belongFlag" ref="form" :model="form" :rules="rules" class="subjectionForm common_form">
            <el-form-item prop="company_name" label="公司名称">
                <el-input v-model="form.company_name"
                          placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item prop="short_name" label="公司简称">
                <el-input v-model="form.short_name"
                          placeholder="请输入公司简称"></el-input>
            </el-form-item>
            <el-form-item prop="type_id" label="公司证明">
                <el-select v-model="form.type_id" placeholder="请选择公司证明">
                    <el-option
                            v-for="item in belongOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item id="subjectionMedia" label="附件图片" prop="belong_upload_imgs">
                <multiple-upload :flag="belongFlag" type="subjectionMedia" :key="Math.random()" btn="上传委托书"
                                 :url="form.belong_upload_imgs" :max="2"
                                 @emitSubmit="emitUploadImg"/>
            </el-form-item>
            <el-form-item label="" class="pl_91">
                <el-button size="small" class="button_wrap save_btn" :loading="isLoading"
                           @click="saveCompany('form')">保存</el-button>
                <el-button size="small" class="button_wrap cancel_btn" @click="addBelong">取消</el-button>
            </el-form-item>
        </el-form>
        <div class="work_list" v-if="belongObj">
            <div class="work_item">
                <div class="left_qualify">
                    <p>公司名称：{{belongObj.company_name}}</p>
                    <p>公司简称：{{belongObj.short_name}}</p>
                    <p>证明方式：{{belongObj.type_id | waysProof}}</p>
                    <p>审核状态：{{belongObj.status | examineStatus}}</p>
                    <p v-if="belongObj.status === -1">未通过原因：{{belongObj.remarks}}</p>
                </div>
                <div class="base_img_wrap">
                    <img class="img"
                         v-show="belongObj.img_certify"
                         :src="envVars.IMG_HOST+belongObj.img_certify+'?x-oss-process=image/resize,m_fill,h_96,w_160'"
                         alt/>
                    <img class="img"
                         v-show="belongObj.img_license"
                         :src="envVars.IMG_HOST+belongObj.img_license+'?x-oss-process=image/resize,m_fill,h_96,w_160'"
                         alt/>
                </div>
                <div class="item_right">
                    <span v-if="belongObj.status ===-1" class="auth" @click="editCompany"></span>
                    <span class="delete_icon" @click="delBelongMediasList(belongObj.id)"></span>
                </div>
            </div>
        </div>
        <tips-cpn v-if="autoFlag" type="red" @submit="handleSubmit" @close="handleClose"/>
    </div>
</template>

<script>
    import {companyEdit, mediaBelong} from "../../api/store-flow";
    import {mapState} from 'vuex'
    import MultipleUpload from '../UploadImage/multipleUpload'
    import TipsCpn from '~/components/TipsCpn'

    export default {
        name: "SubjectionMedia",
        components: {MultipleUpload, TipsCpn},
        data() {
            return {
                belongOptions: [
                    {value: 1, label: '营业执照和工牌', type_id: 1},
                    {value: 2, label: '营业执照和名片', type_id: 2},
                ],
                form: {
                    company_name: '',
                    short_name: '',
                    type_id: '',
                    belong_upload_imgs: [],
                },
                rules: {
                    company_name: [{required: true, message: "公司名称不能为空", trigger: "change"},
                        {min: 2, max: 16, message: '长度在2到16个字符', trigger: 'change'}],
                    short_name: [{required: true, message: "公司简称不能为空", trigger: "change"},
                        {min: 2, max: 16, message: '长度在2到16个字符', trigger: 'change'}],
                    type_id: [{required: true, message: "请选择公司证明", trigger: 'change'}],
                    belong_upload_imgs: [{required: true, message: "附件照片不能为空", trigger: 'change'}],
                },
                belongFlag: false,
                belongObj: null,
                selectId: 0,
                autoFlag: false,
                isLoading: false,
            }
        },
        created() {
            this.belongMediasInit()
        },
        methods: {
            emitUploadImg(src) {
                this.form.belong_upload_imgs = src;
            },
            addBelong() {
                this.belongFlag = !this.belongFlag;
                this.selectId = 0;
                this.$refs.form.resetFields();
            },
            async belongMediasInit() {  /*隶属媒体公司*/
                let _data = await mediaBelong.listFn()
                let {code, message, data} = _data.data
                if (code == 200) {
                    this.belongObj = data
                }
            },
            async saveCompany(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let formData = JSON.parse(JSON.stringify(this.form));
                        const uploadImg = formData.belong_upload_imgs;
                        if (uploadImg.length == 0) {
                            this.$message.error('请先上传图片')
                            return false
                        } else if (uploadImg.length < 2) {
                            this.$message.error('请上传2张图')
                            return false
                        }
                        const [img_license = {}, img_certify = {}] = uploadImg;
                        formData.img_license = img_license.path;
                        formData.img_certify = img_certify.path;
                        delete formData.belong_upload_imgs
                        let _data;
                        this.isLoading = true;
                        if (this.selectId) {
                            _data = await companyEdit(this.selectId, formData)
                        } else {
                            _data = await mediaBelong.addFn(formData)
                        }
                        let {code, message, data} = _data.data
                        if (code == 200) {
                            this.$message.success('操作成功')
                            this.belongFlag = !this.belongFlag
                            this.form.belong_upload_imgs = []
                            this.belongMediasInit()
                            this.$refs[formName].resetFields();
                        } else {
                            this.$message.error(message)
                        }
                        this.isLoading = false;
                    }
                })
            },

            editCompany() {
                const {img_license, img_certify, company_name, short_name, type_id, id} = this.belongObj;
                let imgUrl = '?x-oss-process=image/resize,m_fill,h_154,w_258';
                this.form = {
                    company_name,
                    short_name,
                    type_id,
                    belong_upload_imgs: [
                        {url: this.envVars.IMG_HOST + img_certify + imgUrl, path: img_certify},
                        {url: this.envVars.IMG_HOST + img_license + imgUrl, path: img_license},
                    ]
                };
                this.selectId = id;
                this.belongFlag = !this.belongFlag;
            },

            async delBelongMediasList(id) {
                this.autoFlag = true;
                this.selectId = id;
            },
            handleClose() {
                this.autoFlag = false;
            },
            async handleSubmit() {
                let _data = await mediaBelong.delFn(this.selectId)
                let {code, message, data} = _data.data
                if (code == 200) {
                    this.$message({type: 'success', message: '删除成功'});
                    this.handleClose();
                    this.belongFlag = false;
                    this.belongObj = null
                } else {
                    this.$message.error(message);
                }
            }
        },
        computed: {
            ...mapState({
                envVars: "envVariables",
            })
        },
        filters: {
            waysProof: (val) => {
                switch (val) {
                    case 1:
                        return '营业执照和工牌';
                        break;
                    case 2:
                        return '营业执照和名片';
                        break;
                }
            },
            examineStatus: (val) => { //状态：0 待审核 1 审核成功 -1 审核失败 -2 店铺关闭
                let name = '';
                switch (val) {
                    case 0:
                        name = '待审核';
                        break;
                    case 1:
                        name = '审核通过';
                        break;
                    case -1:
                        name = '审核未通过';
                        break;
                    case -2:
                        name = '店铺关闭';
                        break;
                }
                return name;
            },
        },

    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/store/info.less";

    .left_qualify {
        line-height: 32px;
    }

    .svg_icon {
        width: 21px;
        height: 17px;
    }
</style>
<style lang="less">
    .subjectionForm {
        margin-left: 67px;
        padding-bottom: 2px;

        .el-form-item__label {
            width: 91px;
            padding-right: 20px;
            color: #666;
        }

        .el-form-item__content {
            min-width: 260px;
            display: inline-block;
        }

        .el-select {
            width: 100%;
        }

        .el-upload-list--picture-card {
            display: inline-block;
            height: 156px;

            .el-upload-list__item {
                margin-bottom: 0;
            }
        }

        .el-upload {
            display: inline-block;
        }
    }
</style>
