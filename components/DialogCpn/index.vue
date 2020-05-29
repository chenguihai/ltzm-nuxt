<template>
    <el-dialog width="640px"
               :title="dialogTitle"
               :visible.sync="showFlag"
               :before-close="handleClose"
               custom-class="tips_cpn"
    >
        <slot></slot>
        <span slot="footer" class="dialog-footer">
                     <div class="tips_btn_wrap">

                        <span v-if="dialogBtn === '我已知晓'" class="save_btn mr_20"
                              @click="submitForm">{{dialogBtn}}</span>
                         <template v-else>
                        <span class="cancel_btn mr_20" @click="submitForm">{{dialogBtn}}</span>
                        <span v-if="closeBtn" class="save_btn" @click="handleClose">{{closeBtn}}</span>
                             </template>
                    </div>
  </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "dialogCpn",
        props: ['item'],
        data() {
            const {title = '', btn = '', close = ''} = this.item;
            return {
                dialogTitle: title,
                dialogBtn: btn,
                closeBtn: close,
                showFlag: true,
            }
        },
        methods: {
            submitForm() {
                this.$emit('emitSubmit')
            },
            handleClose() {
                this.$emit('emitClose')
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    @import "../../assets/css/component/dialogCpn.less";
</style>
<style scoped lang="less">
    .tips_btn_wrap {
        display: flex;
        align-items: center;
        justify-content: center;

        .mr_20 {
            margin-right: 20px;
        }

        .save_btn, .cancel_btn {
            width: 170px;
            height: 38px;
            line-height: 38px;
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
            font-size: 16px;
        }

        .save_btn {
            color: #fff;
            background: #F3262D;

            &:hover {
                background-color: #F43C42;
            }
        }

        .cancel_btn {
            color: #666;

            background: #F4F4F4;
            border: 1px solid #ccc;

            &:hover {
                background-color: #fff;
            }
        }
    }

</style>
