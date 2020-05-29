<template>
    <div class="box">
        <div>
<!--            <h2>入驻须知</h2>-->
            <p>您当前入驻的类目有以下信息需要知晓：</p>
            <div class="wrap">
                <!--left-->
                <div class="item">
                    <div class="top">
                        <strong>诚信保证金</strong>
                        <a href="javascript:;">了解诚信保证金</a>
                    </div>
                    <div>
                        <div class="item1">
                            <div>
                                <strong>
                                    服务商等级：
                                </strong>
                                <span>三级</span>
                            </div>
                            <div>
                                <strong>店铺赋能技能</strong>
                                <span>5个</span>
                            </div>
                        </div>
                        <div class="item2">
                            <ul>
                                <li>
                                    <em>地铁公交媒体</em>
                                    <span>最低保证金:<i>￥5000</i></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--right-->
                <div class="item">
                    <div class="top">
                        <strong>技术费率</strong>
                        <a href="javascript:;">了解技术费率></a>
                    </div>
                    <div>
                        <div class="item1">
                            <div>
                                <strong>
                                    技能： 地铁／公交媒体
                                </strong>
                            </div>
                        </div>
                        <div class="item2">
                            <ul>
                                <li v-for="item in 10" :key="item">
                                    <em>地铁公交媒体</em>
                                    <span>最低保证金:<i>￥5000</i></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="agt">
                <h3>服务协议</h3>
               <div>
                   <p>
                       到付件哦啊书法家就流口水的解放路卡撒旦法卡双击打开暗色调光会拉开第三方到付件哦啊书法家就流口水的解放路卡撒旦法卡双击打开暗色调光会拉开第三方到付件哦啊书法家就流口水的解放路卡撒旦法卡双击打开暗色调光会拉开第三方到付件哦啊书法家就流口水的解放路卡撒旦法卡双击打开暗色调光会拉开第三方卡双击打开暗色调光会拉开第三方到付件哦啊书法家就流口水的解放路卡撒旦法卡双击打开暗色调光会拉开第三方到付件哦啊书法家就流口水的解放路卡撒旦法卡双击打开暗色调光会拉开第三方
                   </p>
                   <p>
                       <strong>
                           使用平台相关服务时，须自行阅读本协议，尤其是作出加黑，斜体，下划线处理的相关条款，可能会对您的相关权益造成重大影响，请谨慎阅读。
                       </strong>
                   </p>
               </div>
            </div>
            <p class="tips-text">您的技能类目已用完，您可以通过购买技能类目或升级会员扩充技能类目</p>

            <div class="last-btn">
                <el-button type="danger" @click="clickBtn">立即扩充类目{{test}}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            test: {
                type: String
            }
        },
        methods: {
            clickBtn() {
                this.$emit("clickHndle", 'bbb')
            }
        }
    }
</script>
<style scoped lang="less">
    .box {
        h2 {
            font-size: 20px;
            color: #333333;
            text-align: center;
            padding-bottom: 20px;
        }

        h2 + p {
            font-size: 14px;
            color: #666666;
        }

        .wrap {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            .item {
                flex: 1;
            }
            .item:nth-child(1){
                margin-right: 16px;
            }
            .item:nth-child(2){
                margin-left: 16px;
            }
            .top {
                font-size: 16px;
                color: #333;
                display: flex;
                justify-content: space-between;
                padding-bottom: 10px;

                a {
                    text-decoration-line: none;
                    color: #2967C5;
                }
            }
            .top+div{
                border: 1px solid #CCCCCC;
                .item1{
                    border-bottom:1px solid #ccc;
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    div{
                        strong {
                            font-size: 14px;
                            color: #212121;
                        }
                        span {
                            color: #FF0027;
                            font-size: 14px;
                            font-weight: 700;
                        }
                    }
                }
                .item2{
                   ul {
                       min-height: 116px;
                       max-height: 116px;
                       position: relative;
                       overflow-y: scroll;
                       padding-left: 10px;
                       padding-right: 10px;

                       li {
                           padding-top: 10px;
                           padding-bottom: 10px;
                           display: flex;
                           justify-content: space-between;
                           align-items: center;

                           em {
                               font-size: 14px;
                               color: #666;
                           }

                           span {
                               font-size: 14px;
                               color: #666;

                               i {
                                   color: #FF0027;
                                   font-size: 18px;

                               }
                           }
                       }
                   }
                }
            }

        }
        .agt {
            min-height: 220px;
            max-height: 220px;
            border: 1px solid #CCCCCC;
            overflow:auto;
            padding: 10px;
            h3 {
                text-align: center;
                padding-top: 10px;
                padding-bottom: 10px;
                font-size: 20px;
                color: #333;
            }

            margin-bottom: 10px;
            p{
                line-height: 1.8;
                strong{
                    font-style: italic;
                }
            }
        }
        .tips-text{
            padding-bottom: 20px;
            text-align: center;
        }
        .last-btn{
            text-align: center;
            button{
                background: #FF0027;
            }
        }
    }
</style>
