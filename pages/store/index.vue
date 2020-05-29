<template>
    <div>
    <div class="store-banner-main"></div>
    <div class="service_center">
        <index-side/>
        <index-container/>
    </div>
    </div>
</template>
<script>
    import IndexSide from '~/components/store/side';
    import IndexContainer from '~/components/store/container'

    export default {
        layout: 'shop-flow-layout',
        components: {IndexContainer, IndexSide},
    }
</script>
<style scoped lang="less"></style>
