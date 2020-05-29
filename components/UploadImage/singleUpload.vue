<template>
    <el-upload class="multiple_upload"
               :action="uploadApi"
               :name="names"
               :headers="fileHeaders"
               :multiple="false"
               :file-list="fileList"
               :limit="limit"
               list-type="picture-card"
               accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PBG,.GIF"
               :on-exceed="handleExceed"
               :before-remove="beforeRemove"
               :on-success="handleUploadSuccess"
    >
        <i class="el-icon-plus"></i>
    </el-upload>
</template>
<script>
    import {removeFile} from '@/api/common'
    import {getCookie} from "../../utils";
    import {mapState} from 'vuex'

    export default {
        name: 'SingleUpload',
        props: {
            list: {
                type: Array,
                default: []
            },
            btn: {
                type: String,
                default: '上传图片'
            },
            limit: {
                type: Number,
                default: 1
            },
            flag: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                fileHeaders: {'Authorization': 'Bearer ' + getCookie('access_token')},
                fileList: this.list,
                names: 'imgs',
            }
        },
        mounted() {
            this.commmonFun();
        },
        methods: {
            handleUploadSuccess(res, file, fileList) {
                let data = res.data;
                this.fileList = [{
                    url: data.domain + '/' + data.file,
                    path: data.file,
                }];
                this.commmonFun()
                this.$emit('submit', this.fileList)
            },
            beforeRemove() {
                const param = {
                    rmfile: this.fileList[0].path
                }
                this.fileList = []
                this.commmonFun()
                this.$emit('submit', [])
                removeFile(param).then(res => {
                       console.log('======================',res.data)
                }).catch((err) => {
                    console.log(err)
                })
            },
            handleExceed(files, fileList) {
                // this.$message.error(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
                this.$message.error(`最多只能上传一张图片`)
            },
            commmonFun() {
                let pictureCardDom = document.querySelector('.multiple_upload .el-upload--picture-card')
                if (this.fileList.length === this.limit) {
                    pictureCardDom.style.display = 'none'
                } else {
                    pictureCardDom.style.display = 'inline-block'
                }
            }
        },
        computed: {
            ...mapState(['uploadApi'])
        },
        watch: {
            "flag"(data) {
                if (!data) {
                    this.fileList = []
                    let pictureCardDom = document.querySelector('.multiple_upload .el-upload--picture-card')
                    pictureCardDom.style.display = 'inline-block'
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="less">
    @import "../../assets/css/upload.less";
</style>

