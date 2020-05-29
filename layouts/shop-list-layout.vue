 <template>
    <div>
        <com-header/>
        <!-- <nav-all/> -->
        <nuxt/>
        <side-bar ref="sideBar"></side-bar>
        <com-footer/>
    </div>
</template>

<script>
    import ComHeader from "../components/component/comHeader";
    import ComFooter from "../components/component/comFooter";
    // import NavAll from "../components/component/navAll";
    import sideBar from "../components/sideBar";
    export default {
        name: "shop-list-layout",
        components: {ComHeader, ComFooter,sideBar}
    }
</script>

<style>

</style>

