 <template>
  <div class="turn-time-page">
    <com-header :headerWid="1390" />
    <!-- <nav-all :navWidth="1395" /> -->
    <!-- <div class="turn_content"> -->
      <nuxt />
    <!-- </div> -->
    <com-footer :headerWid="1390" />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>

<script>
import ComHeader from "../components/component/comHeader";
import ComFooter from "../components/component/comFooter";
// import NavAll from "../components/component/navAll";
import sideBar from "@/components/sideBar";

export default {
  name: "post-layout",
  components: { ComHeader, ComFooter, sideBar }
};
</script>

<style scope lang="scss">

.turn-time-page {
  background: #fff;
  width: 100%;
  overflow-x: auto;
  min-height: 600px;
}
.turn_content {
  overflow-x: auto;
  margin: 0 auto;
}
</style>

