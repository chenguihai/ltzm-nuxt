<template>
    <el-upload class="multiple_upload"
               :action="uploadApi"
               :name="names"
               :headers="fileHeaders"
               list-type="picture-card"
               :multiple="false"
               :file-list="fileList"
               :limit="max"
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
            url: {
                type: Array,
                default: []
            },
            btn: {
                type: String,
                default: '上传图片'
            },
            max: {
                type: Number,
                default: 3
            },
            type: {
                type: String,
                default: ''
            },
            flag: {
                type: Boolean,
                default: false
            }
        },
        data() {
            let imageUrl = []
            if (this.url.length > 0) {
                for (let i = 0; i < this.url.length; i++) {
                    if (this.url[i]) {
                        imageUrl.push(this.url[i])
                    }
                }
            }
            return {
                fileHeaders: {'Authorization': 'Bearer ' + getCookie('access_token')},
                fileList: imageUrl,
                names: 'imgs',
                selectType: this.type
            }
        },
        mounted() {
            this.commonFun();
        },
        methods: {
            handleUploadSuccess(res, file, fileList) {
                if (res.code === 0) {
                    this.fileList = []
                } else {
                    const {file, domain} = res.data
                    this.fileList.push({url: domain + '/' + file, path: file})
                    this.commonFun();
                    this.$emit('emitSubmit', this.fileList)
                }
            },
            beforeRemove(file, fileList) {
                const param = {
                    rmfile: file.path
                }
                this.fileList = fileList
                this.commonFun('remove');
                this.$emit('emitSubmit', this.fileList)
                removeFile(param).then(res => {

                }).catch((err) => {
                    console.log(err)
                })
            },
            commonFun(type = '') {
                let pictureCardDom = document.querySelector(`#${this.selectType} .el-upload--picture-card`)
                if (type === 'remove') {
                    pictureCardDom.style.display = 'inline-block'
                    return
                }
                if (this.fileList.length === this.max) {
                    pictureCardDom.style.display = 'none'
                } else {
                    pictureCardDom.style.display = 'inline-block'
                }
            },
            handleExceed(files, fileList) {
                this.$message.error(`最多只能上传${this.max}张图片`)
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
<style lang="less">
    @import "../../assets/css/upload.less";
</style>

