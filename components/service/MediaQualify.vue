<template>
    <div class="com-item">
        <div class="title">
            <h3>
                <svg class="svg_icon" aria-hidden="true">
                    <use xlink:href="#icon-meijiezizhi"/>
                </svg>
                <span>媒介资质</span>
            </h3>
            <a href="javascript:;" @click="addMedia">
                <i v-if="mediaFlag" class="el-icon-remove-outline"></i>
                <i v-else class="el-icon-circle-plus-outline"></i>
                <span>{{mediaFlag?'收起':'添加'}}</span>
            </a>
        </div>
        <p v-show="mediasList.length===0&&(mediaFlag!==true)"
           class="no-data">+添加媒介资质，增强您的实力，让雇主更加信任您！</p>
        <!--        <el-collapse-transition></el-collapse-transition>-->
        <el-form v-if="mediaFlag" ref="form" :rules="rules" :model="form" class="mediaQualifyForm common_form">
            <el-form-item prop="type_id" label="资质类型">
                <el-select v-model="form.type_id" placeholder="请选择资质类型"
                           @change="typeChange">
                    <el-option
                            v-for="item in mediasOptions"
                            :key="item.type_id"
                            :label="item.label"
                            :value="item.type_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代理时间" prop="mediaTime" v-show="form.type_id !== 0">
                <el-date-picker
                        v-model="form.mediaTime"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item id="mediaQualify" label="附件图片" prop="medias_upload_imgs">
                <multiple-upload :flag="mediaFlag" type="mediaQualify" :key="selectId" btn="上传委托书"
                                 :url="form.medias_upload_imgs" :max="3"
                                 @emitSubmit="emitUploadImg">
                </multiple-upload>
            </el-form-item>
            <el-form-item label="" class="pl_91">
                <el-button size="small" class="button_wrap save_btn" :loading="isLoading"
                           @click="saveMedias('form')">保存</el-button>
                <el-button size="small" class="button_wrap cancel_btn" @click="addMedia">取消</el-button>
            </el-form-item>
        </el-form>
        <div class="work_list">
            <div class="work_item"
                 v-for="(item,index) in mediasList"
                 :key="index">
                <div class="left_qualify">
                    <p>媒体资质：{{item.type_id | medias_list_filter}}</p>
                    <p v-if="item.type_id !== 0">代理时间：{{item.begin_time}} - {{item.end_time}}</p>
                    <p>审核状态：{{item.status |examineStatus}}</p>
                    <p v-if="item.status === -1">未通过原因：{{item.remarks}}</p>
                </div>
                <div class="base_img_wrap" :key="selectId">
                    <img class="img" v-if="subItem" v-for="(subItem,index) in [item.img1,item.img2,item.img3]"
                         :key="index"
                         :src="envVars.IMG_HOST+subItem+'?x-oss-process=image/resize,m_fill,h_96,w_160'"
                         alt="媒介资质"/>
                </div>
                <div class="item_right">
                    <span v-if="item.status ===-1" class="auth" @click="mediaEdit(item.id,index)"></span>
                    <span class="delete_icon" @click="delMediasList(item.id,index)"></span>
                </div>
            </div>
        </div>
        <tips-cpn v-if="autoFlag" type="red" @submit="handleSubmit" @close="handleClose"/>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {mediaEdit, medias} from "../../api/store-flow";
    import MultipleUpload from '../UploadImage/multipleUpload'
    import TipsCpn from '~/components/TipsCpn'

    const mediaData = [
        {label: '直营媒体', type_id: 0},
        {label: '一级代理', type_id: 1},
        {label: '二级代理', type_id: 2},
        {label: '其他', type_id: 3},
    ]
    export default {
        name: "MediaQualify",
        components: {MultipleUpload, TipsCpn},
        data() {
            return {
                mediasOptions: mediaData,
                mediaFlag: false,
                mediasList: [],
                form: {
                    type_id: '',//资质证书
                    mediaTime: [],
                    medias_upload_imgs: [],
                },
                rules: {
                    mediaTime: [{required: true, message: "时间不能为空", trigger: "change"}],
                    type_id: [{required: true, message: "资质类型不能为空", trigger: "change"}],
                    medias_upload_imgs: [{required: true, message: "附件图片不能为空", trigger: "change"}],
                },
                selectId: 0,
                selectIndex: 0,
                autoFlag: false,
                isLoading: false,
            }
        },
        created() {
            this.mediasInit()
        },
        methods: {
            emitUploadImg(src) {
                this.form.medias_upload_imgs = src;
            },
            async mediasInit() {     /*媒介资质*/
                let _data = await medias.listFn()
                let {code, message, data} = _data.data
                if (code == 200) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].begin_time) {
                            data[i].begin_time = data[i].begin_time.split(' ')[0]
                            data[i].end_time = data[i].end_time.split(' ')[0]
                        }
                    }
                    this.mediasList = data
                }
            },
            typeChange(value) { //资质类型
                if (value === 0) {
                    this.form.mediaTime = [];
                }
                this.rules.mediaTime = [{
                    required: !(value === 0),
                    message: "时间不能为空",
                    trigger: "change"
                }];
            },
            async saveMedias(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let formData = JSON.parse(JSON.stringify(this.form))
                        if (formData.medias_upload_imgs.length == 0) {
                            this.$message.error('请先上传图片')
                            return false
                        }
                        const [img1 = {}, img2 = {}, img3 = {}] = formData.medias_upload_imgs;
                        if (formData.type_id !== 0) {
                            const [start = '', end = ''] = formData.mediaTime;
                            formData.begin_time = start;
                            formData.end_time = end;
                        }
                        formData.img1 = img1.path || '';
                        formData.img2 = img2.path || '';
                        formData.img3 = img3.path || '';
                        delete formData.mediaTime
                        delete formData.medias_upload_imgs
                        let _data;
                        this.isLoading = true;
                        if (this.selectId) { //编辑
                            _data = await mediaEdit(this.selectId, formData)
                        } else { //新增
                            _data = await medias.addFn(formData)
                        }
                        let {code, message, data} = _data.data
                        if (code == 200) {
                            this.$message.success('操作成功')
                            this.mediaFlag = false;
                            this.mediasInit()
                            this.$refs[formName].resetFields();
                        } else {
                            this.$message.error(message)
                        }
                        this.isLoading = false;
                    }
                })
            },
            addMedia() {
                this.mediaFlag = !this.mediaFlag;
                this.selectId = 0;
                this.form = {
                    type_id: '',//资质证书
                    mediaTime: [],
                    medias_upload_imgs: [],
                }
            },
            mediaEdit(id, index) {
                this.selectId = id;
                this.mediaFlag = true;
                let data = this.mediasList[index], imgUrl = '?x-oss-process=image/resize,m_fill,h_154,w_258';
                const {type_id, begin_time, end_time, img1, img2, img3} = data;
                let num1 = [{url: this.envVars.IMG_HOST + img1 + imgUrl, path: img1}];
                let num2 = [{
                    url: this.envVars.IMG_HOST + img1 + imgUrl,
                    path: img1
                }, {url: this.envVars.IMG_HOST + img2 + imgUrl, path: img2}];
                let num3 = [{url: this.envVars.IMG_HOST + img1 + imgUrl, path: img1},
                    {url: this.envVars.IMG_HOST + img2 + imgUrl, path: img2}, {
                        url: this.envVars.IMG_HOST + img3 + imgUrl,
                        path: img3
                    }];
                this.rules.mediaTime = [{
                    required: !(begin_time == null),
                    message: "时间不能为空",
                    trigger: "change"
                }];
                this.form = {
                    type_id: +type_id,//资质证书
                    mediaTime: begin_time ? [begin_time, end_time] : [],
                    medias_upload_imgs: !!img3 ? num3 : !!img2 ? num2 : num1,
                }
            },

            async delMediasList(id, index) {
                this.autoFlag = true;
                this.selectId = id;
                this.selectIndex = index;
            },
            handleClose() {
                this.autoFlag = false;
            },
            async handleSubmit() {
                let _data = await medias.delFn(this.selectId);
                let {code, message, data} = _data.data
                if (code == 200) {
                    this.$message({type: 'success', message: '删除成功'});
                    this.mediaFlag = false;
                    this.handleClose();
                    this.mediasList.splice(this.selectIndex, 1);
                } else {
                    this.$message.error(message);
                }
            }
        },
        filters: {
            medias_list_filter: (val) => {
                return mediaData[val].label
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
        computed: {
            ...mapState({
                envVars: "envVariables"
            })
        },
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/store/info.less";

    .left_qualify {
        line-height: 32px;
    }

    .svg_icon {
        width: 23px;
        height: 20px;
    }

</style>
<style lang="scss">
    .mediaQualifyForm {
        margin-left: 67px;
        padding-bottom: 2px;

        .el-form-item__label {
            width: 91px;
            padding-right: 20px;
            color: #666;
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

        .el-range-separator {
            width: 7%;
        }

        .el-upload {
            display: inline-block;
        }
    }
</style>
