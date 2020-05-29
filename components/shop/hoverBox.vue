<template>
    <div class="hover-box">
        <ul class="rate-top">
            <li class="rate-top-item">
                <p class="rate_title">店铺综合评分</p>
                <p class="rate_title">与行业相比</p>
            </li>
            <li class="rate-top-item">
                <p>完成质量：<span :class="frCla(finalData.serviceStatistic.quality)">{{(finalData.quality) | twoFixed}}</span></p>
                <p>{{finalData.serviceStatistic.quality | serviceDiffText}}
                    <span :class="frCla(finalData.serviceStatistic.quality)">{{finalData.serviceStatistic.quality | abs}}%
            <i class="iconfont icon" :class="finalData.serviceStatistic.quality | serviceDiffIcon"></i></span></p>
            </li>
            <li class="rate-top-item">
                <p>工作速度：<span :class="frCla(finalData.serviceStatistic.speed)">{{(finalData.speed) | twoFixed}}</span></p>
                <p>{{finalData.serviceStatistic.speed | serviceDiffText}}
                    <span :class="frCla(finalData.serviceStatistic.speed)">{{finalData.serviceStatistic.speed |abs}}%
            <i class="iconfont icon" :class="finalData.serviceStatistic.speed | serviceDiffIcon"></i></span></p>
            </li>
            <li class="rate-top-item">
                <p>服务态度：<span
                        :class="frCla(finalData.serviceStatistic.attitude)">{{(finalData.attitude) | twoFixed}}</span>
                </p>
                <p>{{finalData.serviceStatistic.attitude | serviceDiffText}}
                    <span :class="frCla(finalData.serviceStatistic.attitude)">{{finalData.serviceStatistic.attitude | abs}}%
            <i class="iconfont icon" :class="finalData.serviceStatistic.attitude | serviceDiffIcon"></i>
          </span>
                </p>
            </li>
        </ul>
        <ul class="kf-box">
            <li class="kf-title">客服</li>
            <template v-if="finalData.customer_services.length > 0">
                <li class="concat" :key="item.id" v-for="item in finalData.customer_services"
                    @click="openQQ(item.kf_account)">
                    <img src="~assets/img/shop/counseling_style_52.png">
                    <span>
            {{item.kf_name}}
          </span>
                </li>
            </template>
            <li class="not-kf" v-else>
                店铺暂时还未添加客服QQ哦
            </li>
        </ul>
        <shopFws :showLogo="false" :showKf="false" :storeData="storeData"></shopFws>
    </div>
</template>

<script>
    import shopFws from './shopFws'
    import {serviceDiffText, abs, serviceDiffIcon} from '~/utils/common-filters'

    export default {
        name: 'hoverBox',
        components: {shopFws},
        props: ['storeData'],
        filters: {
            serviceDiffText, serviceDiffIcon, abs,
            twoFixed: num => {
                if (!num) {
                    return '0.00'
                }
                return (+num).toFixed(2);
            }
        },
        computed: {
            finalData() {
                return this.storeData || this.$store.state.storeInfo
            }
        },
        methods: {
            openQQ(qq) {
                if (qq) {
                    window.open(`tencent://message/?uin=${qq}`)
                } else {
                    this.$message.error('该店铺没有客服')
                }
            },
            frCla(score) {
                return score < 0 ? 'fg' : score === 0 ? 'fy' : 'fr'
            }
        }
    };
</script>

<style scoped lang="less">
    .hover-box {
        position: absolute;
        width: 277px;
        border: 1px solid #ddd;
        background: #fff;
        top: 20px;
        z-index: 3;
    }

    .rate-top {
        font-size: 12px;
        color: #999;
        font-weight: 400;
        border-bottom: 1px solid #e8e8e8;
        width: 237px;
        margin: auto;
        padding: 20px 0;

        .rate-top-item {
            display: flex;
            align-items: center;
            margin-top: 10px;

            p {
                width: 127px;

                &:last-child {
                    width: auto;
                }
            }

            &:nth-child(2) {
                margin-top: 17px;
            }

            .fr,
            .fy,
            .fg {
                font-size: 13px;
                font-weight: bold;
            }

            .fr {
                color: #f3262d;
            }

            .fy {
                color: #ff9b2f;
            }

            .fg {
                color: #a1df2a;
            }

            .icon {
                width: 12px;
                height: 12px;
                text-align: center;
                line-height: 12px;
                font-size: 12px;
                display: inline-block;
            }
            .fair_icon{
                width: 8px;
                height: 2px;
                background: #ff9b2f;
                line-height: 17px;
                vertical-align: middle;
                margin-left: 2px;
            }
        }
        .rate_title{
            font-weight: bold;
            color: #666;
        }
    }

    .kf-box {
        margin: 16px auto 20px;
        width: 237px;

        .kf-title {
            font-size: 12px;
            color: #666;
            margin-bottom: 11px;
            font-weight: bold;
        }

        .concat {
            cursor: pointer;
            display: flex;
            align-items: center;
            color: #999;
            width: 200px;
            margin-bottom: 8px;

            &:hover {
                color: #f3262d;
            }

            img {
                width: 77px;
                height: 22px;
                margin-right: 10px;
            }

            span {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                flex: 1;
            }
        }

        .not-kf {
            color: #999;
            text-align: center;
            font-size: 12px;
            font-weight: normal;
        }
    }
</style>
