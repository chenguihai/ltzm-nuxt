<template>
    <div class="store-indx">
        <div class="store-banner-main"></div>
        <div class="store-index-main">
            <div class="inner-box">
                <tariff-side/>
                <div class="container">
                    <h3>入驻分类技术费率详情</h3>
                    <el-table border :data="list">
                        <el-table-column min-width="60px" prop="cate_name" label="一级分类"></el-table-column>
                        <el-table-column min-width="60px" prop="cat_two" label="二级分类"></el-table-column>
                        <el-table-column min-width="200px" prop="cat_three" label="三级分类"></el-table-column>
                        <el-table-column min-width="35px" prop="tech_rate" label="技术费率"></el-table-column>
                    </el-table>
                    <p>
                        <nuxt-link to="/tollMarket/marketShop/marketShop?id=1">升级会员等级，享受更低技术费率></nuxt-link>
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import TariffSide from '~/components/store/side';
    import {techRateList} from '~/api/store';

    export default {
        name: "tariff",
        layout: 'shop-flow-layout',
        components: {TariffSide},
        data() {
            return {
                list: []
            }
        },
        created() {
            this.techRateListHttp();
        },
        methods: {
            techRateListHttp() {
                techRateList().then(res => {
                    let {code, message, data} = res.data
                    if (code === 200) {
                        this.list = data;
                    } else {
                        this.$message.error({title: '错误提示', message: message});
                    }
                }).catch(err => {
                    this.$message.error({title: '错误提示', err});
                })
            }
        }
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
                padding: 30px;

                .top {
                    display: flex;
                    justify-content: space-between;
                    align-content: center;
                    background: #fff;
                    padding-bottom: 20px;

                    .left {
                        display: flex;
                        align-items: center;
                        padding-left: 20px;
                        padding-top: 20px;

                        .container-left-item-1 {
                            img {
                                height: 84px;
                                width: 84px;
                                border-radius: 42px;

                            }
                        }

                        .container-left-item-2 {
                            padding-left: 1em;

                            .inner-box-div1 {
                                display: flex;
                                align-items: center;

                                strong {
                                    color: #333333;
                                    font-size: 18px;
                                }

                                i:nth-child(2) {
                                    height: 28px;
                                    width: 32px;
                                    background: url("~assets/img/store/no-yz.png") no-repeat center;
                                    background-size: contain;
                                    margin-left: .5em;
                                }

                                span:nth-child(3) {
                                    background: rgba(244, 117, 117, 1);
                                    margin-left: .5em;
                                    color: #fff;
                                    padding: 3px 5px;
                                    font-size: 12px;
                                    border-radius: 2px;
                                }

                                em {
                                    background: #fabf4c;
                                    border-radius: 2px;
                                    padding: 2px 5px;
                                    margin-left: .5em;
                                    color: #fff;
                                }
                            }

                            .inner-box-div2 {
                                padding-top: 10px;
                                display: flex;

                                span:nth-child(1) {
                                    color: #666;

                                    span {
                                        color: #FF0027;
                                    }
                                }

                                span:nth-child(2) {
                                    margin-left: 2em;
                                    color: #666;
                                }
                            }

                            .inner-box-div3 {
                                margin-top: 10px;

                                span:nth-child(1) {
                                    color: #666;
                                }

                                em {
                                    color: #FF0027;
                                }

                                a {
                                    color: #0066CC;
                                    text-decoration-line: none;
                                    margin-left: 1em;
                                }
                            }
                        }

                    }

                    .right {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-right: 20px;
                        padding-top: 20px;

                        p {
                            font-size: 12px;
                            color: #666;
                        }

                        strong {
                            font-size: 26px;
                            color: #50D285;
                            padding-top: 8px;
                            margin-bottom: 16px;
                        }

                        button {
                            color: #666;
                            width: 109px;
                            height: 30px;
                            background: rgba(255, 255, 255, 1);
                            border: 1px solid rgba(223, 223, 223, 1);
                            border-radius: 4px;
                            outline: none;
                            cursor: pointer;
                        }

                        .div-item-1 {
                            margin-right: 50px;
                        }

                        .div-item-2 {
                            strong {
                                color: #F3262D;
                            }

                            button {
                                color: #fff;
                                background: #FF0027;
                            }
                        }

                        .set-bottom {
                            padding-bottom: 10px;
                        }
                    }
                }

                h3 {
                    font-size: 18px;
                    color: #333;
                    padding-bottom: 26px;
                }

                p {

                    padding-top: 26px;
                    text-align: center;

                    a {
                        color: #0066CC;
                        font-size: 12px;
                    }
                }

                .has-gutter {
                    background: #F4F6F8;
                    color: #999;
                }
            }
        }
    }
</style>
