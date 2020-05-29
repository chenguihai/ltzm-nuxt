<template>
    <div class="com-item">
        <div class="title">
            <h3>
                <svg class="svg_icon" aria-hidden="true">
                    <use xlink:href="#icon-zichuanzizhi"/>
                </svg>
                <span>自传资质</span>
            </h3>
            <a href="javascript:;" @click="selfAdd">
                <i v-if="shelFlag" class="el-icon-remove-outline"></i>
                <i v-else class="el-icon-circle-plus-outline"></i>
                <span>{{shelFlag==true?'收起':'添加'}}</span>
            </a>
        </div>
        <p v-show="selfList.length===0&&(shelFlag!==true)" class="no-data">+添加自传资质，增强您的实力，让雇主更加信任您！</p>
        <!--        <el-collapse-transition>        </el-collapse-transition>-->
        <el-form v-if="shelFlag" ref="form" class="autoQualifyForm common_form"
                 :model="form" :rules="rules">
            <el-form-item prop="received_time" label="获取时间">
                <el-date-picker v-model="form.received_time" type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                :picker-options="startDateDisabled"
                                placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item class="w_298" prop="honor_type_id" label="资质证书">
                <el-cascader
                        v-model="form.honor_type_id"
                        :options="self_uplao_list"
                        :props="propsData">
                </el-cascader>
            </el-form-item>
            <el-form-item prop="fileList" label="资质照片">
                <single-upload :flag="shelFlag" :key="selectId" :list="form.fileList"
                               @submit="emitUploadImg"/>
                <p class="upload_hint">请确保图片清晰，文字可辨并有清晰的红色公章。</p>
            </el-form-item>
            <el-form-item label="" class="pl_91">
                <el-button size="small" class="button_wrap save_btn" :loading="isLoading"
                           @click="saveSelf('form')">保存</el-button>
                <el-button size="small" class="button_wrap cancel_btn" @click="selfAdd">取消</el-button>
            </el-form-item>
        </el-form>
        <div class="work_list">
            <div class="work_item" v-for="(item,index) in selfList" :key="index">
                <div class="left_qualify">
                    <p>授权单位：{{item.type_name}}</p>
                    <p>获取时间：{{item.received_time}}</p>
                </div>
                <div class="base_img_wrap">
                    <img class="img" :src="envVars.IMG_HOST+item.honor_img+'?x-oss-process=image/resize,m_fill,h_96,w_160'"
                         alt/>
                </div>
                <div class="item_right">
                    <span class="auth" @click="selfEdit(item.id,index)"></span>
                    <span class="delete_icon" @click="delSelfInfoList(item.id,index)"></span>
                </div>
            </div>
        </div>
        <tips-cpn v-if="autoFlag" type="red" @submit="handleSubmit" @close="handleClose"/>
    </div>
</template>

<script>
    import {
        get_store_upload_self_user,
        get_store_upload_self_list,
        del_store_upload_self,
        add_store_upload_self,
        selfhonorEdit,
    } from "../../api/store-flow";
    import SingleUpload from '../UploadImage/singleUpload'
    import {mapState} from 'vuex'
    import TipsCpn from '~/components/TipsCpn'

    export default {
        name: "AutoQualify",
        components: {SingleUpload, TipsCpn},
        data() {
            return {
                startDateDisabled: {
                    disabledDate(time) {// 限制开始日期不能超过当前日期
                        return time.getTime() > (Date.now() - 1000 * 60 * 60 * 24)
                    }
                },
                propsData: {
                    value: 'id',
                    label: 'type_name',
                    children: 'children',
                    parent_id: 'parent_id'
                },
                form: {
                    fileList: [],
                    honor_type_id: [],//获得证书类型id，读取资质证书列表
                    honor_img: '',//图片1
                    received_time: ''//获得资质日期
                },
                rules: {
                    honor_type_id: [{required: true, message: "证书类型不能为空", trigger: "change"}],
                    fileList: [{type: 'array', required: true, message: "图片不能为空", trigger: "change"}],
                    received_time: [{required: true, message: "时间不能为空", trigger: "change"}],
                },
                shelFlag: false,
                selfList: [],
                self_uplao_list: [],
                selectId: 0,
                selectIndex: 0,
                autoFlag: false,
                isLoading: false,
            }
        },
        created() {
            this.initSelf()
            this.initHonortype();
        },
        methods: {
            async initSelf() {
                let _data = await get_store_upload_self_user();
                let {code, data, message} = _data.data;
                if (code == 200) {
                    this.selfList = data;
                } else if (code === 402) {

                } else {
                    this.$message.error(message);
                }
            },
            emitUploadImg(url) {
                this.form.fileList = url;
            },
            async initHonortype() {
                if (this.self_uplao_list.length > 0) {
                    return
                }
                let _data = await get_store_upload_self_list()
                let {code, message, data} = _data.data
                if (code == 200) {
                    this.self_uplao_list = data
                }
            },
            /*---------自传资质保存操作----------------*/
            async saveSelf(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        if (this.form.fileList.length == 0) {
                            this.$message.error('请先上传图片')
                            return false
                        }
                        let formData = JSON.parse(JSON.stringify(this.form));
                        formData.honor_img = this.form.fileList[0].path
                        formData.honor_type_id = formData.honor_type_id[1]
                        let _data;
                        this.isLoading = true;
                        if (this.selectId) {
                            _data = await selfhonorEdit(this.selectId, formData)
                        } else {
                            _data = await add_store_upload_self(formData)
                        }
                        let {code, message, data} = _data.data
                        if (code == 200) {
                            this.$message.success('操作成功')
                            this.shelFlag = !this.shelFlag
                            this.$refs[formName].resetFields();
                            this.initSelf()
                        } else {
                            this.$message.error(message)
                        }
                        this.isLoading = false;
                    }
                })
            },
            /*---------自传资质收起， 展开----------------*/
            async selfAdd() {
                this.selectId = 0;
                this.shelFlag = !this.shelFlag;
                this.form = {
                    fileList: [],
                    honor_type_id: [],//获得证书类型id，读取资质证书列表
                    honor_img: '',//图片1
                    received_time: ''//获得资质日期
                };
            },
            async selfEdit(id, index) {
                this.selectId = id;
                this.shelFlag = true;
                let data = this.selfList[index];
                this.form = {
                    honor_type_id: [this.returnHonorId(this.self_uplao_list, data.honor_type_id), data.honor_type_id],//获得证书类型id，读取资质证书列表
                    honor_img: data.honor_img,//图片1
                    received_time: data.received_time,//获得资质日期
                    fileList: [{
                        url: this.envVars.IMG_HOST + data.honor_img + '?x-oss-process=image/resize,m_fill,h_154,w_258',
                        path: data.honor_img,
                    }]
                };
            },
            returnHonorId(item, id) {
                let subItem = [];
                for (let i = 0; i < item.length; i++) {
                    subItem = item[i].children || [];
                    for (let j = 0; j < subItem.length; j++) {
                        if (subItem[j].id === id) {
                            return item[i].id;
                        }
                    }
                }
            },
            /*---------删除资质列表（自传）----------------*/
            delSelfInfoList(id, index) {
                this.autoFlag = true;
                this.selectId = id;
                this.selectIndex = index;
            },
            handleClose() {
                this.autoFlag = false;
            },
            async handleSubmit() {
                let _data = await del_store_upload_self(this.selectId)
                let {code, message, data} = _data.data
                if (code == 200) {
                    this.$message({type: 'success', message: '删除成功'});
                    this.handleClose();
                    this.selfList.splice(this.selectIndex, 1);
                } else {
                    this.$message.error(message);
                }
            }
        },
        computed: {
            ...mapState({
                envVars: "envVariables"
            })
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/store/info.less";

    .left_qualify {
        line-height: 32px;
    }

    .svg_icon {
        width: 18px;
        height: 22px;
        margin-right: 10px;
        color: #989898;
    }

    .upload_hint {
        color: #999;
        position: absolute;
        left: 270px;
        line-height: 14px;
        width: 310px;
        bottom: 0;
        z-index: 10;
    }
</style>
<style lang="scss">
    .autoQualifyForm {
        margin-left: 67px;
        padding-bottom: 2px;
        .el-form-item__label {
            padding-right: 20px;
            color: #666;
            width: 91px;
        }

        .el-date-editor.el-input {
            width: 172px;
        }

        .el-form-item__content {
            display: inline-block;
        }

        .w_298 {
            .el-form-item__content {
                width: 298px;
            }
        }

        .el-cascader {
            width: 100%;
        }

        .el-upload-list--picture-card {
            display: inline-block;
            height: 156px;

            .el-upload-list__item {
                margin-bottom: 0;
            }
        }
    }
</style>
