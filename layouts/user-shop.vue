<template>
    <div>
        <com-header/>
        <l-icons/>
        <l-head/>
        <nuxt/>
        <com-footer/>
        <side-bar ref="sideBar"></side-bar>
    </div>
</template>

<script>
    import ComHeader from "../components/component/comHeader";
    import ComFooter from "../components/component/comFooter";
    import LHead from "../components/shop/header";
    import LIcons from "../components/shop/icons";
    import sideBar from "../components/sideBar";

    export default {
        name: "user-shop",
        components: {ComHeader, ComFooter, LHead, LIcons,sideBar}
    }
</script>

<style>

</style>

