<template>
    <div class="com-item">
        <div class="title">
            <h3>
                <svg class="svg_icon" aria-hidden="true">
                    <use xlink:href="#icon-gongzuojingli"/>
                </svg>
                <span class="text">工作经历</span>
            </h3>
            <a href="javascript:;" @click="addWork">
                <i v-if="jobFlag" class="el-icon-remove-outline"></i>
                <i v-else class="el-icon-circle-plus-outline"></i>
                <span>{{jobFlag===true?'收起':'添加'}}</span>
            </a>
        </div>
        <p v-show="jobList.length===0 && (jobFlag!==true)" class="no-data">+添加工作经历，增强您的实力，让雇主更加信任您！</p>
        <!--        <el-collapse-transition></el-collapse-transition>-->
        <el-form v-show="jobFlag"
                 class="ruleForm common_form"
                 ref="form_job"
                 :model="form"
                 label-width="91px"
                 :rules="rules"
        >
            <el-form-item prop="company_name" label="公司名称">
                <el-input v-model="form.company_name" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item prop="nature_id" label="公司性质">
                <el-select v-model="form.nature_id" placeholder="请选择公司性质">
                    <el-option
                            v-for="item in nature_list"
                            :key="item.id"
                            :label="item.nature_name"
                            :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="scale_id" label="公司规模">
                <el-select v-model="form.scale_id" placeholder="请选择公司规模">
                    <el-option
                            v-for="item in scale_list"
                            :key="item.id"
                            :label="item.scale_name"
                            :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="department" label="工作部门">
                <el-input v-model="form.department" placeholder="请输入工作部门"></el-input>
            </el-form-item>
            <el-form-item prop="position" label="工作职位">
                <el-input v-model="form.position" placeholder="请输入工作职位"></el-input>
            </el-form-item>
            <el-form-item prop="arrayTime" label="在职时间">
                <el-date-picker
                        v-model="form.arrayTime"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button size="small" class="button_wrap save_btn" :loading="isLoading"
                           @click="addJobInfo('form_job')">保存</el-button>
                <el-button size="small" class="button_wrap cancel_btn" @click="addWork">取消</el-button>
            </el-form-item>
        </el-form>
        <div class="work_list">
            <div class="work_item" v-for="(item ,index ) in jobList" :key="index">
                <div class="flex_1">
                    <div class="company">
                        <p>{{item.company_name}}</p>
                        <p>{{item.begin_time}}—{{item.end_time}}</p>
                    </div>
                    <div class="company_attr">
                        <p class="company_1">职位：{{item.position}}</p>
                        <p class="company_1">公司性质：{{item.nature_name }}</p>
                        <p class="company_1">公司规模：{{item.scale_name}}</p>
                        <p class="company_1">部门：{{item.department}}</p>
                    </div>
                </div>
                <span class="auth" @click="editWord(item.id,index)"></span>
                <span class="delete_icon" @click="delJobInfoList(item.id,index)"></span>
            </div>
        </div>
        <tips-cpn v-if="autoFlag" type="red" @submit="handleSubmit" @close="handleClose"/>
    </div>
</template>

<script>
    import {
        add_store_job_info,
        get_store_job_info,
        del_store_job_info,
        experienceEdit,
    } from "../../api/store-flow";
    import {mapState} from "vuex";
    import TipsCpn from '~/components/TipsCpn'

    export default {
        name: "WorkExperience",
        components: {TipsCpn},
        data() {
            return {
                jobFlag: false,
                form: {
                    arrayTime: "", //时间
                    company_name: "", //company_name:'公司名称',
                    scale_id: "", //scale_id:'公司规模id',
                    nature_id: "", //nature_id:'公司性质id',
                    department: "", //department:'所在部门',
                    position: "", //position:'公司职务',
                    begin_time: "", //begin_time:'开始时间',
                    end_time: "", //end_time:'结束时间',
                    // work_desc: "" //work_desc:'工作经历简介',
                },
                rules: {
                    arrayTime: [{required: true, message: "时间不能为空", trigger: "change"}],
                    company_name: [{required: true, message: "公司名称不能为空", trigger: "change"}],
                    scale_id: [{required: true, message: "公司规模不能为空", trigger: "change"}],
                    nature_id: [{required: true, message: "公司性质不能为空", trigger: "change"}],
                    department: [{required: true, message: "所在部门不能为空", trigger: "change"},
                        {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'change'}],
                    position: [{required: true, message: "公司职务不能为空", trigger: "change"},
                        {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'change'}],
                    // work_desc: [{required: true, message: "工作经历简介不能为空", trigger: "change"},
                    //     {min: 10, max: 200, message: '长度在 10 到 200 个字符', trigger: 'change'}]
                },
                jobList: [],
                selectId: 0,
                selectIndex: 0,
                autoFlag: false,
                isLoading:false
            }
        },
        created() {
            this.jobInfo();
        },
        methods: {
            async jobInfo() {
                let _data = await get_store_job_info();
                let {code, data, message} = _data.data;
                if (code == 200) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].begin_time) {
                            data[i].begin_time = data[i].begin_time.split(' ')[0];
                            data[i].end_time = data[i].end_time.split(' ')[0];
                        }
                    }
                    this.jobList = data;
                }
            },
            addWork() {
                this.selectId = 0;
                this.jobFlag = !this.jobFlag;
                this.$refs.form_job.resetFields();
            },
            editWord(id, index) {
                this.selectId = id;
                this.jobFlag = true;
                let data = this.jobList[index];
                this.form = {
                    arrayTime: [data.begin_time, data.end_time], //时间
                    company_name: data.company_name, //company_name:'公司名称',
                    scale_id: data.scale_id, //scale_id:'公司规模id',
                    nature_id: data.nature_id, //nature_id:'公司性质id',
                    department: data.department, //department:'所在部门',
                    position: data.position, //position:'公司职务',
                    begin_time: data.begin_time, //begin_time:'开始时间',
                    end_time: data.end_time, //end_time:'结束时间',
                    // work_desc: data.work_desc //work_desc:'工作经历简介',
                }
            },
            /*---------保存基本信息 工作经历----------------*/
            async addJobInfo(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let _data;
                        let params = JSON.parse(JSON.stringify(this.form));
                        const [begin = '', end = ''] = params.arrayTime;
                        params.begin_time = begin;
                        params.end_time = end;
                        this.isLoading = true;
                        if (this.selectId) {//编辑
                            _data = await experienceEdit(this.selectId, params)
                        } else {//添加
                            _data = await add_store_job_info(params);
                        }
                        let {code, message, data} = _data.data;
                        if (code == 200) {
                            this.$message({message: "操作成功", type: "success"});
                            this.jobInfo();
                            this.form.arrayTime = '';
                            this.jobFlag = !this.jobFlag;
                            this.$refs[formName].resetFields();
                        } else {
                            this.$message.error(message);
                        }
                        this.isLoading = false;
                    }
                });
            },
            /*---------删除工作列表----------------*/
            async delJobInfoList(id, index) {
                this.autoFlag = true;
                this.selectId = id;
                this.selectIndex = index;
            },
            handleClose() {
                this.autoFlag = false;
            },
            async handleSubmit() {
                let _data = await del_store_job_info(this.selectId)
                let {code, message, data} = _data.data
                if (code == 200) {
                    this.$message({type: 'success', message: '删除成功'});
                    this.handleClose();
                    this.jobList.splice(this.selectIndex, 1)
                } else {
                    this.$message.error(message);
                }
            }
        },
        computed: {
            ...mapState(['nature_list', 'scale_list'])
        },
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/store/info.less";

    .auth {
        width: 20px;
        height: 19px;
    }

    .company {
        color: #333;
        display: flex;
        padding-bottom: 16px;
        font-size: 16px;
        line-height: 16px;

        p:nth-child(1) {
            margin-right: 81px;
        }
    }

    .company_1 {
        line-height: 1em;
        color: #666;
        flex: 1;
    }

    .svg_icon {
        width: 20px;
        height: 19px;
    }

    .ruleForm {
        margin-left: 67px;
        padding-bottom: 2px;
    }
</style>
<style lang="less">
    .ruleForm {
        .el-form-item {
            margin-bottom: 28px;
        }

        .el-form-item__label, .el-form-item__content {
            line-height: 36px;
        }

        .el-form-item__content {
            width: 240px;
        }

        .el-form-item__label {
            padding-right: 20px;
            color: #666;
        }

        .el-input__inner {
            height: 36px;
            line-height: 36px;
        }

        .el-input__inner, .el-textarea__inner, .el-select {
            width: 100%;
        }

        .el-textarea__inner {
            height: 100px;
        }

        .mt_22 {
            margin-top: 22px;
        }

        .w_150 {
            .el-input__inner {
                width: 144px;
            }

            &:not(:last-child) {
                margin-right: 9px;
            }
        }

        button {
            width: 80px;
        }
    }
</style>
