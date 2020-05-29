<template>
    <div class="release">
        <!--头部 -->
        <com-header/>
        <div class="release-wrap">
            <!--主体-->
            <div class="release-content">
                <release-main/>
            </div>
            <!--侧边-->
            <div class="release-side">
                <release-side/>
            </div>
        </div>
        <!--底部-->
        <com-footer/>
    </div>
</template>

<script>
    import ComHeader from '~/components/component/comHeader'
    import ReleaseSide from '~/components/clues/release/release-side'
    import ReleaseMain from '~/components/clues/release/release-main'
    import ComFooter from '~/components/component/comFooter'
    export default {
        name: "release",
        components: {
            ComHeader,
            ComFooter,
            ReleaseSide,
            ReleaseMain
        }
    }
</script>

<style scoped lang="less">
    .release{
        .release-wrap{
            width: 1210px;
            margin: 0 auto;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            .release-content {
                flex: 1;
                margin-right: 20px;
            }
            .release-side{
                width: 260px;
            }
        }

    }
</style>
