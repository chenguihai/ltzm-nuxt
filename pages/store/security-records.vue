<template>
    <div class="store-indx">
        <div class="store-banner-main"></div>
        <div class="store-index-main">
            <div class="inner-box">
                <security-side/>
                <div class="container">
                    <!--退回保证金-->
                    <div v-show="subIndex=='back'" class="exit-cash">
                        <h3>保证金退回</h3>
                        <div class="div">
                            <div>
                                <span class="span">退回手续费说明：</span>
                                <em class="text">退回手续费费率为<i>1%</i></em>
                            </div>
                            <div>
                                <span class="span">可退金额：</span>
                                <em class="num">￥{{form.amount}}</em>
                            </div>
                            <div>
                                <span class="span">银行卡类型：</span>
                                <!--                                <em>-->
                                <el-radio-group v-model="bankType" @change="bankTypeChange">
                                    <el-radio :label="1">对私银行卡</el-radio>
                                    <el-radio v-if="storeInfo.type_id ===2" :label="2">对公银行卡</el-radio>
                                </el-radio-group>
                                <!--                                </em>-->
                            </div>
                            <div>
                                <span class="span">选择银行卡：</span>
                                <el-select size="small" :style="{width:'300px'}" v-model="form.bid"
                                           placeholder="请选择银行卡">
                                    <el-option
                                            v-for="item in bankList"
                                            :key="item.id"
                                            :label="item.bank_name+' ( '+item.banknumber+' ) '"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="div2">
                            <button :disabled="!form.amount" @click="determineReturn">确定退回</button>
                        </div>
                    </div>

                    <!--保证金记录-->
                    <div v-show="subIndex=='history'" class="record">
                        <div class="head" v-if="status === -4">
                            <div class="inner">
                                <h3>保证金</h3>
                                <strong>￥50.00</strong>
                            </div>
                            <div class="button">
                                <button>申请退回</button>
                            </div>
                        </div>
                        <div class="table">
                            <el-form class="top" :inline="true" :model="former" size="small">
                                <el-form-item class="div1" label="操作时间">
                                    <el-date-picker
                                            v-model="timeArray"
                                            type="daterange"
                                            align="right"
                                            unlink-panels
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd"
                                            range-separator="-"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                    ></el-date-picker>
                                </el-form-item>
                                <el-form-item class="div2" label="类型">
                                    <el-select v-model="former.type" clearable placeholder="请选择类型">
                                        <el-option
                                                v-for="item in typeList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="div3">
                                    <el-input clearable v-model="former.keywords" placeholder="关键字"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="danger" @click="searchList">确定</el-button>
                                </el-form-item>
                            </el-form>
                            <div class="tb">
                                <el-table :data="list" border style="width: 100%">
                                    <el-table-column prop="created_at" align="center" label="操作时间" width="180"/>
                                    <el-table-column align="center" label="类型" width="180">
                                        <template slot-scope="scope">{{scope.row.process_type | typeStatus}}</template>
                                    </el-table-column>
                                    <el-table-column prop="order_amount" align="center" label="交易金额"/>
                                    <el-table-column prop="remain" align="center" label="剩余保证金"/>
                                    <el-table-column prop="remarks" align="center" label="备注"/>
                                </el-table>
                            </div>
                            <div class="fy">
                                <el-pagination
                                        layout="prev, pager, next,jumper"
                                        prev-text="上一页"
                                        next-text="下一页"
                                        @current-change="handlePageChange"
                                        :total="total"
                                        :page-size="per_page">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SecuritySide from '~/components/store/side';
    import {bankList, returnMargin, getMargin} from '@/api/bond'
    import {mapState} from 'vuex'

    export default {
        name: "security-records",
        layout: 'shop-flow-layout',
        components: {SecuritySide},
        data() {
            return {
                subIndex: 'back',
                typeList: [//1：缴纳 -1：退回 -2：扣除
                    {label: '全部', value: '',},
                    {label: '缴纳', value: 1,},
                    {label: '退回', value: -1,},
                    {label: '扣除', value: -2,},
                ],
                bankList: [],
                bankAllList: [],
                bankType: 1, //status 1 个人 2 企业
                list: [],
                form: {
                    amount: 0,//	是	int	退还金额
                    bid: '',//	是	int	银行卡列表id
                },
                former: {
                    page: 1,
                    beginTime: '',//	否	date	開始時間
                    endTime: '',//	否	date	結束時間
                    type: '',//	否	int	狀態 1：缴纳 -1：退回 -2：扣除
                    keywords: '',//	否	string	搜索关键字
                },
                timeArray: [],
                status: '', //是否显示申请退回
                total: 0,
                per_page: 0,
            }
        },
        created() {
            if (this.subIndex === 'back') {
                this.bankListHttp();
            } else {
                this.getMarginHttp();
            }
        },
        methods: {
            searchList() {
                const [beginTime = '', endTime = ''] = this.timeArray || [];
                this.former.beginTime = beginTime;//	否	date	開始時間
                this.former.endTime = endTime;//	否	date	結束時間
                this.former.page = 1;
                this.getMarginHttp();
            },
            bankTypeChange(val) {
                this.form.bid = '';
                this.bankList = this.bankAllList.filter(item => item.status === val);
            },
            determineReturn() {
                this.returnMarginHttp();
            },
            handlePageChange(val) { //分页器：页码变更
                this.form.page = val;
                this.getMarginHttp();
            },
            getMarginHttp() {
                getMargin(this.former).then(res => {
                    let {code, message, data: {data = [], total = 0, per_page = 0}} = res.data
                    if (code === 200) {
                        this.list = data;
                        this.total = total;
                        this.per_page = per_page;
                    } else {
                        this.$message.error({title: '错误提示', message: message});
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            bankListHttp() {
                bankList().then(res => {
                    let {code, message, data: {list = [], margin = 0}} = res.data
                    if (code === 200) {
                        this.bankAllList = list.map(item => {
                            item.banknumber = item.banknumber.substr(0, 4) + "********" + item.banknumber.substr(item.banknumber.length - 4)
                            return item
                        });
                        this.bankList = list.filter(item => item.status === 1);//个人
                        this.form.amount = margin;
                    } else {
                        this.$message.error({title: '错误提示', message: message});
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            returnMarginHttp() {
                if (!this.form.bid) {
                    this.$message.error({title: '提示', message: '银行卡账号不能为空'});
                    return
                }
                returnMargin(this.form).then(res => {
                    let {code,data} = res.data
                    if (code === 200) {
                        this.subIndex = 'history';
                        this.getMarginHttp();
                        this.$message.success({title: '提示信息', message: '你的退回申请已提交，请耐心等待管理员审核'});
                    } else {
                        this.$message.error({title: '错误提示', message: data});
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        filters: {
            typeStatus: (type) => {//狀態 1：缴纳 -1：退回 -2：扣除
                let name = '';
                switch (type) {
                    case 1:
                        name = '缴纳';
                        break;
                    case -1:
                        name = '退回';
                        break;
                    case -2:
                        name = '扣除';
                        break;
                }
                return name;
            },
        },
        watch: {
            $route: {
                handler(to, from, next) {
                    const {amount = 0, status = '', subIndex = 'back'} = this.$route.query;
                    this.form.amount = amount;
                    this.status = +status;
                    this.subIndex = subIndex;
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            }
        },
        computed: {
            ...mapState(['storeInfo'])
        },
    }
</script>

<style scoped lang="less">
    .store-index-main {
        background: #f4f6f8;

        .inner-box {
            display: flex;
            width: 1210px;
            margin: 0 auto;
            min-height: 50vh;

            .container {
                flex: 1;
                margin-left: 20px;
                background: #ffffff;
                margin-top: 20px;
                margin-bottom: 20px;
                /*padding: 30px;*/

                .record {
                    .head {
                        display: flex;
                        border-bottom: 20px solid #F4F6F8;

                        .inner {
                            flex: 1;
                            background: #fff;
                            padding: 43px 0 32px 29px;
                            display: flex;
                            align-items: center;

                            h3 {
                                font-size: 18px;
                                color: #333333;
                                border-right: 1px solid #EEEEEE;
                                line-height: 61px;
                                padding-right: 20px;
                            }

                            strong {
                                padding-left: 20px;
                                font-size: 30px;
                                color: #F3262D;
                            }
                        }

                        .button {
                            display: flex;
                            align-items: center;
                            padding-right: 27px;

                            button {
                                width: 109px;
                                height: 36px;
                                background: rgba(255, 255, 255, 1);
                                border: 1px solid rgba(223, 223, 223, 1);
                                border-radius: 4px;

                                font-size: 14px;
                                font-weight: 400;
                                color: rgba(51, 51, 51, 1);
                                line-height: 30px;

                                &:hover {
                                    background: rgba(244, 244, 244, 1);
                                    border: 1px solid rgba(223, 223, 223, 1);
                                    border-radius: 4px;
                                }
                            }
                        }
                    }

                    .table {
                        .top {
                            padding-left: 29px;
                            padding-top: 23px;
                            display: flex;
                            align-items: center;

                            .div1, .div2, .div3 {
                                display: flex;
                                align-items: center;
                            }

                            .div1 {
                                .el-date-picker {
                                    width: 180px;
                                }
                            }

                            .div2 {
                                .el-select {
                                    width: 120px;
                                }
                            }

                            .div3 {
                                .el-input {
                                    width: 180px;
                                }
                            }
                        }

                        .tb {
                            margin-left: 29px;
                            margin-right: 27px;
                            margin-top: 20px;
                        }

                        .fy {
                            display: flex;
                            justify-content: flex-end;
                            padding-right: 27px;
                            padding-top: 50px;
                            padding-bottom: 50px;
                        }
                    }
                }

                .exit-cash {
                    padding-bottom: 50px;

                    h3 {
                        font-size: 18px;
                        margin-left: 20px;
                        margin-right: 20px;
                        border-bottom: 1px solid #DDDDDD;
                        padding-top: 20px;
                        padding-bottom: 20px;
                    }

                    .div {
                        padding-top: 40px;
                        padding-bottom: 40px;

                        div {
                            display: flex;
                            align-items: center;

                            .span {
                                width: 150px;
                                color: #666;
                                font-size: 14px;
                                line-height: 42px;
                                text-align: right;
                            }

                            .text {
                                color: #333333;
                                font-size: 14px;

                                i {
                                    color: #0066CC;
                                }
                            }

                            .num {
                                font-weight: bold;
                                font-size: 16px;
                                color: #F3262D;
                            }

                        }
                    }

                    .div2 {
                        margin-left: 80px;

                        button {
                            width: 120px;
                            height: 40px;
                            background: rgba(243, 38, 45, 1);
                            border-radius: 4px;
                            border: 1px solid rgba(243, 38, 45, 1);
                            color: #fff;
                            outline: none;
                            font-size: 16px;
                            margin-right: 20px;
                        }

                        /*button:nth-last-child(1) {*/
                        /*    font-size: 16px;*/
                        /*    width: 120px;*/
                        /*    outline: none;*/
                        /*    height: 40px;*/
                        /*    background: rgba(244, 244, 244, 1);*/
                        /*    border: 1px solid rgba(223, 223, 223, 1);*/
                        /*    border-radius: 4px;*/
                        /*    color: #333333;*/
                        /*}*/
                    }
                }

            }
        }
    }
</style>
