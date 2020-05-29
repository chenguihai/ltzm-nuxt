 <template>
    <div>
        <com-header/>
        <!-- <homeNav/> -->
        <nuxt/>
        <side-bar ref="sideBar"></side-bar>
        <com-footer/>
    </div>
</template>

<script>
    import ComHeader from "../components/component/comHeader";
    import ComFooter from "../components/component/comFooter";
    // import homeNav from "../components/index/homeNav";
    import sideBar from "../components/sideBar";
    export default {
        name: "index-layout",
        components: {ComHeader, ComFooter,sideBar},
    }
</script>

<style>

</style>

