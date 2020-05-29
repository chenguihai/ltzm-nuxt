<template>
    <div class="preview-box" @click="handleClose">
        <div class="preview-prev" @click.stop>
            <div class="btn prev-btn"><i class="el-icon-arrow-left"></i></div>
        </div>
         
            <div class="swiper-container gallery-thumbs preview-center" v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, idx) in nowViewImages" :key="idx">
                    <img class="view-box" src="~/assets/img/img_bg.png" v-lazy="item">
                </div>
            </div>
        </div>
        <div class="preview-next" @click.stop>
            <i class="el-icon-close" @click="handleClose"></i>
            <div class="btn next-btn"><i class="el-icon-arrow-right"></i></div>
            <p></p>
        </div>
    </div>
</template>

<script>
    // import Swiper from 'swiper' 
    export default {
        name: "previewPicture",
        props: ['list'],
        data() {
            return {
                swiperOption: {
                    slidesPerView: 1,
                    centeredSlides: true,
                    navigation: {
                        nextEl: `.next-btn`,
                        prevEl: `.prev-btn`,
                    }
                },
                nowViewImages: this.list,
            }
        },
        mounted(){
            // require('@/assets/js/swiper.min5.3.js');
            // var swiperOption = new Swiper(".gallery-thumbs",  {
            //         slidesPerView: 1,
            //         centeredSlides: true,
            //         navigation: {
            //             nextEl: `.next-btn`,
            //             prevEl: `.prev-btn`,
            //         }
            //     });
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
        }
    }
</script>

<style scoped lang="less">
    .preview-box {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: stretch;
        z-index: 1002;

        .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .swiper-wrapper {
            display: flex;
            align-items: center;
        }

        .view-box {
            max-width: 100%;
            max-height: 100%;
            margin: auto;
            display: inline-block;
        }

        .preview-center {
            flex: 1;
        }

        .preview-prev,
        .preview-next {
            width: 60px;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .el-icon-close {
                font-size: 22px;
                color: #e2e8e8;
                cursor: pointer;
                margin-top: 30px;

                &:hover {
                    color: #dddddd;
                }
            }

            .btn {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                color: #e2e8e8;
                background: #606060;
                outline: none;

                i {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 25px;
                }

                &:hover {
                    i {
                        color: #ff0027;
                    }
                }
            }
        }

        .preview-next {
            justify-content: space-between;
        }
    }

</style>
<style lang="css">
@import "@/assets/css/swiper5.3.css";
</style>
