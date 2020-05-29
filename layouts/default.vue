<template>
    <nuxt/>
</template>
<script>
    export default {
        name: 'default',
        middleware: 'auth'
    }
</script>
<style lang="less">
    .dialog-box {
        .el-dialog__header {
            padding-top: 10px;
            background-color: #F5F5F5;
        }

        .el-dialog__headerbtn {
            right: 10px;
            top: 10px;
        }

        .el-button--primary {
            background: #F3262D;
            border-color: #f3262d;
        }
    }
</style>
