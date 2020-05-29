<template>
    <div class="default">
        <div class="title">
            <h3>实名认证</h3>
            <span>（仅针对中国大陆用户）</span>
        </div>
        <div class="container">
            <!--个人实名-->
            <div v-if="storeInfo.type_id ===1" class="item">
                <div class="head">
                    <div>个人实名</div>
                    <p>( 开店铺认证 )</p>
                </div>
                <div class="text">
                    <p>
                        每个身份证号仅支持5个账户使用，且认证通过身份号不能修改
                    </p>
                    <div>
                        <nuxt-link to="store/auth?storeIndex=auth">立即申请</nuxt-link>
                    </div>
                    <p>支持大陆个人实名</p>
                </div>
            </div>
            <!--企业实名-->
            <div v-else-if="storeInfo.type_id ===2" class="item company">
                <div class="head">
                    <div>企业实名</div>
                    <p>( 开店铺认证 )</p>
                </div>
                <div class="text">
                    <p>
                        每个身份证号仅支持5个账户使用，且认证通过后营业执照将在店铺中展示，且不能修改统一社会信用代码或转为个人。
                    </p>
                    <div>
                        <button @click="companyStepsController">立即申请</button>
                    </div>
                    <p>支持大陆企业实名</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "selectRole",
        computed: {
            ...mapState(['storeInfo']),
        }
    }
</script>

<style scoped lang="less">
    @import "~assets/css/store/auth-container.less";

</style>
