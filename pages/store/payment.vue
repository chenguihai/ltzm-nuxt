<template>
    <div>
    <div class="store-banner-main"></div>
    <div class="service_center">
        <payment-side/>
        <payment-container/>
    </div>
    </div>
</template>

<script>
    import PaymentSide from '~/components/store/side';
    import PaymentContainer from '../../components/store/payment-container'

    export default {
        name: "store-paymentt",
        layout: 'shop-flow-layout',
        components: {PaymentContainer, PaymentSide}
    }
</script>

<style scoped lang="less"></style>
