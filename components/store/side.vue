<template>
    <div class="service_side">
        <div class="service_list">
            <h3>
                <svg class="level" aria-hidden="true">
                    <use xlink:href="#icon-dianpuxinxi"/>
                </svg>
                <span>店铺信息</span></h3>
            <ul class="service_ul">
                <li>
                    <a href="javascript:;" @click="gotoHandle(0,'/store?storeIndex=index')"
                       :class="[{'active':index==='index'}]">
                        <span>欢迎您</span></a>
                </li>
                <li>
                    <a href="javascript:;" @click="gotoHandle(1,'/store/info?storeIndex=info')"
                       :class="[{'active':index==='info'}]">
                        <span>店铺资料</span></a>
                </li>
                <li>
                    <a href="javascript:;" @click="gotoHandle(2,'/store/skill?storeIndex=skill')"
                       :class="[{'active':index==='skill'}]">
                        <span>技能管理</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:;" @click="gotoHandle(3,'/store/auth?storeIndex=auth')"
                       :class="[{'active':index==='auth'}]">
                        <span>认证中心</span></a>
                </li>
                <li>
                    <a href="javascript:;" @click="gotoHandle(4,'/store/payment?storeIndex=payment&subIndex=skill')"
                       :class="[{'active':index==='payment'}]"><span>缴纳保证金</span></a>
                </li>
            </ul>
            <br/>
            <h3>
                <svg class="level" aria-hidden="true">
                    <use xlink:href="#icon-dianpuzhongxin"/>
                </svg>
                <span>店铺中心</span></h3>
            <ul class="service_ul">
                <li>
                    <a href="javascript:;" @click="jumpRouter(1)"><span>我的店铺</span>
                    </a>
                </li>
                <li><a href="javascript:;"  @click="jumpRouter(2)"><span>店铺管理中心</span></a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import {get_store_info} from "../../api/store-flow";

    export default {
        data() {
            return {
                index: ''
            }
        },
        created() {
            this.getStoreInfoHttp();
        },
        methods: {
            ...mapMutations(['CHANGE_STORE_INFO']),
            jumpRouter(type) {
                const {status} = this.storeInfo;
                if (status === -2 || status === 1) { //-2 已关闭 1 已开通
                    if (type === 1) {
                        this.$router.push({path: '/shop/'+this.storeInfo.id})
                    } else {
                        const { protocol, hostname } = location;
                        location.href = protocol + "//" + hostname+ '/shopadmin/dashboard'
                    }
                } else {
                    this.$message.error('店铺无效，请先开通店铺');
                }
            },
            getStoreInfoHttp() {
                get_store_info().then(res => {
                    let {code, data = {}, message} = res.data
                    this.CHANGE_STORE_INFO(data);
                }).catch(err => {
                    console.log(err)
                })
            },
            gotoHandle(source, url) {
                if (source == 0) {
                    this.$router.push(url)
                    return;
                } else if (source == 1) {
                    this.$router.push(url)
                    return;
                }
                let storeInfo = this.storeInfo;
                if (!storeInfo.store_name) {
                    this.$message.error('请先完善店铺资料')
                    return
                }
                if (source == 2) {//isEntered, isAuth, isPayMargin
                    this.$router.push(url)
                } else {
                    if (storeInfo.isEntered) {
                        this.$router.push(url)
                    } else {
                        this.$message.error('请先完善擅长技能')
                    }
                }
            }
        },
        computed: {
            ...mapState(['storeInfo'])
        },
        watch: {
            $route: {
                handler(to, form) {
                    this.index = to.query.storeIndex
                },
                immediate: true
            },
            storeInfo: {
                handler(value) {
                },
                immediate: true,
                deep: true
            }
        }
    }
</script>
<style scoped lang="less">
    .service_side {
        width: 208px;
        background: #fff;
        margin-top: 16px;
        padding-top: 24px;
        h2 {
            font-size: 20px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            height: 64px;
            background: rgba(243, 38, 45, 1);
            line-height: 64px;
            text-align: center;
            margin-bottom: 30px;
        }
    }

    .service_list {
        padding-left: 28px;
        min-height: 358px;

        h3 {
            display: flex;
            align-items: center;

            span {
                font-size: 16px;
                color: #333;
            }

            .level {
                width: 16px;
                height: 15px;
                color: #999;
                margin-right: 14px;
            }
        }

    }

    .service_ul {
        padding-top: 16px;

        a {
            font-size: 14px;
            line-height: 2;
            padding-left: 31px;
            color: #666;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-decoration: none;

            i {
                width: 5px;
                height: 9px;
                background: url('~assets/img/store/user-center.png') no-repeat -35px -200px;
                margin-right: 48px;
            }

            &:hover, &.active {
                span {
                    color: #FF0027;
                }
            }
        }
    }


</style>
