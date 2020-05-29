<template>
    <div>
        <com-header/>
        <nuxt />
        <side-bar ref="sideBar"></side-bar>
        <com-footer/>
    </div>
</template>

<script>
    import comHeader from "../components/component/comHeader";
    import comFooter from "../components/component/comFooter";
    import {mapState,mapMutations} from 'vuex'
    import {get_store_info} from "../api/store-flow";
    import sideBar from "../components/sideBar";
    export default {
        components:{
            comHeader ,comFooter,sideBar
        },
        name: "shop-flow-layout",
        methods: {
            ...mapMutations(['CHANGE_STORE_INFO']),
            async initData() {
                let _data = await get_store_info()
                let {code, data, message} = _data.data
                if (code == 200) {
                    this.CHANGE_STORE_INFO(data)
                }
            }
        },
        computed:{
            ...mapState(['login'])
        }
    }
</script>

<style scoped>

</style>
