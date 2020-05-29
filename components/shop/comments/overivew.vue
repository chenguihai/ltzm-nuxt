<template>
    <div class="rate">
        <div class="item1">
            <p class="score-title">综合得分</p>
            <p class="score">{{storeInfo.score| sliceNumber}}</p>
            <div class="rate-box">
                 <rate-cpn :pass="storeInfo.score"/>
            </div>
        </div>
        <div class="inner-rate">
            <div class="i-item">
                <p><span>服务态度：</span><strong>{{storeInfo.attitude| sliceNumber}}</strong><span>分</span></p>
                <p><span>工作速度：</span><strong>{{storeInfo.speed| sliceNumber}}</strong><span>分</span></p>
                <p><span>完成质量：</span><strong>{{storeInfo.quality| sliceNumber}}</strong><span>分</span></p>
            </div>
        </div>
        <div id="chartsBox"></div>
    </div>
</template>

<script>
    import {sliceNumber, serviceDiffText, abs} from '~/utils/common-filters'
    import echarts from "echarts";
    import {mapState} from 'vuex'
import rateCpn from "~/components/component/rateCpn";


    export default {
        name: 'overivew',
        components:{rateCpn},
        computed: {
            ...mapState(['storeInfo'])
        },
        data() {
            return {
                chart: null,
            }
        },
        mounted() {
            this.chartsInit()
        },
        methods: {
            chartsInit() {
                // 基于准备好的dom，初始化echarts实例
                const store = this.storeInfo.serviceStatistic
                if (!store) return
                this.chart = echarts.init(document.getElementById("chartsBox"));
                const storeMap = new Map([
                    ['服务态度', store.attitude],
                    ['工作速度', store.speed],
                    ['完成质量', store.quality],
                    ['服务销量', store.deal_num]
                ])
                const option = {
                    radar: [
                        {
                            indicator: [
                                {name: '服务态度'},
                                {name: '工作速度'},
                                {name: '完成质量'},
                                {name: '服务销量'}
                            ],
                            radius: '65%',
                            name: {
                                color: '#999',
                                fontSize: 12,
                                formatter: params => {
                                    let s = storeMap.get(params), diff = serviceDiffText(s),
                                        template = `{a|${params}}  {b|比同类型服务${diff}}  `;
                                    if (diff !== '持平') template += `{${diff === '低' ? 'd' : 'c'}|${abs(s)}%}`;
                                    return template
                                },
                                rich: {
                                    a: {
                                        color: '#666',
                                        fontSize: 14,
                                        fontFamily: 'Microsoft YaHei',
                                        verticalAlign: 'middle'
                                    },
                                    b: {
                                        color: '#999',
                                        fontSize: 12,
                                        fontFamily: 'Microsoft YaHei',
                                        verticalAlign: 'middle'
                                    },
                                    c: {
                                        color: '#F3262D',
                                        fontSize: 12,
                                        fontFamily: 'Microsoft YaHei',
                                        verticalAlign: 'middle',
                                        fontWeight: 'bold'
                                    },
                                    d: {
                                        color: '#55CC5B',
                                        fontSize: 12,
                                        fontFamily: 'Microsoft YaHei',
                                        verticalAlign: 'middle',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            type: 'radar',
                            itemStyle: {
                                normal: {areaStyle: {type: 'default', color: '#F3262D'}}
                            },
                            data: [
                                {
                                    value: Array.from(storeMap.values())
                                }
                            ]
                        }
                    ]
                }
                this.chart.setOption(option);
            }
        },
        filters: {
            sliceNumber,
            serviceDiffText,
            abs
        }
    };
</script>

<style scoped lang="less">
    @pred: #f3262d;
    .rate {
        border: 1px solid #e3e3e3;
        padding: 12px 0 16px 12px;
        display: flex;
        align-items: center;
        height: 200px;

        .item1 {
            border-right: 1px solid #ccc;
            padding-right: 10px;
            margin-right: 18px;
            height: 108px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            position: relative;

            .score {
                font-size: 25px;
                font-weight: bold;
                color: @pred;
                margin-top: 14px;
                line-height: 20px;
            }

            .score-title {
                font-size: 14px;
                color: #333;
            }

            .rate-box {
                margin-top: 9px;
            }
        }
    }

    .inner-rate {
        display: flex;
        .i-item {
            width: 120px;

            p {
                margin-top: 21px;

                &:first-child {
                    margin-top: 0;
                }

                span {
                    color: #666;
                    font-size: 14px;
                    line-height: 1.6;
                }

                strong {
                    font-size: 15px;
                    color: @pred;
                    font-weight: bold;
                    width: 32px;
                    display: inline-block;
                }
            }
        }
    }

    #chartsBox {
        flex: 1;
        /*margin-left: 64px;*/
        margin-left: 50px;
        height: 100%;
    }
</style>
