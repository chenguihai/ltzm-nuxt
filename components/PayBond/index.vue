<template>
    <div>
        <el-dialog width="640px"
                   :visible.sync="showFlag"
                   :before-close="handleClose"
                   custom-class="banList"
        >
            <div slot="title" class="dialog-title"
                 :style="{backgroundImage:'url('+require('../../assets/img/stores/security.png')+')'}">
                补缴诚信保证金
            </div>
            <div class="ctn_desc">
                <span class="left">您需要补缴的金额：</span>
                <span class="right">点击查看 <nuxt-link class="link" target="_blank"
                                                    to="/aboutUs/regulation/regulation?id=19">保证金的管理与使用&gt;</nuxt-link></span>
            </div>
            <div :class="['money',otherFlag?'active':'']"><span class="unit">￥</span><em>{{money}}</em>&nbsp;
                <span v-if="!otherFlag" class="detail" @click="showOtherMoney">显示其他金额</span>
                <span v-else class="detail" @click="showOtherMoney">关闭其他金额</span>
            </div>
            <template v-if="otherFlag">
                <div class="other_money">
                    <div class="hint">您还可以选择其他金额：</div>
                    <el-input v-model="amount" class="number" type="number" min="1"></el-input>
                    <ul class="other_num">
                        <li v-for="(item,index) in moneyList" :key="index" @click="handleMoney(item.value)">
                            {{item.label}}
                        </li>
                    </ul>
                </div>
                <div class="line"></div>
            </template>
            <span slot="footer" class="dialog-footer">
    <el-button @click="submitForm">立即补缴</el-button>
  </span>
        </el-dialog>
        <!--提示信息-->
        <tips-cpn v-if="tipsFlag" @submit="_handleClose" @close="_handleClose">
            <template>
                <div class="content">其他金额必须不少于您需要补缴的金额</div>
            </template>
        </tips-cpn>
    </div>
</template>

<script>
    import TipsCpn from '~/components/TipsCpn'

    export default {
        name: "payBond",
        props: ['pay'],
        components: {TipsCpn},
        data() {
            let num = this.pay || 0;
            return {
                money: num,
                amount: num,
                showFlag: true,
                otherFlag: false,
                tipsFlag: false,
                content: '',
                moneyList: [
                    {value: '10000.00', label: '1万元'},
                    {value: '20000.00', label: '2万元'},
                    {value: '40000.00', label: '4万元'},
                    {value: '70000.00', label: '7万元'},
                ]
            }
        },
        methods: {
            handleMoney(value) {
                this.amount = value;
            },
            submitForm() {
                if (+this.money > +this.amount) {
                    this.tipsFlag = true;
                } else {
                    this.$emit('emitSubmit', +this.amount)
                }
            },
            handleClose() {
                this.$emit('emitClose')
            },
            showOtherMoney() {
                this.amount = this.money;
                this.otherFlag = !this.otherFlag;
            },
            _handleClose() {
                this.tipsFlag = false;
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/css/component/payBond";

</style>
