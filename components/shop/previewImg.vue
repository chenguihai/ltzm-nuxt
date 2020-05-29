<template>
    <div tabindex="-1" class="el-image-viewer__wrapper" style="z-index: 2000;">
        <div class="el-image-viewer__mask"></div>
        <span class="el-image-viewer__btn el-image-viewer__close" @click="$emit('close')"><i
                class="iconfont icon-guanbi-dianji" style="color:#fff"></i></span>
        <span class="el-image-viewer__btn el-image-viewer__prev" @click="switchPicture(-1)"><i
                class="el-icon-arrow-left"></i></span>
        <span class="el-image-viewer__btn el-image-viewer__next" @click="switchPicture(1)"><i
                class="el-icon-arrow-right"></i></span>
        <div class="el-image-viewer__canvas">
            <img v-if="selectType!='video'" :src="envVars.IMG_HOST+url" lass="el-image-viewer__img"
                 style="transform: scale(1) rotate(0deg); margin-left: 0px; margin-top: 0px; max-height: 100%; max-width: 100%;">
            <video v-else :src="envVars.IMG_HOST+url" class="el-image-viewer__img" controls
                   style="transform: scale(1) rotate(0deg); margin-left: 0px; margin-top: 0px; max-height: 100%; max-width: 100%;"
            ></video>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "previewImg",
        props: {
            list: {
                type: Array,
                default: []
            },
            video: {
                type: String,
                default: ''
            },
            select: {
                type: Number,
                default: 0,
            },
            initList:[]
        },
          computed: {
            ...mapState({
                envVars: "envVariables"
            }),
          },
        data() {
            return {
                url: '',//url,
                selectType:'',// type,
                srcList: '',//this.list,
                length: '',//this.list.length,
                clickIndex: this.select,
                newList:[]
            }
        },

        mounted(){
            let lists = this.list
            let striVideo = JSON.stringify(this.video)
            let striList = JSON.stringify(lists)
            if (this.video&&striList.indexOf(striVideo)==-1) {
            }
            this.length = lists.length
            this.srcList = lists
            let {url='', type = ''} = lists[this.select];
            this.url = url;
            this.selectType = type
        },
        destroyed(){
            let striVideo = JSON.stringify(this.video)
            let striList = JSON.stringify(this.srcList)
        },
      
        methods: {
            
            switchPicture(types) {
                if (types === 1) {//加
                    if (this.clickIndex > this.length) {
                        this.clickIndex = 0
                    } else {
                        if (this.clickIndex === this.length - 1) {
                            this.clickIndex = 0
                        } else {
                            this.clickIndex += 1
                        }
                    }

                } else {//减
                    if (this.clickIndex > 0) {
                        this.clickIndex -= 1
                    } else {
                        this.clickIndex = this.length - 1
                    }
                }
                const {url='', type = ''} = this.srcList[this.clickIndex];
                this.url = url;
                this.selectType = type;

            }
        }
    }
</script>

<style scoped lang="less">
    .el-icon-circle-close{
        color: #ffffff;
    }
    .el-image-viewer__wrapper {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .el-image-viewer__mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 1;
        background: #000;
    }

    .el-image-viewer__btn {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        opacity: .8;
        cursor: pointer;
        box-sizing: border-box;
        user-select: none;
    }

    .el-image-viewer__close {
        top: 40px;
        right: 40px;
        width: 40px;
        height: 40px;
        font-size: 40px;
    }

    .el-image-viewer__next, .el-image-viewer__prev {
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
        border-color: #fff;
    }

    .el-image-viewer__prev {
        left: 40px;
    }

    .el-image-viewer__next {
        right: 40px;
        text-indent: 2px;
    }

    .el-image-viewer__canvas {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon-guanbi-dianji:hover{
        color: #f3262d!important;
    }
    .el-icon-arrow-right:hover,.el-icon-arrow-left:hover{
        color: #f3262d!important;
    }
</style>
