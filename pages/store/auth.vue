<template>
    <div>
        <div class="store-banner-main"></div>
        <div class="service_center">
        <store-side/>
        <auth-container/>
    </div>
    </div>
</template>
<script>
    import StoreSide from '~/components/store/side';
    import AuthContainer from '~/components/store/auth-container'

    export default {
        layout: 'shop-flow-layout',
        components: {AuthContainer, StoreSide}
    }
</script>
<style scoped lang="less">
</style>
