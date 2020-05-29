 <template>
  <div>
    <com-header />
    <nuxt />
    <com-footer />
  </div>
</template>

<script>
import ComHeader from "../components/component/comHeader";
import ComFooter from "../components/component/comFooter";
export default {
  name: "banner-link-layout",
  components: { ComHeader, ComFooter }
};
</script>

<style lang="less" scoped>
/deep/ .comHeader {
  /deep/ & > .head {
    display: none;
  }
}
</style>

