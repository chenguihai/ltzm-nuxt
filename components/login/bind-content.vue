<template>
    <div class="content">
        <div class="login-wrap">
            <div class="login-box _out-box">
                <div class="wx-wc" v-if="avatar">
                    <img :src="avatar" alt="头像">
                    <div>
                        <p>{{name}}欢迎您!</p>
                        <p>请先绑定平台账号，绑定后可使用{{wechat ? '微信' : qq ? 'QQ' : '第三方'}}一键登录</p>
                    </div>
                </div>
                <bindBox></bindBox>
            </div>
        </div>
    </div>
</template>
<script>
    import bindBox from "./bind-box";
    import {mapState} from "vuex";
    import {homeimage} from "@/api/list";

    export default {
        components: {bindBox},
        data() {
            const {avatar, name, wechat = '', qq = ''} = this.$route.query;
            return {
                ad_img: "",
                avatar: avatar || '',
                name: name || '',
                wechat: wechat,
                qq: qq
            };
        },
        mounted() {
        },
        methods: {
            init() {
                var type = "16";
                homeimage(type)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.ad_img = res.data.data.ad_img;
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    };
</script>
<style scoped lang="less">
    @import './out.less';

    .content {
        height: 610px;
        width: 100%;
        margin: 0 auto;
        position: relative;
        background: #fff;

        img {
            width: 100%;
            max-width: 1920px;
            height: 610px;
            display: block;
            margin: 0 auto;
        }

        .login-wrap {
            width: 1200px;
            margin: 0 auto;
            height: 610px;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -600px;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            > .login-box {
                background: white;
                position: relative;
                border: 1px solid rgba(232, 232, 232, 1);
                margin: 0 auto;

                .wx-wc {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    line-height: 20px;
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                    position: absolute;
                    top: -114px;
                    left: 50%;
                    color: #666;
                    width: 100%;
                    transform: translate(-50%, 0);

                    img {
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                        margin-right: 16px;
                    }
                }
            }
        }
    }
</style>
