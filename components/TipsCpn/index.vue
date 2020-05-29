<template>
    <el-dialog width="426px"
               :title="dialogTitle"
               :visible.sync="showFlag"
               :before-close="handleClose"
               custom-class="tips"
    >
        <slot><div class="hint_content">删除后不可恢复，确认删除吗？</div></slot>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" :class="type==='red'?'button_active':''" @click="handleSubmit">{{dialogBtn}}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "tipsCpn",
        props: {
            'title': {
                type: String,
                default: '提示信息'
            }, 'btn': {
                type: String,
                default: '确定'
            }, 'type': {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                showFlag: true,
                dialogTitle: this.title,
                dialogBtn: this.btn
            }
        },
        methods: {
            handleSubmit() {
                this.$emit('submit')
            },
            handleClose() {
                this.$emit('close')
            },
        }
    }
</script>

<style lang="less">
    @import "../../assets/css/component/tipsCpn.less";
</style>
