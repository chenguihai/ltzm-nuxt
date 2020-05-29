<template>
    <div @click="globalClick">
        <comHeaderCopyo/>
        <nuxt/>
        <sideBar ref="sideBar" styles="darkness"></sideBar>
        <comFooter/>
    </div>
</template>

<script>
    import comHeaderCopyo from "@/components/component/comHeaderCopyo";
    import comFooter from "../components/component/comFooter";
    import sideBar from "../components/sideBar";
    import navAll from "@/components/component/navAll";
    import {mapState, mapMutations} from 'vuex'
    import {get_store_info} from "../api/store-flow";
    export default {
        components: {
            comHeaderCopyo, comFooter, sideBar, navAll
        },
        name: "hasSideBar",
        methods: {
            ...mapMutations(['CHANGE_STORE_INFO']),
            async initData() {
                let _data = await get_store_info()
                let {code, data, message} = _data.data
                if (code == 200) {
                    this.CHANGE_STORE_INFO(data)
                }
            },
            globalClick() {
                const side = this.$refs.sideBar
                if (side && side.isFreely) {
                    this.$refs.sideBar.isFreely = false
                }
            }
        },
        computed: {
            ...mapState(['login']),
            showHeader() {
                return !this.$route.path === 'service'
            }
        }
    }
</script>

<style scoped>

</style>
